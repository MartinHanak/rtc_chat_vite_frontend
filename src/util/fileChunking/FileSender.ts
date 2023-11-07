import { nanoid } from "nanoid";
import { FileMessageMetadata, FileMessageType } from "../../types/file";
import { MessageEncoder } from "./MessageEncoder";
import { FILE_ID_LENGTH } from "../config";

export default class FileSender {
  private encoder = new MessageEncoder();
  private fileQueue = new Set<File>();
  private dataChannels = new Set<RTCDataChannel>();

  private maxChunk = 16384;
  private status: "idle" | "sending" = "idle";

  constructor() {}

  public updateDataChannels(channels: RTCDataChannel[]) {
    // remove old channels
    this.dataChannels.forEach((oldChannel) => {
      if (!channels.includes(oldChannel)) {
        this.dataChannels.delete(oldChannel);
      }
    });

    // add new channels
    for (const channel of channels) {
      if (!this.dataChannels.has(channel)) {
        this.dataChannels.add(channel);
      }
    }
  }

  public sendFiles(files: File[]) {
    for (const file of files) {
      this.fileQueue.add(file);
    }

    if (this.status === "idle") this.sendNextFile();
  }

  private async sendNextFile() {
    this.status = "sending";
    const file = this.fileQueue.values().next().value;

    if (!(file instanceof File))
      throw new Error(`FileSender cannot send ${file}`);

    const deletedFromSet = this.fileQueue.delete(file);

    if (!deletedFromSet)
      throw new Error(`Could not remove file from the queue`);

    const fileId = this.generateFileId();

    this.sendMetadata(file, fileId);

    await this.sendFileData(file, fileId);

    if (this.fileQueue.size === 0) {
      this.status = "idle";
    } else {
      this.sendNextFile();
    }
  }

  private sendMetadata(file: File, id: string) {
    const metadata: FileMessageMetadata = {
      fileId: id,
      size: file.size,
      name: file.name,
      type: file.type,
    };

    const metadataMessage = this.encoder.encodeFileMessage({
      type: FileMessageType.METADATA,
      data: metadata,
    });

    this.sendToAllChannels(metadataMessage);
  }

  private async sendFileData(file: File, id: string) {
    const arrayBuffer = await file.arrayBuffer();

    const chunkSize =
      this.maxChunk - this.encoder.encodedChunkMetadataByteLength;

    const numberOfChunks = Math.ceil(arrayBuffer.byteLength / chunkSize);
    const chunks: ArrayBuffer[] = [];
    for (let i = 0; i < numberOfChunks; i++) {
      chunks.push(arrayBuffer.slice(0 + i * chunkSize, (i + 1) * chunkSize));
    }

    const encodedChunks: ArrayBuffer[] = [];
    chunks.map((chunk, index) => {
      encodedChunks.push(
        this.encoder.encodeFileMessage({
          type: FileMessageType.CHUNK,
          data: {
            fileId: id,
            chunkOrder: index,
            totalChunks: numberOfChunks,
            buffer: chunk,
          },
        })
      );
    });

    await this.sendChunksOneByOne(encodedChunks);
  }

  private async sendChunksOneByOne(chunks: ArrayBuffer[]) {
    const promises: Promise<void>[] = [];
    this.dataChannels.forEach((channel) => {
      channel.bufferedAmountLowThreshold = Math.floor(this.maxChunk / 2);

      promises.push(
        new Promise((resolve) => {
          let chunkIndex = 0;

          function sendNextChunk() {
            channel.send(chunks[chunkIndex]);
            chunkIndex += 1;
            if (chunkIndex === chunks.length) {
              channel.onbufferedamountlow = null;
              resolve();
            } else {
              channel.onbufferedamountlow = sendNextChunk;
            }
          }

          sendNextChunk();
        })
      );
    });

    return Promise.all(promises);
  }

  private sendToAllChannels(buffer: ArrayBuffer) {
    this.dataChannels.forEach((channel) => {
      channel.send(buffer);
    });
  }

  private generateFileId() {
    return nanoid(FILE_ID_LENGTH);
  }
}

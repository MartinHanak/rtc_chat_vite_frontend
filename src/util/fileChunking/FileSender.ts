import { nanoid } from "nanoid";
import { FileMessageMetadata, FileMessageType } from "../../types/file";
import { MessageEncoder } from "./MessageEncoder";
import { FILE_ID_LENGTH } from "../config";

export default class FileSender {
  private encoder = new MessageEncoder();
  private fileQueues = new Map<RTCDataChannel, Set<File>>();
  private dataChannels = new Set<RTCDataChannel>();
  private status = new Map<RTCDataChannel, "idle" | "sending">();

  private maxChunk = 16384;

  constructor() {}

  public updateDataChannels(channels: RTCDataChannel[]) {
    // remove old channels
    this.dataChannels.forEach((oldChannel) => {
      if (!channels.includes(oldChannel)) {
        this.dataChannels.delete(oldChannel);
        this.fileQueues.delete(oldChannel);
        this.status.delete(oldChannel);
      }
    });

    // add new channels
    for (const channel of channels) {
      if (!this.dataChannels.has(channel)) {
        this.dataChannels.add(channel);
        this.fileQueues.set(channel, new Set());
        this.status.set(channel, "idle");
      }
    }
  }

  public sendFiles(files: File[]) {
    for (const file of files) {
      this.fileQueues.forEach((queue) => queue.add(file));
    }

    for (const [channel, status] of this.status.entries()) {
      if (status === "idle") {
        this.sendNextFile(channel);
      }
    }
  }

  private async sendNextFile(dc: RTCDataChannel) {
    this.status.set(dc, "sending");
    const queue = this.fileQueues.get(dc);
    if (!queue)
      throw new Error(`No queue for the datachannel ${dc.id} ${dc.label}`);

    const file = queue.values().next().value;

    if (!(file instanceof File))
      throw new Error(
        `FileSender cannot send ${file} that is not an instance of File`
      );

    const deletedFromSet = queue.delete(file);

    if (!deletedFromSet)
      throw new Error(`Could not remove file from the queue`);

    const fileId = this.generateFileId();

    this.sendMetadata(dc, file, fileId);

    await this.sendFileData(dc, file, fileId);

    if (queue.size === 0) {
      this.status.set(dc, "idle");
    } else {
      this.sendNextFile(dc);
    }
  }

  private sendMetadata(dc: RTCDataChannel, file: File, id: string) {
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

    this.sendToDataChannel(dc, metadataMessage);
  }

  private async sendFileData(dc: RTCDataChannel, file: File, id: string) {
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

    await this.sendChunksOneByOne(dc, encodedChunks);
  }

  private async sendChunksOneByOne(dc: RTCDataChannel, chunks: ArrayBuffer[]) {
    // TODO: Check if needed
    dc.bufferedAmountLowThreshold = Math.floor(this.maxChunk / 2);

    const chunksSentPromise: Promise<void> = new Promise((resolve) => {
      let chunkIndex = 0;

      function sendNextChunk() {
        dc.send(chunks[chunkIndex]);
        chunkIndex += 1;
        if (chunkIndex === chunks.length) {
          dc.onbufferedamountlow = null;
          resolve();
        } else {
          dc.onbufferedamountlow = sendNextChunk;
        }
      }

      sendNextChunk();
    });

    return chunksSentPromise;
  }

  private sendToDataChannel(dc: RTCDataChannel, buffer: ArrayBuffer) {
    dc.send(buffer);
  }

  private generateFileId() {
    return nanoid(FILE_ID_LENGTH);
  }
}

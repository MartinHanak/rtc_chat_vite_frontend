import { nanoid } from "nanoid";
import { FileMessageMetadata, FileMessageType } from "../../types/file";
import { MessageEncoder } from "./MessageEncoder";
import { FILE_ID_LENGTH } from "../config";

export default class FileSender {
  private encoder = new MessageEncoder();
  private dataChannels = new Set<RTCDataChannel>();
  private fileQueues = new Map<RTCDataChannel, Set<File>>();
  private status = new Map<RTCDataChannel, "idle" | "sending">();

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
        try {
          this.sendNextFile(channel);
        } catch (err) {
          console.log(err);
        }
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
    const totalChunks = this.numberOfChunks(file);

    this.sendMetadata(dc, fileId, totalChunks, file.size, file.name, file.type);

    await this.sendFileData(dc, file, fileId);

    if (queue.size === 0) {
      this.status.set(dc, "idle");
    } else {
      try {
        this.sendNextFile(dc);
      } catch (err) {
        console.log(err);
      }
    }
  }

  private sendMetadata(
    dc: RTCDataChannel,
    id: string,
    totalChunks: number,
    size: number,
    name: string,
    type: string
  ) {
    const metadata: FileMessageMetadata = {
      fileId: id,
      totalChunks: totalChunks,
      size: size,
      name: name,
      type: type,
    };

    const metadataMessage = this.encoder.encodeFileMessage({
      type: FileMessageType.METADATA,
      data: metadata,
    });

    this.sendToDataChannel(dc, metadataMessage);
  }

  private async sendFileData(dc: RTCDataChannel, file: File, id: string) {
    await this.sendChunksOneByOne(dc, file, id);
  }

  private async sendChunksOneByOne(
    dc: RTCDataChannel,
    file: File,
    fileId: string
  ) {
    // TODO: Check if needed
    dc.bufferedAmountLowThreshold = Math.floor(
      this.encoder.chunkBufferByteSize / 2
    );

    const chunkSize = this.encoder.chunkBufferByteSize;
    const totalChunks = this.numberOfChunks(file);
    const encoder = this.encoder;

    const chunksSentPromise: Promise<void> = new Promise((resolve) => {
      let chunkIndex = 0;

      async function sendNextChunk() {
        const nextChunk = await file
          .slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize)
          .arrayBuffer();

        const nextEncodedChunk = encoder.encodeFileMessage({
          type: FileMessageType.CHUNK,
          data: {
            fileId: fileId,
            chunkOrder: chunkIndex,
            totalChunks: totalChunks,
            buffer: nextChunk,
          },
        });

        dc.send(nextEncodedChunk);
        chunkIndex += 1;
        if (chunkIndex === totalChunks) {
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
    if (dc.readyState !== "open") {
      throw new Error("Data channel is not open");
    }

    dc.send(buffer);
  }

  private generateFileId() {
    return nanoid(FILE_ID_LENGTH);
  }

  private numberOfChunks(file: File) {
    const chunkSize = this.encoder.chunkBufferByteSize;

    return Math.ceil(file.size / chunkSize);
  }
}

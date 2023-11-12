import { FileMessageMetadata, FileMessageType } from "../../types/file";
import { MessageDecoder } from "./MessageDecoder";

type ICompletedFileHandler = (file: File) => void;

interface partialFileInfo {
  metaData: FileMessageMetadata | null;
  chunksReceived: number;
  chunksTotal: number;
  chunks: ArrayBuffer[];
}

export default class FileReceiver {
  dc: RTCDataChannel;
  decoder: MessageDecoder;
  fileHandler: ICompletedFileHandler;
  messageHandler?: (event: MessageEvent<ArrayBuffer>) => void;
  fileChunks: Map<string, partialFileInfo>;

  constructor(dc: RTCDataChannel, fileHandler: ICompletedFileHandler) {
    this.dc = dc;
    this.decoder = new MessageDecoder();
    this.fileHandler = fileHandler;
    this.fileChunks = new Map();
    this.start();
  }

  public start() {
    this.stop();
    const handler = this.createMessageHandler();
    this.dc.addEventListener("message", handler);
  }

  public stop() {
    if (this.messageHandler) {
      this.dc.removeEventListener("message", this.messageHandler);
    }
  }

  private createMessageHandler() {
    const handler = (event: MessageEvent<ArrayBuffer>) => {
      const buffer = event.data;
      const decodedFileMessage = this.decoder.decodeFileMessage(buffer);

      let fileProgress = this.fileChunks.get(decodedFileMessage.data.fileId);

      if (!fileProgress) {
        this.initializeFileDownload(
          decodedFileMessage.data.fileId,
          decodedFileMessage.data.totalChunks
        );
        fileProgress = this.fileChunks.get(decodedFileMessage.data.fileId);
      }

      if (!fileProgress) {
        throw new Error(`Could not initialize file download`);
      }

      switch (decodedFileMessage.type) {
        case FileMessageType.METADATA:
          fileProgress.metaData = decodedFileMessage.data;
          break;

        case FileMessageType.CHUNK:
          fileProgress.chunks[decodedFileMessage.data.chunkOrder] =
            decodedFileMessage.data.buffer;
          fileProgress.chunksReceived += 1;
          break;
      }

      if (
        fileProgress.chunksReceived === fileProgress.chunksTotal &&
        fileProgress.metaData
      ) {
        this.finishFileDownload(decodedFileMessage.data.fileId);
      }
    };

    this.messageHandler = handler;
    return handler;
  }

  private initializeFileDownload(fileId: string, totalChunks: number) {
    this.fileChunks.set(fileId, {
      metaData: null,
      chunksReceived: 0,
      chunksTotal: totalChunks,
      chunks: new Array(totalChunks),
    });
  }

  private finishFileDownload(fileId: string) {
    // TODO: combine chunks into a file
    const file = new File([], "test");
    console.log("DOWNLOAD COMPLETE");
    console.log(fileId);

    this.fileChunks.delete(fileId);

    this.fileHandler(file);
  }
}

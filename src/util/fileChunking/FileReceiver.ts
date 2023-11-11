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
  }

  public start() {
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

      const fileProgress = this.fileChunks.get(decodedFileMessage.data.fileId);

      if(!fileProgress) {
        this.initializeFileDownload(decodedFileMessage.data.fileId, decodedFileMessage.data.)
      }

      switch (decodedFileMessage.type) {
        case FileMessageType.METADATA:
          break;

        case FileMessageType.CHUNK:
          break;
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

    this.fileChunks.delete(fileId);

    this.fileHandler(file);
  }
}

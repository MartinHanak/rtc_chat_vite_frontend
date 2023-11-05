export enum FileMessageType {
  METADATA,
  CHUNK,
}

export type FileMessage =
  | {
      type: FileMessageType.METADATA;
      data: FileMessageMetadata;
    }
  | {
      type: FileMessageType.CHUNK;
      data: FileMessageChunk;
    };

export type FileMessageMetadata = {
  fileId: string;
  size: number;
  name: string;
  type: string;
};

export type FileMessageChunk = {
  fileId: string;
  chunkOrder: number;
  totalChunks: number;
  buffer: ArrayBuffer;
};

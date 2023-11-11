import {
  FileMessage,
  FileMessageChunk,
  FileMessageMetadata,
  FileMessageType,
} from "../../types/file";
import { FILE_ID_LENGTH, FILE_TEXT_DELIMITER } from "../config";

export class MessageDecoder {
  private textDecoder = new TextDecoder();

  constructor() {}

  public decodeFileMessage(message: ArrayBuffer): FileMessage {
    const intArray = new Int8Array(message, 0, 1);
    if (intArray[0] === FileMessageType.METADATA) {
      const data = this.decodeFileMetadata(message);
      return {
        type: FileMessageType.METADATA,
        data: data,
      };
    } else {
      const data = this.decodeFileChunk(message);
      return {
        type: FileMessageType.CHUNK,
        data: data,
      };
    }
  }

  private decodeFileMetadata(message: ArrayBuffer): FileMessageMetadata {
    const textOffset = 1 + 4 * 2;
    const numberArray = new DataView(message, 1, 4 * 2);
    const stringArray = new Uint8Array(message, textOffset);

    const size = numberArray.getFloat32(0);
    const totalChunks = numberArray.getFloat32(4);
    const textData = this.textDecoder.decode(stringArray);
    const fileId = textData.slice(0, FILE_ID_LENGTH);

    const parts = textData.slice(FILE_ID_LENGTH).split(FILE_TEXT_DELIMITER);
    const name = parts[0];
    const type = parts[1];

    return {
      fileId,
      size,
      totalChunks,
      name,
      type,
    };
  }

  private decodeFileChunk(message: ArrayBuffer): FileMessageChunk {
    const textOffset = 1 + 4 * 2;
    const numberArray = new DataView(message, 1, 4 * 2);
    const stringArray = new Uint8Array(message, textOffset, FILE_ID_LENGTH);

    const order = numberArray.getFloat32(0);
    const total = numberArray.getFloat32(4);
    const fileId = this.textDecoder.decode(stringArray);

    const buffer = message.slice(textOffset + FILE_ID_LENGTH);

    return {
      fileId,
      chunkOrder: order,
      totalChunks: total,
      buffer,
    };
  }
}

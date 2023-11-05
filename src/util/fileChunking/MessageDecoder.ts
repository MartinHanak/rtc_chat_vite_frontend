import {
  FileMessage,
  FileMessageChunk,
  FileMessageMetadata,
  FileMessageType,
} from "../../types/file";
import { FILE_ID_LENGTH, FILE_TEXT_DELIMITER } from "../config";

class MessageDecoder {
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
    const textOffset = 1 + 4;
    const numberArray = new Float32Array(message, 1, 1);
    const stringArray = new Uint8Array(message, textOffset);

    const size = numberArray[0];
    const textData = this.textDecoder.decode(stringArray);
    const fileId = textData.slice(0, FILE_ID_LENGTH);

    const parts = textData.slice(FILE_ID_LENGTH).split(FILE_TEXT_DELIMITER);
    const name = parts[0];
    const type = parts[1];

    return {
      fileId,
      size,
      name,
      type,
    };
  }

  private decodeFileChunk(message: ArrayBuffer): FileMessageChunk {
    const textOffset = 1 + 4 * 2;
    const numberArray = new Float32Array(message, 1, 2);
    const stringArray = new Uint8Array(message, textOffset, FILE_ID_LENGTH);
    const chunkArray = new Uint8Array(message, textOffset + FILE_ID_LENGTH);

    const order = numberArray[0];
    const total = numberArray[1];
    const fileId = this.textDecoder.decode(stringArray);

    const buffer = chunkArray.buffer;

    return {
      fileId,
      chunkOrder: order,
      totalChunks: total,
      buffer,
    };
  }
}

const decoder = new MessageDecoder();

export default decoder;

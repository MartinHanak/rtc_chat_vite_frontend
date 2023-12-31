import {
  FileMessage,
  FileMessageChunk,
  FileMessageMetadata,
  FileMessageType,
} from "../../types/file";
import { FILE_ID_LENGTH, FILE_TEXT_DELIMITER } from "../config";

export class MessageEncoder {
  private textEncoder = new TextEncoder();

  private maxChunk = 16384;

  get encodedChunkMetadataByteLength() {
    // 1x int8 + 2x float32 + fileId encoded in UTF-8 with only basic signs
    return 1 + 4 * 2 + FILE_ID_LENGTH;
  }

  get chunkBufferByteSize() {
    return this.maxChunk - this.encodedChunkMetadataByteLength;
  }

  constructor() {}

  public encodeFileMessage(message: FileMessage) {
    if (message.type === FileMessageType.METADATA) {
      return this.encodeMetadata(message.data);
    } else {
      return this.encodeFileChunk(message.data);
    }
  }

  private encodeMetadata(data: FileMessageMetadata) {
    const type = FileMessageType.METADATA;
    const size = data.size;
    const total = data.totalChunks;
    const metadataText = this.encodeString(
      data.fileId + data.name + FILE_TEXT_DELIMITER + data.type
    );

    const textOffset = 1 + 4 * 2;
    const textLength = metadataText.byteLength;
    const bufferSize = textOffset + textLength;
    const buffer = new ArrayBuffer(bufferSize);

    const booleanArray = new Int8Array(buffer, 0, 1);
    const numberArray = new DataView(buffer, 1, 4 * 2);
    const stringArray = new Uint8Array(buffer, textOffset, textLength);

    // fill data
    booleanArray[0] = type;
    numberArray.setFloat32(0, size);
    numberArray.setFloat32(4, total);
    stringArray.set(metadataText);

    return buffer;
  }

  private encodeFileChunk(data: FileMessageChunk) {
    const type = FileMessageType.CHUNK;
    const order = Math.ceil(data.chunkOrder);
    const total = Math.ceil(data.totalChunks);
    const fileId = this.encodeString(data.fileId);
    const chunk = data.buffer;

    const textOffset = 1 + 4 * 2;
    const textLength = fileId.byteLength;
    const bufferSize = textOffset + textLength + chunk.byteLength;
    const buffer = new ArrayBuffer(bufferSize);

    const booleanArray = new Int8Array(buffer, 0, 1);
    const numberArray = new DataView(buffer, 1, 4 * 2);
    const stringArray = new Uint8Array(buffer, textOffset, textLength);
    const chunkArray = new Uint8Array(buffer, textOffset + textLength);

    // fill data
    booleanArray[0] = type;
    numberArray.setFloat32(0, order);
    numberArray.setFloat32(4, total);
    stringArray.set(fileId);
    chunkArray.set(new Uint8Array(chunk, 0));

    return buffer;
  }

  // UTF-8 encoded representation of the string
  private encodeString(input: string) {
    return this.textEncoder.encode(input);
  }
}

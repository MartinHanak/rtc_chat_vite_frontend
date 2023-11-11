import { beforeAll, describe, expect, it } from "vitest";
import { FileMessage, FileMessageType } from "../../types/file";
import { MessageEncoder } from "../../util/fileChunking/MessageEncoder";

describe("MessageEncoder", () => {
  let metaDataMessage: FileMessage;
  let chunkMessage: FileMessage;
  const encoder = new MessageEncoder();

  beforeAll(() => {
    metaDataMessage = {
      type: FileMessageType.METADATA,
      data: {
        size: 1024,
        totalChunks: 10,
        fileId: "file123abcd",
        name: "example.txt",
        type: "text/plain",
      },
    };

    chunkMessage = {
      type: FileMessageType.CHUNK,
      data: {
        chunkOrder: 1,
        totalChunks: 3,
        fileId: "file123abcd",
        buffer: new Uint8Array([1, 2, 3, 4]).buffer,
      },
    };
  });

  it("should encode metadata for a file message", () => {
    const encodedMetadata = encoder.encodeFileMessage(metaDataMessage);

    expect(encodedMetadata).toBeDefined();
  });

  it("should encode file chunk for a file message", () => {
    const encodedChunk = encoder.encodeFileMessage(chunkMessage);

    expect(encodedChunk).toBeDefined();
  });

  it("should have a correct encoded message length", () => {
    const encodedChunk = encoder.encodeFileMessage(chunkMessage);

    if (chunkMessage.type !== FileMessageType.CHUNK) {
      return;
    }

    expect(encodedChunk.byteLength).toEqual(
      1 + 4 * 2 + 11 + chunkMessage.data.buffer.byteLength
    );

    expect(chunkMessage.data.buffer.byteLength).toEqual(4);
  });

  it("should encode correct values inside the buffer", () => {
    const encodedChunk = encoder.encodeFileMessage(chunkMessage);

    const intArray = new Uint8Array(encodedChunk, 1 + 4 * 2 + 11);

    expect(intArray[0]).toEqual(1);
    expect(intArray[1]).toEqual(2);
    expect(intArray[2]).toEqual(3);
    expect(intArray[3]).toEqual(4);
  });
});

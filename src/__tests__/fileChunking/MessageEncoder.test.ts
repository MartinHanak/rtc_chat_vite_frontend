import { FileMessage, FileMessageType } from "../../types/file";
import MessageEncoder from "../../util/fileChunking/MessageEncoder";

jest.mock("../../util/config.ts", () => ({
  BACKEND_URL: "test",
  FILE_TEXT_DELIMITER: "|||",
  FILE_ID_LENGTH: 11,
}));

describe("MessageEncoder", () => {
  it("should encode metadata for a file message", () => {
    const message: FileMessage = {
      type: FileMessageType.METADATA,
      data: {
        size: 1024,
        totalChunks: 10,
        fileId: "file123abcd",
        name: "example.txt",
        type: "text/plain",
      },
    };

    const encodedMetadata = MessageEncoder.encodeFileMessage(message);

    expect(encodedMetadata).toBeDefined();
  });

  it("should encode file chunk for a file message", () => {
    const message: FileMessage = {
      type: FileMessageType.CHUNK,
      data: {
        chunkOrder: 1,
        totalChunks: 3,
        fileId: "file123abcd",
        buffer: new Uint8Array([1, 2, 3, 4]).buffer,
      },
    };

    const encodedChunk = MessageEncoder.encodeFileMessage(message);

    expect(encodedChunk).toBeDefined();
  });

  it("should have a correct encoded message length", () => {
    const message: FileMessage = {
      type: FileMessageType.CHUNK,
      data: {
        chunkOrder: 1,
        totalChunks: 3,
        fileId: "file123abcd",
        buffer: new Uint8Array([1, 2, 3, 4]).buffer,
      },
    };

    const encodedChunk = MessageEncoder.encodeFileMessage(message);

    expect(encodedChunk.byteLength).toEqual(
      1 + 4 * 2 + 11 + message.data.buffer.byteLength
    );

    expect(message.data.buffer.byteLength).toEqual(4);
  });

  it("should encode correct values inside the buffer", () => {
    const message: FileMessage = {
      type: FileMessageType.CHUNK,
      data: {
        chunkOrder: 1,
        totalChunks: 3,
        fileId: "file123abcd",
        buffer: new Uint8Array([1, 2, 3, 4]).buffer,
      },
    };

    const encodedChunk = MessageEncoder.encodeFileMessage(message);

    const intArray = new Uint8Array(encodedChunk, 1 + 4 * 2 + 11);

    expect(intArray[0]).toEqual(1);
    expect(intArray[1]).toEqual(2);
    expect(intArray[2]).toEqual(3);
    expect(intArray[3]).toEqual(4);
  });

  it("should encode metadata about total number of chunks", () => {
    const message: FileMessage = {
      type: FileMessageType.METADATA,
      data: {
        size: 1024,
        totalChunks: 10,
        fileId: "file123abcd",
        name: "example.txt",
        type: "text/plain",
      },
    };

    const encodedMetadata = MessageEncoder.encodeFileMessage(message);

    const view = new DataView(encodedMetadata);

    const total = view.getFloat32(1 + 4);

    expect(total).toEqual(10);
  });
});

import { FileMessage, FileMessageType } from "../../types/file";
import MessageEncoder from "../../util/fileChunking/MessageEncoder";
import MessageDecoder from "../../util/fileChunking/MessageDecoder";

jest.mock("../../util/config.ts", () => ({
  BACKEND_URL: "test",
  FILE_TEXT_DELIMITER: "|||",
  FILE_ID_LENGTH: 11,
}));

describe("MessageDecoder", () => {
  it("should decode metadata for a file message", () => {
    const message: FileMessage = {
      type: FileMessageType.METADATA,
      data: {
        size: 1024,
        fileId: "file123abcd", // must be 11 char long
        name: "example.txt",
        type: "text/plain",
      },
    };

    const encodedMetadata = MessageEncoder.encodeFileMessage(message);

    const decoded = MessageDecoder.decodeFileMessage(encodedMetadata);

    expect(decoded).toEqual(message);

    if (decoded.type !== FileMessageType.METADATA) {
      throw Error("wrong type");
    }
    expect(decoded.type).toEqual(0);
    expect(decoded.data.fileId).toEqual("file123abcd");
    expect(decoded.data.name).toEqual("example.txt");
    expect(decoded.data.type).toEqual("text/plain");
    expect(decoded.data.size).toEqual(1024);
  });

  it("should provide correct length for the decoded buffer", () => {
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

    const decoded = MessageDecoder.decodeFileMessage(encodedChunk);
    if (decoded.type !== FileMessageType.CHUNK) throw new Error("Wrong type");

    expect(decoded.data.buffer.byteLength).toEqual(
      message.data.buffer.byteLength
    );
  });

  it("should provide correct decoded fileId", () => {
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

    const decoded = MessageDecoder.decodeFileMessage(encodedChunk);
    if (decoded.type !== FileMessageType.CHUNK) throw new Error("Wrong type");

    expect(decoded.data.fileId).toEqual(message.data.fileId);
  });

  it("should provide correct decoded chunk order and total chunk number", () => {
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

    const decoded = MessageDecoder.decodeFileMessage(encodedChunk);
    if (decoded.type !== FileMessageType.CHUNK) throw new Error("Wrong type");

    expect(decoded.data.chunkOrder).toEqual(message.data.chunkOrder);
    expect(decoded.data.totalChunks).toEqual(message.data.totalChunks);
  });

  it("should hold correct values in the decoded buffer", () => {
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

    const decoded = MessageDecoder.decodeFileMessage(encodedChunk);
    if (decoded.type !== FileMessageType.CHUNK) throw new Error("Wrong type");

    const intArray = new Uint8Array(decoded.data.buffer);
    expect(intArray.length).toEqual(4);
    expect(intArray[0]).toEqual(1);
    expect(intArray[1]).toEqual(2);
    expect(intArray[2]).toEqual(3);
    expect(intArray[3]).toEqual(4);
  });

  it("should decode file chunk for a file message", () => {
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

    const decoded = MessageDecoder.decodeFileMessage(encodedChunk);

    expect(decoded).toEqual(message);
    expect(decoded.data).toEqual(message.data);
  });
});

import { FileMessage, FileMessageType } from "../../types/file";
import MessageEncoder from "../../util/fileChunking/MessageEncoder";
import MessageDecoder from "../../util/fileChunking/MessageDecoder";

jest.mock("../../util/config.ts", () => ({
  BACKEND_URL: "test",
  FILE_TEXT_DELIMITER: "|||",
  FILE_ID_LENGTH: 11,
}));

describe("MessageDecoder", () => {
  let metadataMessage: FileMessage;
  let chunkMessage: FileMessage;
  let decodedMetadata: FileMessage;
  let decodedChunk: FileMessage;

  beforeAll(() => {
    metadataMessage = {
      type: FileMessageType.METADATA,
      data: {
        size: 1024,
        totalChunks: 10,
        fileId: "file123abcd", // must be 11 char long
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

    const encodedMetadata = MessageEncoder.encodeFileMessage(metadataMessage);
    decodedMetadata = MessageDecoder.decodeFileMessage(encodedMetadata);

    const encodedChunk = MessageEncoder.encodeFileMessage(chunkMessage);
    decodedChunk = MessageDecoder.decodeFileMessage(encodedChunk);
  });

  it("should decode metadata for a file message", () => {
    expect(decodedMetadata).toEqual(metadataMessage);

    if (decodedMetadata.type !== FileMessageType.METADATA) {
      throw Error("wrong type");
    }
    expect(decodedMetadata.type).toEqual(0);
    expect(decodedMetadata.data.fileId).toEqual("file123abcd");
    expect(decodedMetadata.data.name).toEqual("example.txt");
    expect(decodedMetadata.data.type).toEqual("text/plain");
    expect(decodedMetadata.data.size).toEqual(1024);
  });

  it("should provide correct length for the decoded buffer", () => {
    if (
      decodedChunk.type !== FileMessageType.CHUNK ||
      chunkMessage.type !== FileMessageType.CHUNK
    )
      throw new Error("Wrong type");

    expect(decodedChunk.data.buffer.byteLength).toEqual(
      chunkMessage.data.buffer.byteLength
    );
  });

  it("should provide correct decoded fileId", () => {
    if (decodedChunk.type !== FileMessageType.CHUNK)
      throw new Error("Wrong type");

    expect(decodedChunk.data.fileId).toEqual(chunkMessage.data.fileId);
  });

  it("should provide correct decoded chunk order and total chunk number", () => {
    if (
      decodedChunk.type !== FileMessageType.CHUNK ||
      chunkMessage.type !== FileMessageType.CHUNK
    )
      throw new Error("Wrong type");

    expect(decodedChunk.data.chunkOrder).toEqual(chunkMessage.data.chunkOrder);
    expect(decodedChunk.data.totalChunks).toEqual(
      chunkMessage.data.totalChunks
    );
  });

  it("should hold correct values in the decoded buffer", () => {
    if (decodedChunk.type !== FileMessageType.CHUNK)
      throw new Error("Wrong type");

    const intArray = new Uint8Array(decodedChunk.data.buffer);
    expect(intArray.length).toEqual(4);
    expect(intArray[0]).toEqual(1);
    expect(intArray[1]).toEqual(2);
    expect(intArray[2]).toEqual(3);
    expect(intArray[3]).toEqual(4);
  });

  it("should decode file chunk for a file message", () => {
    expect(decodedChunk).toEqual(chunkMessage);
    expect(decodedChunk.data).toEqual(chunkMessage.data);
  });

  it("should decode metadata information about total number of chunks", () => {
    expect(decodedMetadata.data.totalChunks).toEqual(10);
  });
});

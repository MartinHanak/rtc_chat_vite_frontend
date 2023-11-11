import { beforeAll, describe, expect, it, vi } from "vitest";
import FileSender from "../../util/fileChunking/FileSender";

describe("FileSender", () => {
  const sender = new FileSender();

  const mockedDataChannel = {
    send: vi.fn().mockImplementation((buffer: ArrayBuffer) => {
      const event = new Event("bufferedamountlow");
      window.dispatchEvent(event);
      return buffer;
    }),
    onbufferedamountlow: vi.fn().mockImplementation(() => {
      return () => {
        console.log("HELLO WORLD");
      };
    }),
    readyState: "open",
  };

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sender.updateDataChannels([mockedDataChannel] as RTCDataChannel[]);
    window.addEventListener("bufferedamountlow", () => {
      console.log(JSON.stringify(mockedDataChannel.onbufferedamountlow));
      mockedDataChannel.onbufferedamountlow();
    });
  });

  it("sends provided file data", () => {
    const file = new File(["tesfdst"], "test.txt");

    sender.sendFiles([file]);

    expect(mockedDataChannel.send).toBeCalledTimes(1);
  });
});

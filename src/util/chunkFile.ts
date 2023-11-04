type FileMessageMetadata = {
  name: string;
  type: string;
  size: number;
};

export async function sendChunkedFile(
  dataChannel: RTCDataChannel,
  file: File,
  name: string,
  type: string
) {
  const dataToSend = await file.arrayBuffer();

  const metadata: FileMessageMetadata = {
    name,
    type,
    size: dataToSend.byteLength,
  };

  dataChannel.send(JSON.stringify(metadata));

  const chunkSize = 16 * 1024; // 16 kB
  let offset = 0;

  function sendNextChunk() {
    if (offset < dataToSend.byteLength) {
      const chunk = dataToSend.slice(offset, offset + chunkSize);
      dataChannel.send(chunk);
      offset += chunkSize;
      dataChannel.onbufferedamountlow = sendNextChunk;
    } else {
      dataChannel.onbufferedamountlow = null;
    }
  }

  sendNextChunk();
}

export async function receiveChunkedFile(dataChannel: RTCDataChannel) {
  const metadata: FileMessageMetadata = null;

  const filePromise = new Promise((resolve, reject) => {
    dataChannel.addEventListener("message", readMetadata);

    function readMetadata() {
      // TODO: finish this

      dataChannel.removeEventListener("message", readMetadata);
      dataChannel.addEventListener("message", readChunkedFile);
    }

    function readChunkedFile() {
      // TODO: finish this

      dataChannel.removeEventListener("message", readChunkedFile);
    }
  });

  return filePromise;
}

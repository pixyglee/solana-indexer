import { SubscribeRequest, SubscribeUpdate } from "@triton-one/yellowstone-grpc";
import { handleData } from "../handlers/dataHandler.js";

export async function sendSubscribeRequest(stream: any, request: SubscribeRequest) {
  return new Promise<void>((resolve, reject) => {
    stream.write(request, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function handleStreamEvents(stream: any) {
  const streamClosed = new Promise<void>((resolve, reject) => {
    stream.on("error", (error: any) => { reject(error); stream.end(); });
    stream.on("end", () => resolve());
    stream.on("close", () => resolve());
  });

  stream.on("data", async (data: SubscribeUpdate) => {
    await handleData(data);
  });

  await streamClosed;
}

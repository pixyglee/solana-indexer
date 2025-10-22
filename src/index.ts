import { createGrpcClient } from "./grpc/client.js";
import { createSubscribeRequest } from "./grpc/request.js";
import { sendSubscribeRequest, handleStreamEvents } from "./grpc/stream.js";

async function main() {
  const client = createGrpcClient();
  const stream = await client.subscribe();
  const request = createSubscribeRequest();

  try {
    await sendSubscribeRequest(stream, request);
    console.log("✅ Subscribed to PayPal USD accounts, slots, and transactions.");
    await handleStreamEvents(stream);
  } catch (error) {
    console.error("Subscription error:", error);
    stream.end();
  }
}

main();

import Client from "@triton-one/yellowstone-grpc";

export function createGrpcClient() {
  return new Client(
    "https://solana-rpc.parafi.tech:10443",
    undefined,
    undefined
  );
}

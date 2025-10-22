import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";

export function createSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {
      "specific_accounts": {
        account: ["2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo"], // PayPal USD mint
        owner: [],
        filters: []
      }
    },
    slots: {},
    transactions: {},
    transactionsStatus: {},
    entry: {},
    blocks: {},
    blocksMeta: {},
    commitment: CommitmentLevel.CONFIRMED,
    accountsDataSlice: [],
  };
}

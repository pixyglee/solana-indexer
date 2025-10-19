import Client from "@triton-one/yellowstone-grpc";
const client = new Client("https://solana-rpc.parafi.tech:10443", undefined, undefined);
function handleUpdate(data) {
    console.dir(data, { depth: 6 });
}
// https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L74
async function main() {
    const stream = await client.subscribe();
    // create promise to wait for stream to close
    const streamClosed = new Promise((resolve, reject) => {
        stream.on("error", (error) => {
            reject(error);
            stream.end();
        });
        stream.on("end", () => resolve());
        stream.on("close", () => resolve());
    });
    stream.on("data", handleUpdate);
    // https://github.com/rpcpool/yellowstone-grpc/blob/29d62ca5d4aeaed1e2846fa9028fa785f73ea261/examples/typescript/src/client.ts#L119
    const subscribeRequest = {
        accounts: {},
        slots: {},
        transactions: {
            group: {
                // eg: listen to vote transactions
                accountInclude: ["Vote111111111111111111111111111111111111111"],
                accountExclude: [],
                accountRequired: [],
            },
        },
        transactionsStatus: {},
        blocks: {},
        blocksMeta: {},
        entry: {},
        accountsDataSlice: [],
    };
    // subscribe
    await new Promise((resolve, reject) => {
        stream.write(subscribeRequest, (error) => {
            if (error)
                reject(error);
            else
                resolve();
        });
    }).catch((reason) => {
        console.error(reason);
        throw reason;
    });
    await streamClosed;
}
main();

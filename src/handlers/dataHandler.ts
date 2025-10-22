import { SubscribeUpdate } from "@triton-one/yellowstone-grpc";
import chalk from "chalk";
import { PrismaClient } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

const client = new PrismaClient();

function printSectionHeader(title: string) {
  console.log(chalk.bold.yellow("\n========== " + title + " ==========\n"));
}

export async function handleData(data: SubscribeUpdate): Promise<void> {
  // Account Updates
  if (data.account) {
    const acc = data.account.account;
    if (acc) {
      const pubkeyBase58 = new PublicKey(acc.pubkey).toBase58();
      const ownerBase58 = new PublicKey(acc.owner).toBase58();

      printSectionHeader("📦 Account Update");
      console.log(`${chalk.cyan("Pubkey:")} ${pubkeyBase58}`);
      console.log(`${chalk.cyan("Owner:")} ${ownerBase58}`);
      console.log(`${chalk.cyan("Slot:")} ${data.account.slot}`);
      console.log(`${chalk.cyan("Lamports:")} ${acc.lamports}`);

      await client.account.upsert({
        where: { pubkey: pubkeyBase58 },
        update: {
          owner: ownerBase58,
          lamports: BigInt(acc.lamports),
          slot: BigInt(data.account.slot),
        },
        create: {
          pubkey: pubkeyBase58,
          owner: ownerBase58,
          lamports: BigInt(acc.lamports),
          slot: BigInt(data.account.slot),
        },
      });
    }
  }

  // Transaction Updates
  if (data.transaction) {
    const txn = data.transaction.transaction;
    if (txn?.signature) {
      const signatureStr = bs58.encode(txn.signature);

      printSectionHeader("🔁 Transaction Update");
      console.log(`${chalk.magenta("Signature:")} ${signatureStr}`);
      console.log(`${chalk.magenta("Slot:")} ${data.transaction.slot}`);
      console.log(`${chalk.magenta("Success:")} ${txn.meta?.err === null}`);

      await client.transaction.upsert({
        where: { signature: signatureStr },
        update: {
          slot: BigInt(data.transaction.slot),
          success: txn.meta?.err === null,
        },
        create: {
          signature: signatureStr,
          slot: BigInt(data.transaction.slot),
          success: txn.meta?.err === null,
        },
      });
    }
  }

  // Slot Updates
  if (data.slot) {
    const slotData = data.slot;
    printSectionHeader("⏱️ Slot Update");
    console.table({ slot: slotData.slot, parent: slotData.parent });

    await client.slot.upsert({
      where: { slot: BigInt(slotData.slot) },
      update: {
        parent: slotData.parent ? BigInt(slotData.parent) : null,
      },
      create: {
        slot: BigInt(slotData.slot),
        parent: slotData.parent ? BigInt(slotData.parent) : null,
      },
    });
  }
}

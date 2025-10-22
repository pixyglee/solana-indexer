-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "slot" BIGINT NOT NULL,
    "parent" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "slot" BIGINT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "pubkey" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "lamports" BIGINT NOT NULL,
    "slot" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slot_slot_key" ON "Slot"("slot");

-- CreateIndex
CREATE INDEX "Slot_slot_idx" ON "Slot"("slot");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "Transaction"("signature");

-- CreateIndex
CREATE INDEX "Transaction_slot_idx" ON "Transaction"("slot");

-- CreateIndex
CREATE INDEX "Transaction_success_idx" ON "Transaction"("success");

-- CreateIndex
CREATE UNIQUE INDEX "Account_pubkey_key" ON "Account"("pubkey");

-- CreateIndex
CREATE INDEX "Account_owner_idx" ON "Account"("owner");

-- CreateIndex
CREATE INDEX "Account_slot_idx" ON "Account"("slot");

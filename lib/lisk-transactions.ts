import { apiClient } from "@liskhq/lisk-client";
import { codec } from "@liskhq/lisk-codec";
/* import { signTransaction } from "@liskhq/lisk-cryptography"; // TODO: Implement proper signing */
import { connectLiskWallet } from "./lisk-client";

const LISK_RPC_URL = "https://rpc.sepolia-api.lisk.com";

const transactionSchema = {
  $id: "lisk/transaction",
  type: "object",
  required: ["module", "command", "params", "nonce", "fee", "senderPublicKey"],
  properties: {
    module: { dataType: "string", fieldNumber: 1 },
    command: { dataType: "string", fieldNumber: 2 },
    params: { type: "object", fieldNumber: 3 },
    nonce: { dataType: "uint64", fieldNumber: 4 },
    fee: { dataType: "uint64", fieldNumber: 5 },
    senderPublicKey: { dataType: "bytes", fieldNumber: 6 },
  },
};

export async function transferLisk(recipientAddress: string, amount: string): Promise<any> {
  try {
    const client = await apiClient.createWSClient(LISK_RPC_URL);

    // Get connected wallet
    const senderAddress = await connectLiskWallet();
    if (!senderAddress?.address || !senderAddress?.publicKey) {
      throw new Error("No Lisk wallet connected");
    }

    // Get nonce
    const accountInfo = await client.invoke("auth_getAccount", { address: senderAddress.address });
    const nonce = BigInt(accountInfo.nonce) + BigInt(1);

    // Convert amount
    const amountBigInt = BigInt(amount);

    // Create transaction object
    const transaction = {
      module: "token",
      command: "transfer",
      params: {
        recipientAddress,
        amount: amountBigInt.toString(),
        data: "Ticket Purchase",
      },
      nonce,
      fee: BigInt("1000000"),
      senderPublicKey: senderAddress.publicKey,
    };

    // Serialize transaction
    const serializedTransaction = codec.encode(transactionSchema, transaction);

    // TODO: Sign the transaction with the sender's private key
    // const signedTransaction = signData(serializedTransaction, senderAddress.publicKey, "replace_with_private_key");
    // const transactionBytes = signedTransaction.toString("hex");

    // For now, broadcast unsigned transaction (likely to fail)
    const transactionBytes = serializedTransaction.toString("hex");

    // Broadcast transaction
    const result = await client.invoke("transaction_postTransaction", { transaction: transactionBytes });
    client.disconnect();

    return { success: true, transactionId: result.transactionId };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Lisk transfer error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

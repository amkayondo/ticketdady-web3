import { apiClient } from "@liskhq/lisk-client";

const LISK_RPC_URL = "https://rpc.sepolia-api.lisk.com";

export const connectLiskWallet = async () => {
  try {
    const client = await apiClient.createWSClient(LISK_RPC_URL);

    // Fetch connected wallet details
    const accountInfo = await client.invoke("auth_getAccount", { address: "your-lisk-wallet-address" });

    return { address: accountInfo?.address, publicKey: accountInfo?.publicKey };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Wallet connection failed:", errorMessage);
    return { error: errorMessage };
  }
};

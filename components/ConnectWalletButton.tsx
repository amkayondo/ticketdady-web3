"use client";

import React, { useState } from "react";
import { connectLiskWallet } from "../lib/lisk-client";

const ConnectWalletButton: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      const wallet = await connectLiskWallet();
      if (wallet && typeof wallet.address === "string") {
        setAccount(wallet.address);
      } else {
        throw new Error("Wallet connection failed.");
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      alert(`Connection failed: ${error.message}`);
    }
  };

  return (
    <button onClick={handleConnectWallet} className="wallet-connect-btn">
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;

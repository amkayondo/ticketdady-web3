"use client";

import React, { useState } from "react";
import { connectWallet } from "../lib/wallet-client"; // Ensure wallet-client.ts handles multiple wallets

const WalletConnectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnectWallet = async (walletType: string) => {
    try {
      const wallet = await connectWallet(walletType); // Connect based on selected wallet type

      if (wallet?.address) {
        setAccount(wallet.address);
        onClose(); // Close modal on success
      } else {
        throw new Error("Wallet connection failed. No address found.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert(`Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return isOpen ? (
    <div className="wallet-modal">
      <div className="wallet-modal-content">
        <h3>Select a Wallet</h3>
        <button onClick={() => handleConnectWallet("metamask")}>MetaMask</button>
        <button onClick={() => handleConnectWallet("walletconnect")}>WalletConnect</button>
        <button onClick={() => handleConnectWallet("lisk")}>Lisk Wallet</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default WalletConnectModal;

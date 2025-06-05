import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./dialog";
import { Button } from "./button";
import { useToast } from "./use-toast";

declare global {
  interface Window {
    ethereum?: any;
    lisk?: any;
  }
}

type WalletType = "MetaMask" | "WalletConnect" | "Lisk";

/**
 * WalletConnector component provides a modal dialog to connect to various crypto wallets.
 * Supports MetaMask, WalletConnect, and Lisk Wallet.
 * Handles connection errors and displays the connected account.
 * Uses Radix UI Dialog for modal presentation.
 */
export function WalletConnector({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    // Check if MetaMask is already connected on mount
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  /**
   * Connect to MetaMask wallet using ethers.js
   */
  const connectMetaMask = async () => {
    setError(null);
    setConnecting(true);
    try {
      if (!window.ethereum) {
        setError("MetaMask extension not found. Please install MetaMask and try again.");
        setConnecting(false);
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      toast.toast({ title: "Connected", description: `Connected to MetaMask: ${address}` });
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to connect MetaMask");
    } finally {
      setConnecting(false);
    }
  };

  /**
   * Connect to WalletConnect wallet using WalletConnectProvider and ethers.js
   */
  const connectWalletConnect = async () => {
    setError(null);
    setConnecting(true);
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/your-infura-project-id", // Replace with your Infura project ID or other RPC URL
        },
      });
      await provider.enable();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      toast.toast({ title: "Connected", description: `Connected to WalletConnect: ${address}` });
      onOpenChange(false);
      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
      // Subscribe to disconnect
      provider.on("disconnect", () => {
        setAccount(null);
      });
    } catch (err: any) {
      setError(err.message || "Failed to connect WalletConnect");
    } finally {
      setConnecting(false);
    }
  };

  /**
   * Connect to Lisk Wallet using window.lisk API
   */
  const connectLisk = async () => {
    setError(null);
    setConnecting(true);
    try {
      if (!window.lisk) {
        throw new Error("Lisk Wallet is not installed");
      }
      // Example Lisk Wallet connection logic
      const isConnected = await window.lisk.enable();
      if (!isConnected) {
        throw new Error("User denied Lisk Wallet connection");
      }
      const accounts = await window.lisk.getAccounts();
      if (accounts.length === 0) {
        throw new Error("No Lisk accounts found");
      }
      setAccount(accounts[0].address);
      toast.toast({ title: "Connected", description: `Connected to Lisk Wallet: ${accounts[0].address}` });
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to connect Lisk Wallet");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>Select a wallet provider to connect</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 my-4">
          <Button onClick={connectMetaMask} disabled={connecting}>
            Connect MetaMask
          </Button>
          <Button onClick={connectWalletConnect} disabled={connecting}>
            Connect WalletConnect
          </Button>
          <Button onClick={connectLisk} disabled={connecting}>
            Connect Lisk Wallet
          </Button>
        </div>
        {account && (
          <div className="text-center text-sm text-green-600">
            Connected account: <code>{account}</code>
          </div>
        )}
        {error && (
          <div className="text-center text-sm text-red-600">
            Error: {error}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

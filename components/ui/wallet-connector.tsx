import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
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

interface WalletConnectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletConnected?: (address: string) => void;
}

/**
 * WalletConnector component provides a modal dialog to connect to various crypto wallets.
 * Supports MetaMask, WalletConnect, and Lisk Wallet.
 * Handles connection errors and displays the connected account.
 * Uses Radix UI Dialog for modal presentation.
 */
export function WalletConnector({ open, onOpenChange, onWalletConnected }: WalletConnectorProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if MetaMask is already connected on mount
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  /**
   * Connect to MetaMask wallet using ethers.js v6
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
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create provider with ethers v6 syntax
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      toast({
        title: "Connected",
        description: `Connected to MetaMask: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      onWalletConnected?.(address);
    } catch (err: any) {
      setError(err.message || "Failed to connect MetaMask");
    } finally {
      setConnecting(false);
    }
  };

  /**
   * Connect to WalletConnect wallet using WalletConnectProvider and ethers.js v6
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
      
      // Create ethers provider with v6 syntax
      const ethersProvider = new BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      toast({
        title: "Connected",
        description: `Connected to WalletConnect: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      onWalletConnected?.(address);
      
      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts: string[]) => {
        const newAddress = accounts[0] || null;
        setAccount(newAddress);
        if (newAddress) {
          onWalletConnected?.(newAddress);
        }
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
      const address = accounts[0].address;
      setAccount(address);
      toast({
        title: "Connected",
        description: `Connected to Lisk Wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      onWalletConnected?.(address);
    } catch (err: any) {
      setError(err.message || "Failed to connect Lisk Wallet");
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            {account ? "Wallet connected successfully" : "Select a wallet provider to connect"}
          </DialogDescription>
        </DialogHeader>
        
        {!account ? (
          <div className="flex flex-col space-y-3 my-4">
            <Button 
              onClick={connectMetaMask} 
              disabled={connecting}
              className="h-12 justify-start"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span>MetaMask</span>
              </div>
            </Button>
            
            <Button 
              onClick={connectWalletConnect} 
              disabled={connecting}
              className="h-12 justify-start"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span>WalletConnect</span>
              </div>
            </Button>
            
            <Button 
              onClick={connectLisk} 
              disabled={connecting}
              className="h-12 justify-start"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span>Lisk Wallet</span>
              </div>
            </Button>
          </div>
        ) : (
          <div className="my-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-green-800 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="font-medium">Wallet Connected</span>
                </div>
                <code className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  {account.slice(0, 8)}...{account.slice(-6)}
                </code>
              </div>
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}
        
        {connecting && (
          <div className="flex items-center justify-center py-4">
            <svg className="animate-spin h-5 w-5 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-muted-foreground">Connecting to wallet...</span>
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-800 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" x2="9" y1="9" y2="15"/>
                <line x1="9" x2="15" y1="9" y2="15"/>
              </svg>
              <span className="font-medium">Connection Error</span>
            </div>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              {account ? "Done" : "Cancel"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

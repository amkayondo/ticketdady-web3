"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnector } from "@/components/ui/wallet-connector";
import { Event } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [userTicketsForEvent, setUserTicketsForEvent] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  
  const { id, title, description, date, time, location, price, image, organizer, tickets } = event;
  const ticketPercentage = Math.round((tickets.sold / tickets.total) * 100);
  const ticketsRemaining = tickets.total - tickets.sold;

  // Check for existing wallet connection and count user tickets for this event
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        // Check localStorage for saved wallet
        const savedWallet = localStorage.getItem('connectedWallet');
        if (savedWallet) {
          console.log("Found saved wallet:", savedWallet);
          setConnectedWallet(savedWallet);
          
          // Count tickets for this event and wallet
          countUserTicketsForEvent(savedWallet);
          return;
        }

        // Also check if MetaMask is still connected
        if (window.ethereum && window.ethereum.selectedAddress) {
          console.log("Found MetaMask connection:", window.ethereum.selectedAddress);
          setConnectedWallet(window.ethereum.selectedAddress);
          localStorage.setItem('connectedWallet', window.ethereum.selectedAddress);
          
          // Count tickets for this event and wallet
          countUserTicketsForEvent(window.ethereum.selectedAddress);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkExistingConnection();
  }, [id]);

  // Count how many tickets the user has bought for this specific event
  const countUserTicketsForEvent = (walletAddress: string) => {
    try {
      let count = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ticket-')) {
          const ticketData = localStorage.getItem(key);
          if (ticketData) {
            const ticket = JSON.parse(ticketData);
            if (ticket.eventId === id && ticket.walletAddress === walletAddress) {
              count++;
            }
          }
        }
      }
      setUserTicketsForEvent(count);
      console.log(`User has ${count} tickets for event ${id}`);
    } catch (error) {
      console.error("Error counting user tickets:", error);
    }
  };
  
  const handleWalletConnected = (walletAddress: string) => {
    console.log("Wallet connected:", walletAddress);
    setConnectedWallet(walletAddress);
    setWalletModalOpen(false);
    
    // Save wallet connection to localStorage
    localStorage.setItem('connectedWallet', walletAddress);
    
    // Count tickets for this event
    countUserTicketsForEvent(walletAddress);
    
    toast({
      title: "Wallet Connected",
      description: `Connected to ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
    });
  };

  const handleDisconnectWallet = () => {
    setConnectedWallet(null);
    setUserTicketsForEvent(0);
    localStorage.removeItem('connectedWallet');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const handlePurchaseTicket = async () => {
    console.log("Purchase button clicked"); // Debug log
    
    if (!connectedWallet) {
      console.log("No wallet connected, opening modal"); // Debug log
      setWalletModalOpen(true);
      return;
    }

    console.log("Starting purchase process for wallet:", connectedWallet); // Debug log
    setIsPurchasing(true);
    
    try {
      // Simulate purchase process
      console.log("Simulating purchase..."); // Debug log
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate ticket ID
      const ticketId = `${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log("Generated ticket ID:", ticketId); // Debug log
      
      // Store purchase data in localStorage (in real app, this would be on blockchain/database)
      const purchaseData = {
        ticketId,
        eventId: id,
        eventTitle: title,
        eventDate: date,
        eventTime: time,
        eventLocation: location,
        purchasePrice: price,
        walletAddress: connectedWallet,
        purchaseDate: new Date().toISOString(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock hash
      };
      
      console.log("Purchase data:", purchaseData); // Debug log
      
      try {
        localStorage.setItem(`ticket-${ticketId}`, JSON.stringify(purchaseData));
        console.log("Stored in localStorage successfully"); // Debug log
        
        // Update ticket count for this event
        setUserTicketsForEvent(prev => prev + 1);
      } catch (storageError) {
        console.error("LocalStorage error:", storageError);
        throw new Error("Failed to save ticket data");
      }
      
      toast({
        title: "Purchase Successful!",
        description: "Your ticket has been purchased successfully.",
      });
      
      // Small delay before redirect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("Redirecting to:", `/tickets/${ticketId}`); // Debug log
      
      // Redirect to ticket page
      router.push(`/tickets/${ticketId}`);
      
    } catch (error) {
      console.error("Purchase error:", error); // Debug log
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return (
    <div className="space-y-10 pb-20">
      {/* Hero section with large image and gradient overlay */}
      <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-black">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-8 w-8 ring-2 ring-white/30">
                <AvatarImage src={organizer.avatar} alt={organizer.name} />
                <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-white/80">Presented by {organizer.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">{title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/90">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>{date} • {time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/90">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="md:col-span-2 space-y-8">
          {/* About this event */}
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">About this event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>
          
          {/* Event details */}
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Event details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Date and time</h3>
                  <p className="text-muted-foreground mt-1">{date}</p>
                  <p className="text-muted-foreground">{time}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground mt-1">{location}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-1.5-1.5-1.5-3 0-.9-.5-2-1.5-2Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Organizer</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={organizer.avatar} alt={organizer.name} />
                      <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{organizer.name}</p>
                      <p className="text-xs text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="sticky top-24 border-none shadow-lg overflow-hidden">
            <div className="bg-primary/5 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-bold">{price}</h2>
                <div className="text-sm font-medium text-primary">
                  {ticketsRemaining} remaining
                </div>
              </div>
              
              <div className="mt-4 mb-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{tickets.sold} sold</span>
                  <span>{tickets.total} total</span>
                </div>
                <div className="w-full bg-secondary/80 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${ticketPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            
            <CardContent className="p-6 space-y-6">
              {connectedWallet && (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        <span className="text-sm font-medium">Wallet Connected</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDisconnectWallet}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-6 px-2"
                      >
                        Disconnect
                      </Button>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                    </p>
                  </div>
                  
                  {userTicketsForEvent > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3"/>
                          <path d="M2 9v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9"/>
                          <path d="M2 9l8.5 6a2 2 0 0 0 3 0L22 9"/>
                          <path d="m7 6 5-5 5 5"/>
                        </svg>
                        <span className="text-sm font-medium">
                          You own {userTicketsForEvent} ticket{userTicketsForEvent > 1 ? 's' : ''} for this event
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-6 px-2 mt-1"
                      >
                        <Link href="/tickets">View My Tickets</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Ticket price</span>
                  <span className="font-medium">{price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span className="font-medium">0.01 ETH</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{parseFloat(price.replace(' ETH', '')) + 0.01} ETH</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0">
              <div className="w-full space-y-4">
                <Button 
                  type="button"
                  className="w-full" 
                  size="lg" 
                  onClick={handlePurchaseTicket}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : connectedWallet ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                        <path d="M20 12v4H6a2 2 0 0 0-2 2c0 1.1.9 2 2 2h12v-4" />
                      </svg>
                      Buy Ticket
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                        <path d="M14 10h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
                        <path d="M6 10h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6" />
                        <path d="M6 10V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v4.01" />
                      </svg>
                      Connect Wallet
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {connectedWallet ? 
                    "Secure checkout with Ethereum • Instant delivery" : 
                    "Connect your wallet to purchase tickets"
                  }
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <WalletConnector 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen}
        onWalletConnected={handleWalletConnected}
      />
    </div>
  );
}

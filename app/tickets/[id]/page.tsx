"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { useToast } from "@/components/ui/use-toast";

interface TicketData {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  purchasePrice: string;
  walletAddress: string;
  purchaseDate: string;
  transactionHash: string;
}

interface TicketPageProps {
  params: {
    id: string;
  };
}

export default function TicketPage({ params }: TicketPageProps) {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const ticketId = params.id;

  useEffect(() => {
    // Load ticket data from localStorage
    const loadTicketData = () => {
      try {
        const storedData = localStorage.getItem(`ticket-${ticketId}`);
        if (storedData) {
          const data = JSON.parse(storedData) as TicketData;
          setTicketData(data);
        } else {
          toast({
            title: "Ticket Not Found",
            description: "The ticket you're looking for doesn't exist or has expired.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error Loading Ticket",
          description: "Failed to load ticket data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadTicketData();
  }, [ticketId, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-muted-foreground">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" x2="9" y1="9" y2="15"/>
              <line x1="9" x2="15" y1="9" y2="15"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Ticket Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The ticket you're looking for doesn't exist or may have been transferred.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/events" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Events
          </Link>
        </div>

        {/* Success Banner */}
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Purchase Successful!</h2>
              <p className="text-green-700">Your ticket has been successfully purchased and verified on the blockchain.</p>
            </div>
          </div>
        </div>

        {/* Main Ticket Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            {/* Ticket Header */}
            <div className="relative bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  VERIFIED
                </Badge>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3"/>
                    <path d="M2 9v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9"/>
                    <path d="M2 9l8.5 6a2 2 0 0 0 3 0L22 9"/>
                    <path d="m7 6 5-5 5 5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{ticketData.eventTitle}</h1>
                  <p className="text-white/80">Digital Ticket • Web3 Verified</p>
                </div>
              </div>
            </div>

            {/* Ticket Content */}
            <CardContent className="p-8 space-y-8">
              {/* Event Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Event Date</label>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                      <p className="font-medium">{ticketData.eventDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Event Time</label>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <p className="font-medium">{ticketData.eventTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p className="font-medium">{ticketData.eventLocation}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Purchase Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Purchase Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Purchase Price</label>
                    <p className="font-bold text-primary text-lg">{ticketData.purchasePrice}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
                    <p className="font-medium">{formatDate(ticketData.purchaseDate)}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Blockchain Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Blockchain Verification</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Ticket ID</label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <code className="flex-1 text-sm font-mono">{ticketData.ticketId}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ticketData.ticketId, "Ticket ID")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <code className="flex-1 text-sm font-mono">{ticketData.walletAddress}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ticketData.walletAddress, "Wallet Address")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2 2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <code className="flex-1 text-sm font-mono">{ticketData.transactionHash}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ticketData.transactionHash, "Transaction Hash")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2 2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* QR Code Simulation */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Entry QR Code</h3>
                <div className="inline-block p-8 bg-white border-4 border-primary/20 rounded-2xl">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="5" height="5" x="3" y="3" rx="1"/>
                      <rect width="5" height="5" x="16" y="3" rx="1"/>
                      <rect width="5" height="5" x="3" y="16" rx="1"/>
                      <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                      <path d="M21 21v.01"/>
                      <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                      <path d="M3 12h.01"/>
                      <path d="M12 3h.01"/>
                      <path d="M12 16v.01"/>
                      <path d="M16 12h1"/>
                      <path d="M21 12v.01"/>
                      <path d="M12 21v-1"/>
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Show this QR code at the venue entrance for verification
                </p>
              </div>
            </CardContent>

            {/* Footer Actions */}
            <CardFooter className="p-8 bg-muted/30 space-y-4">
              <div className="w-full space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href={`/events/${ticketData.eventId}`}>
                    View Event Details
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/events">Browse More Events</Link>
                  </Button>
                  <Button variant="outline" onClick={() => window.print()}>
                    Print Ticket
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Important Notice */}
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Notice</p>
              <p>
                This is your verified digital ticket. Keep this page bookmarked or save the ticket ID. 
                You'll need to show this QR code and your connected wallet address for entry verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
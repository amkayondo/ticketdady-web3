import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/lib/data";

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const { title, description, date, time, location, price, image, organizer, tickets } = event;
  const ticketPercentage = Math.round((tickets.sold / tickets.total) * 100);
  const ticketsRemaining = tickets.total - tickets.sold;
  
  return (
    <div className="space-y-10 pb-20">
      {/* Hero section with large image and gradient overlay */}
      <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-black">
        <PlaceholderImage 
          className="w-full h-full object-cover opacity-90"
          label={title}
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
                  <span>{price.replace('ETH', '')}1 ETH</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0">
              <div className="w-full space-y-4">
                <Button className="w-full" size="lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M20 12v4H6a2 2 0 0 0-2 2c0 1.1.9 2 2 2h12v-4" />
                  </svg>
                  Buy with Web3
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout with Ethereum • Instant delivery
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

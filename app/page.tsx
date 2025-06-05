import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventList } from "@/components/events/event-list";
import { events } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { CalendarIcon, MapPinIcon, TrendingUpIcon, TicketIcon, UsersIcon } from "lucide-react";

export default function Home() {
  // Get the first 3 events for the featured section
  const featuredEvents = events.slice(0, 3);
  // Get upcoming events (next 2)
  const upcomingEvents = events.slice(3, 5);
  
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl mx-auto max-w-7xl -mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center py-20 px-6 text-white">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 transition-colors">
            Web3 Ticketing Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover and Attend <br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Amazing Events</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-white/90">
            Buy tickets with cryptocurrency and join the future of event ticketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full h-12 px-8 font-medium">
              <Link href="/events">Browse Events</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white font-medium">
              <Link href="#featured">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Event background" 
            fill 
            className="object-cover opacity-30"
            priority
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <UsersIcon className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-muted-foreground">Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <TicketIcon className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-3xl font-bold">50K+</h3>
                <p className="text-muted-foreground">Tickets Sold</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <CalendarIcon className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-muted-foreground">Events</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <TrendingUpIcon className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-3xl font-bold">$2M+</h3>
                <p className="text-muted-foreground">Volume</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="featured" className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <p className="text-muted-foreground">Discover our most popular events</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
        <EventList events={featuredEvents} />
      </section>

      {/* Upcoming Events + Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <TabsList className="h-11 p-1">
              <TabsTrigger 
                value="upcoming"
                className="px-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger 
                value="categories"
                className="px-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Categories
              </TabsTrigger>
            </TabsList>
          </div>
          
          <Separator className="mb-8" />
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <PlaceholderImage 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary/90">{event.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <Button asChild size="sm" className="rounded-full">
                      <Link href={`/events/${event.id}`}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Music", icon: "🎵", count: 24, color: "bg-blue-500" },
                { name: "Tech", icon: "💻", count: 18, color: "bg-purple-500" },
                { name: "Art", icon: "🎨", count: 12, color: "bg-pink-500" },
                { name: "Sports", icon: "⚽", count: 15, color: "bg-green-500" },
                { name: "Food", icon: "🍔", count: 9, color: "bg-yellow-500" },
                { name: "Business", icon: "💼", count: 7, color: "bg-red-500" },
              ].map(category => (
                <Card key={category.name} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                  <Link href={`/events?category=${category.name.toLowerCase()}`} className="block">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <CardTitle>{category.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="bg-muted/50">{category.count}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`h-1 w-full rounded-full ${category.color} opacity-70 group-hover:opacity-100 transition-opacity`}></div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to discover, purchase, and attend events using Web3 technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative overflow-visible">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg">
              1
            </div>
            <CardHeader className="pt-8 pb-2 text-center">
              <CardTitle>Browse Events</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Discover exciting events happening around you with our intuitive search and filter options</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative overflow-visible">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg">
              2
            </div>
            <CardHeader className="pt-8 pb-2 text-center">
              <CardTitle>Buy with Web3</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Purchase tickets securely using cryptocurrency with transparent pricing and no hidden fees</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative overflow-visible">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg">
              3
            </div>
            <CardHeader className="pt-8 pb-2 text-center">
              <CardTitle>Attend Event</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Show your digital ticket at the venue and enjoy the event with a seamless entry experience</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/events">Find Your Next Event</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

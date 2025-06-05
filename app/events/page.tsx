import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventList } from "@/components/events/event-list";
import { Separator } from "@/components/ui/separator";
import { events, Event as EventType } from "@/lib/data";

export default function EventsPage() {
  // Categories could be dynamically generated from the events data
  const categories = [
    { id: "all", name: "All Events" },
    { id: "music", name: "Music" },
    { id: "tech", name: "Tech" },
    { id: "art", name: "Art" }
  ];
  
  // Filter events by category for the demo
  const filteredEvents: Record<string, EventType[]> = {
    all: events,
    music: events.filter(event => event.category === "music"),
    tech: events.filter(event => event.category === "tech"),
    art: events.filter(event => event.category === "art")
  };
  
  return (
    <div className="space-y-12 pb-20">
      {/* Hero section */}
      <div className="py-8 px-6 -mx-4 sm:-mx-6 md:-mx-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Discover Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse and purchase tickets for upcoming events using Web3 technology
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <TabsList className="h-11 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>Showing events from all locations</span>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0 pt-2">
              {(filteredEvents[category.id] || []).length > 0 ? (
                <EventList events={filteredEvents[category.id] || []} />
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No events found</h3>
                  <p className="text-muted-foreground">There are no {category.name.toLowerCase()} events scheduled at the moment.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

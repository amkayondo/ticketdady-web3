import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventDetail } from "@/components/events/event-detail";
import { events } from "@/lib/data";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  // Ensure params.id is properly awaited for Next.js App Router
  const id = params.id;
  const event = events.find((event) => event.id === id);
  
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <p className="text-muted-foreground">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to events
        </Link>
      </div>
      
      <EventDetail event={event} />
    </div>
  );
}

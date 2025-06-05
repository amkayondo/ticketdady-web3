import { Event } from "@/lib/data";
import { EventCard } from "./event-card";

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

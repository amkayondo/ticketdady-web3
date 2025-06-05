"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Event } from "@/lib/data";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { id, title, date, time, location, price, image, organizer, tickets } = event;
  const ticketPercentage = Math.round((tickets.sold / tickets.total) * 100);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg group relative">
      <Link href={`/events/${id}`} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View event</span>
      </Link>

      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <PlaceholderImage
            className="w-full h-full object-cover"
            alt={title}
          />
        </AspectRatio>
        <div className="absolute top-3 right-3 z-20">
          <Button variant="secondary" size="sm" className="rounded-full h-8 px-3 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white" asChild>
            <Link href={`/events/${id}`}>
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                View
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4 relative z-20 pointer-events-none">
        <div>
          <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              {date} • {time}
            </span>
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1.5 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </div>
        </div>

        <div className="relative pt-2">
          <div className="text-xs text-muted-foreground mb-1.5 flex justify-between">
            <span>{tickets.sold} sold</span>
            <span>{tickets.total - tickets.sold} remaining</span>
          </div>
          <div className="w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full"
              style={{ width: `${ticketPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>

      <Separator className="w-[calc(100%-2rem)] mx-auto" />

      <CardFooter className="p-5 flex justify-between items-center relative z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border">
            <AvatarImage src={organizer.avatar} alt={organizer.name} />
            <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">{organizer.name}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-primary">{price}</div>
        </div>
      </CardFooter>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </Card>
  );
}

"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from '@/lib/utils'
import { Loader2 } from "lucide-react";

interface PlaceholderImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackClassName?: string;
}

export function PlaceholderImage({
  alt,
  src,
  className,
  fallbackClassName,
  ...props
}: PlaceholderImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Render the placeholder SVG when there's no src or there's an error
  const renderPlaceholder = () => (
    <svg
      className="h-full w-full text-muted-foreground/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )

  return (
    <div className={cn("relative overflow-hidden bg-muted/10 rounded-md", className)}>
      {/* Show loading spinner or placeholder based on state */}
      {(isLoading || error || !src) && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            fallbackClassName
          )}
        >
          {isLoading && src && !error ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
          ) : (
            renderPlaceholder()
          )}
        </div>
      )}

      {/* Only render the Image component if we have a src */}
      {src && (
        <Image
          alt={alt || "Image"}
          src={src}
          className={cn("object-cover transition-opacity duration-300", {
            "opacity-0": isLoading || error,
          })}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          {...props}
        />
      )}
    </div>
  )
}

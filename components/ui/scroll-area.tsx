import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLProps<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  type?: "auto" | "always" | "scroll" | "hover"
}

const CustomScrollArea = React.forwardRef<
  HTMLDivElement,
  ScrollAreaProps
>(({ className, children, type = "hover", ...props }, ref) => {
  // Use a memo to calculate the classname to prevent recreation on each render
  const containerClassName = React.useMemo(() => {
    return cn("relative overflow-auto", className);
  }, [className]);

  // Create a ref for the scrollable viewport
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  
  return (
    <div
      ref={ref}
      className={containerClassName}
      data-type={type}
      {...props}
    >
      <div 
        ref={viewportRef} 
        className="h-full w-full rounded-[inherit] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900"
      >
        {children}
      </div>
    </div>
  );
});

CustomScrollArea.displayName = "ScrollArea";

interface ScrollBarProps {
  orientation?: "vertical" | "horizontal"
  className?: string
}

const CustomScrollBar = React.forwardRef<
  HTMLDivElement,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => {
  // Use memo to prevent unnecessary re-renders of the className
  const scrollbarClassName = React.useMemo(() => {
    return cn(
      "flex touch-none select-none",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    );
  }, [orientation, className]);

  return (
    <div
      ref={ref}
      className={scrollbarClassName}
      data-orientation={orientation}
      {...props}
    >
      <div className="relative flex-1 rounded-full bg-gray-400/40" />
    </div>
  );
});

CustomScrollBar.displayName = "ScrollBar";

// Export with the original names to maintain compatibility
export { CustomScrollArea as ScrollArea, CustomScrollBar as ScrollBar }

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  className?: string
  min?: number
  max?: number
  step?: number
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  disabled?: boolean
}

const CustomSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({
    className,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onValueChange,
    onValueCommit,
    disabled = false,
    ...props
  }, ref) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = React.useState<number[]>(
      value || defaultValue || [0]
    );
    const [isDragging, setIsDragging] = React.useState(false);

    // Use controlled or uncontrolled values
    const currentValue = value !== undefined ? value : internalValue;
    
    // Calculate percentage for thumb position
    const percentage = React.useMemo(() => {
      const val = currentValue[0];
      return ((val - min) / (max - min)) * 100;
    }, [currentValue, min, max]);

    // Update value based on click position
    const updateValue = React.useCallback(
      (clientX: number) => {
        if (disabled || !trackRef.current) return;

        const { left, width } = trackRef.current.getBoundingClientRect();
        const newPercentage = Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
        const newValue = min + (newPercentage / 100) * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));
        
        const newValues = [clampedValue];
        
        if (value === undefined) {
          setInternalValue(newValues);
        }
        
        onValueChange?.(newValues);
      },
      [disabled, min, max, step, onValueChange, value]
    );

    // Handle mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      updateValue(e.clientX);
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onValueCommit?.(currentValue);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    // Add and remove event listeners
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, handleMouseMove]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-5 w-full touch-none select-none items-center",
          className,
          disabled && "opacity-50 cursor-not-allowed"
        )}
        {...props}
      >
        <div 
          ref={trackRef}
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
          onMouseDown={handleMouseDown}
        >
          <div 
            className="absolute h-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          ref={thumbRef}
          className={cn(
            "absolute block h-4 w-4 rounded-full border border-primary/50 bg-background shadow",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "transition-transform",
            isDragging && "scale-110",
            disabled && "pointer-events-none"
          )}
          style={{
            left: `calc(${percentage}% - 0.5rem)`,
          }}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue[0]}
          tabIndex={disabled ? -1 : 0}
        />
      </div>
    );
  }
);

CustomSlider.displayName = "Slider";

export { CustomSlider as Slider };


import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "~/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jardim-green-mid/40 focus-visible:ring-offset-2 focus-visible:ring-offset-jardim-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          variant === "default" &&
            "bg-jardim-green-dark text-white shadow hover:bg-jardim-green-mid",
          variant === "ghost" &&
            "text-jardim-green-dark hover:bg-jardim-cream hover:text-jardim-green-mid",
          variant === "outline" &&
            "border border-jardim-border bg-jardim-white hover:bg-jardim-cream",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-9 w-9 rounded-xl",
          className,
        )}
        ref={ref}
        {...(asChild ? {} : { type })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

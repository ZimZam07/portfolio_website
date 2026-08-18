import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconButtonProps = Omit<ButtonProps, "variant" | "size" | "children"> & {
  icon: React.ReactNode;
  /** Accessible name — required since the button has no visible text. */
  label: string;
  size?: "sm" | "md";
};

/**
 * Ghost icon-only action (social links, palette trigger). `label` is
 * mandatory and doubles as both the `aria-label` and the hover/focus
 * tooltip — see docs/05-component-library.md Primitives.
 */
export const IconButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(function IconButton({ icon, label, size = "md", ...props }, ref) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            ref={ref}
            variant="tertiary"
            size={size === "sm" ? "icon-sm" : "icon"}
            aria-label={label}
            {...props}
          />
        }
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
});

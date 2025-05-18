// src/components/ui/badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800",
                className
            )}
            {...props}
        />
    );
}

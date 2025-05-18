import * as React from "react";
import {cn} from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export {Card};

"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Charity {
    id: number;
    name: string;
    tagline: string;
    shortDescription: string;
    imageUrl: string;
}

interface Props {
    items: Charity[];
}

export function FeaturedCharityCarousel({ items }: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!api) return;

        api.scrollTo(0); // Start from the beginning

        intervalRef.current = setInterval(() => {
            const current = api.selectedScrollSnap();
            const next = (current + 1) % items.length;
            api.scrollTo(next);
        }, 5000); // Auto-scroll every 5s

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [api, items.length]);

    return (
        <Carousel
            setApi={setApi}
            className="w-full overflow-hidden relative"
            opts={{ loop: true }}
        >
            <CarouselContent>
                {items.map((charity) => (
                    <CarouselItem key={charity.id} className="relative h-[500px]">
                        <Image
                            src={charity.imageUrl}
                            alt={charity.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
                            <h2 className="text-3xl font-bold">{charity.name}</h2>
                            <p className="text-sm italic">{charity.tagline}</p>
                            <p className="mt-2 text-sm">{charity.shortDescription}</p>
                            <Button variant="secondary" className="mt-4 w-fit">
                                Learn More
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
    );
}

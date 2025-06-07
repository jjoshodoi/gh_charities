import Image from "next/image";
import { Card } from "@/components/ui/card";

interface CharityCardProps {
    id: string | number;
    name: string;
    tagline: string;
    shortDescription: string;
    imageUrl?: string;
}

export default function CharityCard({
                                                name,
                                                tagline,
                                                shortDescription,
                                                imageUrl,
                                            }: CharityCardProps) {
    return (
        <Card className="p-4 shadow hover:shadow-lg transition rounded-xl overflow-hidden">
            {imageUrl && (
                <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            )}
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{tagline}</p>
            <p className="mt-2 text-sm text-zinc-700">{shortDescription}</p>
        </Card>
    );
}

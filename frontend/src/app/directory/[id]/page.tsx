'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VolunteerDialog } from "@/components/modals/VolunteerDialog.modal";

const mockCharities = [
    {
        id: 1,
        name: "Ghanaian Youth Empowerment",
        tagline: "Inspiring the next generation",
        description: "Providing mentorship and education for underprivileged youth.",
        imageUrl: "/images/youth-empowerment.png",
        hasVolunteer: true,
        hasDonate: true,
        events: [
            { title: "Youth Career Workshop", date: "2025-07-10" },
            { title: "Mentor Training Seminar", date: "2025-08-02" },
        ],
    },
    {
        id: 2,
        name: "Accra Food Bank UK",
        tagline: "No one should go hungry",
        description: "Supporting food drives and meal programs across Ghana.",
        imageUrl: "/images/accra-food-bank-uk.png",
        hasVolunteer: false,
        hasDonate: true,
        events: [
            { title: "Food Drive at Peckham", date: "2025-07-18" },
            { title: "Community Cooking Day", date: "2025-08-11" },
        ],
    },
    {
        id: 3,
        name: "Ashanti Health Foundation",
        tagline: "Accessible healthcare for all",
        description: "Building clinics and providing medical aid in rural areas.",
        imageUrl: "/images/ashanti-health-foundation.png",
        hasVolunteer: true,
        hasDonate: false,
        events: [],
    },
];

export default function CharityDetailPage() {
    const { id } = useParams();
    const charity = mockCharities.find((c) => c.id === parseInt(id));

    if (!charity) {
        return <p className="text-center mt-20 text-destructive">Charity not found.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto py-12 space-y-12">
            {/* Banner */}
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md">
                <Image src={charity.imageUrl} alt={charity.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 p-6 text-white flex flex-col justify-end">
                    <h1 className="text-4xl font-bold">{charity.name}</h1>
                    <p className="text-lg italic">{charity.tagline}</p>
                </div>
            </div>

            {/* Description & Actions */}
            <div className="space-y-4 px-4 md:px-0">
                <p className="text-lg leading-relaxed">{charity.description}</p>

                <div className="flex gap-4">
                    {charity.hasVolunteer && <VolunteerDialog />}
                    {charity.hasDonate && <Button className="bg-accent text-white hover:bg-accent/90">Donate</Button>}
                </div>
            </div>

            {/* Events */}
            <div className="space-y-4 px-4 md:px-0">
                <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                {charity.events.length > 0 ? (
                    <ul className="space-y-2">
                        {charity.events.map((event, index) => (
                            <li key={index} className="border rounded p-4 shadow-sm">
                                <h3 className="font-semibold text-primary">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.date}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No upcoming events listed.</p>
                )}
            </div>
        </div>
    );
}

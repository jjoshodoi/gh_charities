'use client';

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import  CharityCard from "@/components/cards/Charity.card";

const charities = [
    {
        id: 1,
        name: "Ghanaian Youth Empowerment",
        tagline: "Inspiring the next generation",
        shortDescription: "Providing mentorship and education for underprivileged youth.",
        imageUrl: "/images/youth-empowerment.png",
        hasVolunteer: true,
        hasDonate: true,
        events: [
            { title: "Youth Career Workshop", date: "2025-07-10" },
            { title: "Mentor Training Seminar", date: "2025-08-02" },
        ]
    },
    {
        id: 2,
        name: "Accra Food Bank UK",
        tagline: "No one should go hungry",
        shortDescription: "Supporting food drives and meal programs across Ghana.",
        imageUrl: "/images/accra-food-bank-uk.png",
        hasVolunteer: false,
        hasDonate: true,
        events: [
            { title: "Youth Career Workshop", date: "2025-07-10" },
            { title: "Mentor Training Seminar", date: "2025-08-02" },
        ]
    },
    {
        id: 3,
        name: "Ashanti Health Foundation",
        tagline: "Accessible healthcare for all",
        shortDescription: "Building clinics and providing medical aid in rural areas.",
        imageUrl: "/images/ashanti-health-foundation.png",
        hasVolunteer: true,
        hasDonate: false,
        events: []
    },
    {
        id: 4,
        name: "Kumasi Literacy Project",
        tagline: "Reading for change",
        shortDescription: "Helping rural children access reading material and school resources.",
        imageUrl: "/images/kumasi-literacy.png",
        hasVolunteer: true,
        hasDonate: false,
        events: []
    },
];

export default function DirectoryPage() {
    const [search, setSearch] = useState("");

    const filtered = charities.filter((charity) =>
        charity.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-3xl font-bold">Charity Directory</h1>
                <Input
                    type="search"
                    placeholder="Search for a charity"
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                    <p className="text-muted-foreground col-span-full">No charities match your search.</p>
                ) : (
                    filtered.map((charity) => (
                        <Link href={`/directory/${charity.id}`} key={charity.id}>
                            <CharityCard {...charity} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

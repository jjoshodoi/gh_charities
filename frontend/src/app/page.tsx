'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const charities = [
    {
        id: 1,
        name: 'Ghanaian Youth Empowerment',
        tagline: 'Inspiring the next generation',
        shortDescription: 'Providing mentorship and education for underprivileged youth.',
    },
    {
        id: 2,
        name: 'Accra Food Bank UK',
        tagline: 'No one should go hungry',
        shortDescription: 'Supporting food drives and meal programs across Ghana.',
    },
    {
        id: 3,
        name: 'Ashanti Health Foundation',
        tagline: 'Accessible healthcare for all',
        shortDescription: 'Building clinics and providing medical aid in rural areas.',
    },
];

export default function Home() {
    const router = useRouter();

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-gradient-to-r from-primary to-green-700 text-white rounded-xl shadow-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ghana Charities Directory</h1>
                <p className="text-lg max-w-2xl mx-auto text-white/90">
                    Discover, support, and connect with Ghanaian-led charities across the UK.
                </p>
                <Button
                    className="mt-8 px-6 py-4 text-base font-semibold shadow-lg"
                    onClick={() => router.push("/directory")}
                >
                    Browse Charities
                </Button>
            </section>

            {/* Featured Charities */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-center">🌟 Featured Charities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {charities.map((charity) => (
                        <div
                            key={charity.id}
                            className="rounded-2xl border border-zinc-200 bg-white text-zinc-800 p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <h3 className="text-xl font-semibold mb-1">{charity.name}</h3>
                            <p className="text-sm text-zinc-500 italic mb-2">{charity.tagline}</p>
                            <p className="text-sm leading-relaxed">{charity.shortDescription}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

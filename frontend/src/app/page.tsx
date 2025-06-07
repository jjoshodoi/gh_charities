"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FeaturedCharityCarousel } from "@/components/carousels/FeaturedCharity.carousel";

const featuredCharities = [
    {
        id: 1,
        name: "Ghanaian Youth Empowerment",
        tagline: "Inspiring the next generation",
        shortDescription: "Providing mentorship and education for underprivileged youth.",
        imageUrl: "/images/youth-empowerment.png",
    },
    {
        id: 2,
        name: "Accra Food Bank UK",
        tagline: "No one should go hungry",
        shortDescription: "Supporting food drives and meal programs across Ghana.",
        imageUrl: "/images/accra-food-bank-uk.png",

    },
    {
        id: 3,
        name: "Ashanti Health Foundation",
        tagline: "Accessible healthcare for all",
        shortDescription: "Building clinics and providing medical aid in rural areas.",
        imageUrl: "/images/ashanti-health-foundation.png",
    }
];
export default function Home() {
    const router = useRouter();

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-primary text-white rounded-xl shadow-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Ghana Charities Directory
                </h1>
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

            {/* Featured Charities Carousel */}
            <section>
                <section className="-mx-6 md:-mx-12 lg:-mx-20">
                    <FeaturedCharityCarousel items={featuredCharities}/>
                </section>
            </section>
        </div>
    );
}

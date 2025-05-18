import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mockCharity = {
    name: "Ghana Health Foundation",
    logo: "/assets/logos/logo1.jpg",
    mission: "Providing essential healthcare services in underserved Ghanaian communities.",
    about:
        "Ghana Health Foundation is committed to delivering quality healthcare and resources to rural areas in Ghana. We partner with local clinics and UK-based donors to improve lives through sustainable health initiatives.",
    contact: {
        email: "info@ghanahealth.org",
        phone: "+44 1234 567890",
        website: "https://ghanahealth.org",
    },
    events: [
        {
            title: "Free Medical Outreach in Kumasi",
            date: "20 July 2024",
            description: "Join us in Kumasi for a health screening event open to the public.",
        },
    ],
};

export default function CharityDetailPage() {
    const { query } = useRouter();
    const [charity, setCharity] = useState<typeof mockCharity | null>(null);

    useEffect(() => {
        // Simulate API call using ID
        if (query.id) {
            setCharity(mockCharity); // Replace with actual fetch logic later
        }
    }, [query.id]);

    if (!charity) return <p className="p-6 text-center">Loading charity details...</p>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <header className="text-center space-y-3">
                <Image src={charity.logo} alt={`${charity.name} Logo`} width={96} height={96} className="mx-auto rounded" />
                <h1 className="text-3xl font-bold">{charity.name}</h1>
                <p className="italic text-gray-600">{charity.mission}</p>
            </header>

            <Card className="p-6 space-y-3">
                <h2 className="text-2xl font-semibold">About Us</h2>
                <p>{charity.about}</p>
            </Card>

            <Card className="p-6 space-y-3">
                <h2 className="text-2xl font-semibold">Contact</h2>
                <ul className="space-y-2">
                    <li><strong>Email:</strong> <a href={`mailto:${charity.contact.email}`} className="text-blue-600 underline">{charity.contact.email}</a></li>
                    <li><strong>Phone:</strong> {charity.contact.phone}</li>
                    <li><strong>Website:</strong> <a href={charity.contact.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{charity.contact.website}</a></li>
                </ul>
            </Card>

            <div className="flex gap-4">
                <Button>Donate to This Charity</Button>
                <Button variant="outline">Volunteer</Button>
            </div>

            {charity.events.length > 0 && (
                <Card className="p-6 space-y-3">
                    <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                    {charity.events.map((event, i) => (
                        <div key={i} className="border rounded p-4">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="italic">{event.date}</p>
                            <p className="mt-1">{event.description}</p>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
}

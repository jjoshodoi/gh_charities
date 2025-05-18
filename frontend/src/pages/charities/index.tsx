import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

const categories = ["All", "Health", "Education", "Youth", "Community"];

const mockCharities = [
    {
        id: "ghana-health",
        name: "Ghana Health Foundation",
        logo: "/assets/logos/logo1.jpg",
        category: "Health",
        shortDescription: "Delivering healthcare services to underserved communities in Ghana.",
    },
    {
        id: "education-for-ghana",
        name: "Education for Ghana",
        logo: "/assets/logos/logo2.jpg",
        category: "Education",
        shortDescription: "Improving access to education for children in rural Ghana.",
    },
];

export default function CharityDirectoryPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filtered = mockCharities.filter((charity) => {
        const matchSearch =
            charity.name.toLowerCase().includes(search.toLowerCase()) ||
            charity.shortDescription.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === "All" || charity.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">UK-Ghana Charity Directory</h1>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Input
                    placeholder="Search charities..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2"
                />
                <Select onValueChange={setSelectedCategory} defaultValue="All">
                    <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length ? (
                    filtered.map((charity) => (
                        <Card key={charity.id} className="p-4 space-y-3">
                            <Image src={charity.logo} alt={`${charity.name} logo`} width={80} height={80} className="rounded mx-auto" />
                            <h2 className="text-xl font-semibold text-center">{charity.name}</h2>
                            <p className="text-sm text-center">{charity.shortDescription}</p>
                            <div className="text-center">
                                <Link href={`/charities/${charity.id}`}>
                                    <Button className="mt-2">View Profile</Button>
                                </Link>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="col-span-full text-center text-muted-foreground">No charities found.</p>
                )}
            </div>
        </div>
    );
}

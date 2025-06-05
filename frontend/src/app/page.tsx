import {Button} from '@/components/ui/button'
import LandingHeader from '@/components/LandingHeader'
import AppLayout from "@/components/layouts/AppLayout";

export default function Home() {
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
    ]

    return (
        <AppLayout>
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
                <LandingHeader/>

                <p className="text-center text-muted-foreground text-lg mt-4 max-w-2xl">
                    Discover, support, and connect with Ghanaian-led charities across the UK.
                </p>

                <Button className="mt-6 text-base px-6 py-4 shadow-md hover:shadow-lg transition-all">
                    Browse Charities
                </Button>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {charities.map((charity) => (
                        <div
                            key={charity.id}
                            className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-semibold">{charity.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{charity.tagline}</p>
                            <p className="text-sm">{charity.shortDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>


    )
}

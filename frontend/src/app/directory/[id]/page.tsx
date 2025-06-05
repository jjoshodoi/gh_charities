import { notFound } from 'next/navigation';

export default function CharityDetailPage({ params }: { params: { id: string } }) {
    const charityId = params.id;

    if (!charityId) return notFound();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Charity Name #{charityId}</h1>
            <p className="text-muted-foreground">Detailed info and updates about the charity...</p>
        </div>
    );
}

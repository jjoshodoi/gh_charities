import { CharityCard } from '@/components/CharityCard';

const sampleCharities = [
    { id: 1, name: 'Ghanaian Youth Empowerment', tagline: 'Inspiring the next generation' },
    { id: 2, name: 'Accra Food Bank UK', tagline: 'No one should go hungry' }
];

export default function DirectoryPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Charity Directory</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {sampleCharities.map(charity => (
                    <CharityCard key={charity.id} {...charity} />
                ))}
            </div>
        </div>
    );
}

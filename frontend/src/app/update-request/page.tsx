import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function UpdateRequestPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-4">Request an Update</h1>
            <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Describe the update you want to request..." />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

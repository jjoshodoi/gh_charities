import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-6">
            <Card className="p-6 w-full max-w-md text-center space-y-2">
                <h1 className="text-2xl font-bold">🎉 Styled Components Ready</h1>
                <Button>Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
            </Card>
        </div>
    );
}

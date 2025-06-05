import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharityCardProps {
    name: string;
    tagline: string;
}

export const CharityCard = ({ name, tagline }: CharityCardProps) => {
    return (
        <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{tagline}</p>
            </CardContent>
        </Card>
    );
};

import {useEffect, useState} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

interface UpdateRequest {
    id: string;
    charityId: string;
    type: string;
    payload: Record<string, any>;
}

export default function AdminDashboardPage() {
    const [requests, setRequests] = useState<UpdateRequest[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/update-requests")
            .then((res) => res.json())
            .then(setRequests)
            .catch((err) => console.error("Failed to fetch update requests", err));
    }, []);

    const handleAction = async (id: string, action: "approve" | "reject") => {
        await fetch(`http://localhost:3000/update-requests/${id}/${action}`, {
            method: "PATCH",
        });
        setRequests((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <h2 className="text-xl mb-6 text-muted-foreground">Pending Charity Update Requests</h2>

            <div className="space-y-4">
                {requests.length === 0 && <p className="text-muted-foreground">No pending requests.</p>}

                {requests.map((r) => (
                    <Card key={r.id} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Charity ID: <span className="font-mono">{r.charityId}</span>
                            </h3>
                            <Badge>{r.type}</Badge>
                        </div>

                        <pre className="bg-gray-100 rounded p-3 text-sm overflow-x-auto">
              {JSON.stringify(r.payload, null, 2)}
            </pre>

                        <div className="mt-4 flex gap-3">
                            <Button onClick={() => handleAction(r.id, "approve")}>Approve</Button>
                            <Button variant="destructive" onClick={() => handleAction(r.id, "reject")}>Reject</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

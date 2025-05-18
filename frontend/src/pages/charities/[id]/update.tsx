import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CharityUpdateFormPage() {
    const router = useRouter();
    const { id } = router.query;

    const [form, setForm] = useState({
        charityId: id ?? "",
        type: "info",
        payload: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/update-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Request failed");

            alert("✅ Update request submitted!");
            setForm({ charityId: id ?? "", type: "info", payload: "" });
            router.push("/charities");
        } catch (err) {
            alert("❌ Failed to submit update.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Request an Update</h1>

            <Card className="p-4 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Charity ID"
                        value={form.charityId}
                        onChange={(e) => setForm({ ...form, charityId: e.target.value })}
                        required
                    />

                    <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Update type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info">Charity Info Update</SelectItem>
                            <SelectItem value="event">Event Update</SelectItem>
                        </SelectContent>
                    </Select>

                    <Textarea
                        placeholder="Paste the updated info or event JSON here"
                        rows={6}
                        value={form.payload}
                        onChange={(e) => setForm({ ...form, payload: e.target.value })}
                        required
                    />

                    <Button type="submit" className="w-full">Submit Update</Button>
                </form>
            </Card>
        </div>
    );
}

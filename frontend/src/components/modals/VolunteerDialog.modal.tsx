'use client';

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

export function VolunteerDialog() {
    const [name, setName] = useState("");
    const [interest, setInterest] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            // toast.success("Thank you for volunteering! We'll be in touch.");
            setName("");
            setInterest("");
            setSubmitting(false);
        }, 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Become a Volunteer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Become a Volunteer</DialogTitle>
                    <DialogDescription>
                        Fill out the form and we’ll follow up with details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Why do you want to volunteer?"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        rows={4}
                        required
                    />
                    <Button type="submit" disabled={submitting} className="w-full">
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

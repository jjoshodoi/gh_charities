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
import { toast } from "sonner";

export function VolunteerDialog() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            toast.success("Thank you for volunteering!");
            setOpen(false); // close modal
            setSubmitting(false);
            setForm({ name: "", message: "" }); // reset form
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Become a Volunteer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white border border-zinc-200 rounded-xl shadow-2xl px-6 py-6 space-y-4">
                <DialogHeader>
                    <DialogTitle>Become a Volunteer</DialogTitle>
                    <DialogDescription>Fill out this short form and we’ll follow up.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Your Name"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                    />
                    <Textarea
                        placeholder="Why do you want to volunteer?"
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
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

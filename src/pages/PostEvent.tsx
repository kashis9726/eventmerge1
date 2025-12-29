import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar, MapPin, IndianRupee, Users, Briefcase, ChevronLeft, Clock } from "lucide-react";

import { useEventContext } from "@/context/EventContext";

const PostEvent = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { addEvent } = useEventContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);

        // Simulate API delay
        setTimeout(() => {
            addEvent({
                title: formData.get("title") as string || "Untitled Event",
                organizer: "Current Organizer", // In a real app, from auth context
                category: formData.get("category") as string || "General",
                date: formData.get("date") as string || "TBD",
                duration: "8 hours", // Defaulting for now
                location: formData.get("location") as string || "TBD",
                payment: `₹${formData.get("budget")}/day`,
                requirements: (formData.get("description") as string)?.split('\n') || ["General Labor"],
                benefits: ["Meals (Standard)"],
                verified: true,
                urgent: true,
                highPay: Number(formData.get("budget")) > 3000,
            });

            setLoading(false);
            toast({
                title: "Event Posted Successfully!",
                description: "Your event is now live and workers can apply. (Verified via Context)",
            });
            navigate("/dashboard/organizer");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <Link
                            to="/dashboard/organizer"
                            className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Dashboard
                        </Link>

                        <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-foreground mb-2">Event Details</h1>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Event Title *</Label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                            <Input name="title" id="title" placeholder="e.g., Corporate Annual Conference 2025" className="pl-10" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Provide details about your event..."
                                            className="min-h-[120px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select name="category" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="marriage">Marriage / Wedding</SelectItem>
                                                <SelectItem value="corporate">Corporate Event</SelectItem>
                                                <SelectItem value="festival">Festival / Cultural</SelectItem>
                                                <SelectItem value="college">College Fest</SelectItem>
                                                <SelectItem value="government">Government Event</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Event Date *</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                                <Input name="date" id="date" type="date" placeholder="dd-mm-yyyy" className="pl-10" required />
                                                <Calendar className="absolute right-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="time">Event Time</Label>
                                            <div className="relative">
                                                <Clock className="absolute right-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                                                <Input name="time" id="time" type="time" placeholder="--:--" className="pr-10" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                            <Input name="location" id="location" placeholder="e.g., Mumbai Convention Center" className="pl-10" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Total Budget</Label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                            <Input name="budget" id="budget" placeholder="e.g., 50000" type="number" className="pl-10" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/dashboard/organizer")}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                        {loading ? "Posting..." : "Post Event"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PostEvent;

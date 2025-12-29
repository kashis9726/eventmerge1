import React, { createContext, useContext, useState, useEffect } from "react";

export interface Job {
    id: number;
    title: string;
    organizer: string;
    category: string;
    date: string;
    duration: string;
    location: string;
    payment: string;
    requirements: string[];
    benefits: string[];
    verified: boolean;
    urgent: boolean;
    highPay: boolean;
    description?: string;
}

interface EventContextType {
    events: Job[];
    addEvent: (event: Omit<Job, "id">) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventContext must be used within an EventProvider");
    }
    return context;
};

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<Job[]>([
        {
            id: 1,
            title: "Server Staff Needed",
            organizer: "Grand Events Co.",
            category: "Corporate",
            date: "2024-01-15",
            duration: "8 hours",
            location: "Mumbai Convention Center",
            payment: "₹2,000/day",
            requirements: ["Experience preferred", "Formal attire"],
            benefits: ["Meals included", "Transport"],
            verified: true,
            urgent: true,
            highPay: false,
            description: "Need experienced servers for a high-profile corporate dinner."
        },
        {
            id: 2,
            title: "Event Coordinator",
            organizer: "Sharma Family",
            category: "Marriage",
            date: "2024-01-20",
            duration: "2 days",
            location: "Grand Hyatt, Delhi",
            payment: "₹5,000/day",
            requirements: ["5+ events experience", "Good communication"],
            benefits: ["Accommodation", "Meals", "Bonus"],
            verified: true,
            urgent: false,
            highPay: true,
            description: "Coordinating guest movements and rituals for a large wedding."
        },
        {
            id: 3,
            title: "Setup Crew",
            organizer: "TechStart Inc.",
            category: "Corporate",
            date: "2024-01-25",
            duration: "6 hours",
            location: "BKC, Mumbai",
            payment: "₹1,500/day",
            requirements: ["Physical fitness", "Punctuality"],
            benefits: ["Lunch provided"],
            verified: false,
            urgent: true,
            highPay: false,
        },
        {
            id: 4,
            title: "Stage Manager",
            organizer: "Cultural Society",
            category: "Festival",
            date: "2024-02-01",
            duration: "3 days",
            location: "Nehru Stadium, Mumbai",
            payment: "₹4,000/day",
            requirements: ["Stage management exp", "Leadership skills"],
            benefits: ["Meals", "Certificate", "Networking"],
            verified: true,
            urgent: false,
            highPay: true,
        },
    ]);

    const addEvent = (newEvent: Omit<Job, "id">) => {
        const eventWithId = { ...newEvent, id: events.length + 1 };
        setEvents((prev) => [eventWithId, ...prev]);
    };

    return (
        <EventContext.Provider value={{ events, addEvent }}>
            {children}
        </EventContext.Provider>
    );
};

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
            title: "PSI Exam - Biometric Volunteers Needed",
            organizer: "Gujarat Police Recruitment Board",
            category: "Government",
            date: "2024-02-15",
            duration: "Full day (8 hours)",
            location: "Gujarat University, Ahmedabad",
            payment: "₹1,500/day",
            requirements: ["College students preferred", "Basic computer knowledge", "Punctuality", "Valid ID proof"],
            benefits: ["Certificate of participation", "Lunch provided", "Transport allowance", "Experience certificate"],
            verified: true,
            urgent: true,
            highPay: false,
            description: "Urgent requirement for biometric volunteers for PSI (Police Sub-Inspector) examination. College students are preferred. Help in fingerprint scanning and photo capture of candidates."
        },
        {
            id: 2,
            title: "Police Constable Exam - Biometric Volunteers",
            organizer: "Gujarat Police Department",
            category: "Government",
            date: "2024-02-20",
            duration: "Full day (8 hours)",
            location: "Sardar Patel Stadium, Ahmedabad",
            payment: "₹1,500/day",
            requirements: ["College students", "Tech-savvy", "Good communication", "Available full day"],
            benefits: ["Government certificate", "Meals", "Transport", "Networking opportunity"],
            verified: true,
            urgent: true,
            highPay: false,
            description: "Looking for college students to assist with biometric data collection for Police Constable recruitment examination. Training will be provided on-site."
        },
        {
            id: 3,
            title: "Inter-College Cricket Tournament Volunteers",
            organizer: "Gujarat Sports Authority",
            category: "Tournament",
            date: "2024-02-25",
            duration: "3 days",
            location: "Sardar Patel Stadium, Ahmedabad",
            payment: "₹2,000/day",
            requirements: ["Sports enthusiast", "Good physical fitness", "Team player", "Available for 3 days"],
            benefits: ["Free entry to matches", "Meals", "Tournament t-shirt", "Certificate"],
            verified: true,
            urgent: false,
            highPay: true,
            description: "Volunteers needed for inter-college cricket tournament. Help with crowd management, scorekeeping, and event coordination. Great opportunity for sports lovers!"
        },
        {
            id: 4,
            title: "College Fest - Event Management Volunteers",
            organizer: "Gujarat University",
            category: "College Fest",
            date: "2024-03-01",
            duration: "2 days",
            location: "Gujarat University Campus, Ahmedabad",
            payment: "₹1,200/day",
            requirements: ["Current college student", "Enthusiastic", "Good communication skills"],
            benefits: ["College credit", "Free fest entry", "Meals", "Networking"],
            verified: true,
            urgent: false,
            highPay: false,
            description: "Join us for the biggest college fest of the year! Volunteers needed for event management, registration, and coordination. Perfect for students looking to gain experience."
        },
        {
            id: 5,
            title: "Tech Startup Expo - Volunteers Required",
            organizer: "Ahmedabad Startup Hub",
            category: "Corporate",
            date: "2024-02-18",
            duration: "1 day (6 hours)",
            location: "Gandhinagar Convention Center",
            payment: "₹2,500/day",
            requirements: ["Tech background preferred", "Professional attire", "Good English"],
            benefits: ["Networking with startups", "Lunch", "Certificate", "Free expo entry"],
            verified: true,
            urgent: true,
            highPay: true,
            description: "Assist with registration, booth management, and attendee guidance at the largest tech startup expo in Gujarat. Great networking opportunity!"
        },
        {
            id: 6,
            title: "Marriage Event - Server Staff Needed",
            organizer: "Sharma Family",
            category: "Marriage",
            date: "2024-02-22",
            duration: "1 day (8 hours)",
            location: "Grand Hyatt, Ahmedabad",
            payment: "₹2,000/day",
            requirements: ["Experience preferred", "Formal attire", "Punctuality"],
            benefits: ["Meals included", "Transport", "Tips"],
            verified: true,
            urgent: false,
            highPay: false,
            description: "Looking for experienced servers for a high-profile wedding reception. Professional service required."
        },
        {
            id: 7,
            title: "Cultural Festival - Stage Management",
            organizer: "Gujarat Cultural Society",
            category: "Festival",
            date: "2024-03-05",
            duration: "3 days",
            location: "Riverfront, Ahmedabad",
            payment: "₹3,000/day",
            requirements: ["Stage management experience", "Leadership skills", "Available for all 3 days"],
            benefits: ["Meals", "Certificate", "Networking", "Cultural experience"],
            verified: true,
            urgent: false,
            highPay: true,
            description: "Join the team managing one of Gujarat's biggest cultural festivals. Experience in stage management or event coordination preferred."
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

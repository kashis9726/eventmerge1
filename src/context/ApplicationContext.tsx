import React, { createContext, useContext, useState } from "react";

export interface Application {
  id: number;
  eventId: number;
  eventTitle: string;
  workerId: number;
  workerName: string;
  workerRating: number;
  role: string;
  appliedDate: string;
  status: "pending" | "accepted" | "rejected";
  workerEmail?: string;
  workerPhone?: string;
  experience?: string;
  skills?: string[];
}

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Omit<Application, "id">) => void;
  updateApplicationStatus: (id: number, status: "accepted" | "rejected") => void;
  getApplicationsByEvent: (eventId: number) => Application[];
  getApplicationsByWorker: (workerId: number) => Application[];
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplicationContext must be used within an ApplicationProvider");
  }
  return context;
};

export const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      eventId: 1,
      eventTitle: "Tech Conference 2024",
      workerId: 1,
      workerName: "Rahul Sharma",
      workerRating: 4.8,
      role: "Server",
      appliedDate: "2024-01-10",
      status: "pending",
      workerEmail: "rahul@example.com",
      workerPhone: "+91 98765 43210",
      experience: "3 years",
      skills: ["Customer Service", "Event Management"],
    },
    {
      id: 2,
      eventId: 2,
      eventTitle: "Sharma Wedding Reception",
      workerId: 2,
      workerName: "Priya Patel",
      workerRating: 4.9,
      role: "Decorator",
      appliedDate: "2024-01-08",
      status: "accepted",
      workerEmail: "priya@example.com",
      workerPhone: "+91 98765 43211",
      experience: "5 years",
      skills: ["Interior Design", "Floral Arrangement"],
    },
    {
      id: 3,
      eventId: 1,
      eventTitle: "Tech Conference 2024",
      workerId: 3,
      workerName: "Amit Kumar",
      workerRating: 4.7,
      role: "Photographer",
      appliedDate: "2024-01-11",
      status: "pending",
      workerEmail: "amit@example.com",
      workerPhone: "+91 98765 43212",
      experience: "2 years",
      skills: ["Photography", "Video Editing"],
    },
    {
      id: 4,
      eventId: 3,
      eventTitle: "Startup Expo",
      workerId: 4,
      workerName: "Sneha Gupta",
      workerRating: 4.6,
      role: "Coordinator",
      appliedDate: "2024-01-09",
      status: "rejected",
      workerEmail: "sneha@example.com",
      workerPhone: "+91 98765 43213",
      experience: "1 year",
      skills: ["Coordination", "Communication"],
    },
  ]);

  const addApplication = (application: Omit<Application, "id">) => {
    const newApplication = {
      ...application,
      id: applications.length + 1,
    };
    setApplications((prev) => [...prev, newApplication]);
  };

  const updateApplicationStatus = (id: number, status: "accepted" | "rejected") => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const getApplicationsByEvent = (eventId: number) => {
    return applications.filter((app) => app.eventId === eventId);
  };

  const getApplicationsByWorker = (workerId: number) => {
    return applications.filter((app) => app.workerId === workerId);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplicationStatus,
        getApplicationsByEvent,
        getApplicationsByWorker,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};





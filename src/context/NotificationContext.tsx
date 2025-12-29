import React, { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

// Demo notifications based on user role
const getDemoNotifications = (role?: string): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Application Accepted!",
      message: "Your application for 'PSI Exam Biometric Volunteers' has been accepted. Event date: Feb 15, 2024",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      link: "/dashboard/worker/applications",
    },
    {
      id: "2",
      type: "info",
      title: "New Event Posted",
      message: "Inter-College Cricket Tournament needs volunteers. Apply now!",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      link: "/dashboard/worker/jobs",
    },
    {
      id: "3",
      type: "warning",
      title: "Payment Pending",
      message: "Payment of ₹2,500 for 'Tech Conference 2024' is pending. Complete your profile to receive payment.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      link: "/dashboard/worker/payments",
    },
    {
      id: "4",
      type: "info",
      title: "New Application Received",
      message: "Rahul Sharma applied for 'PSI Exam Biometric Volunteers'. Review now.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: false,
      link: "/dashboard/organizer/events",
    },
    {
      id: "5",
      type: "success",
      title: "Event Posted Successfully",
      message: "Your event 'Police Exam Volunteers Needed' has been posted and is now live.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      link: "/dashboard/organizer/events",
    },
    {
      id: "6",
      type: "info",
      title: "Reminder: Event Tomorrow",
      message: "Don't forget! Your event 'College Fest Volunteers' is scheduled for tomorrow at 9:00 AM.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      read: false,
      link: "/dashboard/organizer/events",
    },
  ];

  // Filter notifications based on role
  if (role === "manpower" || role === "worker") {
    return baseNotifications.filter((n) => n.id === "1" || n.id === "2" || n.id === "3");
  } else if (role === "organizer") {
    return baseNotifications.filter((n) => n.id === "4" || n.id === "5" || n.id === "6");
  } else if (role === "vendor") {
    return [
      {
        id: "7",
        type: "info",
        title: "New Service Request",
        message: "You have received a new service request for 'Wedding Catering'.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        read: false,
        link: "/dashboard/vendor/requests",
      },
    ];
  }

  return baseNotifications;
};

export const NotificationProvider = ({ 
  children,
  userRole 
}: { 
  children: React.ReactNode;
  userRole?: string;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Load from localStorage or use demo notifications
    const stored = localStorage.getItem(`notifications_${userRole}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      } catch {
        return getDemoNotifications(userRole);
      }
    }
    return getDemoNotifications(userRole);
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(`notifications_${userRole}`, JSON.stringify(notifications));
  }, [notifications, userRole]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};



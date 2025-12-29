import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";
import {
    ChevronLeft,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    IndianRupee,
    MoreHorizontal
} from "lucide-react";

interface Payment {
    id: string;
    event: string;
    worker: string;
    role: string;
    amount: string;
    date: string;
    status: "Paid" | "Pending" | "In Progress";
    action: "Mark as Paid" | "View Receipt";
    dueDate?: string;
    paidDate?: string;
}

const initialPayments: Payment[] = [
    {
        id: "1",
        event: "Corporate Annual Conference",
        worker: "Ramesh Kumar",
        role: "Waiter",
        amount: "₹2,000",
        date: "3/15/2025",
        status: "Pending",
        action: "Mark as Paid",
        dueDate: "Due: 3/20/2025"
    },
    {
        id: "2",
        event: "Wedding Reception",
        worker: "Aarti Sharma",
        role: "Decorator",
        amount: "₹3,000",
        date: "2/10/2025",
        status: "Paid",
        action: "View Receipt",
        paidDate: "Paid: 2/12/2025"
    },
    {
        id: "3",
        event: "Diwali Community Festival",
        worker: "Vijay Patel",
        role: "Security",
        amount: "₹1,500",
        date: "10/23/2025",
        status: "In Progress",
        action: "Mark as Paid"
    },
    {
        id: "4",
        event: "Corporate Seminar",
        worker: "Priya Singh",
        role: "Tech Support",
        amount: "₹2,500",
        date: "1/15/2025",
        status: "Paid",
        action: "View Receipt",
        paidDate: "Paid: 1/18/2025"
    },
    {
        id: "5",
        event: "College Tech Fest",
        worker: "Amit Desai",
        role: "Volunteer",
        amount: "₹1,800",
        date: "2/20/2025",
        status: "Pending",
        action: "Mark as Paid",
        dueDate: "Due: 2/25/2025"
    }
];

const PaymentTracker = () => {
    const [activeTab, setActiveTab] = useState("All Payments");
    const [searchQuery, setSearchQuery] = useState("");
    const [payments, setPayments] = useState(initialPayments);

    const filteredPayments = payments.filter(p => {
        const matchesTab = activeTab === "All Payments" || p.status === activeTab;
        const matchesSearch = p.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.worker.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const stats = [
        { label: "Total Amount", value: "₹10,800", subtext: "All payments", icon: IndianRupee, color: "text-blue-500", borderColor: "border-blue-100" },
        { label: "Paid", value: "₹5,500", subtext: "Completed", icon: CheckCircle2, color: "text-green-500", borderColor: "border-green-100" },
        { label: "Pending", value: "₹3,800", subtext: "To be paid", icon: AlertCircle, color: "text-red-500", borderColor: "border-red-100" },
        { label: "Payment Rate", value: "51%", subtext: "On-time payments", icon: CheckCircle2, color: "text-blue-500", borderColor: "border-blue-100" },
    ];

    return (
        <div className="min-h-screen bg-background relative">
            <ThreeDGradientBackground />
            <Header />
            <main className="pt-24 pb-16 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/dashboard/organizer"
                        className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-3xl font-bold text-foreground mb-8">Payment Tracker</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <Card key={index} className={`border ${stat.borderColor} shadow-sm`}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-muted-foreground font-medium">{stat.label}</p>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                                    <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Search bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by event, worker name, or role..."
                            className="pl-10 bg-secondary/30 border-none h-12 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        {["All Payments", "Pending", "Paid", "In Progress"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                                        ? "bg-foreground text-background"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Event</th>
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Worker</th>
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Role</th>
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Amount</th>
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Date</th>
                                        <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                                        <th className="text-right p-4 font-medium text-muted-foreground text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                                            <td className="p-4 text-sm font-medium text-foreground">{payment.event}</td>
                                            <td className="p-4 text-sm text-foreground">{payment.worker}</td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className="font-normal text-xs">{payment.role}</Badge>
                                            </td>
                                            <td className="p-4 text-sm font-bold text-foreground">{payment.amount}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-foreground">{payment.date}</span>
                                                    <span className={`text-[10px] ${payment.status === "Pending" ? "text-red-500" : "text-muted-foreground"}`}>
                                                        {payment.dueDate || payment.paidDate}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                          ${payment.status === "Paid" ? "bg-green-50 text-green-700 border-green-200" :
                                                        payment.status === "Pending" ? "bg-red-50 text-red-700 border-red-200" :
                                                            "bg-amber-50 text-amber-700 border-amber-200"}`}
                                                >
                                                    {payment.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                                                    {payment.status === "Pending" && <AlertCircle className="w-3 h-3" />}
                                                    {payment.status === "In Progress" && <Clock className="w-3 h-3" />}
                                                    {payment.status}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button
                                                    size="sm"
                                                    variant={payment.active === "View Receipt" ? "outline" : "default"}
                                                    className={`h-8 text-xs ${payment.action === "Mark as Paid" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}`}
                                                >
                                                    {payment.action}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredPayments.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                No payments found matching your filters.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentTracker;

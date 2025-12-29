import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, CheckCircle2, Clock, AlertCircle, IndianRupee } from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";

interface Payment {
  id: string;
  event: string;
  organizer: string;
  role: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "In Progress";
  paidDate?: string;
  dueDate?: string;
}

const payments: Payment[] = [
  {
    id: "1",
    event: "Corporate Annual Conference",
    organizer: "TechCorp Solutions",
    role: "Waiter",
    amount: "₹2,000",
    date: "3/15/2025",
    status: "Pending",
    dueDate: "Due: 3/20/2025",
  },
  {
    id: "2",
    event: "Wedding Reception",
    organizer: "Sharma Family",
    role: "Decorator",
    amount: "₹3,000",
    date: "2/10/2025",
    status: "Paid",
    paidDate: "Paid: 2/12/2025",
  },
  {
    id: "3",
    event: "Diwali Community Festival",
    organizer: "Community Center",
    role: "Setup Crew",
    amount: "₹1,500",
    date: "10/23/2025",
    status: "In Progress",
  },
  {
    id: "4",
    event: "Corporate Seminar",
    organizer: "Business Inc.",
    role: "Tech Support",
    amount: "₹2,500",
    date: "1/15/2025",
    status: "Paid",
    paidDate: "Paid: 1/18/2025",
  },
];

const WorkerPayments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Payments");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All Payments" || payment.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const totalAmount = payments.reduce((sum, p) => {
    const amount = parseInt(p.amount.replace(/[₹,]/g, ""));
    return sum + amount;
  }, 0);

  const paidAmount = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => {
      const amount = parseInt(p.amount.replace(/[₹,]/g, ""));
      return sum + amount;
    }, 0);

  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => {
      const amount = parseInt(p.amount.replace(/[₹,]/g, ""));
      return sum + amount;
    }, 0);

  const stats = [
    {
      label: "Total Earned",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      subtext: "All payments",
      icon: IndianRupee,
      color: "text-blue-500",
      borderColor: "border-blue-100",
    },
    {
      label: "Paid",
      value: `₹${paidAmount.toLocaleString("en-IN")}`,
      subtext: "Completed",
      icon: CheckCircle2,
      color: "text-green-500",
      borderColor: "border-green-100",
    },
    {
      label: "Pending",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      subtext: "To be paid",
      icon: AlertCircle,
      color: "text-red-500",
      borderColor: "border-red-100",
    },
    {
      label: "Payment Rate",
      value: `${Math.round((paidAmount / totalAmount) * 100)}%`,
      subtext: "On-time payments",
      icon: CheckCircle2,
      color: "text-blue-500",
      borderColor: "border-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <ThreeDGradientBackground />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border relative">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/dashboard/worker"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
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

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by event, organizer name, or role..."
              className="pl-10 bg-secondary/30 border-none h-12 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {["All Payments", "Pending", "Paid", "In Progress"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Event</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Organizer</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Role</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Amount</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
                    >
                      <td className="p-4 text-sm font-medium text-foreground">{payment.event}</td>
                      <td className="p-4 text-sm text-foreground">{payment.organizer}</td>
                      <td className="p-4">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {payment.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm font-bold text-foreground">{payment.amount}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-foreground">{payment.date}</span>
                          {payment.dueDate && (
                            <span className="text-[10px] text-red-500">{payment.dueDate}</span>
                          )}
                          {payment.paidDate && (
                            <span className="text-[10px] text-muted-foreground">{payment.paidDate}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            payment.status === "Paid"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : payment.status === "Pending"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {payment.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                          {payment.status === "Pending" && <AlertCircle className="w-3 h-3" />}
                          {payment.status === "In Progress" && <Clock className="w-3 h-3" />}
                          {payment.status}
                        </div>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WorkerPayments;


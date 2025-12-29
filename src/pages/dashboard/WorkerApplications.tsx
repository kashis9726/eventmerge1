import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, IndianRupee, MessageCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useEventContext } from "@/context/EventContext";

const WorkerApplications = () => {
  const { applications } = useApplicationContext();
  const { events } = useEventContext();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get current worker's applications (in real app, get from auth context)
  const workerApplications = applications.map((app) => {
    const event = events.find((e) => e.id === app.eventId);
    return {
      ...app,
      event,
    };
  });

  const filteredApplications =
    statusFilter === "all"
      ? workerApplications
      : workerApplications.filter((app) => app.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative">
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
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {["all", "pending", "accepted", "rejected"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                statusFilter === filter
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter === "all" ? "All" : filter} ({workerApplications.filter(a => filter === "all" ? true : a.status === filter).length})
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <h3 className="font-semibold text-xl mb-1">
                          {application.event?.title || application.eventTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.event?.organizer}
                        </p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status === "accepted" && (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        {application.status === "rejected" && (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {application.status === "pending" && (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {application.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Role Applied</p>
                        <p className="font-medium">{application.role}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Payment</p>
                        <p className="font-medium text-green-600">
                          {application.event?.payment || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Applied Date</p>
                        <p className="font-medium">{application.appliedDate}</p>
                      </div>
                      {application.event?.date && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Event Date</p>
                          <p className="font-medium">{application.event.date}</p>
                        </div>
                      )}
                    </div>

                    {application.event && (
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {application.event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {application.event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {application.event.payment}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="default" className="gap-2 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No applications found with status: {statusFilter}
            </p>
            <Button asChild variant="default">
              <Link to="/dashboard/worker/jobs">Browse Jobs</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkerApplications;





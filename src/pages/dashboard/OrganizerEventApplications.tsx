import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Star,
  Mail,
  Phone,
  Calendar,
  User,
  MessageCircle,
  Download,
} from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";
import { useEventContext } from "@/context/EventContext";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useToast } from "@/hooks/use-toast";

const OrganizerEventApplications = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { events } = useEventContext();
  const { applications, updateApplicationStatus } = useApplicationContext();

  const eventId = parseInt(id || "0");
  const event = events.find((e) => e.id === eventId);
  const eventApplications = applications.filter((app) => app.eventId === eventId);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApplications =
    statusFilter === "all"
      ? eventApplications
      : eventApplications.filter((app) => app.status === statusFilter);

  const handleAccept = (applicationId: number) => {
    updateApplicationStatus(applicationId, "accepted");
    toast({
      title: "Application Accepted",
      description: "The worker has been notified.",
    });
  };

  const handleReject = (applicationId: number) => {
    updateApplicationStatus(applicationId, "rejected");
    toast({
      title: "Application Rejected",
      description: "The worker has been notified.",
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background relative">
        <ThreeDGradientBackground />
        <div className="container mx-auto px-6 py-8 relative z-10">
          <p className="text-muted-foreground">Event not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ThreeDGradientBackground />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border relative">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/dashboard/organizer/events"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Events
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
            <p className="text-muted-foreground">
              Manage applications for this event ({eventApplications.length} total)
            </p>
          </div>
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                        {application.workerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{application.workerName}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-muted-foreground">
                            {application.workerRating} Rating
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          application.status === "accepted"
                            ? "default"
                            : application.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Role Applied For</p>
                        <p className="font-medium">{application.role}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Applied Date</p>
                        <p className="font-medium">{application.appliedDate}</p>
                      </div>
                      {application.experience && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Experience</p>
                          <p className="font-medium">{application.experience}</p>
                        </div>
                      )}
                      {application.skills && application.skills.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {application.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 text-sm text-muted-foreground">
                      {application.workerEmail && (
                        <a
                          href={`mailto:${application.workerEmail}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Mail className="w-4 h-4" />
                          {application.workerEmail}
                        </a>
                      )}
                      {application.workerPhone && (
                        <a
                          href={`tel:${application.workerPhone}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Phone className="w-4 h-4" />
                          {application.workerPhone}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {application.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleAccept(application.id)}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(application.id)}
                          variant="destructive"
                          className="gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No applications found with status: {statusFilter}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizerEventApplications;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, IndianRupee, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";
import { useEventContext } from "@/context/EventContext";
import { useApplicationContext } from "@/context/ApplicationContext";

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const { events } = useEventContext();
  const { getApplicationsByEvent } = useApplicationContext();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get applications count for each event
  const eventsWithStats = events.map((event) => {
    const applications = getApplicationsByEvent(event.id);
    const acceptedCount = applications.filter((app) => app.status === "accepted").length;
    const pendingCount = applications.filter((app) => app.status === "pending").length;

    // Determine status
    let status: "active" | "upcoming" | "completed" = "active";
    const eventDate = new Date(event.date);
    const today = new Date();
    if (eventDate < today) {
      status = "completed";
    } else if (eventDate.getTime() - today.getTime() > 30 * 24 * 60 * 60 * 1000) {
      status = "upcoming";
    }

    return {
      ...event,
      applicationsCount: applications.length,
      acceptedCount,
      pendingCount,
      status,
    };
  });

  const filteredEvents =
    statusFilter === "all"
      ? eventsWithStats
      : eventsWithStats.filter((e) => e.status === statusFilter);

  return (
    <div className="min-h-screen bg-background relative">
      <ThreeDGradientBackground />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border relative">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/dashboard/organizer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">My Events</h1>
            <Button onClick={() => navigate("/post-event")} className="gap-2">
              <Plus className="w-4 h-4" />
              Post New Event
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {["all", "active", "upcoming", "completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                statusFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter === "all" ? "All Events" : filter}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge
                        variant={
                          event.status === "active"
                            ? "default"
                            : event.status === "upcoming"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Event Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {event.payment}
                    </span>
                  </div>

                  {/* Applications Stats */}
                  <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {event.applicationsCount} Applications
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        {event.acceptedCount} Accepted
                      </Badge>
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
                        {event.pendingCount} Pending
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() =>
                        navigate(`/dashboard/organizer/events/${event.id}/applications`)
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Applications
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No events found.</p>
            <Button onClick={() => navigate("/post-event")} className="gap-2">
              <Plus className="w-4 h-4" />
              Post Your First Event
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizerEvents;


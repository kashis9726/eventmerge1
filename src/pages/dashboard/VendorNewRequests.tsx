import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Send, MessageCircle } from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";

interface Request {
  id: number;
  eventTitle: string;
  client: string;
  service: string;
  date: string;
  location: string;
  guests: number;
  status: "New" | "Quoted";
}

const requests: Request[] = [
  {
    id: 1,
    eventTitle: "Corporate Annual Meeting",
    client: "TechCorp Solutions",
    service: "Catering",
    date: "3/15/2025",
    location: "Mumbai",
    guests: 200,
    status: "New",
  },
  {
    id: 2,
    eventTitle: "Wedding Reception",
    client: "Sharma Family",
    service: "Sound System",
    date: "4/20/2025",
    location: "Vadodara",
    guests: 500,
    status: "Quoted",
  },
];

const VendorNewRequests = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ThreeDGradientBackground />
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border relative">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/dashboard/vendor"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">New Requests</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <Card>
          <CardHeader>
            <CardTitle>Event Service Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-6 rounded-xl border border-border hover:border-vendor/30 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{request.eventTitle}</h3>
                      <Badge
                        variant={request.status === "New" ? "default" : "secondary"}
                        className={
                          request.status === "New"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      By {request.client} • {request.service}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {request.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {request.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Guests: {request.guests}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="default" className="gap-2 bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4" />
                      Send Quote
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VendorNewRequests;


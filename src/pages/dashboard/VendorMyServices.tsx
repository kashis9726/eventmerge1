import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Users, Edit, BarChart3 } from "lucide-react";
import { ThreeDGradientBackground } from "@/components/3DGradientBackground";

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  location: string;
  bookings: number;
  rating: number;
}

const services: Service[] = [
  {
    id: 1,
    name: "Wedding Catering Service",
    category: "Catering",
    price: "$500/plate",
    location: "Ahmedabad, Vadodara",
    bookings: 12,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Professional Sound System",
    category: "Sound & Lighting",
    price: "₹15,000/day",
    location: "Gujarat",
    bookings: 8,
    rating: 4.9,
  },
];

const VendorMyServices = () => {
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
          <h1 className="text-3xl font-bold text-foreground">My Services</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <Card>
          <CardHeader>
            <CardTitle>Your Service Listings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-xl border border-border hover:border-vendor/30 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {service.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Bookings: {service.bookings}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          Rating: {service.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Stats
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

export default VendorMyServices;


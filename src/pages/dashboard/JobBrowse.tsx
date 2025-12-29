import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Flame,
  TrendingUp,
  CheckCircle2,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useEventContext } from "@/context/EventContext";

const cities = ["All Cities", "Mumbai", "Ahmedabad", "Vadodara", "Surat", "Gandhinagar"];
const categories = ["All Categories", "Corporate Event", "Wedding", "Festival", "College Fest", "Government"];

const JobBrowse = () => {
  const { events: jobs } = useEventContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState("Festival");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("available");

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === "All Cities" || job.location.includes(selectedCity);
    const matchesCategory =
      selectedCategory === "All Categories" || job.category.includes(selectedCategory);

    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => {
        if (filter === "highpay") return job.highPay;
        if (filter === "urgent") return job.urgent;
        if (filter === "verified") return job.verified;
        return true;
      });

    return matchesSearch && matchesCity && matchesCategory && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard/worker" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-worker/10 flex items-center justify-center text-worker font-semibold">
                W
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events by title, role, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button variant="default" className="bg-green-600 hover:bg-green-700 gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={activeFilters.includes("highpay") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("highpay")}
              className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <TrendingUp className="w-4 h-4" />
              High Pay
            </Button>

            <Button
              variant={activeFilters.includes("urgent") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("urgent")}
              className="gap-2 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Flame className="w-4 h-4" />
              Urgent
            </Button>

            <Button
              variant={activeFilters.includes("verified") ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("verified")}
              className="gap-2 bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verified
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "available"
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Available ({filteredJobs.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "applications"
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Applications (2)
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              History
            </button>
          </div>

          <Select defaultValue="recommended">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Recommended
                </div>
              </SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="highest-pay">Highest Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">Showing {filteredJobs.length} amazing opportunity</p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="border-border hover:border-worker/50 hover:shadow-lg transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                      {job.verified && (
                        <Shield className="w-5 h-5 text-primary" title="Verified" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{job.organizer}</p>
                    <div className="flex gap-2 mb-2">
                      {job.urgent && (
                        <Badge className="bg-pink-500/10 text-pink-600 border-0">
                          <Flame className="w-3 h-3 mr-1" /> Urgent
                        </Badge>
                      )}
                      {job.highPay && (
                        <Badge className="bg-orange-500/10 text-orange-600 border-0">
                          <TrendingUp className="w-3 h-3 mr-1" /> High Pay
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-worker">{job.payment}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {job.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req) => (
                      <Badge key={req} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="default" className="w-full bg-worker hover:bg-worker/90">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobBrowse;


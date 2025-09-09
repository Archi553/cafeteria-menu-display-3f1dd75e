import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, Settings } from "lucide-react";
import heroImage from "@/assets/hero-cafeteria.jpg";

const features = [
  {
    icon: Clock,
    title: "Today's Menu",
    description: "View today's fresh offerings with dietary information and pricing",
    href: "/todays-menu",
  },
  {
    icon: Calendar,
    title: "Weekly Planning",
    description: "Plan your meals with our comprehensive weekly menu overview",
    href: "/weekly-menu",
  },
  {
    icon: Users,
    title: "Employee Focused",
    description: "Designed specifically for employee convenience and meal planning",
    href: "/about",
  },
  {
    icon: Settings,
    title: "Easy Management",
    description: "Streamlined admin tools for efficient menu management",
    href: "/admin",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-green/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Welcome to Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-green">
                  Cafeteria Portal
                </span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-xl">
                Discover fresh, delicious meals daily. Plan your dining experience with our comprehensive menu system designed for employee convenience.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/todays-menu">View Today's Menu</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/weekly-menu">Weekly Menu</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Delicious cafeteria food"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Comprehensive tools for menu browsing and meal planning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange to-green rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to={feature.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange to-green">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Explore Today's Menu?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Discover fresh, delicious options available right now
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/todays-menu">View Today's Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
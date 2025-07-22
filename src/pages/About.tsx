import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Shield, Smartphone, Calendar, ChefHat } from "lucide-react";
import menuVarietyImage from "@/assets/menu-variety.jpg";

const features = [
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Menu items are updated in real-time to ensure accuracy and freshness information."
  },
  {
    icon: Users,
    title: "Employee-Focused",
    description: "Designed specifically for employee convenience and efficient meal planning."
  },
  {
    icon: Calendar,
    title: "Weekly Planning",
    description: "Plan your meals in advance with our comprehensive weekly menu overview."
  },
  {
    icon: Shield,
    title: "Dietary Information",
    description: "Clear dietary tags help you make informed choices based on your preferences."
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Access the portal seamlessly from any device - desktop, tablet, or mobile."
  },
  {
    icon: ChefHat,
    title: "Quality Assured",
    description: "All menu items are carefully curated to ensure quality and nutritional value."
  }
];

const faqs = [
  {
    question: "How often is the menu updated?",
    answer: "The menu is updated daily to reflect fresh offerings and availability. Weekly menus are typically published every Friday for the following week."
  },
  {
    question: "How do I know if an item suits my dietary needs?",
    answer: "Each menu item is clearly tagged with dietary information including Vegan, Vegetarian, Non-Vegetarian, and Gluten-Free options."
  },
  {
    question: "Can I see past menus?",
    answer: "Yes, you can access historical menu data to see what was served on previous days for reference."
  },
  {
    question: "Who should I contact for menu suggestions?",
    answer: "Please reach out to the cafeteria management team or HR department with any menu suggestions or feedback."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About Cafeteria Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our Cafeteria Menu Display Portal is designed to streamline the dining experience for employees 
            while simplifying menu management for administrators. Built with modern technology and user-centric design.
          </p>
          <div className="relative max-w-4xl mx-auto">
            <img
              src={menuVarietyImage}
              alt="Variety of fresh meals"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-orange/5 to-green/5 border-orange/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                To enhance the workplace dining experience by providing easy access to fresh, 
                nutritious meal information while reducing administrative overhead and improving 
                employee satisfaction through technology-driven solutions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-orange to-green rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Built With Modern Technology
          </h2>
          <div className="flex justify-center flex-wrap gap-4">
            {["React", "TypeScript", "Tailwind CSS", "Vite", "Shadcn/UI"].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-lg py-2 px-4">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange/10 to-green/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Help or Have Suggestions?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're always looking to improve your dining experience. 
                Reach out to us with feedback, suggestions, or technical support.
              </p>
              <div className="space-y-2">
                <p className="text-foreground">
                  <strong>Cafeteria Management:</strong> cafeteria@company.com
                </p>
                <p className="text-foreground">
                  <strong>Technical Support:</strong> it-support@company.com
                </p>
                <p className="text-foreground">
                  <strong>HR Department:</strong> hr@company.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
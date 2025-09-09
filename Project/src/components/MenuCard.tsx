import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MenuCardProps {
  name: string;
  category: "Breakfast" | "Lunch" | "Snacks" | "Beverages";
  price: number;
  dietary: "Vegan" | "Vegetarian" | "Non-Vegetarian" | "Gluten-Free";
  available: boolean;
  description?: string;
}

const categoryColors = {
  Breakfast: "bg-orange-light text-orange",
  Lunch: "bg-green-light text-green",
  Snacks: "bg-secondary text-secondary-foreground",
  Beverages: "bg-muted text-muted-foreground",
};

const dietaryColors = {
  Vegan: "bg-green-light text-green",
  Vegetarian: "bg-green-light text-green",
  "Non-Vegetarian": "bg-destructive/10 text-destructive",
  "Gluten-Free": "bg-orange-light text-orange",
};

export function MenuCard({ name, category, price, dietary, available, description }: MenuCardProps) {
  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      !available ? "opacity-60" : "hover:scale-[1.02]"
    }`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <span className="text-lg font-bold text-primary">₹{price}</span>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className={categoryColors[category]}>
            {category}
          </Badge>
          <Badge className={dietaryColors[dietary]}>
            {dietary}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge variant={available ? "default" : "secondary"}>
            {available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
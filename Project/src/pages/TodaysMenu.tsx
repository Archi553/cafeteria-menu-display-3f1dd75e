import { useState } from "react";
import { MenuCard } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockMenuItems = [
  {
    id: 1,
    name: "Grilled Chicken Sandwich",
    category: "Lunch" as const,
    price: 180,
    dietary: "Non-Vegetarian" as const,
    available: true,
    description: "Tender grilled chicken with fresh lettuce and tomatoes"
  },
  {
    id: 2,
    name: "Quinoa Buddha Bowl",
    category: "Lunch" as const,
    price: 220,
    dietary: "Vegan" as const,
    available: true,
    description: "Nutritious quinoa with roasted vegetables and tahini dressing"
  },
  {
    id: 3,
    name: "Masala Chai",
    category: "Beverages" as const,
    price: 25,
    dietary: "Vegetarian" as const,
    available: true,
    description: "Traditional spiced tea with milk"
  },
  {
    id: 4,
    name: "Paneer Tikka Wrap",
    category: "Lunch" as const,
    price: 160,
    dietary: "Vegetarian" as const,
    available: true,
    description: "Spiced cottage cheese in a whole wheat wrap"
  },
  {
    id: 5,
    name: "Fruit Salad Bowl",
    category: "Snacks" as const,
    price: 80,
    dietary: "Vegan" as const,
    available: true,
    description: "Fresh seasonal fruits with a hint of chaat masala"
  },
  {
    id: 6,
    name: "Aloo Paratha",
    category: "Breakfast" as const,
    price: 90,
    dietary: "Vegetarian" as const,
    available: false,
    description: "Stuffed potato flatbread served with yogurt"
  },
  {
    id: 7,
    name: "Green Smoothie",
    category: "Beverages" as const,
    price: 120,
    dietary: "Vegan" as const,
    available: true,
    description: "Spinach, apple, banana and ginger blend"
  },
  {
    id: 8,
    name: "Fish Curry with Rice",
    category: "Lunch" as const,
    price: 250,
    dietary: "Non-Vegetarian" as const,
    available: true,
    description: "Coastal style fish curry with steamed basmati rice"
  }
];

export default function TodaysMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDietary, setSelectedDietary] = useState<string>("All");

  const categories = ["All", "Breakfast", "Lunch", "Snacks", "Beverages"];
  const dietaryOptions = ["All", "Vegan", "Vegetarian", "Non-Vegetarian", "Gluten-Free"];

  const filteredItems = mockMenuItems.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const dietaryMatch = selectedDietary === "All" || item.dietary === selectedDietary;
    return categoryMatch && dietaryMatch;
  });

  const availableCount = filteredItems.filter(item => item.available).length;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Today's Fresh Menu
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="default" className="text-lg py-2 px-4">
              {availableCount} items available
            </Badge>
            <Badge variant="outline" className="text-lg py-2 px-4">
              {filteredItems.length} total items
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Dietary Filter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Dietary Preference</h3>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((dietary) => (
                <Button
                  key={dietary}
                  variant={selectedDietary === dietary ? "default" : "outline"}
                  onClick={() => setSelectedDietary(dietary)}
                  className="transition-all duration-200"
                >
                  {dietary}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                dietary={item.dietary}
                available={item.available}
                description={item.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No items found for the selected filters.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDietary("All");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
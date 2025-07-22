import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock weekly menu data
const mockWeeklyData = {
  "2024-01-15": {
    breakfast: ["Poha with Vegetables", "Upma", "Tea/Coffee"],
    lunch: ["Dal Rice", "Chicken Curry", "Roti", "Salad"],
    snacks: ["Samosa", "Tea"],
  },
  "2024-01-16": {
    breakfast: ["Idli Sambhar", "Chutney", "Filter Coffee"],
    lunch: ["Rajma Rice", "Paneer Curry", "Chapati", "Raita"],
    snacks: ["Pakora", "Masala Chai"],
  },
  "2024-01-17": {
    breakfast: ["Paratha", "Pickle", "Lassi"],
    lunch: ["Fish Curry", "Vegetable Biryani", "Papad", "Buttermilk"],
    snacks: ["Fruit Chat", "Green Tea"],
  },
  "2024-01-18": {
    breakfast: ["Dosa", "Sambhar", "Coconut Chutney"],
    lunch: ["Chole", "Jeera Rice", "Roti", "Onion Salad"],
    snacks: ["Biscuits", "Coffee"],
  },
  "2024-01-19": {
    breakfast: ["Sandwich", "Fruit Juice", "Boiled Eggs"],
    lunch: ["Mutton Curry", "Plain Rice", "Chapati", "Pickle"],
    snacks: ["Cake Slice", "Tea"],
  },
  "2024-01-20": {
    breakfast: ["Puri Bhaji", "Pickle", "Tea"],
    lunch: ["Mixed Vegetable", "Dal", "Rice", "Roti"],
    snacks: ["Namkeen", "Buttermilk"],
  },
  "2024-01-21": {
    breakfast: ["Omelette", "Bread", "Coffee"],
    lunch: ["Special Thali", "Sweet Dish"],
    snacks: ["Ice Cream", "Cold Drink"],
  },
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeeklyMenu() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - currentDay + 1 + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(mondayDate);
      date.setDate(mondayDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  const getMenuForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockWeeklyData[dateStr as keyof typeof mockWeeklyData] || {
      breakfast: ["Menu not available"],
      lunch: ["Menu not available"],
      snacks: ["Menu not available"],
    };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getWeekRange = () => {
    const startDate = weekDates[0];
    const endDate = weekDates[6];
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Weekly Menu
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Week
            </Button>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {getWeekRange()}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              Next Week
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const menu = getMenuForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <Card 
                key={index} 
                className={`transition-all duration-200 hover:shadow-lg ${
                  isToday ? "ring-2 ring-primary shadow-md" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {weekDays[index]}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(date)}
                    </div>
                    {isToday && (
                      <Badge className="mt-2">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Breakfast */}
                  <div>
                    <h4 className="font-semibold text-sm text-orange mb-2">
                      Breakfast
                    </h4>
                    <ul className="space-y-1">
                      {menu.breakfast.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch */}
                  <div>
                    <h4 className="font-semibold text-sm text-green mb-2">
                      Lunch
                    </h4>
                    <ul className="space-y-1">
                      {menu.lunch.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Snacks */}
                  <div>
                    <h4 className="font-semibold text-sm text-brown mb-2">
                      Snacks
                    </h4>
                    <ul className="space-y-1">
                      {menu.snacks.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange rounded-full"></div>
              <span className="text-sm text-muted-foreground">Breakfast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green rounded-full"></div>
              <span className="text-sm text-muted-foreground">Lunch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brown rounded-full"></div>
              <span className="text-sm text-muted-foreground">Snacks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
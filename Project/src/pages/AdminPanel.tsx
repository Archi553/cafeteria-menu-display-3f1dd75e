import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockMenuItems = [
  { id: 1, name: "Grilled Chicken Sandwich", category: "Lunch", price: 180, dietary: "Non-Vegetarian", status: "Published" },
  { id: 2, name: "Quinoa Buddha Bowl", category: "Lunch", price: 220, dietary: "Vegan", status: "Published" },
  { id: 3, name: "Paneer Tikka Wrap", category: "Lunch", price: 160, dietary: "Vegetarian", status: "Pending" },
  { id: 4, name: "Fruit Salad Bowl", category: "Snacks", price: 80, dietary: "Vegan", status: "Published" },
];

export default function AdminPanel() {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    dietary: "",
    description: "",
    status: "Pending"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setMenuItems(items => items.map(item => 
        item.id === editingItem 
          ? { ...item, ...formData, price: Number(formData.price) }
          : item
      ));
      toast({ title: "Menu item updated successfully!" });
      setEditingItem(null);
    } else {
      const newItem = {
        id: Math.max(...menuItems.map(item => item.id)) + 1,
        ...formData,
        price: Number(formData.price)
      };
      setMenuItems(items => [...items, newItem]);
      toast({ title: "Menu item added successfully!" });
      setIsAddingItem(false);
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      dietary: "",
      description: "",
      status: "Pending"
    });
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      dietary: item.dietary,
      description: "",
      status: item.status
    });
    setEditingItem(item.id);
    setIsAddingItem(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(items => items.filter(item => item.id !== id));
    toast({ title: "Menu item deleted successfully!" });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    toast({ title: `Menu item ${newStatus.toLowerCase()} successfully!` });
  };

  const stats = {
    total: menuItems.length,
    published: menuItems.filter(item => item.status === "Published").length,
    pending: menuItems.filter(item => item.status === "Pending").length,
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your cafeteria menu items and scheduling
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green">{stats.published}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Menu Items</CardTitle>
                  <Button onClick={() => setIsAddingItem(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="outline">{item.dietary}</Badge>
                          <Badge 
                            variant={item.status === "Published" ? "default" : "secondary"}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Select
                          value={item.status}
                          onValueChange={(value) => handleStatusChange(item.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add/Edit Form */}
          {isAddingItem && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                        <SelectItem value="Beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dietary">Dietary</Label>
                    <Select value={formData.dietary} onValueChange={(value) => setFormData({...formData, dietary: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Optional description..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingItem ? "Update Item" : "Add Item"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsAddingItem(false);
                        setEditingItem(null);
                        setFormData({
                          name: "",
                          category: "",
                          price: "",
                          dietary: "",
                          description: "",
                          status: "Pending"
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
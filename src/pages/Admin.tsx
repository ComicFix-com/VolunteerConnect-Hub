import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Opportunity } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    category: "",
    location: "",
    date: "",
    spots: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOpportunity = {
      id: String(Date.now()),
      ...formData,
      spots: parseInt(formData.spots)
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    
    // Update the opportunities cache to trigger a refetch on the home page
    queryClient.setQueryData(['opportunities'], (oldData: Opportunity[] = []) => [...oldData, newOpportunity]);
    
    toast.success("Opportunity added successfully!");
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Please sign in to access the admin portal.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Add New Volunteer Opportunity</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Organization</label>
            <Input
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Available Spots</label>
            <Input
              name="spots"
              type="number"
              value={formData.spots}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Opportunity
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
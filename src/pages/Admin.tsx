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
    
    // Check if there are existing opportunities
    const currentOpportunities = queryClient.getQueryData<Opportunity[]>(['opportunities']) || [];
    
    if (currentOpportunities.length >= 1) {
      toast.error("Only one opportunity can be listed at a time. Please delete the existing opportunity first.");
      return;
    }

    const newOpportunity = {
      id: String(Date.now()),
      ...formData,
      spots: parseInt(formData.spots)
    };

    // Update the opportunities cache
    queryClient.setQueryData(['opportunities'], [newOpportunity]);
    
    toast.success("Opportunity added successfully!");
    navigate("/");
  };

  const handleDelete = (id: string) => {
    queryClient.setQueryData(['opportunities'], []);
    toast.success("Opportunity deleted successfully!");
  };

  const currentOpportunities = queryClient.getQueryData<Opportunity[]>(['opportunities']) || [];

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
        <h1 className="text-3xl font-bold mb-8">Manage Volunteer Opportunity</h1>
        
        {currentOpportunities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Opportunity</h2>
            {currentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">{opportunity.title}</h3>
                <p className="text-gray-600">{opportunity.organization}</p>
                <Button 
                  variant="destructive" 
                  className="mt-4"
                  onClick={() => handleDelete(opportunity.id)}
                >
                  Delete Opportunity
                </Button>
              </div>
            ))}
          </div>
        )}
        
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
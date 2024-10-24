import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface VolunteerApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: {
    title: string;
    organization: string;
    email?: string;
  };
}

const VolunteerApplicationForm = ({ isOpen, onClose, opportunity }: VolunteerApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real application, you would send this data to your backend
      // For demo purposes, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Application submitted successfully!", {
        description: "You have been added to the waiting list. The organization will contact you soon.",
      });
      
      onClose();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {opportunity.title}</DialogTitle>
          <DialogDescription>
            Fill out this form to apply for the volunteer position at {opportunity.organization}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Relevant Experience</label>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Why do you want to volunteer?</label>
            <Textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerApplicationForm;
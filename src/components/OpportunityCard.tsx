import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { Opportunity } from "@/lib/types";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const handleApply = () => {
    toast.success("Application submitted successfully!");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {opportunity.organization}
            </CardDescription>
          </div>
          <Badge variant="secondary">{opportunity.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{opportunity.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            {opportunity.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {opportunity.date}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            {opportunity.spots} spots available
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleApply} className="w-full">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { Opportunity } from "@/lib/types";
import { useState } from "react";
import VolunteerApplicationForm from "./VolunteerApplicationForm";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  const handleApply = () => {
    setIsApplicationFormOpen(true);
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1">
        <CardHeader className="space-y-1 sm:space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex-1">
              <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-2">{opportunity.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
                {opportunity.organization}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="whitespace-nowrap text-xs sm:text-sm">
              {opportunity.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 mb-4 line-clamp-3 text-xs sm:text-sm md:text-base">
            {opportunity.description}
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{opportunity.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{opportunity.date}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{opportunity.spots} spots available</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button onClick={handleApply} className="w-full text-sm sm:text-base py-2 sm:py-4">
            Apply Now
          </Button>
        </CardFooter>
      </Card>

      <VolunteerApplicationForm
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        opportunity={opportunity}
      />
    </>
  );
};

export default OpportunityCard;
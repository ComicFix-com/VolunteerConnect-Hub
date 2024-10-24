import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import OpportunityCard from "@/components/OpportunityCard";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Opportunity } from "@/lib/types";

const Index = () => {
  const { isSignedIn, user } = useUser();
  const previousOpportunitiesCount = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [newOpportunity, setNewOpportunity] = useState<Opportunity | null>(null);

  const { data: opportunities = [] } = useQuery<Opportunity[]>({
    queryKey: ["opportunities"],
    queryFn: () => [],
    initialData: [],
  });

  useEffect(() => {
    if (opportunities.length > previousOpportunitiesCount.current) {
      const latest = opportunities[opportunities.length - 1];
      setNewOpportunity(latest);
      toast.info(`New opportunity added: ${latest.title}`, {
        description: `${latest.organization} is looking for volunteers!`
      });
    }
    previousOpportunitiesCount.current = opportunities.length;
  }, [opportunities]);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchTerms = searchQuery.toLowerCase();
    return (
      opportunity.title.toLowerCase().includes(searchTerms) ||
      opportunity.organization.toLowerCase().includes(searchTerms) ||
      opportunity.description.toLowerCase().includes(searchTerms) ||
      opportunity.category.toLowerCase().includes(searchTerms) ||
      opportunity.location.toLowerCase().includes(searchTerms)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-primary">VolunteerConnect Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Get Started</Button>
                  </SignUpButton>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/admin">
                    <Button variant="outline">Admin Portal</Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference in Your Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with local organizations and find meaningful volunteer opportunities that match your interests and skills.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Input
            type="search"
            placeholder="Search for volunteer opportunities by title, organization, category, or location..."
            className="w-full pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        </div>

        {newOpportunity && (
          <div className="mb-12 bg-primary-foreground border-2 border-primary rounded-lg p-8 shadow-lg animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-primary">New Volunteer Opportunity!</h3>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                Just Added
              </span>
            </div>
            <div className="max-w-2xl mx-auto">
              <OpportunityCard opportunity={newOpportunity} />
            </div>
          </div>
        )}

        {filteredOpportunities.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center text-gray-500">
              No opportunities found matching your search criteria.
            </div>
            {newOpportunity && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  Check out our latest opportunity instead:
                </h3>
                <div className="max-w-md mx-auto">
                  <OpportunityCard opportunity={newOpportunity} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

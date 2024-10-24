import { Opportunity } from "./types";

// Initialize opportunities array with localStorage data if it exists
const savedOpportunities = localStorage.getItem('opportunities');
export const mockOpportunities: Opportunity[] = savedOpportunities 
  ? JSON.parse(savedOpportunities) 
  : [];

// Function to save opportunities to localStorage
export const saveOpportunities = (opportunities: Opportunity[]) => {
  localStorage.setItem('opportunities', JSON.stringify(opportunities));
};
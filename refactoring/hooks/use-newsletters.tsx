
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { dummyNewsletters, Newsletter } from "@/data/dummy-data";

export const useGetNewsletters = () => {
  return useQuery({
    queryKey: ["newsletters"],
    queryFn: async (): Promise<Newsletter[]> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter newsletters by 'published' status from dummy data
        const newsletters = dummyNewsletters.filter(newsletter => newsletter.status === 'published');
        console.log(`Successfully fetched ${newsletters.length} newsletters from dummy data`);
        
        return newsletters;
      } catch (err) {
        console.error("Error fetching newsletters:", err);
        toast.error("Failed to load newsletters");
        return [];
      }
    },
    retry: 2,
    retryDelay: 1000,
  });
};

export const useGetNewsletterById = (id: string) => {
  return useQuery({
    queryKey: ["newsletter", id],
    queryFn: async (): Promise<Newsletter | null> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Find newsletter by id from dummy data
        const newsletter = dummyNewsletters.find(
          newsletter => newsletter.id === id && newsletter.status === 'published'
        );
        return newsletter || null;
      } catch (err) {
        console.error("Error fetching newsletter by id:", err);
        toast.error("Failed to load newsletter");
        return null;
      }
    },
    enabled: !!id,
  });
};

export const useGetDashboardNewsletters = (status?: string) => {
  return useQuery({
    queryKey: ["dashboard-newsletters", status],
    queryFn: async (): Promise<Newsletter[]> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Filter newsletters by status if provided
        let newsletters = dummyNewsletters;
        if (status && status !== 'all') {
          newsletters = dummyNewsletters.filter(newsletter => newsletter.status === status);
        }
        
        return newsletters;
      } catch (err) {
        console.error("Error fetching dashboard newsletters:", err);
        toast.error("Failed to load dashboard newsletters");
        return [];
      }
    },
  });
};

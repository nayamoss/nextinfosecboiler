
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { Post } from "@/hooks/use-posts";
import { dummyEnrichedPosts } from "@/data/dummy-data";

export type EnrichedPost = Post & {
  enriched_data: {
    github: {
      stars: number;
      forks: number;
      lastCommit: string;
      contributors: number;
    } | null;
    related_resources: {
      title: string;
      url: string;
    }[];
    reading_time: string;
  }
};

export const useGetEnrichedPosts = (tag?: string) => {
  return useQuery({
    queryKey: ["enriched-posts", tag],
    queryFn: async (): Promise<EnrichedPost[]> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Filter by tag if provided
        let posts = dummyEnrichedPosts;
        if (tag) {
          posts = dummyEnrichedPosts.filter(post => post.tag === tag);
        }
        
        console.log(`Successfully fetched ${posts.length} enriched posts from dummy data`);
        return posts;
      } catch (err) {
        console.error("Unexpected error fetching enriched posts:", err);
        toast.error("Failed to load enriched articles");
        return [];
      }
    },
    retry: 2,
    retryDelay: 1000,
  });
};

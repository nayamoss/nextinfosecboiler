
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { dummyPosts, dummyDashboardPosts } from "@/data/dummy-data";

export type Post = {
  id: string;
  title: string;
  meta_description: string;
  publish_date: string;
  header_image: string;
  slug: string;
  tag: string;
  status: string;
  content: string;
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[]> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter posts by 'golive' status from dummy data
        const posts = dummyPosts.filter(post => post.status === 'golive');
        console.log(`Successfully fetched ${posts.length} posts from dummy data`);
        
        return posts;
      } catch (err) {
        console.error("Error fetching posts:", err);
        toast.error("Failed to load articles");
        return [];
      }
    },
    retry: 2,
    retryDelay: 1000,
  });
};

export const useGetPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async (): Promise<Post | null> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Find post by slug from dummy data
        const post = dummyPosts.find(post => post.slug === slug && post.status === 'golive');
        return post || null;
      } catch (err) {
        console.error("Error fetching post by slug:", err);
        toast.error("Failed to load article");
        return null;
      }
    },
    enabled: !!slug,
  });
};

export const useGetDashboardPosts = (status?: string) => {
  return useQuery({
    queryKey: ["dashboard-posts", status],
    queryFn: async (): Promise<Post[]> => {
      try {
        // Simulate network request delay
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Filter posts by status if provided
        let posts = dummyDashboardPosts;
        if (status && status !== 'all') {
          posts = dummyDashboardPosts.filter(post => post.status === status);
        }
        
        return posts;
      } catch (err) {
        console.error("Error fetching dashboard posts:", err);
        toast.error("Failed to load dashboard posts");
        return [];
      }
    },
  });
};


import { useQuery } from "@tanstack/react-query";
import { dummyDashboardPosts } from "@/data/dummy-data";

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ['dashboard-post', id],
    queryFn: async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const post = dummyDashboardPosts.find(post => post.id === id);
      if (!post) throw new Error('Post not found');
      return post;
    },
    enabled: !!id,
  });
};


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPosts } from '@/hooks/use-posts';
import { Loader2, Filter } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import SiteLayout from '@/components/SiteLayout';
import SearchBar from '@/components/SearchBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Index = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data: posts, isLoading } = useGetPosts();
  
  const availableTags = React.useMemo(() => {
    if (!posts) return [];
    
    const tags = posts.map(post => post.tag);
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags;
  }, [posts]);
  
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    if (!selectedTag) return posts;
    
    return posts.filter(post => post.tag === selectedTag);
  }, [posts, selectedTag]);

  const handleTagSelect = (value: string) => {
    setSelectedTag(value === 'all' ? null : value);
  };
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };
  
  return (
    <SiteLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Security for the Rest of Us</h1>
          <p className="text-lg text-muted-foreground">
            Essential security guides and best practices for developers
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <SearchBar className="w-full sm:w-auto flex-grow max-w-md" />
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedTag || 'all'} onValueChange={handleTagSelect}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {availableTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge 
                variant={!selectedTag ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {availableTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={selectedTag === tag ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default Index;

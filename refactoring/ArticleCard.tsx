
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from '@/hooks/use-posts';
import PostDate from './PostDate';
import ReadingTime from './ReadingTime';
import PostTag from './PostTag';

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'AI': '🤖',
    'Basics': '📚',
    'Best Practice': '✅',
    'Coding': '💻',
    'Data Protection': '🔒',
    'Deployments': '🚀',
    'Encryption': '🔐',
  };

  return icons[category] || '📝';
};

type ArticleCardProps = {
  post: Post;
};

const ArticleCard = ({ post }: ArticleCardProps) => {
  const icon = getCategoryIcon(post.tag);

  return (
    <Link to={`/${post.slug}`} className="block h-full transition-all hover:scale-[1.01]">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="relative h-48 w-full overflow-hidden">
          {post.header_image ? (
            <img
              src={post.header_image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-4xl">{icon}</span>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-xl font-bold dark:text-white">{post.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300">{post.meta_description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-4 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <PostDate dateString={post.publish_date} />
            <span className="mx-2">•</span>
            <ReadingTime content={post.content} />
          </div>
          <PostTag tag={post.tag} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;

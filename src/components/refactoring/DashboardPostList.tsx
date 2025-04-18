// Refactored copy for Next.js migration. Original remains unchanged.

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, FileEdit } from 'lucide-react';
import { useGetDashboardPosts } from '@/hooks/use-posts';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

// Refactored for Next.js: replaced react-router-dom Link with next/link, preserved all original logic.

const statusOptions = [
  { value: 'all', label: 'All Posts' },
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'golive', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const DashboardPostList = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const { data: posts, isLoading, error } = useGetDashboardPosts(statusFilter !== 'all' ? statusFilter : undefined);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value === 'all' ? undefined : value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <p>Error loading posts. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <FileEdit className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>
      {posts && posts.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'golive' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : post.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : post.status === 'review'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {post.status === 'golive' ? 'Published' : 
                        post.status === 'draft' ? 'Draft' : 
                        post.status === 'review' ? 'In Review' : 
                        post.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {post.publish_date ? format(new Date(post.publish_date), 'MMM d, yyyy') : 'Not scheduled'}
                  </TableCell>
                  <TableCell>{post.tag || 'Uncategorized'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/posts/${post.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 dark:text-red-400 hover:dark:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="mb-4 text-gray-500 dark:text-gray-400">No posts found</p>
          <Button asChild>
            <Link href="/dashboard/posts/new">Create your first post</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardPostList;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDashboardNewsletters } from '@/hooks/use-newsletters';
import { 
  Edit, 
  Plus, 
  Trash2,
  Eye, 
  Filter 
} from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PostDate from '@/components/PostDate';
import PostTag from '@/components/PostTag';

const DashboardNewsletters = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { data: newsletters, isLoading } = useGetDashboardNewsletters(statusFilter);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    }
  };

  return (
    <div className="container p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Newsletters</h1>
        <Button asChild>
          <Link to="/dashboard/newsletters/new">
            <Plus className="mr-2 h-4 w-4" /> New Newsletter
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('published')}>Published</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="text-center py-6">Loading newsletters...</div>
      ) : newsletters && newsletters.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="font-medium">{newsletter.title}</TableCell>
                  <TableCell>
                    <PostTag tag={newsletter.tag} />
                  </TableCell>
                  <TableCell>
                    <PostDate dateString={newsletter.publish_date} />
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(newsletter.status)}`}>
                      {newsletter.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/newsletters/${newsletter.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/dashboard/newsletters/${newsletter.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      >
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
        <div className="text-center py-6 border rounded-md">
          <p className="text-gray-500 dark:text-gray-400">No newsletters found</p>
        </div>
      )}
    </div>
  );
};

export default DashboardNewsletters;

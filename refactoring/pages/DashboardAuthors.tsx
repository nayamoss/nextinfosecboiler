
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Edit, 
  Plus, 
  Trash2,
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
import { Link } from 'react-router-dom';

// Dummy author data
const dummyAuthors = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@securityblog.com",
    role: "Admin",
    articles: 12,
    bio: "Security researcher with 10+ years of experience in application security",
  },
  {
    id: "2",
    name: "Sarah Thompson",
    email: "sarah@securityblog.com",
    role: "Editor",
    articles: 8,
    bio: "Former pentester and current security advocate focusing on cloud security",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@securityblog.com",
    role: "Contributor",
    articles: 5,
    bio: "DevSecOps engineer specializing in container security and CI/CD pipelines",
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    email: "emma@securityblog.com",
    role: "Contributor",
    articles: 3,
    bio: "Cryptography expert and privacy advocate with focus on secure communications",
  }
];

const useGetAuthors = (role?: string) => {
  return useQuery({
    queryKey: ["authors", role],
    queryFn: async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter authors by role if provided
      let authors = dummyAuthors;
      if (role && role !== 'all') {
        authors = dummyAuthors.filter(author => author.role === role);
      }
      
      return authors;
    },
  });
};

const DashboardAuthors = () => {
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const { data: authors, isLoading } = useGetAuthors(roleFilter);

  return (
    <div className="container p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Button asChild>
          <Link to="/dashboard/authors/new">
            <Plus className="mr-2 h-4 w-4" /> New Author
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Role: {roleFilter === 'all' ? 'All' : roleFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setRoleFilter('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleFilter('Admin')}>Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleFilter('Editor')}>Editor</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleFilter('Contributor')}>Contributor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="text-center py-6">Loading authors...</div>
      ) : authors && authors.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">{author.name}</TableCell>
                  <TableCell>{author.email}</TableCell>
                  <TableCell>{author.role}</TableCell>
                  <TableCell>{author.articles}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/dashboard/authors/${author.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive/80"
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
          <p className="text-muted-foreground">No authors found</p>
        </div>
      )}
    </div>
  );
};

export default DashboardAuthors;

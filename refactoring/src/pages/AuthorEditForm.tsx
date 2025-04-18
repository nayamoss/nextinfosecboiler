
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Dummy author data for edit form
const dummyAuthors = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@securityblog.com",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Security researcher with 10+ years of experience in application security",
    twitter: "@alexjsec",
    github: "alexjsec",
    website: "https://alexjohnson.security"
  },
  {
    id: "2",
    name: "Sarah Thompson",
    email: "sarah@securityblog.com",
    role: "Editor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Former pentester and current security advocate focusing on cloud security",
    twitter: "@sarahtsec",
    github: "sarahtsec",
    website: "https://sarahthompson.tech"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@securityblog.com",
    role: "Contributor",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "DevSecOps engineer specializing in container security and CI/CD pipelines",
    twitter: "@michaelcsec",
    github: "michaelc",
    website: "https://michael-chen.dev"
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    email: "emma@securityblog.com",
    role: "Contributor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    bio: "Cryptography expert and privacy advocate with focus on secure communications",
    twitter: "@emmacrypto",
    github: "emmarodriguez",
    website: "https://emma-rodriguez.io"
  }
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Must be a valid email address' }),
  role: z.string(),
  avatar: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
  twitter: z.string().optional().or(z.literal('')),
  github: z.string().optional().or(z.literal('')),
  website: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const useGetAuthorById = (id: string) => {
  return useQuery({
    queryKey: ['author', id],
    queryFn: async () => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const author = dummyAuthors.find(author => author.id === id);
      if (!author) throw new Error('Author not found');
      return author;
    },
    enabled: !!id,
  });
};

const AuthorEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: author, isLoading } = useGetAuthorById(id || '');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      avatar: '',
      bio: '',
      twitter: '',
      github: '',
      website: '',
    },
  });

  // Update form values when author data is loaded
  React.useEffect(() => {
    if (author) {
      form.reset({
        name: author.name,
        email: author.email,
        role: author.role,
        avatar: author.avatar,
        bio: author.bio,
        twitter: author.twitter,
        github: author.github,
        website: author.website,
      });
    }
  }, [author, form]);

  const onSubmit = (values: FormValues) => {
    console.log('Saving author:', values);
    
    // Simulate saving
    setTimeout(() => {
      toast.success('Author saved successfully');
      navigate('/dashboard/authors');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!author && !isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Author not found</h2>
        <p className="mt-2">The author you're trying to edit doesn't exist.</p>
        <Button 
          onClick={() => navigate('/dashboard/authors')}
          className="mt-4"
        >
          Back to Authors
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl p-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Author</h1>
        <p className="text-muted-foreground">Update author information and profile details.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The author's role determines their permissions on the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/avatar.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  The URL to the author's profile picture.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Author biography" 
                    {...field} 
                    rows={4} 
                  />
                </FormControl>
                <FormDescription>
                  A short biography that describes the author's expertise and background.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard/authors')}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthorEditForm;

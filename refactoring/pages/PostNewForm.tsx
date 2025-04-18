
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/sonner';
import { Save } from 'lucide-react';

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
import TipTapEditor from '@/components/TipTapEditor';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  meta_description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tag: z.string().min(1, { message: 'Tag is required' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  header_image: z.string().url({ message: 'Must be a valid URL' }),
  status: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const PostNewForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      meta_description: '',
      tag: '',
      content: '',
      slug: '',
      header_image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      status: 'draft',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('Creating new post:', values);
    
    // Simulate saving
    setTimeout(() => {
      toast.success('Post created successfully');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="container max-w-4xl p-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">Create a new article for your security blog.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of your post as it will appear to readers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter meta description" 
                    {...field} 
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  A brief description for search engines and social media.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="post-url-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL-friendly version of the title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="Basics, Best Practice, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    The category of this post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="header_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  The main image that will be displayed at the top of your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TipTapEditor 
                    content={field.value} 
                    onChange={field.onChange}
                    placeholder="Write your post content here..."
                  />
                </FormControl>
                <FormDescription>
                  The main content of your post. Use the toolbar to format your text and add media.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="golive">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The current status of your post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostNewForm;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';
import { dummyNewsletters } from '@/data/dummy-data';
import { Loader2, Save } from 'lucide-react';
import TipTapEditor from '@/components/TipTapEditor';

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

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tag: z.string().min(1, { message: 'Tag is required' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  status: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const useGetNewsletterById = (id: string) => {
  return useQuery({
    queryKey: ['dashboard-newsletter', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newsletter = dummyNewsletters.find(newsletter => newsletter.id === id);
      if (!newsletter) throw new Error('Newsletter not found');
      return newsletter;
    },
    enabled: !!id,
  });
};

const NewsletterEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: newsletter, isLoading } = useGetNewsletterById(id || '');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tag: '',
      content: '',
      status: 'draft',
    },
  });

  React.useEffect(() => {
    if (newsletter) {
      form.reset({
        title: newsletter.title,
        description: newsletter.description,
        tag: newsletter.tag,
        content: newsletter.content,
        status: newsletter.status,
      });
    }
  }, [newsletter, form]);

  const onSubmit = (values: FormValues) => {
    console.log('Saving newsletter:', values);
    
    setTimeout(() => {
      toast.success('Newsletter saved successfully');
      navigate('/dashboard/newsletters');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!newsletter && !isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Newsletter not found</h2>
        <p className="mt-2">The newsletter you're trying to edit doesn't exist.</p>
        <Button 
          onClick={() => navigate('/dashboard/newsletters')}
          className="mt-4"
        >
          Back to Newsletters
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl p-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Newsletter</h1>
        <p className="text-gray-500 dark:text-gray-400">Make changes to your newsletter and save them when you're done.</p>
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
                  <Input placeholder="Enter newsletter title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of your newsletter as it will appear to subscribers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter newsletter description" 
                    {...field} 
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of what this newsletter issue covers.
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
                  <Input placeholder="Weekly, Monthly, Alert, etc." {...field} />
                </FormControl>
                <FormDescription>
                  The type or category of this newsletter.
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
                    placeholder="Write your newsletter content here..."
                  />
                </FormControl>
                <FormDescription>
                  The main content of your newsletter. Use the toolbar to format your text and add media.
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
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The current status of your newsletter.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard/newsletters')}
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

export default NewsletterEditForm;

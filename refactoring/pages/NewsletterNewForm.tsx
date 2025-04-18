
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
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tag: z.string().min(1, { message: 'Tag is required' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  status: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const NewsletterNewForm = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tag: 'Monthly',
      content: '',
      status: 'draft',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log('Creating new newsletter:', values);
    
    // Simulate saving
    setTimeout(() => {
      toast.success('Newsletter created successfully');
      navigate('/dashboard/newsletters');
    }, 1000);
  };

  return (
    <div className="container max-w-4xl p-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Newsletter</h1>
        <p className="text-muted-foreground">Create a new newsletter issue for your subscribers.</p>
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select newsletter frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The type or frequency of this newsletter.
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
              <Save className="mr-2 h-4 w-4" /> Create Newsletter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewsletterNewForm;

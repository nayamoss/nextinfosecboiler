
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TipTapEditor from '@/components/TipTapEditor';
import { UseFormReturn } from 'react-hook-form';
import { PostFormValues } from '@/types/post-form';

interface PostContentFieldsProps {
  form: UseFormReturn<PostFormValues>;
}

const PostContentFields = ({ form }: PostContentFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default PostContentFields;

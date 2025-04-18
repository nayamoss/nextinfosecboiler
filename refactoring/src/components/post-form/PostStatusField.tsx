
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { PostFormValues } from '@/types/post-form';

interface PostStatusFieldProps {
  form: UseFormReturn<PostFormValues>;
}

const PostStatusField = ({ form }: PostStatusFieldProps) => {
  return (
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
  );
};

export default PostStatusField;


import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  meta_description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tag: z.string().min(1, { message: 'Tag is required' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  header_image: z.string().url({ message: 'Must be a valid URL' }),
  status: z.string(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

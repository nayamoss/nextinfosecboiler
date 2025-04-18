
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/sonner';
import { Form } from '@/components/ui/form';

// Import our new components
import PostFormHeader from '@/components/post-form/PostFormHeader';
import PostMetaFields from '@/components/post-form/PostMetaFields';
import PostContentFields from '@/components/post-form/PostContentFields';
import PostStatusField from '@/components/post-form/PostStatusField';
import PostFormActions from '@/components/post-form/PostFormActions';
import PostFormSkeleton from '@/components/post-form/PostFormSkeleton';
import PostNotFound from '@/components/post-form/PostNotFound';

// Import types and hooks
import { postFormSchema, PostFormValues } from '@/types/post-form';
import { useGetPostById } from '@/hooks/use-post-form';

const PostEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetPostById(id || '');
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      meta_description: '',
      tag: '',
      content: '',
      slug: '',
      header_image: '',
      status: 'draft',
    },
  });

  React.useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        meta_description: post.meta_description,
        tag: post.tag,
        content: post.content,
        slug: post.slug,
        header_image: post.header_image,
        status: post.status,
      });
    }
  }, [post, form]);

  const onSubmit = (values: PostFormValues) => {
    console.log('Saving post:', values);
    
    setTimeout(() => {
      toast.success('Post saved successfully');
      navigate('/dashboard');
    }, 1000);
  };

  if (isLoading) {
    return <PostFormSkeleton />;
  }

  if (!post && !isLoading) {
    return (
      <PostNotFound 
        redirectPath="/dashboard" 
        redirectLabel="Back to Dashboard" 
      />
    );
  }

  return (
    <div className="container max-w-4xl p-0">
      <PostFormHeader 
        title="Edit Post" 
        description="Make changes to your post and save them when you're done."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PostMetaFields form={form} />
          <PostContentFields form={form} />
          <PostStatusField form={form} />
          <PostFormActions submitLabel="Save Changes" />
        </form>
      </Form>
    </div>
  );
};

export default PostEditForm;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paintbrush, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';
import SiteLayout from '@/components/SiteLayout';
import ImageResult from '@/components/ImageResult';
import { supabase } from '@/integrations/supabase/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const promptSchema = z.object({
  prompt: z.string()
    .min(10, { message: "Prompt must be at least 10 characters" })
    .max(500, { message: "Prompt must be no more than 500 characters" }),
});

type FormValues = z.infer<typeof promptSchema>;

const ImageGenerator = () => {
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [generationId, setGenerationId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { data: imageData, isLoading, error, refetch } = useQuery({
    queryKey: ['generate-image', generationId],
    queryFn: async () => {
      if (!generationId) return null;
      
      // Check if the prediction is complete
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { id: generationId },
      });

      if (error) throw error;
      return data;
    },
    enabled: !!generationId,
    refetchInterval: (data) => {
      // Fix: Check if data exists and if it has a status property
      if (data && 'status' in data && data.status === 'processing') return 2000;
      return false;
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLastPrompt(values.prompt);
      setGenerationId(null);
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt: values.prompt },
      });

      if (error) throw error;
      setGenerationId(data.id);
      
      // Reset the form
      form.reset();
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Failed to generate image');
    }
  };

  // Determine the image URL if available
  const imageUrl = imageData?.output?.[0] || null;
  
  // Format error message if there is one
  const errorMessage = error ? (error instanceof Error ? error.message : 'An unknown error occurred') : null;

  return (
    <SiteLayout>
      <div className="container mx-auto py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Image Generator</h1>
          <p className="text-muted-foreground">
            Create custom images using AI. Describe what you want to see,
            and our system will generate it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Create an Image</CardTitle>
                <CardDescription>
                  Describe the image you want to generate in detail.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prompt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A cyberpunk cityscape at night with neon lights and flying cars..."
                              {...field}
                              rows={6}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Paintbrush className="mr-2 h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <ImageResult 
              imageUrl={imageUrl} 
              isLoading={isLoading} 
              error={errorMessage}
            />
            {lastPrompt && !isLoading && !error && !imageUrl && (
              <div className="text-center mt-4 text-sm text-muted-foreground">
                <p>Prompt: "{lastPrompt}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ImageGenerator;

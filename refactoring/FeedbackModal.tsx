
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

type FeedbackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  contentTitle?: string;
  articleTitle?: string; // Added articleTitle prop
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  placeholderText?: string;
  successMessage?: string;
  onSubmit?: (feedback: string) => Promise<void> | void;
  minLength?: number;
};

/**
 * A reusable feedback modal component that can be used across React and Next.js projects
 */
const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  open, 
  onOpenChange,
  title = "Share Your Feedback",
  contentTitle,
  articleTitle, // Use articleTitle if provided
  description = "Help us understand what didn't work for you.",
  submitButtonText = "Submit Feedback",
  cancelButtonText = "Cancel",
  placeholderText = "Please share your thoughts...",
  successMessage = "Feedback submitted successfully!",
  onSubmit,
  minLength = 1
}) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If articleTitle is provided but contentTitle is not, use articleTitle as contentTitle
  const displayContentTitle = contentTitle || articleTitle;

  const handleSubmit = async () => {
    if (feedback.trim().length < minLength) return;
    
    try {
      setIsSubmitting(true);
      
      // If onSubmit is provided, call it
      if (onSubmit) {
        await onSubmit(feedback);
      } else {
        // Default behavior: log feedback and show toast
        console.log('Feedback submitted:', feedback);
      }
      
      toast.success(successMessage);
      setFeedback('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {displayContentTitle && <span className="font-medium"> "{displayContentTitle}"</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <textarea
            className="w-full min-h-[150px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder={placeholderText}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            {cancelButtonText}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={feedback.trim().length < minLength || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;

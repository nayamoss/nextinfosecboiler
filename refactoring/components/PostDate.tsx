
import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';

type DateFormat = 'relative' | 'absolute' | 'custom';

type PostDateProps = {
  dateString: string | null;
  format?: DateFormat;
  customFormat?: string;
  fallbackText?: string;
  className?: string;
};

/**
 * A reusable component for formatting dates in various ways
 * 
 * @param dateString - The date string to format
 * @param format - The format type: 'relative' (e.g., "2 days ago"), 'absolute' (e.g., "Jan 1, 2023"), or 'custom'
 * @param customFormat - A custom date-fns format string to use when format is 'custom'
 * @param fallbackText - Text to display if dateString is null/invalid
 * @param className - Optional additional classes
 */
const PostDate: React.FC<PostDateProps> = ({ 
  dateString, 
  format: dateFormat = 'relative',
  customFormat = 'MMM d, yyyy',
  fallbackText = "Recently",
  className = "text-sm text-gray-500 dark:text-gray-400"
}) => {
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return fallbackText;
    
    try {
      const date = new Date(dateStr);
      
      if (dateFormat === 'relative') {
        return formatDistanceToNow(date, { addSuffix: true });
      } else if (dateFormat === 'absolute') {
        return format(date, 'MMM d, yyyy');
      } else if (dateFormat === 'custom' && customFormat) {
        return format(date, customFormat);
      }
      
      return format(date, customFormat);
    } catch (error) {
      console.error("Error formatting date:", error);
      return fallbackText;
    }
  };

  return (
    <span className={className}>
      {formatDate(dateString)}
    </span>
  );
};

export default PostDate;

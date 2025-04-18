
import React from 'react';

type ReadingTimeProps = {
  content: string;
};

const ReadingTime: React.FC<ReadingTimeProps> = ({ content }) => {
  const calculateReadingTime = (text: string): string => {
    if (!text) return "2 min read";
    
    // Average reading speed is about 200-250 words per minute
    const wordsPerMinute = 225;
    
    // Count words
    const words = text.trim().split(/\s+/).length;
    
    // Calculate reading time in minutes
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    
    return `${minutes} min read`;
  };

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {calculateReadingTime(content)}
    </span>
  );
};

export default ReadingTime;

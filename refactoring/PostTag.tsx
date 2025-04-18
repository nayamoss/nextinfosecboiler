
import React from 'react';

type TagColorMapping = Record<string, string>;

type PostTagProps = {
  tag: string;
  colorMapping?: TagColorMapping;
  className?: string;
};

/**
 * A reusable tag component with customizable color mappings
 * 
 * @param tag - The tag name to display
 * @param colorMapping - Optional custom color mapping for tags
 * @param className - Optional additional classes
 */
const PostTag: React.FC<PostTagProps> = ({ tag, colorMapping, className = '' }) => {
  // Default color mapping that can be overridden
  const defaultColorMap: TagColorMapping = {
    'Basics': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Best Practice': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    'Encryption': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Coding': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'AI': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'Deployments': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'Data Protection': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Weekly': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'Monthly': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'Quarterly': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
    'Alert': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
    'Cloud': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  };
  
  // Use custom color mapping if provided, otherwise use default
  const tagColorMap = colorMapping || defaultColorMap;
  
  // Get the color class for the tag, or use a default if not found
  const getTagColor = (tagName: string) => {
    return tagColorMap[tagName] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getTagColor(tag)} ${className}`}>
      {tag}
    </span>
  );
};

export default PostTag;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PostFormHeaderProps {
  title: string;
  description: string;
  isNewPost?: boolean;
}

const PostFormHeader = ({ title, description, isNewPost = false }: PostFormHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      {!isNewPost && (
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mt-2 p-0 h-auto text-primary"
        >
          Back to Dashboard
        </Button>
      )}
    </div>
  );
};

export default PostFormHeader;

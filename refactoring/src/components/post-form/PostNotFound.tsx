
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PostNotFoundProps {
  redirectPath: string;
  redirectLabel: string;
}

const PostNotFound = ({ redirectPath, redirectLabel }: PostNotFoundProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Post not found</h2>
      <p className="mt-2">The post you're trying to edit doesn't exist.</p>
      <Button 
        onClick={() => navigate(redirectPath)}
        className="mt-4"
      >
        {redirectLabel}
      </Button>
    </div>
  );
};

export default PostNotFound;

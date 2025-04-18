
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface PostFormActionsProps {
  submitLabel: string;
  cancelPath?: string;
}

const PostFormActions = ({ submitLabel, cancelPath = '/dashboard' }: PostFormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate(cancelPath)}
      >
        Cancel
      </Button>
      <Button type="submit">
        <Save className="mr-2 h-4 w-4" /> {submitLabel}
      </Button>
    </div>
  );
};

export default PostFormActions;


import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageResultProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  alt?: string;
  downloadEnabled?: boolean;
  downloadFilenamePrefix?: string;
  loadingMessage?: string;
  loadingTimeMessage?: string;
  className?: string;
  imageClassName?: string;
  skeletonClassName?: string;
  buttonClassName?: string;
  errorClassName?: string;
  renderCustomError?: (error: string) => React.ReactNode;
  renderCustomLoading?: () => React.ReactNode;
}

/**
 * A reusable component for displaying images with loading, error, and download states
 */
const ImageResult: React.FC<ImageResultProps> = ({ 
  imageUrl, 
  isLoading, 
  error,
  alt = "Generated image",
  downloadEnabled = true,
  downloadFilenamePrefix = "ai-generated",
  loadingMessage = "Generating your image...",
  loadingTimeMessage = "This may take 15-30 seconds",
  className = "",
  imageClassName = "w-full h-auto object-contain",
  skeletonClassName = "w-full aspect-square rounded-lg mb-4",
  buttonClassName = "absolute bottom-2 right-2 opacity-90 hover:opacity-100",
  errorClassName = "border border-destructive bg-destructive/10 p-4 rounded-lg text-center",
  renderCustomError,
  renderCustomLoading
}) => {
  const handleDownload = () => {
    if (!imageUrl || !downloadEnabled) return;
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${downloadFilenamePrefix}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    if (renderCustomLoading) {
      return renderCustomLoading();
    }
    
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <Skeleton className={skeletonClassName} />
        <p className="text-muted-foreground text-center">{loadingMessage}</p>
        <p className="text-xs text-muted-foreground mt-1">{loadingTimeMessage}</p>
      </div>
    );
  }

  if (error) {
    if (renderCustomError) {
      return renderCustomError(error);
    }
    
    return (
      <div className={`${errorClassName} ${className}`}>
        <p className="text-destructive font-medium">Error</p>
        <p className="text-sm text-destructive/80">{error}</p>
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-full overflow-hidden rounded-lg border border-border">
        <img 
          src={imageUrl} 
          alt={alt} 
          className={imageClassName}
        />
        {downloadEnabled && (
          <Button 
            size="icon"
            variant="secondary"
            className={buttonClassName}
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageResult;


import React from 'react';
import { Theme } from '@/hooks/use-theme';

interface ElementPreviewProps {
  theme: Theme;
  elementType: 'text' | 'heading' | 'link' | 'button' | 'card' | 'badge' | 'background';
}

const ElementPreview: React.FC<ElementPreviewProps> = ({ theme, elementType }) => {
  const isDark = theme.mode === 'dark' || 
    (theme.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const getElementPreview = () => {
    switch (elementType) {
      case 'text':
        return (
          <div className="p-4 rounded" style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            color: theme.customColors.text
          }}>
            <p style={{ fontSize: theme.fontSize === 'small' ? '0.9rem' : theme.fontSize === 'large' ? '1.1rem' : '1rem' }}>
              Sample text using the selected text color and font size. This is how regular text will appear throughout your site.
            </p>
          </div>
        );
      
      case 'heading':
        return (
          <div className="p-4 rounded" style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
          }}>
            <h2 style={{ 
              color: theme.customColors.primary,
              fontSize: theme.fontSize === 'small' ? '1.6rem' : theme.fontSize === 'large' ? '2rem' : '1.8rem',
              fontWeight: 'bold'
            }}>
              Sample Heading
            </h2>
            <p style={{ color: theme.customColors.text }}>This shows how headings will appear with the primary color.</p>
          </div>
        );
      
      case 'link':
        return (
          <div className="p-4 rounded" style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            color: theme.customColors.text
          }}>
            <p>
              Text with a <a href="#" style={{ color: theme.customColors.primary, textDecoration: 'underline' }}>sample link</a> using the primary color.
              <br /><br />
              Text with a <a href="#" style={{ color: theme.customColors.secondary, textDecoration: 'underline' }}>sample link</a> using the secondary color.
            </p>
          </div>
        );
      
      case 'button':
        return (
          <div className="p-4 rounded space-y-3" style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
          }}>
            <button style={{ 
              backgroundColor: theme.customColors.primary, 
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}>
              Primary Button
            </button>
            <div>
              <button style={{ 
                backgroundColor: theme.customColors.secondary, 
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                Secondary Button
              </button>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div style={{ 
            padding: '1rem',
            borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
          }}>
            <div style={{ color: theme.customColors.primary, fontWeight: 'bold', marginBottom: '0.5rem' }}>Card Title</div>
            <p style={{ color: theme.customColors.text, marginBottom: '1rem' }}>This is a sample card that shows how cards will look with your selected colors and border radius.</p>
            <button style={{ 
              backgroundColor: theme.customColors.primary, 
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}>
              Action
            </button>
          </div>
        );
      
      case 'badge':
        return (
          <div className="p-4 rounded space-x-2" style={{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
          }}>
            <span style={{ 
              backgroundColor: theme.customColors.primary, 
              color: '#fff',
              padding: '0.25rem 0.5rem',
              borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
              fontSize: '0.75rem'
            }}>
              Primary Badge
            </span>
            <span style={{ 
              backgroundColor: theme.customColors.secondary, 
              color: '#fff',
              padding: '0.25rem 0.5rem',
              borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
              fontSize: '0.75rem'
            }}>
              Secondary Badge
            </span>
          </div>
        );
      
      case 'background':
        return (
          <div className="p-4 flex flex-col items-center justify-center h-full" style={{ 
            backgroundColor: theme.customColors.background, 
            color: theme.customColors.text,
            borderRadius: theme.borderRadius === 'none' ? '0' : theme.borderRadius === 'small' ? '0.25rem' : theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}>
            <div className="text-center">
              <p>Background Color</p>
              <p className="text-xs mt-2">This is how your background color will look with your text color.</p>
            </div>
          </div>
        );
        
      default:
        return <div>Select an element type to preview</div>;
    }
  };
  
  return (
    <div className="w-full">
      {getElementPreview()}
    </div>
  );
};

export default ElementPreview;

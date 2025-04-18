
import React from 'react';
import { Theme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ThemePreviewProps {
  theme: Theme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  // Generate CSS based on theme settings
  const previewStyle = {
    '--bg-color': theme.customColors.background,
    '--text-color': theme.customColors.text,
    '--primary-color': theme.customColors.primary,
    '--secondary-color': theme.customColors.secondary,
    '--accent-color': theme.customColors.accent,
    '--border-radius': 
      theme.borderRadius === 'none' ? '0' :
      theme.borderRadius === 'small' ? '0.25rem' :
      theme.borderRadius === 'large' ? '0.75rem' : '0.5rem',
    '--font-size-base': 
      theme.fontSize === 'small' ? '0.9rem' :
      theme.fontSize === 'large' ? '1.1rem' : '1rem',
    '--font-size-heading': 
      theme.fontSize === 'small' ? '1.6rem' :
      theme.fontSize === 'large' ? '2rem' : '1.8rem',
  } as React.CSSProperties;

  // Helper class to simulate theme effect
  const isDark = theme.mode === 'dark' || 
    (theme.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const containerClasses = `
    p-6 
    ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    transition-colors
  `;

  return (
    <div className={containerClasses} style={previewStyle}>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2" style={{ 
              color: 'var(--primary-color)', 
              fontSize: 'var(--font-size-heading)'
            }}>
              Theme Preview
            </h2>
            <p className="text-sm mb-4" style={{ fontSize: 'var(--font-size-base)' }}>
              This is a preview of your theme settings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card style={{ 
                borderRadius: 'var(--border-radius)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--primary-color)' }}>Blog Card</CardTitle>
                  <CardDescription>A preview of a blog card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p style={{ fontSize: 'var(--font-size-base)' }}>
                    This blog explores essential security practices for developers of all levels.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: '#fff',
                    borderRadius: 'var(--border-radius)',
                  }}>
                    Read More
                  </Button>
                </CardFooter>
              </Card>
              
              <Card style={{ 
                borderRadius: 'var(--border-radius)',
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--primary-color)' }}>Newsletter</CardTitle>
                  <CardDescription>Subscribe to our newsletter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Your email address" 
                      style={{ 
                        borderRadius: 'var(--border-radius)',
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                      }}
                    />
                    <Button style={{ 
                      backgroundColor: 'var(--secondary-color)', 
                      color: '#fff',
                      borderRadius: 'var(--border-radius)',
                    }}>
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge style={{ 
                backgroundColor: 'var(--primary-color)', 
                borderRadius: 'var(--border-radius)'
              }}>
                Primary Badge
              </Badge>
              <Badge style={{ 
                backgroundColor: 'var(--secondary-color)', 
                borderRadius: 'var(--border-radius)'
              }}>
                Secondary Badge
              </Badge>
              <Badge style={{ 
                backgroundColor: 'var(--accent-color)', 
                borderRadius: 'var(--border-radius)'
              }}>
                Accent Badge
              </Badge>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="components">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Buttons</h3>
              <div className="flex flex-wrap gap-3 mb-2">
                <Button 
                  style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: '#fff',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  Primary Button
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: 'var(--secondary-color)', 
                    color: '#fff',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  Secondary Button
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: 'var(--accent-color)', 
                    color: '#fff',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  Accent Button
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    border: '1px solid',
                    borderRadius: 'var(--border-radius)',
                  }}
                >
                  Outline Button
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Form Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Text Input</label>
                  <Input
                    placeholder="Enter text" 
                    style={{ 
                      borderRadius: 'var(--border-radius)',
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                    }}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Input
                    placeholder="Search" 
                    style={{ 
                      borderRadius: 'var(--border-radius)',
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                    }}
                  />
                  <Button 
                    style={{ 
                      backgroundColor: 'var(--primary-color)', 
                      color: '#fff',
                      borderRadius: 'var(--border-radius)',
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge style={{ 
                  backgroundColor: 'var(--primary-color)', 
                  borderRadius: 'var(--border-radius)'
                }}>
                  Primary
                </Badge>
                <Badge style={{ 
                  backgroundColor: 'var(--secondary-color)', 
                  borderRadius: 'var(--border-radius)'
                }}>
                  Secondary
                </Badge>
                <Badge style={{ 
                  backgroundColor: 'var(--accent-color)', 
                  borderRadius: 'var(--border-radius)'
                }}>
                  Accent
                </Badge>
                <Badge style={{ 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                  borderRadius: 'var(--border-radius)'
                }}>
                  Subtle
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card style={{ 
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--primary-color)' }}>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here</p>
                  </CardContent>
                  <CardFooter>
                    <Button style={{ 
                      backgroundColor: 'var(--primary-color)', 
                      color: '#fff',
                      borderRadius: 'var(--border-radius)',
                    }}>
                      Action
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="typography">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Headings</h3>
              <div className="space-y-3">
                <h1 style={{ 
                  color: 'var(--primary-color)',
                  fontSize: 'calc(var(--font-size-heading) * 1.5)',
                  fontWeight: 'bold'
                }}>
                  Heading 1
                </h1>
                <h2 style={{ 
                  color: 'var(--primary-color)',
                  fontSize: 'var(--font-size-heading)',
                  fontWeight: 'bold'
                }}>
                  Heading 2
                </h2>
                <h3 style={{ 
                  color: 'var(--primary-color)',
                  fontSize: 'calc(var(--font-size-heading) * 0.8)',
                  fontWeight: 'bold'
                }}>
                  Heading 3
                </h3>
                <h4 style={{ 
                  color: 'var(--primary-color)',
                  fontSize: 'calc(var(--font-size-heading) * 0.7)',
                  fontWeight: 'bold'
                }}>
                  Heading 4
                </h4>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Paragraphs & Links</h3>
              <div className="space-y-4">
                <p style={{ fontSize: 'var(--font-size-base)' }}>
                  This is a regular paragraph of text. The font size and other typography settings
                  can be adjusted in your theme settings.
                </p>
                <p style={{ fontSize: 'var(--font-size-base)' }}>
                  This paragraph includes a{' '}
                  <a href="#" style={{ 
                    color: 'var(--primary-color)',
                    textDecoration: 'underline',
                    fontSize: 'var(--font-size-base)'
                  }}>
                    hyperlink
                  </a>{' '}
                  that uses your primary color.
                </p>
                <blockquote style={{ 
                  borderLeft: `4px solid var(--primary-color)`,
                  paddingLeft: '1rem',
                  fontStyle: 'italic'
                }}>
                  This is a blockquote that uses your primary color for the left border.
                </blockquote>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--primary-color)' }}>Lists</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 style={{ 
                    color: 'var(--primary-color)',
                    fontSize: 'calc(var(--font-size-base) * 1.1)',
                    fontWeight: 'medium',
                    marginBottom: '0.5rem'
                  }}>
                    Unordered List
                  </h4>
                  <ul className="list-disc pl-5" style={{ fontSize: 'var(--font-size-base)' }}>
                    <li>First list item</li>
                    <li>Second list item</li>
                    <li>Third list item with some longer text to demonstrate wrapping</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ 
                    color: 'var(--primary-color)',
                    fontSize: 'calc(var(--font-size-base) * 1.1)',
                    fontWeight: 'medium',
                    marginBottom: '0.5rem'
                  }}>
                    Ordered List
                  </h4>
                  <ol className="list-decimal pl-5" style={{ fontSize: 'var(--font-size-base)' }}>
                    <li>First list item</li>
                    <li>Second list item</li>
                    <li>Third list item with some longer text to demonstrate wrapping</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemePreview;

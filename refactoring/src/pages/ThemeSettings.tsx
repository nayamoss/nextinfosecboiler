
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SettingsSidebar from '@/components/SettingsSidebar';
import { useTheme, Theme } from '@/hooks/use-theme';
import { toast } from '@/components/ui/sonner';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { 
  Home, 
  Info, 
  RefreshCw, 
  Save, 
  Moon, 
  Sun, 
  Monitor, 
  Smartphone,
  Tablet,
  Laptop,
  Palette,
  Type,
  LayoutPanelLeft
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ThemePreview from '@/components/ThemePreview';
import ThemeColorPicker from '@/components/advanced-theme/ThemeColorPicker';
import ElementPreview from '@/components/advanced-theme/ElementPreview';

const ThemeSettings = () => {
  const { theme, setTheme, resetTheme, setMode, setAccent, setFontSize, setBorderRadius, setCustomColor } = useTheme();
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');
  const [headerLogo, setHeaderLogo] = useState('');
  const [footerLogo, setFooterLogo] = useState('');
  const [activeTab, setActiveTab] = useState('appearance');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  
  const [editingTheme, setEditingTheme] = useState<Theme>({ ...theme });
  
  useEffect(() => {
    setEditingTheme({ ...theme });
  }, [theme]);
  
  const handleColorChange = (key: keyof Theme['customColors'], value: string) => {
    setEditingTheme(prev => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [key]: value
      }
    }));
  };
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTheme(editingTheme);
    
    toast("Theme settings saved", {
      description: "Your theme settings have been updated successfully.",
    });
  };
  
  const handleResetTheme = () => {
    resetTheme();
    toast("Theme reset", {
      description: "Theme settings have been reset to defaults.",
    });
  };
  
  return (
    <div className="flex h-full bg-background text-foreground">
      <SettingsSidebar />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Theme Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>
          <p className="text-muted-foreground mb-8">Customize the look and feel of your site</p>
        </div>
        
        <form onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs 
                defaultValue="appearance" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="mb-8"
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Appearance
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Colors
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center gap-2">
                    <Type className="h-4 w-4" /> Typography
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-2">
                    <LayoutPanelLeft className="h-4 w-4" /> Layout
                  </TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="appearance" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mode</CardTitle>
                      <CardDescription>Choose your preferred color mode</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          type="button"
                          variant={editingTheme.mode === 'light' ? 'default' : 'outline'}
                          className="flex flex-col items-center justify-center h-24 w-24 gap-2"
                          onClick={() => setEditingTheme({...editingTheme, mode: 'light'})}
                        >
                          <Sun className="h-8 w-8" />
                          <span>Light</span>
                        </Button>
                        
                        <Button
                          type="button"
                          variant={editingTheme.mode === 'dark' ? 'default' : 'outline'}
                          className="flex flex-col items-center justify-center h-24 w-24 gap-2"
                          onClick={() => setEditingTheme({...editingTheme, mode: 'dark'})}
                        >
                          <Moon className="h-8 w-8" />
                          <span>Dark</span>
                        </Button>
                        
                        <Button
                          type="button"
                          variant={editingTheme.mode === 'system' ? 'default' : 'outline'}
                          className="flex flex-col items-center justify-center h-24 w-24 gap-2"
                          onClick={() => setEditingTheme({...editingTheme, mode: 'system'})}
                        >
                          <Monitor className="h-8 w-8" />
                          <span>System</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Accent Color</CardTitle>
                      <CardDescription>Choose a color scheme for your site</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4">
                        {(['purple', 'blue', 'green', 'orange', 'pink'] as const).map((color) => (
                          <Button
                            key={color}
                            type="button"
                            variant={editingTheme.accent === color ? 'default' : 'outline'}
                            className="flex flex-col items-center justify-center h-16 w-16 gap-2"
                            onClick={() => setEditingTheme({...editingTheme, accent: color})}
                          >
                            <div className={`w-6 h-6 rounded-full bg-${color}-500`} style={{
                              backgroundColor: color === 'purple' ? '#8B5CF6' : 
                                              color === 'blue' ? '#3B82F6' :
                                              color === 'green' ? '#10B981' :
                                              color === 'orange' ? '#F97316' : '#EC4899'
                            }} />
                            <span className="text-xs capitalize">{color}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Border Radius</CardTitle>
                      <CardDescription>Adjust the roundness of UI elements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        {(['none', 'small', 'medium', 'large'] as const).map((radius) => (
                          <Button
                            key={radius}
                            type="button"
                            variant={editingTheme.borderRadius === radius ? 'default' : 'outline'}
                            onClick={() => setEditingTheme({...editingTheme, borderRadius: radius})}
                          >
                            {radius.charAt(0).toUpperCase() + radius.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Colors</CardTitle>
                      <CardDescription>Customize your site's color palette with a live preview</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6">
                      <ThemeColorPicker
                        label="Primary Color"
                        colorKey="primary"
                        value={editingTheme.customColors.primary}
                        onChange={handleColorChange}
                        theme={editingTheme}
                        elementType="button"
                      />
                      
                      <ThemeColorPicker
                        label="Secondary Color"
                        colorKey="secondary"
                        value={editingTheme.customColors.secondary}
                        onChange={handleColorChange}
                        theme={editingTheme}
                        elementType="button"
                      />
                      
                      <ThemeColorPicker
                        label="Accent Color"
                        colorKey="accent"
                        value={editingTheme.customColors.accent}
                        onChange={handleColorChange}
                        theme={editingTheme}
                        elementType="badge"
                      />
                      
                      <ThemeColorPicker
                        label="Background Color"
                        colorKey="background"
                        value={editingTheme.customColors.background}
                        onChange={handleColorChange}
                        theme={editingTheme}
                        elementType="background"
                      />
                      
                      <ThemeColorPicker
                        label="Text Color"
                        colorKey="text"
                        value={editingTheme.customColors.text}
                        onChange={handleColorChange}
                        theme={editingTheme}
                        elementType="text"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Font Size</CardTitle>
                      <CardDescription>Adjust the text size across your site</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          {(['small', 'medium', 'large'] as const).map((size) => (
                            <Button
                              key={size}
                              type="button"
                              variant={editingTheme.fontSize === size ? 'default' : 'outline'}
                              onClick={() => setEditingTheme({...editingTheme, fontSize: size})}
                            >
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t mt-4">
                          <h3 className="text-sm font-medium mb-3">Preview</h3>
                          <div className="p-4 border rounded-md">
                            <ElementPreview theme={editingTheme} elementType="heading" />
                            <div className="mt-4">
                              <ElementPreview theme={editingTheme} elementType="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="layout" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Width</CardTitle>
                      <CardDescription>Adjust the maximum width of the content area</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="content-width" className="mb-2 block text-sm font-medium">
                            Content Max Width (pixels)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="content-width"
                              type="number"
                              min="600"
                              max="2000"
                              value="1200"
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">px</span>
                            <div className="flex-1">
                              <div className="w-full bg-muted h-1 rounded-full">
                                <div
                                  className="bg-primary h-1 rounded-full"
                                  style={{ width: '60%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended: 1200px for desktop layouts
                          </p>
                        </div>
                        
                        <div className="pt-4 border-t mt-4">
                          <Label htmlFor="page-padding" className="mb-2 block text-sm font-medium">
                            Page Padding (pixels)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="page-padding"
                              type="number"
                              min="0"
                              max="100"
                              value="24"
                              className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">px</span>
                            <div className="flex-1">
                              <div className="w-full bg-muted h-1 rounded-full">
                                <div
                                  className="bg-primary h-1 rounded-full"
                                  style={{ width: '24%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Padding around the edges of your page content
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Logo Settings</CardTitle>
                      <CardDescription>Customize your site's logos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="header-logo" className="mb-2 block text-sm font-medium">
                          Header Logo URL
                        </Label>
                        <Input
                          id="header-logo"
                          type="text"
                          value={headerLogo}
                          onChange={(e) => setHeaderLogo(e.target.value)}
                          className="w-full"
                          placeholder="https://example.com/logo.png"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Used in the site header. Recommended height: 40px
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="footer-logo" className="mb-2 block text-sm font-medium">
                          Footer Logo URL
                        </Label>
                        <Input
                          id="footer-logo"
                          type="text"
                          value={footerLogo}
                          onChange={(e) => setFooterLogo(e.target.value)}
                          className="w-full"
                          placeholder="https://example.com/logo-footer.png"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Used in the site footer. Can be different from header logo
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Code</CardTitle>
                      <CardDescription>Add custom CSS and JavaScript</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="custom-css" className="mb-2 block text-sm font-medium">
                          Custom CSS
                        </Label>
                        <Textarea
                          id="custom-css"
                          value={customCSS}
                          onChange={(e) => setCustomCSS(e.target.value)}
                          rows={6}
                          className="w-full font-mono text-sm"
                          placeholder="/* Your custom CSS */"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Additional CSS to customize your site's appearance
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="custom-js" className="mb-2 block text-sm font-medium">
                          Custom JavaScript
                        </Label>
                        <Textarea
                          id="custom-js"
                          value={customJS}
                          onChange={(e) => setCustomJS(e.target.value)}
                          rows={6}
                          className="w-full font-mono text-sm"
                          placeholder="// Your custom JavaScript"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Additional JavaScript to be included in your site
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Live Preview
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={previewMode === 'desktop' ? 'bg-secondary/20' : ''}
                        onClick={() => setPreviewMode('desktop')}
                      >
                        <Laptop className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={previewMode === 'tablet' ? 'bg-secondary/20' : ''}
                        onClick={() => setPreviewMode('tablet')}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={previewMode === 'mobile' ? 'bg-secondary/20' : ''}
                        onClick={() => setPreviewMode('mobile')}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`border rounded overflow-hidden ${
                    previewMode === 'desktop' ? 'w-full' : 
                    previewMode === 'tablet' ? 'w-[768px] max-w-full mx-auto' : 
                    'w-[360px] max-w-full mx-auto'
                  }`}>
                    <ScrollArea className="h-[600px]">
                      <ThemePreview theme={editingTheme} />
                    </ScrollArea>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetTheme}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemeSettings;

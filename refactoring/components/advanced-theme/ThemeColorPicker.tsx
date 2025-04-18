
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Theme } from '@/hooks/use-theme';
import ElementPreview from './ElementPreview';

interface ThemeColorPickerProps {
  label: string;
  colorKey: keyof Theme['customColors'];
  value: string;
  onChange: (key: keyof Theme['customColors'], value: string) => void;
  theme: Theme;
  elementType?: 'text' | 'heading' | 'link' | 'button' | 'card' | 'badge' | 'background';
}

const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  label,
  colorKey,
  value,
  onChange,
  theme,
  elementType,
}) => {
  return (
    <div className="space-y-3 p-4 border rounded-md">
      <div className="flex flex-col space-y-2">
        <Label htmlFor={`color-${colorKey}`} className="font-medium">
          {label}
        </Label>
        
        <div className="flex space-x-2">
          <Input
            id={`color-${colorKey}`}
            type="color"
            value={value}
            onChange={(e) => onChange(colorKey, e.target.value)}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(colorKey, e.target.value)}
            className="flex-1"
            placeholder="#RRGGBB"
          />
        </div>
      </div>
      
      {elementType && (
        <div className="pt-2 mt-2 border-t">
          <Label className="text-sm text-muted-foreground mb-2 block">Preview</Label>
          <ElementPreview theme={theme} elementType={elementType} />
        </div>
      )}
    </div>
  );
};

export default ThemeColorPicker;

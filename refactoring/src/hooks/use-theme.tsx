
import { createContext, useContext, useEffect, useState } from "react";

// Expanded Theme type to include custom themes
type ThemeMode = "dark" | "light" | "system";
type ThemeAccent = "purple" | "blue" | "green" | "orange" | "pink";
type ThemeFontSize = "small" | "medium" | "large";
type ThemeRadius = "none" | "small" | "medium" | "large";

export type Theme = {
  mode: ThemeMode;
  accent: ThemeAccent;
  fontSize: ThemeFontSize;
  borderRadius: ThemeRadius;
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
};

// Default theme configurations
const defaultThemes: Record<ThemeAccent, { light: string; dark: string }> = {
  purple: { 
    light: "#8B5CF6",
    dark: "#7C3AED"
  },
  blue: { 
    light: "#3B82F6",
    dark: "#2563EB"
  },
  green: { 
    light: "#10B981",
    dark: "#059669"
  },
  orange: { 
    light: "#F97316",
    dark: "#EA580C"
  },
  pink: { 
    light: "#EC4899",
    dark: "#DB2777"
  }
};

// Default theme settings
const defaultTheme: Theme = {
  mode: "light",
  accent: "purple",
  fontSize: "medium",
  borderRadius: "medium",
  customColors: {
    primary: "#8B5CF6",
    secondary: "#D946EF",
    accent: "#F97316",
    background: "#FFFFFF",
    text: "#222222"
  }
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  resetTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: ThemeAccent) => void;
  setFontSize: (size: ThemeFontSize) => void;
  setBorderRadius: (radius: ThemeRadius) => void;
  setCustomColor: (key: keyof Theme["customColors"], value: string) => void;
};

const initialState: ThemeProviderState = {
  theme: defaultTheme,
  setTheme: () => null,
  resetTheme: () => null,
  setMode: () => null,
  setAccent: () => null,
  setFontSize: () => null,
  setBorderRadius: () => null,
  setCustomColor: () => null
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme: defaultMode = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Load theme from localStorage or use default
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      try {
        return JSON.parse(storedTheme) as Theme;
      } catch (e) {
        console.error("Failed to parse stored theme:", e);
      }
    }
    return { ...defaultTheme, mode: defaultMode };
  });

  // Apply theme changes to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark");
    
    // Apply mode
    let currentMode = theme.mode;
    if (currentMode === "system") {
      currentMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    
    root.classList.add(currentMode);
    
    // Apply CSS variables for custom colors
    Object.entries(theme.customColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Apply font size
    root.style.setProperty("--font-size-modifier", 
      theme.fontSize === "small" ? "0.9" : 
      theme.fontSize === "large" ? "1.1" : "1");
    
    // Apply border radius
    root.style.setProperty("--border-radius-modifier",
      theme.borderRadius === "none" ? "0" : 
      theme.borderRadius === "small" ? "0.25rem" : 
      theme.borderRadius === "large" ? "0.75rem" : "0.5rem");
      
  }, [theme]);

  // Update theme in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(theme));
  }, [theme, storageKey]);

  const setTheme = (newTheme: Partial<Theme>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    setThemeState({ ...defaultTheme });
  };

  const setMode = (mode: ThemeMode) => {
    setThemeState(prev => ({ ...prev, mode }));
  };

  const setAccent = (accent: ThemeAccent) => {
    // Update accent color and primary color based on selected accent
    const mode = theme.mode === "system" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : theme.mode;
    
    const primaryColor = defaultThemes[accent][mode as "light" | "dark"];
    
    setThemeState(prev => ({
      ...prev,
      accent,
      customColors: {
        ...prev.customColors,
        primary: primaryColor
      }
    }));
  };

  const setFontSize = (fontSize: ThemeFontSize) => {
    setThemeState(prev => ({ ...prev, fontSize }));
  };

  const setBorderRadius = (borderRadius: ThemeRadius) => {
    setThemeState(prev => ({ ...prev, borderRadius }));
  };

  const setCustomColor = (key: keyof Theme["customColors"], value: string) => {
    setThemeState(prev => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [key]: value
      }
    }));
  };

  const value = {
    theme,
    setTheme,
    resetTheme,
    setMode,
    setAccent,
    setFontSize,
    setBorderRadius,
    setCustomColor
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

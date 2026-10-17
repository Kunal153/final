import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'dark' | 'light' | 'colourful' | 'sunset' | 'midnight' | 'emerald' | 'oled';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  category: 'Dark' | 'Light' | 'Colourful';
  description: string;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
  isDark: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'ChatGPT Dark',
    category: 'Dark',
    description: 'Charcoal minimalist dark with subtle graphite borders',
    previewBg: '#212121',
    previewCard: '#2F2F2F',
    previewAccent: '#ECECEC',
    isDark: true
  },
  {
    id: 'light',
    name: 'Minimal Light',
    category: 'Light',
    description: 'Clean paper white with crisp typography & soft borders',
    previewBg: '#FFFFFF',
    previewCard: '#F7F7F8',
    previewAccent: '#18181B',
    isDark: false
  },
  {
    id: 'colourful',
    name: 'Cyber Violet',
    category: 'Colourful',
    description: 'Rich dark violet with neon orchid and sunset accents',
    previewBg: '#130D24',
    previewCard: '#22163D',
    previewAccent: '#C084FC',
    isDark: true
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    category: 'Colourful',
    description: 'Warm espresso base with glowing amber & coral highlights',
    previewBg: '#1A1412',
    previewCard: '#291F1B',
    previewAccent: '#F97316',
    isDark: true
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    category: 'Dark',
    description: 'Deep oceanic blue with crisp cyan and sky highlights',
    previewBg: '#0B1120',
    previewCard: '#152238',
    previewAccent: '#38BDF8',
    isDark: true
  },
  {
    id: 'emerald',
    name: 'Forest Emerald',
    category: 'Dark',
    description: 'Botanical dark pine slate with fresh mint accents',
    previewBg: '#0B1712',
    previewCard: '#142820',
    previewAccent: '#10B981',
    isDark: true
  },
  {
    id: 'oled',
    name: 'Pure OLED Black',
    category: 'Dark',
    description: 'True pitch black (#000000) for OLED panels & zero glow',
    previewBg: '#000000',
    previewCard: '#121212',
    previewAccent: '#FFFFFF',
    isDark: true
  }
];

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  currentThemeConfig: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('enginotes_theme') as AppTheme;
      if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
        return saved;
      }
    }
    return 'dark';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('enginotes_theme', newTheme);
    } catch {
      // ignore storage error
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
      }
    }
  }, [theme]);

  const currentThemeConfig = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

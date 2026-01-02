// lib/theme-utils.ts

export type ThemeColor = "red" | "orange" | "green" | "teal" | "blue" | "purple" | "mono";
export type GradientTheme = "sunset" | "ocean" | "aurora" | "fire" | "forest" | "royal" | "mono";

// export interface ThemeConfig {
//   color: ThemeColor;
//   gradient: GradientTheme | null;
//   font: string;
//   fontSizes: {
//     sm: number;
//     base: number;
//     lg: number;
//     xl: number;
//     xl2: number;
//     xl3: number;
//     xl4: number;
//     xl5: number;
//   };
// }

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  color: "teal",
  gradient: null,
  font: "'Inter', ui-sans-serif, system-ui, sans-serif",
  fontSizes: {
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    xl2: 1.5,
    xl3: 1.875,
    xl4: 2.25,
    xl5: 3,
  },
};

// In your theme-utils.ts, update the ThemeConfig type if needed:
export type ThemeConfig = {
  color: ThemeColor;
  gradient: GradientTheme | null;
  font: string;
  fontSizes: {
    [key: string]: number;
  };
};

// Apply theme to DOM
export function applyTheme(config: Partial<ThemeConfig>): void {
  const root = document.documentElement;
  
  // Clear any preview mode
  root.removeAttribute("data-preview-mode");
  
  // Apply color theme
  if (config.color) {
    root.setAttribute("data-theme", config.color);
  }
  
  // Apply gradient theme
  if (config.gradient) {
    root.setAttribute("data-gradient", config.gradient);
  } else {
    root.removeAttribute("data-gradient");
  }
  
  // Apply font
  if (config.font) {
    root.style.setProperty("--font-sans", config.font);
  }
  
  // Apply font sizes (normalize: accept either rem values (e.g., 1.0) or px values (e.g., 16))
  if (config.fontSizes) {
    Object.entries(config.fontSizes).forEach(([key, value]) => {
      const cssVar = getFontSizeCssVar(key);
      // If value looks like px (>6), convert to rem (divide by 16). Otherwise treat as rem.
      const numeric = Number(value);
      const remValue = Number.isFinite(numeric) ? (numeric > 6 ? numeric / 16 : numeric) : Number(value as any);
      root.style.setProperty(cssVar, `${remValue}rem`);
    });
  }
  
  // Dispatch theme change event
  window.dispatchEvent(new CustomEvent("themechange", { detail: config }));
}

// Reset theme to defaults
export function resetTheme(): void {
  const root = document.documentElement;
  
  // Remove theme attributes
  root.removeAttribute("data-theme");
  root.removeAttribute("data-gradient");
  root.removeAttribute("data-preview-mode");
  
  // Reset to default values
  applyTheme(DEFAULT_THEME_CONFIG);
  
  // Clear localStorage
  Object.keys(DEFAULT_THEME_CONFIG.fontSizes).forEach(key => {
    localStorage.removeItem(`font-size-${key}`);
  });
  localStorage.removeItem("theme-color");
  localStorage.removeItem("theme-gradient");
  localStorage.removeItem("theme-font");
  
  window.dispatchEvent(new CustomEvent("themereset"));
}

// Preview mode for theme customization
export function setPreviewMode(config: Partial<ThemeConfig>): void {
  const root = document.documentElement;
  root.setAttribute("data-preview-mode", "true");
  
  if (config.color) {
    root.style.setProperty("--color-primary", getHSLForTheme(config.color));
  }
  
  if (config.gradient) {
    const gradient = getGradientForTheme(config.gradient);
    if (gradient) {
      root.style.setProperty("--gradient-primary", gradient);
      root.style.setProperty("--gradient-button", gradient);
    }
  }
  
  if (config.font) {
    root.style.setProperty("--font-sans", config.font);
  }
  
  if (config.fontSizes) {
    Object.entries(config.fontSizes).forEach(([key, value]) => {
      const cssVar = getFontSizeCssVar(key);
      // If value looks like px (>6), convert to rem (divide by 16). Otherwise treat as rem.
      const numeric = Number(value);
      const remValue = Number.isFinite(numeric) ? (numeric > 6 ? numeric / 16 : numeric) : Number(value as any);
      root.style.setProperty(cssVar, `${remValue}rem`);
    });
  }
}

export function clearPreviewMode(): void {
  const root = document.documentElement;
  root.removeAttribute("data-preview-mode");
  
  // Remove inline styles
  root.style.removeProperty("--color-primary");
  root.style.removeProperty("--gradient-primary");
  root.style.removeProperty("--gradient-button");
  root.style.removeProperty("--font-sans");
  
  // Remove font size overrides
  Object.keys(DEFAULT_THEME_CONFIG.fontSizes).forEach(key => {
    const cssVar = getFontSizeCssVar(key);
    root.style.removeProperty(cssVar);
  });
}

// Get current theme from localStorage (normalize legacy px values > 6 to rem)
export function getCurrentTheme(): ThemeConfig {
  try {
    const color = (localStorage.getItem("theme-color") as ThemeColor) || DEFAULT_THEME_CONFIG.color;
    const gradient = localStorage.getItem("theme-gradient") as GradientTheme || DEFAULT_THEME_CONFIG.gradient;
    const font = localStorage.getItem("theme-font") || DEFAULT_THEME_CONFIG.font;

    const normalize = (raw: string | null, fallback: number) => {
      const n = parseFloat(raw || String(fallback));
      if (!Number.isFinite(n)) return fallback;
      // Treat numeric values > 6 as px and convert to rem
      return n > 6 ? n / 16 : n;
    };

    return {
      color,
      gradient,
      font,
      fontSizes: {
        sm: normalize(localStorage.getItem("font-size-sm"), DEFAULT_THEME_CONFIG.fontSizes.sm),
        base: normalize(localStorage.getItem("font-size-base"), DEFAULT_THEME_CONFIG.fontSizes.base),
        lg: normalize(localStorage.getItem("font-size-lg"), DEFAULT_THEME_CONFIG.fontSizes.lg),
        xl: normalize(localStorage.getItem("font-size-xl"), DEFAULT_THEME_CONFIG.fontSizes.xl),
        xl2: normalize(localStorage.getItem("font-size-2xl"), DEFAULT_THEME_CONFIG.fontSizes.xl2),
        xl3: normalize(localStorage.getItem("font-size-3xl"), DEFAULT_THEME_CONFIG.fontSizes.xl3),
        xl4: normalize(localStorage.getItem("font-size-4xl"), DEFAULT_THEME_CONFIG.fontSizes.xl4),
        xl5: normalize(localStorage.getItem("font-size-5xl"), DEFAULT_THEME_CONFIG.fontSizes.xl5),
      },
    };
  } catch (error) {
    console.error('Error getting theme from localStorage:', error);
    return DEFAULT_THEME_CONFIG;
  }
}

// One-time migration helper: convert any legacy px font-size entries stored in localStorage into rem values
export function migrateLocalThemeToRem(): boolean {
  try {
    let changed = false;
    Object.entries(DEFAULT_THEME_CONFIG.fontSizes).forEach(([key, fallback]) => {
      const storageKey = `font-size-${key}`;
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const n = parseFloat(raw);
      if (!Number.isFinite(n)) return;
      if (n > 6) {
        const rem = (n / 16).toString();
        localStorage.setItem(storageKey, rem);
        changed = true;
      }
    });
    return changed;
  } catch (error) {
    console.error('Error migrating theme font sizes in localStorage:', error);
    return false;
  }
}

// Backend integration (mock for now)
export async function fetchThemeFromBackend(): Promise<ThemeConfig | null> {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return null; // Return null for now, implement actual API call
  } catch (error) {
    console.error('Error fetching theme from backend:', error);
    return null;
  }
}

export async function saveThemeToBackend(config: ThemeConfig): Promise<boolean> {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Save to localStorage as fallback
    localStorage.setItem("theme-color", config.color);
    if (config.gradient) {
      localStorage.setItem("theme-gradient", config.gradient);
    } else {
      localStorage.removeItem("theme-gradient");
    }
    localStorage.setItem("theme-font", config.font);
    
    Object.entries(config.fontSizes).forEach(([key, value]) => {
      const numeric = Number(value);
      const remValue = Number.isFinite(numeric) ? (numeric > 6 ? numeric / 16 : numeric) : Number(value as any);
      localStorage.setItem(`font-size-${key}`, remValue.toString());
    });
    
    return true;
  } catch (error) {
    console.error('Error saving theme to backend:', error);
    return false;
  }
}

// Helper functions
function getFontSizeCssVar(key: string): string {
  const varMap: Record<string, string> = {
    sm: "--text-sm",
    base: "--text-base",
    lg: "--text-lg",
    xl: "--text-xl",
    xl2: "--text-2xl",
    xl3: "--text-3xl",
    xl4: "--text-4xl",
    xl5: "--text-5xl",
  };
  return varMap[key] || `--text-${key}`;
}

function getHSLForTheme(color: ThemeColor): string {
  const themeHSL: Record<ThemeColor, string> = {
    red: "0 84% 60%",
    orange: "28 87% 55%",
    green: "152 69% 40%",
    teal: "171 76% 36%",
    blue: "217 91% 60%",
    purple: "262 83% 58%",
    mono: "210 24% 16%",
  };
  return themeHSL[color];
}

function getGradientForTheme(gradient: GradientTheme): string | null {
  const gradients: Record<GradientTheme, string> = {
    sunset: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)",
    ocean: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)",
    aurora: "linear-gradient(135deg, hsl(262 83% 58%), hsl(152 69% 40%))",
    fire: "linear-gradient(135deg, hsl(0 84% 60%), hsl(35 90% 50%))",
    forest: "linear-gradient(135deg, hsl(152 69% 40%), hsl(90 60% 35%))",
    royal: "linear-gradient(135deg, hsl(262 83% 58%), hsl(217 91% 60%))",
    mono: "linear-gradient(135deg, hsl(210 24% 16%), hsl(210 24% 40%))",
  };
  return gradients[gradient] || null;
}
// import { createContext, useContext, useEffect, useState } from "react";

// type Theme = "dark" | "light" | "system";

// type ThemeProviderProps = {
//   children: React.ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// };

// type ThemeProviderState = {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// };

// const initialState: ThemeProviderState = {
//   theme: "system",
//   setTheme: () => null,
// };

// const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
// // View Transitions API helper
// const supportsViewTransitions = () => {
//   return typeof document !== 'undefined' && 'startViewTransition' in document;
// };

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(
//     () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
//   );

//   const applyTheme = (newTheme: Theme) => {
//     const root = window.document.documentElement;
    
//     root.classList.remove("light", "dark");
    
//     if (newTheme === "system") {
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light";
//       root.classList.add(systemTheme);
//     } else {
//       root.classList.add(newTheme);
//     }
//   };

//   useEffect(() => {
//     applyTheme(theme);
//   }, [theme]);
  
//   const value = {
//     theme,
//     setTheme: (newTheme: Theme) => {
//       // Use View Transitions API if supported
//       if (supportsViewTransitions()) {
//         (document as any).startViewTransition(() => {
//           localStorage.setItem(storageKey, newTheme);
//           setTheme(newTheme);
//           applyTheme(newTheme);
//         });
//       } else {
//         // Fallback for browsers without View Transitions API
//         localStorage.setItem(storageKey, newTheme);
//         setTheme(newTheme);
//       }
//     },
//   };

//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeProviderContext);

//   if (context === undefined)
//     throw new Error("useTheme must be used within a ThemeProvider");

//   return context;
// };
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // animationRef: React.RefObject<HTMLElement> | null;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  // animationRef: null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// View Transitions API helper
const supportsViewTransitions = () => {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // const [theme, setTheme] = useState<Theme>(
  //   () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  // );

  // // Initialize the animation hook
  // // const { 
  // //   ref: animationRef, 
  // //   toggleSwitchTheme, 
  // //   isDarkMode 
  // // } = useModeAnimation({
  // //   animationType: ThemeAnimationType.CIRCLE, // or 'blur-circle' or 'qr-scan'
  // //   duration: 400,
  // //   easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // //   globalClassName: 'dark',
  // //   onDarkModeChange: (isDark: boolean) => {
  // //     // This callback will be triggered by the animation hook
  // //     const newTheme = isDark ? 'dark' : 'light';
  // //     localStorage.setItem(storageKey, newTheme);
  // //     setTheme(newTheme);
  // //   }
  // // });

  // const applyTheme = (newTheme: Theme) => {
  //   const root = window.document.documentElement;
    
  //   root.classList.remove("light", "dark");
    
  //   if (newTheme === "system") {
  //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light";
  //     root.classList.add(systemTheme);
  //   } else {
  //     root.classList.add(newTheme);
  //   }
  // };

  // useEffect(() => {
  //   applyTheme(theme);
  // }, [theme]);

  // const value = {
  //   theme,
  //   // animationRef,
  //   setTheme: (newTheme: Theme) => {
  //     // For system theme or when switching to system, use fallback
  //     if (newTheme === "system" || theme === "system") {
  //       // Use View Transitions API if supported
  //       if (supportsViewTransitions()) {
  //         (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
  //           localStorage.setItem(storageKey, newTheme);
  //           setTheme(newTheme);
  //           applyTheme(newTheme);
  //         });
  //       } else {
  //         localStorage.setItem(storageKey, newTheme);
  //         setTheme(newTheme);
  //       }
  //     } else {
  //       // For direct light/dark switching, use the animation hook
  //       // if ((newTheme === "dark" && !isDarkMode) || (newTheme === "light" && isDarkMode)) {
  //       //   toggleSwitchTheme();
  //       // }
  //       localStorage.setItem(storageKey, newTheme);
  //       setTheme(newTheme);
  //     }
  //   },
  // };
   const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage after component mounts
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    } catch (error) {
      // localStorage not available, use default theme
      console.warn('localStorage not available, using default theme');
    }
    setMounted(true);
  }, [storageKey]);

  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }
  };

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage');
      }

      // Use View Transitions API if supported
      if (supportsViewTransitions()) {
        (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
          setTheme(newTheme);
          applyTheme(newTheme);
        });
      } else {
        setTheme(newTheme);
      }
    },
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeProviderContext.Provider value={initialState}>
        {children}
      </ThemeProviderContext.Provider>
    );
  }

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

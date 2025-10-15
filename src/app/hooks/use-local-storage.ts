// "use client";
// import { useState, useEffect } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   // Get stored value from localStorage
//   const readValue = (): T => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }

//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.warn(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   };

//   const [storedValue, setStoredValue] = useState<T>(readValue);

//   // Save to localStorage whenever value changes
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
      
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       console.warn(`Error setting localStorage key "${key}":`, error);
//     }
//   };

//   // Listen for changes in other tabs/windows
//   useEffect(() => {
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === key && e.newValue) {
//         setStoredValue(JSON.parse(e.newValue));
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [key]);

//   return [storedValue, setValue] as const;
// }
"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value from localStorage only on client
  const readValue = (): T => {
    // Return initial value during SSR
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // Initialize with initial value to prevent hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Read from localStorage after hydration
  useEffect(() => {
    setStoredValue(readValue());
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (!isHydrated) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, isHydrated]);

  return [storedValue, setValue] as const;
}

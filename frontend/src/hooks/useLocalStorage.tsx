import { useState } from "react";

export const useLocalStorage = (
  keyName: string,
  defaultValue: string | null,
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        window.localStorage.setItem(keyName, String(defaultValue));
        return defaultValue;
      }
    } catch {
      return defaultValue;
    }
  });

  const setValue = (newValue: string | null) => {
    try {
      window.localStorage.setItem("token", String(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

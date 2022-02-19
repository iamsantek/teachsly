import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value]);

  return debounceValue;
}

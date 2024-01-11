import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useStateWithLocalStorage = <T,>(key: string, initialValue: T): [T, SetValue<T>] => {
  // Get default value from local storage then parse stored json or return initialItems
  const getDefaultValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [value, setValue] = useState<T>(getDefaultValue());

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const handleSetValue: SetValue<T> = useCallback(
    (newValue) => {
      // Prevent build error "window is undefined" but keeps working
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        );
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const resolvedValue = newValue instanceof Function ? newValue(value) : newValue;

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(resolvedValue));

        // Save state
        setValue(resolvedValue);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, value]
  );

  return [value, handleSetValue];
};

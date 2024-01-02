import { useState } from 'react';

// This custom hook lets consumer do something when the `value` parameter changed without using `useEffect`.
// This is to follow the React docs: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
export const useOnValueChange = <T,>(callbackFn: () => void, value: T) => {
  const [prevValue, setPrevValue] = useState<T>(value);

  if (prevValue !== value) {
    setPrevValue(value);

    callbackFn();
  }
};

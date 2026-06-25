import { useCallback, useRef } from "react";

const useDebounceCallback = <T extends (...args: any[]) => void>(callback: T, delay: number = 500): T => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  ) as T;
};

export default useDebounceCallback;

import { useEffect, useRef } from 'react';
/**
 * Prevents "Cannot update component while rendering another component" errors
 * by deferring event updates safely to after the render cycle.
 */
export function useSafeEventSubscription<T>(
  subscribe: (callback: (data: T) => void) => () => void,
  handler: (data: T) => void
) {
  const handlerRef = useRef(handler);

  // Always keep latest handler reference
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const safeHandler = (data: T) => {
      // Defer state updates until after render
      Promise.resolve().then(() => handlerRef.current(data));
    };

    const unsubscribe = subscribe(safeHandler);
    return unsubscribe;
  }, [subscribe]);
}

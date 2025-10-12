import { type RefObject } from 'react';

// Global registry to track taskbar button refs for window animations
const taskbarButtonRefs = new Map<string, RefObject<HTMLElement | null>>();

/**
 * Register a taskbar button ref for a window
 * @param windowId - The window ID
 * @param buttonRef - The button ref
 */
export const registerButton = (
  windowId: string,
  buttonRef: RefObject<HTMLElement | null>
): void => {
  taskbarButtonRefs.set(windowId, buttonRef);
};

/**
 * Unregister a taskbar button ref
 * @param windowId - The window ID
 */
export const unregisterButton = (windowId: string): void => {
  taskbarButtonRefs.delete(windowId);
};

/**
 * Get a taskbar button ref for a window
 * @param windowId - The window ID
 * @returns The button ref or undefined
 */
export const getButtonRef = (
  windowId: string
): RefObject<HTMLElement | null> | undefined => {
  return taskbarButtonRefs.get(windowId);
};

/**
 * Get all registered button refs
 * @returns Map of window IDs to button refs
 */
export const getAllButtonRefs = (): Map<
  string,
  RefObject<HTMLElement | null>
> => {
  return new Map(taskbarButtonRefs);
};

import { useState, type RefObject } from 'react';

interface UseWindowMaximizeReturn {
  isMaximized: boolean;
  handleMaximizeToggle: () => void;
}

/**
 * Custom hook to handle window maximize/restore logic with position preservation.
 *
 * This hook manages the maximize state and handles the complex interaction
 * between the @neodrag/react library's transform-based positioning and
 * the window's maximize/restore functionality.
 *
 * @param draggableRef - Reference to the draggable window element (can be null)
 * @returns Object containing maximize state and toggle handler
 */
export const useWindowMaximize = (
  draggableRef: RefObject<HTMLDivElement | null>
): UseWindowMaximizeReturn => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizePosition, setPreMaximizePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  /**
   * Parses the translate values from the element's style
   * @param element - The HTML element to read translate values from
   * @returns Object with x and y coordinates, or null if no valid translate found
   */
  const parseTranslate = (
    element: HTMLDivElement
  ): { x: number; y: number } | null => {
    // First try to read from the translate property (newer CSS)
    const translateValue = element.style.translate;
    if (translateValue) {
      // Parse translate property format: "275px -9px"
      const parts = translateValue.trim().split(/\s+/);
      if (parts.length >= 2) {
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        if (!isNaN(x) && !isNaN(y)) {
          return { x, y };
        }
      }
    }

    return null;
  };

  /**
   * Handles the maximize/restore toggle functionality
   */
  const handleMaximizeToggle = () => {
    if (!draggableRef.current) return;

    if (!isMaximized) {
      // About to maximize - capture current position
      const position = parseTranslate(draggableRef.current);

      // Store the position (or default to 0,0 if no translate)
      setPreMaximizePosition(position || { x: 0, y: 0 });
      // Clear both translate and transform to ensure proper maximization
      draggableRef.current.style.translate = '0px 0px';
      draggableRef.current.style.transform = 'translate(0px, 0px)';

      setIsMaximized(true);
    } else {
      // About to restore - apply the stored position
      if (preMaximizePosition) {
        draggableRef.current.style.translate = `${preMaximizePosition.x}px ${preMaximizePosition.y}px`;
      }

      setIsMaximized(false);
    }
  };

  return {
    isMaximized,
    handleMaximizeToggle,
  };
};

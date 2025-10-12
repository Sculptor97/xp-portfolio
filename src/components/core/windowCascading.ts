// Window cascading position calculation utilities

interface Position {
  x: number;
  y: number;
}

// Internal state for cascade counter
let cascadeCounter = 0;
const CASCADE_OFFSET = 15;
const MAX_CASCADE_WINDOWS = 10;
const BASE_POSITION: Position = { x: 120, y: 50 };

/**
 * Get the next cascaded position for a new window
 * @returns Position object with x and y coordinates
 */
export const getNextWindowPosition = (): Position => {
  const position: Position = {
    x: BASE_POSITION.x + cascadeCounter * CASCADE_OFFSET,
    y: BASE_POSITION.y + cascadeCounter * CASCADE_OFFSET,
  };

  // Increment counter for next window
  cascadeCounter++;

  // Reset counter if we've reached max cascade windows
  if (cascadeCounter >= MAX_CASCADE_WINDOWS) {
    cascadeCounter = 0;
  }

  // Check viewport bounds and adjust if needed
  return adjustPositionForViewport(position);
};

/**
 * Reset the cascade counter
 */
export const resetCascadeCounter = (): void => {
  cascadeCounter = 0;
};

/**
 * Adjust position to ensure it stays within viewport bounds
 * @param position - The position to adjust
 * @returns Adjusted position
 */
const adjustPositionForViewport = (position: Position): Position => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Default window dimensions (can be overridden by draggable)
  const windowWidth = 600;
  const windowHeight = 400;

  // Adjust if window would go off the right edge
  if (position.x + windowWidth > viewportWidth) {
    position.x = Math.max(0, viewportWidth - windowWidth - 20);
  }

  // Adjust if window would go off the bottom edge
  if (position.y + windowHeight > viewportHeight) {
    position.y = Math.max(0, viewportHeight - windowHeight - 100); // Leave space for taskbar
  }

  return position;
};

/**
 * Get the current cascade counter (for debugging)
 * @returns Current cascade counter value
 */
export const getCascadeCounter = (): number => {
  return cascadeCounter;
};

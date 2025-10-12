/**
 * SVG Path utilities for window morphing animations
 */

/**
 * Create a rectangle SVG path
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 * @returns SVG path string for a rectangle
 */
export const createRectanglePath = (width: number, height: number): string => {
  return `M0,0 L${width},0 L${width},${height} L0,${height} Z`;
};

/**
 * Create a paper plane SVG path
 * @param width - Base width for scaling
 * @param height - Base height for scaling
 * @returns SVG path string for a paper plane
 */
export const createPaperPlanePath = (width: number, height: number): string => {
  // Scale factors to maintain proportions
  const scaleX = width / 100;
  const scaleY = height / 100;

  // Paper plane geometry - simple geometric shape
  // Points: nose, left wing tip, left wing fold, center, right wing fold, right wing tip, tail
  const points = [
    { x: 50 * scaleX, y: 20 * scaleY }, // Nose (top center)
    { x: 20 * scaleX, y: 40 * scaleY }, // Left wing tip
    { x: 35 * scaleX, y: 50 * scaleY }, // Left wing fold
    { x: 50 * scaleX, y: 60 * scaleY }, // Center
    { x: 65 * scaleX, y: 50 * scaleY }, // Right wing fold
    { x: 80 * scaleX, y: 40 * scaleY }, // Right wing tip
    { x: 50 * scaleX, y: 80 * scaleY }, // Tail
  ];

  // Create path string
  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L${points[i].x},${points[i].y}`;
  }
  path += ' Z';

  return path;
};

/**
 * Create a simplified paper plane path for better morphing
 * This version has fewer points to ensure smooth morphing
 * @param width - Base width for scaling
 * @param height - Base height for scaling
 * @returns SVG path string for a simplified paper plane
 */
export const createSimplePaperPlanePath = (
  width: number,
  height: number
): string => {
  const scaleX = width / 100;
  const scaleY = height / 100;

  // Simplified paper plane with 8 points (matching rectangle's 4 corners + 4 midpoints)
  return `M${50 * scaleX},${10 * scaleY} L${20 * scaleX},${30 * scaleY} L${30 * scaleX},${50 * scaleY} L${50 * scaleX},${60 * scaleY} L${70 * scaleX},${50 * scaleY} L${80 * scaleX},${30 * scaleY} L${50 * scaleX},${90 * scaleY} Z`;
};

/**
 * Create a window-like rectangle with rounded corners
 * @param width - Width of the rectangle
 * @param height - Height of the rectangle
 * @param cornerRadius - Radius of the rounded corners
 * @returns SVG path string for a rounded rectangle
 */
export const createRoundedRectanglePath = (
  width: number,
  height: number,
  cornerRadius: number = 4
): string => {
  const r = Math.min(cornerRadius, width / 2, height / 2);
  return `M${r},0 L${width - r},0 Q${width},0 ${width},${r} L${width},${height - r} Q${width},${height} ${width - r},${height} L${r},${height} Q0,${height} 0,${height - r} L0,${r} Q0,0 ${r},0 Z`;
};

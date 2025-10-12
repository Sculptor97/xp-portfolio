import { type RefObject } from 'react';
import { getButtonRef } from './taskbarButtonRegistry';
import { gsap } from 'gsap';
import { createRectanglePath, createSimplePaperPlanePath } from './svgShapes';

// Global clone and tween storage
const windowClones = new Map<string, SVGSVGElement>();
const windowTweens = new Map<string, gsap.core.Timeline>();

// Mobile detection utility
const isMobileDevice = (): boolean => {
  return (
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

/**
 * Create an SVG window clone for morphing animation
 * @param windowEl - The window element to clone
 * @returns The SVG clone element
 */
export const createWindowClone = (windowEl: HTMLElement): SVGSVGElement => {
  // Get window dimensions
  const rect = windowEl.getBoundingClientRect();

  // Create SVG container
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', rect.width.toString());
  svg.setAttribute('height', rect.height.toString());
  svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
  svg.setAttribute('class', 'window-clone');
  svg.style.position = 'fixed';
  svg.style.left = `${rect.left}px`;
  svg.style.top = `${rect.top}px`;
  svg.style.zIndex = '9999';
  svg.style.pointerEvents = 'none';

  // Create the morphing path with grid pattern
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', createRectanglePath(rect.width, rect.height));
  path.setAttribute('fill', 'url(#paperGrid)');
  path.setAttribute('stroke', '#c0c0c0');
  path.setAttribute('stroke-width', '1');

  // Create pattern definition for paper grid
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  // Create pattern for grid lines with cream background
  const pattern = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'pattern'
  );
  pattern.setAttribute('id', 'paperGrid');
  pattern.setAttribute('width', '10');
  pattern.setAttribute('height', '10');
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');

  // Add cream background rectangle
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '10');
  bgRect.setAttribute('height', '10');
  bgRect.setAttribute('fill', '#ECE9D8'); // Cream white background

  // Create grid lines
  const gridLine1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  gridLine1.setAttribute('x1', '0');
  gridLine1.setAttribute('y1', '0');
  gridLine1.setAttribute('x2', '10');
  gridLine1.setAttribute('y2', '0');
  gridLine1.setAttribute('stroke', '#d0d0d0');
  gridLine1.setAttribute('stroke-width', '0.5');

  const gridLine2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  gridLine2.setAttribute('x1', '0');
  gridLine2.setAttribute('y1', '0');
  gridLine2.setAttribute('x2', '0');
  gridLine2.setAttribute('y2', '10');
  gridLine2.setAttribute('stroke', '#d0d0d0');
  gridLine2.setAttribute('stroke-width', '0.5');

  pattern.appendChild(bgRect);
  pattern.appendChild(gridLine1);
  pattern.appendChild(gridLine2);
  defs.appendChild(pattern);

  // Create cream white gradient
  const gradient = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'linearGradient'
  );
  gradient.setAttribute('id', 'windowGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '0%');
  gradient.setAttribute('y2', '100%');

  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#f7f7f0'); // Classic XP cream white
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#f0f0e8'); // Slightly darker cream

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);

  svg.appendChild(defs);
  svg.appendChild(path);

  // Add to document
  document.body.appendChild(svg);

  return svg;
};

/**
 * Create or get window animation tween
 * @param windowRef - Reference to the window element
 * @param windowId - Window ID to find button
 */
const createWindowTween = (
  windowRef: RefObject<HTMLElement | null>,
  windowId: string
): gsap.core.Timeline | undefined => {
  const windowEl = windowRef.current;
  const buttonRef = getButtonRef(windowId);

  if (!windowEl || !buttonRef?.current) {
    return undefined;
  }

  // Get window dimensions
  const windowRect = windowEl.getBoundingClientRect();

  // Get or create clone
  let clone = windowClones.get(windowId);
  if (!clone) {
    clone = createWindowClone(windowEl);
    windowClones.set(windowId, clone);
  }

  // Get the path element for morphing
  const path = clone.querySelector('path');
  if (!path) {
    return undefined;
  }

  // Create timeline for complex morphing animation
  const tl = gsap.timeline({ paused: true });

  // Phase 1: Morph rectangle to paper plane (0-50% of animation)
  const paperPlanePath = createSimplePaperPlanePath(
    windowRect.width,
    windowRect.height
  );

  tl.to(
    path,
    {
      attr: {
        d: paperPlanePath,
      },
      duration: 0.3,
      ease: 'power2.inOut',
    },
    0
  );

  // Phase 2: Continue flying as paper plane (50-100% of animation)
  tl.to(
    clone,
    {
      // To: dynamically calculated button position with advanced effects
      x: () => {
        const buttonRef = getButtonRef(windowId);
        const clone = windowClones.get(windowId);
        if (!buttonRef?.current || !clone) return 0;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const cloneRect = clone.getBoundingClientRect();
        // Center the clone on the button
        return (
          buttonRect.left +
          buttonRect.width / 2 -
          (cloneRect.left + cloneRect.width / 2)
        );
      },
      y: () => {
        const buttonRef = getButtonRef(windowId);
        const clone = windowClones.get(windowId);
        if (!buttonRef?.current || !clone) return 0;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const cloneRect = clone.getBoundingClientRect();
        // Center the clone on the button
        return (
          buttonRect.top +
          buttonRect.height / 2 -
          (cloneRect.top + cloneRect.height / 2)
        );
      },
      // Advanced effects for dynamic animation
      scale: 0.1,
      opacity: 0,
      transformOrigin: 'center center',
      duration: 0.3,
      ease: 'back.inOut(1.7)', // Bouncy ease for more dynamic feel
    },
    0.2
  ); // Start at 0.2s (50% through timeline)

  return tl;
};

/**
 * Animate window minimize (window to taskbar button)
 */
export const animateMinimize = (
  windowRef: RefObject<HTMLElement | null>,
  windowId: string,
  onComplete?: () => void
): void => {
  if (isMobileDevice()) {
    onComplete?.();
    return;
  }

  let timeline = windowTweens.get(windowId);
  if (!timeline) {
    timeline = createWindowTween(windowRef, windowId);
    if (!timeline) {
      onComplete?.();
      return;
    }
    windowTweens.set(windowId, timeline);
  }

  timeline.play();
  onComplete?.();
};

/**
 * Animate window restore (taskbar button to window)
 */
export const animateRestore = (
  _windowRef: RefObject<HTMLElement | null>,
  windowId: string,
  onComplete?: () => void
): void => {
  if (isMobileDevice()) {
    onComplete?.();
    return;
  }

  const timeline = windowTweens.get(windowId);
  if (!timeline) {
    onComplete?.();
    return;
  }

  timeline.reverse();

  // Clean up after restore
  timeline.eventCallback('onReverseComplete', () => {
    cleanupWindowClone(windowId);
    windowTweens.delete(windowId);
    onComplete?.();
  });
};

/**
 * Clean up clone when window is closed
 * @param windowId - Window ID to clean up
 */
export const cleanupWindowClone = (windowId: string): void => {
  const clone = windowClones.get(windowId);
  if (clone) {
    clone.remove();
    windowClones.delete(windowId);
  }
};

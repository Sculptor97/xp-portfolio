import { type RefObject } from 'react';
import { getButtonRef } from './taskbarButtonRegistry';
import { gsap } from 'gsap';

// Global clone and tween storage
const windowClones = new Map<string, HTMLElement>();
const windowTweens = new Map<string, gsap.core.Tween>();

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
 * Create a window clone for animation
 * @param windowEl - The window element to clone
 * @param title - Window title
 * @param icon - Window icon (React element)
 * @returns The clone element
 */
export const createWindowClone = (
  windowEl: HTMLElement,
  title: string,
  icon?: React.ReactElement
): HTMLElement => {
  const clone = document.createElement('div');
  clone.className = 'window';

  // Get window dimensions
  const rect = windowEl.getBoundingClientRect();

  // Create title bar (exact match to Window.tsx)
  const titleBar = document.createElement('div');
  titleBar.className = 'title-bar draggable';

  // Create title bar text container
  const titleBarText = document.createElement('div');
  titleBarText.className = 'title-bar-text';

  // Add icon if provided
  if (
    icon &&
    icon.props &&
    typeof icon.props === 'object' &&
    'src' in icon.props
  ) {
    const iconEl = document.createElement('span');
    const iconProps = icon.props as { src?: string; alt?: string };
    iconEl.innerHTML = `<XPIcon src="${iconProps.src}" alt="${iconProps.alt || ''}" />`;
    titleBarText.appendChild(iconEl);
  }

  // Add title
  const titleText = document.createElement('span');
  titleText.textContent = title;
  titleBarText.appendChild(titleText);

  // Create title bar controls (minimize, maximize/restore, close buttons)
  const titleBarControls = document.createElement('div');
  titleBarControls.className = 'title-bar-controls';

  // Minimize button
  const minimizeBtn = document.createElement('button');
  minimizeBtn.setAttribute('aria-label', 'Minimize');

  // Maximize/Restore button
  const maximizeBtn = document.createElement('button');
  maximizeBtn.setAttribute('aria-label', 'Maximize');

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Close');

  titleBarControls.appendChild(minimizeBtn);
  titleBarControls.appendChild(maximizeBtn);
  titleBarControls.appendChild(closeBtn);

  // Assemble title bar
  titleBar.appendChild(titleBarText);
  titleBar.appendChild(titleBarControls);

  // Create window body using existing XP styling
  const body = document.createElement('div');
  body.className = 'window-body';

  clone.appendChild(titleBar);
  clone.appendChild(body);

  // Position the clone with exact dimensions
  clone.style.position = 'fixed';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';

  // Add to document
  document.body.appendChild(clone);

  return clone;
};

/**
 * Create or get window animation tween
 * @param windowRef - Reference to the window element
 * @param windowId - Window ID to find button
 * @param title - Window title
 * @param icon - Window icon
 */
const createWindowTween = (
  windowRef: RefObject<HTMLElement | null>,
  windowId: string,
  title: string,
  icon?: React.ReactElement
): gsap.core.Tween | undefined => {
  const windowEl = windowRef.current;
  const buttonRef = getButtonRef(windowId);

  if (!windowEl || !buttonRef?.current) {
    return undefined;
  }

  // Get or create clone
  let clone = windowClones.get(windowId);
  if (!clone) {
    clone = createWindowClone(windowEl, title, icon);
    windowClones.set(windowId, clone);
  }

  // Create GSAP tween with dynamic position calculation
  const tween = gsap.fromTo(
    clone,
    {
      // From: window position, normal size
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    {
      // To: dynamically calculated button position, small size
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
      scale: 0.1,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      paused: true,
    }
  );

  return tween;
};

/**
 * Animate window minimize (window to taskbar button)
 */
export const animateMinimize = (
  windowRef: RefObject<HTMLElement | null>,
  windowId: string,
  title: string,
  icon?: React.ReactElement,
  onComplete?: () => void
): void => {
  if (isMobileDevice()) {
    onComplete?.();
    return;
  }

  let tween = windowTweens.get(windowId);
  if (!tween) {
    tween = createWindowTween(windowRef, windowId, title, icon);
    if (!tween) {
      onComplete?.();
      return;
    }
    windowTweens.set(windowId, tween);
  }

  tween.play();
  onComplete?.();
};

/**
 * Animate window restore (taskbar button to window)
 */
export const animateRestore = (
  _windowRef: RefObject<HTMLElement | null>,
  windowId: string,
  _title: string,
  _icon?: React.ReactElement,
  onComplete?: () => void
): void => {
  if (isMobileDevice()) {
    onComplete?.();
    return;
  }

  const tween = windowTweens.get(windowId);
  if (!tween) {
    onComplete?.();
    return;
  }

  tween.reverse();

  // Clean up after restore
  tween.eventCallback('onReverseComplete', () => {
    const clone = windowClones.get(windowId);
    if (clone) {
      clone.remove();
      windowClones.delete(windowId);
    }
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

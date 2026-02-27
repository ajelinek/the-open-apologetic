/**
 * Read tracking utility for localStorage-based article tracking
 * Stores read status by article slug with timestamps
 */

const STORAGE_KEY = 'toa:readPages';

export interface ReadData {
  [slug: string]: string; // ISO timestamp of when read
}

/**
 * Get all read articles from localStorage
 */
export function getRead(): ReadData {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    console.warn('Failed to parse read tracking data');
    return {};
  }
}

/**
 * Check if a specific article has been read
 */
export function isRead(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  const readData = getRead();
  return Boolean(readData[slug]);
}

/**
 * Mark an article as read
 */
export function markRead(slug: string): void {
  if (typeof window === 'undefined') return;

  try {
    const readData = getRead();
    readData[slug] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readData));
    
    // Dispatch custom event for UI updates
    window.dispatchEvent(
      new CustomEvent('readTrackerUpdate', {
        detail: { slug, read: true }
      })
    );
  } catch {
    console.warn('Failed to mark article as read');
  }
}

/**
 * Unmark an article as read
 */
export function unmarkRead(slug: string): void {
  if (typeof window === 'undefined') return;

  try {
    const readData = getRead();
    delete readData[slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readData));

    // Dispatch custom event for UI updates
    window.dispatchEvent(
      new CustomEvent('readTrackerUpdate', {
        detail: { slug, read: false }
      })
    );
  } catch {
    console.warn('Failed to unmark article as read');
  }
}

/**
 * Clear all read tracking data
 */
export function clearAll(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('readTrackerUpdate', {
        detail: { slug: null, read: false }
      })
    );
  } catch {
    console.warn('Failed to clear read tracking');
  }
}

/**
 * Subscribe to read tracking updates
 */
export function subscribe(callback: (slug: string, read: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{ slug: string | null; read: boolean }>;
    if (customEvent.detail.slug) {
      callback(customEvent.detail.slug, customEvent.detail.read);
    }
  };

  window.addEventListener('readTrackerUpdate', handler);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('readTrackerUpdate', handler);
  };
}

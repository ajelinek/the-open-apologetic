/**
 * Client-side script to manage read tracking UI updates
 * Runs on page load to sync read status from localStorage to DOM
 * and listen for read tracker updates
 */

import { getRead, subscribe } from '../utils/readTracker';

interface CardElement extends Element {
  dataset: DOMStringMap & { slug?: string };
}

/**
 * Update the UI state for a card based on read status
 */
function updateCardReadState(slug: string, isRead: boolean): void {
  const cards = document.querySelectorAll(`[data-slug="${slug}"]`) as NodeListOf<CardElement>;
  
  cards.forEach((card) => {
    if (isRead) {
      card.classList.add('is-read');
      // Show the badge
      const badge = card.querySelector('[data-testid="read-badge"]') as HTMLElement;
      if (badge) {
        badge.style.setProperty('display', 'flex', 'important');
        badge.style.setProperty('visibility', 'visible');
      }
    } else {
      card.classList.remove('is-read');
      // Hide the badge
      const badge = card.querySelector('[data-testid="read-badge"]') as HTMLElement;
      if (badge) {
        badge.style.setProperty('display', 'none');
      }
    }
  });
}

/**
 * Sync all cards with their read status on page load
 */
function syncReadState(): void {
  const readData = getRead();
  const cards = document.querySelectorAll('[data-slug]') as NodeListOf<CardElement>;

  cards.forEach((card) => {
    const slug = card.dataset.slug;
    
    if (slug && readData[slug]) {
      card.classList.add('is-read');
      // Show the badge
      const badge = card.querySelector('[data-testid="read-badge"]') as HTMLElement;
      if (badge) {
        badge.style.setProperty('display', 'flex', 'important');
        badge.style.setProperty('visibility', 'visible');
      }
    } else {
      card.classList.remove('is-read');
      // Hide the badge
      const badge = card.querySelector('[data-testid="read-badge"]') as HTMLElement;
      if (badge) {
        badge.style.setProperty('display', 'none');
      }
    }
  });
}

/**
 * Initialize read tracking on page load
 */
export function initReadTracking(): void {
  // Sync existing cards with read status
  syncReadState();

  // Subscribe to read tracker updates
  subscribe((slug: string, isRead: boolean) => {
    updateCardReadState(slug, isRead);
  });

  // Handle dynamic content updates (e.g., navigation)
  // Re-sync when DOM changes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      syncReadState();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

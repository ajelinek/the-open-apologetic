/**
 * Modal and toggle utility functions for interactive components
 */

/**
 * Setup modal toggle functionality for a toggle button and associated elements
 * @param toggleSelector - CSS selector for the toggle button
 * @param contentSelector - CSS selector for the content to toggle
 * @param backdropSelector - CSS selector for the backdrop element
 * @param openClass - CSS class to apply when open (default: 'is-open')
 */
export function setupModalToggle(
  toggleSelector: string,
  contentSelector: string,
  backdropSelector: string,
  openClass: string = 'is-open'
): void {
  const toggle = document.querySelector(toggleSelector) as HTMLElement | null;
  const content = document.querySelector(contentSelector) as HTMLElement | null;
  const backdrop = document.querySelector(backdropSelector) as HTMLElement | null;

  if (!toggle || !content) return;

  function openModal(): void {
    if (!content) return;
    content.classList.add(openClass);
    if (backdrop) {
      backdrop.classList.add('is-visible');
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    if (!content) return;
    content.classList.remove(openClass);
    if (backdrop) {
      backdrop.classList.remove('is-visible');
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

import { test, expect } from '@playwright/test';

test.describe('Read Tracking - Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/the-open-apologetic/evidence');
    await page.evaluate(() => {
      localStorage.removeItem('toa:readPages');
    });
  });

  test('should display badge hidden by default on evidence page', async ({ page }) => {
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    // Get first card and take screenshot of it
    const firstCard = page.locator('a[data-slug]').first();
    expect(firstCard).toBeDefined();

    // Take full page screenshot to verify card layout with hidden badges
    await expect(page).toHaveScreenshot('evidence-page-badges-hidden.png', {
      mask: [page.locator('header'), page.locator('footer')], // Mask static elements
      maxDiffPixels: 100,
    });
  });

  test('should display badge visible when article is read', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    // Get first card
    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();

    // Click to read the article
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');

    // Scroll to bottom to trigger read marking
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);

    // Wait for marking to complete
    await page.waitForTimeout(2500);

    // Navigate back to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Allow badge sync to complete

    // Take screenshot of page with visible badge
    await expect(page).toHaveScreenshot('evidence-page-with-read-badge.png', {
      mask: [page.locator('header'), page.locator('footer')],
      maxDiffPixels: 100,
    });
  });

  test('should display badge checkmark icon correctly', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    // Get first card
    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();

    // Click to read the article
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');

    // Scroll to bottom
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);

    // Wait for marking
    await page.waitForTimeout(2500);

    // Go back and let badges sync
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Find the badge for the article we read
    const badge = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    expect(badge).toBeDefined();

    // Take screenshot of just the badge
    await expect(badge).toHaveScreenshot('read-badge-checkmark.png', {
      maxDiffPixels: 50,
    });
  });

  test('should display multiple read badges on the same page', async ({ page }) => {
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    // Get first 3 cards
    const cardLinks = page.locator('a[data-slug]');
    const cardCount = await cardLinks.count();
    const cardsToRead = Math.min(3, cardCount);

    // Read multiple articles
    for (let i = 0; i < cardsToRead; i++) {
      const card = cardLinks.nth(i);
      const slug = await card.getAttribute('data-slug');

      // Click to read
      await card.click();
      await page.waitForLoadState('networkidle');

      // Scroll to mark as read
      const scrollHeight = await page.evaluate(() => {
        return document.documentElement.scrollHeight;
      });

      await page.evaluate((height) => {
        window.scrollTo(0, height);
      }, scrollHeight);

      await page.waitForTimeout(2500);

      // Go back to evidence page
      await page.goto('/the-open-apologetic/evidence');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
    }

    // Final screenshot with multiple badges visible
    await expect(page).toHaveScreenshot('evidence-page-multiple-read-badges.png', {
      mask: [page.locator('header'), page.locator('footer')],
      maxDiffPixels: 100,
    });
  });

  test('should properly style badge on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    // Get first card
    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();

    // Mark as read
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');

    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);

    await page.waitForTimeout(2500);

    // Go back
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Take mobile screenshot
    await expect(page).toHaveScreenshot('evidence-page-mobile-with-badge.png', {
      mask: [page.locator('header'), page.locator('footer')],
      maxDiffPixels: 100,
    });
  });

  test('should maintain badge styling after page reload', async ({ page }) => {
    // Navigate and mark an article as read
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();

    // Mark as read
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');

    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);

    await page.waitForTimeout(2500);

    // Go back and take initial screenshot
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('evidence-page-before-reload.png', {
      mask: [page.locator('header'), page.locator('footer')],
      maxDiffPixels: 100,
    });

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Take screenshot after reload - should look identical
    await expect(page).toHaveScreenshot('evidence-page-after-reload.png', {
      mask: [page.locator('header'), page.locator('footer')],
      maxDiffPixels: 100,
    });
  });

  test('should have correct badge display property when visible', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();

    // Mark as read
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');

    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);

    await page.waitForTimeout(2500);

    // Go back
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Get the badge element and verify its computed styles
    const badge = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();

    // Verify display is flex (visible)
    const computedDisplay = await badge.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(computedDisplay).toBe('flex');

    // Verify visibility is visible
    const computedVisibility = await badge.evaluate((el) => {
      return window.getComputedStyle(el).visibility;
    });
    expect(computedVisibility).toBe('visible');

    // Verify inline styles are set correctly
    const inlineStyles = await badge.evaluate((el) => ({
      display: el.style.display,
      visibility: el.style.visibility,
    }));
    expect(inlineStyles.display).toBeTruthy();
    expect(inlineStyles.visibility).toBeTruthy();
  });

  test('should have correct badge display property when hidden', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');

    const badge = page.locator('[data-testid="read-badge"]').first();

    // Verify display is none (hidden) - the key property that hides the badge
    const computedDisplay = await badge.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(computedDisplay).toBe('none');

    // Verify the badge is not visible to users (display: none is what matters)
    // Note: visibility may still be 'visible' when display is 'none', but that's fine
    // because display: none removes it from the layout entirely
    const isVisuallyHidden = await badge.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.display === 'none';
    });
    expect(isVisuallyHidden).toBe(true);
  });
});

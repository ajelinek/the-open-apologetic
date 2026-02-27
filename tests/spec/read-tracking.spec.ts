import { test, expect } from '@playwright/test';
import { EvidencePage } from '../page-objects';

test.describe('Read Tracking Feature', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage before each test
    await page.goto('/the-open-apologetic/evidence');
    await page.evaluate(() => {
      localStorage.removeItem('toa:readPages');
    });
  });

  test('should initialize read tracking and sync badges on page load', async ({ page }) => {
    // Collect all console messages
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      const logEntry = `[${msg.type()}] ${msg.text()}`;
      consoleLogs.push(logEntry);
      // Also print to stdout for visibility
      if (msg.text().includes('[readTracker]')) {
        console.log('BROWSER LOG:', logEntry);
      }
    });
    
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra wait to ensure all logs captured
    
    // Check for initialization logs
    const initLogs = consoleLogs.filter(log => log.includes('[readTracker]'));
    console.log('readTracker logs found:', initLogs.length);
    console.log('All readTracker logs:', initLogs);
    
    // Check that the page has cards with data-slug
    const cardCount = await page.locator('[data-slug]').count();
    console.log('Cards with data-slug:', cardCount);
    expect(cardCount).toBeGreaterThan(0);
    
    // Check that badges exist in the DOM
    const badgeCount = await page.locator('[data-testid="read-badge"]').count();
    console.log('Badges in DOM:', badgeCount);
    expect(badgeCount).toBeGreaterThan(0);
  });

  test('should update badge display on sync when article was read', async ({ page }) => {
    // Collect console messages
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      const logEntry = `[${msg.type()}] ${msg.text()}`;
      consoleLogs.push(logEntry);
      if (msg.text().includes('[readTracker]') || msg.text().includes('Marking as read')) {
        console.log('BROWSER:', logEntry);
      }
    });
    
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get the first card slug
    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    expect(slug).toBeTruthy();
    
    console.log('Testing with slug:', slug);
    
    // Verify badge starts hidden
    let badgeInfo = await page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first().evaluate((el) => ({
      display: window.getComputedStyle(el).display,
      inlineDisplay: el.style.display,
    }));
    console.log('Badge before reading:', badgeInfo);
    expect(badgeInfo.display).toBe('none');
    
    // Click article to read it
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom to mark as read
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    // Wait for marking
    await page.waitForTimeout(2500);
    
    // Verify it's in localStorage
    const readData1 = await page.evaluate(() => {
      const stored = localStorage.getItem('toa:readPages');
      return stored ? JSON.parse(stored) : {};
    });
    console.log('localStorage after scroll:', readData1);
    expect(readData1[slug!]).toBeTruthy();
    
    // Go back to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra wait for sync
    
    // Check localStorage
    const readData2 = await page.evaluate(() => {
      const stored = localStorage.getItem('toa:readPages');
      return stored ? JSON.parse(stored) : {};
    });
    console.log('localStorage on evidence page:', readData2);
    
    // Get fresh locator for the badge
    const badgeLocator = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    
    // Check badge state
    badgeInfo = await badgeLocator.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        inlineDisplay: el.style.display,
        classList: Array.from((el.parentElement?.classList || [])).join(','),
      };
    });
    
    console.log('Badge info after returning to evidence page:', badgeInfo);
    console.log('readTracker logs with "marking" or "updating":', 
      consoleLogs.filter(l => l.includes('Marking') || l.includes('Updating') || l.includes('Syncing')));
    
    // The badge should be visible now
    expect(badgeInfo.display).not.toBe('none');
    expect(badgeInfo.inlineDisplay).toBe('flex');
  });

  test('should mark article as read when scrolling 75% down the page', async ({ page }) => {
    // Collect console messages
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });
    
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get the first card slug
    const firstCardLink = page.locator('a[data-slug]').first();
    const slug = await firstCardLink.getAttribute('data-slug');
    
    expect(slug).toBeTruthy();
    
    // Click the first article
    await firstCardLink.click();
    await page.waitForLoadState('networkidle');
    
    // Verify article page loaded
    await expect(page.locator('article')).toBeVisible();
    
    // Wait for script to initialize
    await page.waitForTimeout(500);
    
    // Scroll to the very bottom to ensure we pass 75%
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    // Wait for polling to detect the scroll and mark as read
    await page.waitForTimeout(2500);
    
    // Check for the "Marking as read" log
    const markedAsReadLog = consoleLogs.find(log => log.includes('Marking as read'));
    console.log('Marked as read log found:', !!markedAsReadLog);
    
    // Check localStorage for the read status
    const readData = await page.evaluate(() => {
      const stored = localStorage.getItem('toa:readPages');
      return stored ? JSON.parse(stored) : {};
    });
    
    console.log('Read data:', readData);
    console.log('Expected slug:', slug);
    
    expect(readData[slug!]).toBeTruthy();
  });

  test('should display read class on article card after reading', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get the first card
    const firstCard = page.locator('a[data-slug]').first();
    const slug = await firstCard.getAttribute('data-slug');
    
    // Click to read the article
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    await page.waitForTimeout(1500);
    
    // Go back to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for client script to sync state
    await page.waitForTimeout(500);
    
    // Verify the card has the read state
    const card = page.locator(`a[data-slug="${slug}"]`).first();
    
    // Check if the card has the is-read class
    const hasReadClass = await card.evaluate((element) => {
      return element.classList.contains('is-read');
    });
    
    expect(hasReadClass).toBe(true);
  });

  test('should display read badge checkmark visually', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get the first card
    const firstCard = page.locator('a[data-slug]').first();
    const slug = await firstCard.getAttribute('data-slug');
    
    // Click to read the article
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    await page.waitForTimeout(2500);
    
    // Navigate back
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Check for badge element and verify it's visible using computed styles
    const badge = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    
    // Verify the badge element exists and contains the checkmark
    const badgeInfo = await badge.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return {
        exists: true,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        text: (element as HTMLElement).textContent,
        inlineDisplay: (element as HTMLElement).style.display,
      };
    });
    
    expect(badgeInfo.exists).toBe(true);
    expect(badgeInfo.text).toContain('✓');
    expect(badgeInfo.display).not.toBe('none');
    expect(badgeInfo.visibility).not.toBe('hidden');
    expect(badgeInfo.inlineDisplay).toBe('flex');
  });

  test('should persist read status across page reloads', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get first card and click it
    const firstCard = page.locator('a[data-slug]').first();
    const slug = await firstCard.getAttribute('data-slug');
    
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    await page.waitForTimeout(1500);
    
    // Go back
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Verify read status is shown
    const badge = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    
    const isVisible = await badge.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    expect(isVisible).toBe(true);
    
    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Verify read status persists after reload
    const badge2 = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    
    const isVisible2 = await badge2.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    expect(isVisible2).toBe(true);
  });

  test('should clear read status when localStorage is cleared', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get first card and click it
    const firstCard = page.locator('a[data-slug]').first();
    const slug = await firstCard.getAttribute('data-slug');
    
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight);
    
    await page.waitForTimeout(1500);
    
    // Go back and verify badge is visible
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const badge = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    const isVisibleBefore = await badge.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    expect(isVisibleBefore).toBe(true);
    
    // Clear localStorage
    await page.evaluate(() => {
      localStorage.removeItem('toa:readPages');
    });
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Verify badge is hidden
    const badge2 = page.locator(`a[data-slug="${slug}"] [data-testid="read-badge"]`).first();
    const isHidden = await badge2.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display === 'none' || computedStyle.visibility === 'hidden';
    });
    expect(isHidden).toBe(true);
  });

  test('should mark multiple articles as read and display badges for all', async ({ page }) => {
    // Navigate to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    
    // Get first two cards
    const firstCard = page.locator('a[data-slug]').first();
    const slug1 = await firstCard.getAttribute('data-slug');
    
    const secondCard = page.locator('a[data-slug]').nth(1);
    const slug2 = await secondCard.getAttribute('data-slug');
    
    // Read first article
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    
    const scrollHeight1 = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight1);
    
    await page.waitForTimeout(1500);
    
    // Go back and read second article
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Click second card
    const secondCardRefresh = page.locator(`a[data-slug="${slug2}"]`).first();
    await secondCardRefresh.click();
    await page.waitForLoadState('networkidle');
    
    const scrollHeight2 = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });
    
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, scrollHeight2);
    
    await page.waitForTimeout(1500);
    
    // Go back to evidence page
    await page.goto('/the-open-apologetic/evidence');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Verify both badges are visible
    const badge1 = page.locator(`a[data-slug="${slug1}"] [data-testid="read-badge"]`).first();
    const badge2 = page.locator(`a[data-slug="${slug2}"] [data-testid="read-badge"]`).first();
    
    const badge1Visible = await badge1.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    
    const badge2Visible = await badge2.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    
    expect(badge1Visible).toBe(true);
    expect(badge2Visible).toBe(true);
  });
});

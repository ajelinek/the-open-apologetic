import { test, expect } from '@playwright/test';

function extractNumericPrefix(slug: string): number {
  const filename = slug.split('/').pop() ?? '';
  const match = filename.match(/^(\d+)_/);
  return match ? parseInt(match[1], 10) : 0;
}

test('articles on a category page are sorted by filename numeric prefix', async ({ page }) => {
  await page.goto('/the-open-apologetic/evidence/scientific');
  await page.waitForLoadState('networkidle');

  const slugs = await page.locator('a[data-slug]').evaluateAll((els) =>
    els.map((el) => el.getAttribute('data-slug') ?? '')
  );

  expect(slugs.length).toBeGreaterThan(1);

  const prefixes = slugs.map(extractNumericPrefix);
  const sorted = [...prefixes].sort((a, b) => a - b);

  expect(prefixes).toEqual(sorted);
});

test('articles on the evidence index page are sorted by filename numeric prefix within each category', async ({
  page,
}) => {
  await page.goto('/the-open-apologetic/evidence');
  await page.waitForLoadState('networkidle');

  const categoryTitles = await page.locator('h2').allTextContents();
  expect(categoryTitles.length).toBeGreaterThan(0);

  // For each category section verify internal ordering
  const categorySections = page.locator('h2');
  const count = await categorySections.count();

  for (let i = 0; i < count; i++) {
    const section = categorySections.nth(i);
    // Cards inside this section's parent container
    const container = section.locator('xpath=ancestor::div[contains(@class,"category")]').first();
    const slugs = await container.locator('a[data-slug]').evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-slug') ?? '')
    );

    if (slugs.length < 2) continue;

    const prefixes = slugs.map(extractNumericPrefix);
    const sorted = [...prefixes].sort((a, b) => a - b);

    const title = await section.textContent();
    expect(prefixes, `Category "${title}" articles are not sorted`).toEqual(sorted);
  }
});

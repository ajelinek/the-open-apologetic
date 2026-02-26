import { test, expect } from '@playwright/test';
import { HomePage, EvidencePage, StoriesPage } from '../page-objects';

test.describe('Navigation Tests', () => {
  const routes = [
    '/the-open-apologetic/',
    '/the-open-apologetic/evidence',
    '/the-open-apologetic/stories',
    '/the-open-apologetic/stories/testimonies',
    '/the-open-apologetic/stories/miracles',
  ];

  for (const route of routes) {
    test(`should load ${route} on desktop`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveTitle(/The Open Apologetic/i);
    });

    test(`should load ${route} on mobile`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveTitle(/The Open Apologetic/i);
    });
  }

  test('should navigate to evidence page', async ({ page }) => {
    const evidencePage = new EvidencePage(page);
    await evidencePage.navigate();
    await evidencePage.verifyDisplayed();
  });

  test('should navigate to stories page', async ({ page }) => {
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigate();
    await storiesPage.verifyDisplayed();
  });

  test('should navigate to testimonies page', async ({ page }) => {
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigateToTestimonies();
    await expect(page).toHaveTitle(/The Open Apologetic/i);
  });

  test('should navigate to miracles page', async ({ page }) => {
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigateToMiracles();
    await expect(page).toHaveTitle(/The Open Apologetic/i);
  });

  test('should display evidence page correctly', async ({ page }) => {
    const evidencePage = new EvidencePage(page);
    await evidencePage.navigate();
    await expect(evidencePage.getPageTitle()).toContainText(/evidence/i);
  });

  test('should display stories page correctly', async ({ page }) => {
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigate();
    await expect(storiesPage.getPageTitle()).toContainText(/stories/i);
  });

  test('should have working navigation on desktop', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.getNavigation()).toBeVisible();
    await expect(homePage.getNavigation().locator('a')).toHaveCount(4);
  });

  test('should have working navigation on mobile', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.getNavigation()).toBeVisible();
  });

  test('should navigate via hamburger menu on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no hamburger menu');
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.openMobileMenu();
    await homePage.clickEvidence();
    await expect(page).toHaveURL(/\/evidence/);
  });

  test('should navigate to stories via hamburger menu on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no hamburger menu');
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.openMobileMenu();
    await homePage.clickStories();
    await expect(page).toHaveURL(/\/stories/);
  });
});

test.describe('Filter Tests', () => {
  test('should show filter button on mobile for evidence page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no filter button');
    const evidencePage = new EvidencePage(page);
    await evidencePage.navigate();
    await evidencePage.verifyFilterButtonVisible();
  });

  test('should hide filter button on desktop for evidence page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Mobile has filter button');
    const evidencePage = new EvidencePage(page);
    await evidencePage.navigate();
    await evidencePage.verifyFilterButtonNotVisible();
  });

  test('should open and close filter drawer on mobile for evidence page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no filter drawer');
    const evidencePage = new EvidencePage(page);
    await evidencePage.navigate();
    await evidencePage.openFilter();
    await evidencePage.verifyCategoriesInDrawer();
    await evidencePage.closeFilter();
  });

  test('should show filter button on mobile for stories page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no filter button');
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigate();
    await storiesPage.verifyFilterButtonVisible();
  });

  test('should hide filter button on desktop for stories page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Mobile has filter button');
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigate();
    await storiesPage.verifyFilterButtonNotVisible();
  });

  test('should open and close filter drawer on mobile for stories page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no filter drawer');
    const storiesPage = new StoriesPage(page);
    await storiesPage.navigate();
    await storiesPage.openFilter();
    await storiesPage.verifyCategoriesInDrawer(2);
    await storiesPage.closeFilter();
  });

  test('should show filter button on mobile for category pages', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'chromium', 'Desktop has no filter button');
    const evidencePage = new EvidencePage(page);
    await page.goto('/the-open-apologetic/evidence/scientific');
    await evidencePage.verifyFilterButtonVisible();
  });

  test('should hide filter button on desktop for category pages', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Mobile has filter button');
    const evidencePage = new EvidencePage(page);
    await page.goto('/the-open-apologetic/evidence/scientific');
    await evidencePage.verifyFilterButtonNotVisible();
  });
});

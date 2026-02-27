import { type Page, type Locator, expect } from '@playwright/test';
import { step } from '../utils/step';

export class StoriesPage {
  readonly page: Page;

  private header = () => this.page.locator('header');
  private navigation = () => this.page.getByRole('navigation');
  private pageTitle = () => this.page.locator('h1');
  private testimoniesLink = () => this.page.getByRole('link', { name: /testimonies/i });
  private miraclesLink = () => this.page.getByRole('link', { name: /miracles/i });
  private filterToggle = () => this.page.locator('#filter-toggle');
  private filterDrawer = () => this.page.locator('#filter-drawer');
  private filterClose = () => this.page.locator('#filter-close');
  private categoryLinks = () => this.page.locator('.filter-link');

  constructor(page: Page) {
    this.page = page;
  }

  @step('Navigate to stories page')
  async navigate() {
    await this.page.goto('/the-open-apologetic/stories');
  }

  @step('Navigate to testimonies page')
  async navigateToTestimonies() {
    await this.page.goto('/the-open-apologetic/stories/testimonies');
  }

  @step('Navigate to miracles page')
  async navigateToMiracles() {
    await this.page.goto('/the-open-apologetic/stories/miracles');
  }

  @step('Click testimonies link')
  async clickTestimonies() {
    await this.testimoniesLink().first().click();
  }

  @step('Click miracles link')
  async clickMiracles() {
    await this.miraclesLink().first().click();
  }

  @step('Verify stories page is displayed')
  async verifyDisplayed() {
    await expect(this.page).toHaveTitle(/The Open Apologetic/i);
    await expect(this.pageTitle()).toContainText(/stories/i);
  }

  @step('Get filter toggle button')
  getFilterToggle() {
    return this.filterToggle();
  }

  @step('Get filter drawer')
  getFilterDrawer() {
    return this.filterDrawer();
  }

  @step('Open filter drawer')
  async openFilter() {
    await this.filterToggle().click();
    await expect(this.filterDrawer()).toHaveClass(/is-open/);
  }

  @step('Close filter drawer')
  async closeFilter() {
    await this.filterClose().click();
    await expect(this.filterDrawer()).not.toHaveClass(/is-open/);
  }

  @step('Verify filter button is visible')
  async verifyFilterButtonVisible() {
    await expect(this.filterToggle()).toBeVisible();
  }

  @step('Verify filter button is not visible')
  async verifyFilterButtonNotVisible() {
    await expect(this.filterToggle()).not.toBeVisible();
  }

  @step('Verify categories are in filter drawer')
  async verifyCategoriesInDrawer(count: number) {
    const categoryLinks = this.page.locator('#filter-drawer .filter-link');
    await expect(categoryLinks.first()).toBeVisible();
  }

  getPageTitle() {
    return this.pageTitle();
  }
}

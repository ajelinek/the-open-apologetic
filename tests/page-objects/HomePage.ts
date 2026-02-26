import { type Page, type Locator, expect } from '@playwright/test';
import { step } from '../utils/step';

export class HomePage {
  readonly page: Page;

  private header = () => this.page.locator('header');
  private logo = () => this.page.getByRole('link', { name: /The Open Apologetic/i });
  private menuToggle = () => this.page.getByRole('button', { name: /toggle navigation menu/i });
  private navigation = () => this.page.getByRole('navigation');
  private evidenceLink = () => this.page.locator('#main-nav').getByRole('link', { name: /evidence/i });
  private storiesLink = () => this.page.locator('#main-nav').getByRole('link', { name: /stories/i });
  private footer = () => this.page.locator('footer');

  constructor(page: Page) {
    this.page = page;
  }

  @step('Navigate to home page')
  async navigate() {
    await this.page.goto('/the-open-apologetic/');
  }

  @step('Open mobile menu')
  async openMobileMenu() {
    await this.menuToggle().click();
    await expect(this.menuToggle()).toHaveAttribute('aria-expanded', 'true');
  }

  @step('Click evidence link')
  async clickEvidence() {
    await this.page.evaluate(() => {
      const link = document.querySelector('#main-nav a[href*="evidence"]') as HTMLAnchorElement;
      if (link) link.click();
    });
  }

  @step('Click stories link')
  async clickStories() {
    await this.page.evaluate(() => {
      const link = document.querySelector('#main-nav a[href*="stories"]') as HTMLAnchorElement;
      if (link) link.click();
    });
  }

  @step('Verify home page is displayed')
  async verifyDisplayed() {
    await expect(this.page).toHaveTitle(/The Open Apologetic/i);
    await expect(this.header()).toBeVisible();
    await expect(this.logo()).toBeVisible();
    await expect(this.navigation()).toBeVisible();
  }

  getHeader() {
    return this.header();
  }

  getNavigation() {
    return this.navigation();
  }
}

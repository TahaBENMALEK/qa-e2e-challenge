/**
 * Page Object Model for the AutoCash homepage.
 * Handles:
 * - Initial navigation and cookie consent
 * - Brand and category filter selection
 * - Search form submission
 */

import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');  // Base URL from config
  }

  async acceptCookies() {
    // Cookie consent banner interaction
    await this.page.getByRole('button', { name: 'Accepter' }).click();
  }

  async selectBrand(brand: string) {
    // Opens brand dropdown and selects by visible text
    await this.page.getByRole('button', { name: 'Marque' }).click();
    await this.page.getByRole('listbox').getByText(brand).click();
  }

  async selectCategory(category: string) {
    // Opens category filter and checks target checkbox
    await this.page.getByRole('button', { name: 'Catégorie' }).click();
    await this.page.getByRole('option', { name: `Checkbox ${category}` })
      .getByRole('checkbox').click();
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Rechercher' }).click();
  }
}
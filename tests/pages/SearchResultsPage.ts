/**
 * Page Object Model for the search results page.
 * Manages:
 * - Financing eligibility filter activation
 * - Price range configuration
 * - Vehicle card interaction and counting
 * - Navigation to vehicle details
 */

import { Page, expect } from '@playwright/test';

export class SearchResultsPage {
  constructor(private page: Page) {}

  async enableFinancingFilter() {
    // Toggles financing eligibility checkbox via test ID
    await this.page.getByTestId('eligibleAuFinancement-true').click();
  }

  async setMaxPrice(price: number) {
    // Targets second spinbutton (assumes min price is first)
    const priceInput = this.page.getByRole('spinbutton').nth(1);
    await priceInput.click();
    await priceInput.fill(price.toString());
    await priceInput.press('Enter');  // Triggers filter application
  }

  async openFirstVehicle() {
    // Opens top search result
    await this.page.getByTestId('vehicle-card-0').click();
  }

  async getResultsCount(): Promise<number> {
    // Counts all vehicle cards matching data-testid pattern
    const cards = this.page.locator('[data-testid^="vehicle-card-"]');
    return await cards.count();
  }
}
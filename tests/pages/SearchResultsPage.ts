/**
 * Page Object Model for the search results page.
 * Manages:
 * - Financing eligibility filter activation
 * - Price range configuration
 * - Vehicle card interaction and counting
 * - Results validation
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
    await this.page.waitForTimeout(3000);  // Wait for filters to apply automatically
  }

  async openFirstVehicle() {
    // Click on first vehicle card to open details
    await this.page.getByTestId('vehicle-card-0').click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);  // Wait for page transition
  }

  async getResultsCount(): Promise<number> {
    // Counts all vehicle cards matching data-testid pattern
    const cards = this.page.locator('[data-testid^="vehicle-card-"]');
    return await cards.count();
  }

  async validateFilteredResults(maxPrice: number): Promise<void> {
    // Verify financing filter is applied
    const checkbox = this.page.getByTestId('eligibleAuFinancement-true');
    await expect(checkbox, 'Financing filter should be checked').toBeChecked();
    
    // Verify price range on first 3 vehicles
    const priceLocators = this.page.locator('[data-testid^="vehicle-card-"] [class*="price"]');
    const count = await priceLocators.count();
    
    // Check sample of vehicles to ensure price filter works
    for (let i = 0; i < Math.min(3, count); i++) {
      const priceText = await priceLocators.nth(i).textContent();
      const price = parseInt(priceText?.replace(/\D/g, '') || '0');
      expect(price, `Vehicle ${i + 1} price should be <= ${maxPrice}`).toBeLessThanOrEqual(maxPrice);
    }
  }
}
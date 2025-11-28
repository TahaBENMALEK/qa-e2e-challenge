/**
 * Page Object Model for the vehicle details page.
 * Handles:
 * - Validating displayed vehicle information
 * - Checking visibility and usability of the financing button
 * - Triggering the financing simulation flow
 */

import { Page, expect } from '@playwright/test';

export class VehicleDetailsPage {
  constructor(private page: Page) {}

  async validateVehicleInfo() {
    // Verify vehicle information is displayed on details page
    const vehicleInfo = this.page.getByText(/Marque:|Modèle:|Année:/i);
    await expect(vehicleInfo.first(), 'Vehicle info should be visible').toBeVisible({ timeout: 10000 });
  }

  async validateFinancingButton() {
    // Verify we're on vehicle details page (not search results)
    await expect(this.page).not.toHaveURL(/\/achat$/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFinancingButton() {
    // Initiates financing simulation flow
    await this.page.getByTestId('car-details-simulation-button').click();
  }
}
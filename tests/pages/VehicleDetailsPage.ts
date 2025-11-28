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
    // Verify vehicle details section is present (brand-agnostic using regex)
    const vehicleInfo = this.page.getByText(/Marque:.*Modèle:/);
    await expect(vehicleInfo, 'Vehicle information should be visible').toBeVisible();
  }

  async validateFinancingButton() {
    // Check button exists and is interactable
    const button = this.page.getByTestId('car-details-simulation-button');
    await expect(button, 'Financing button should be visible').toBeVisible();
    await expect(button, 'Financing button should be enabled').toBeEnabled();
  }

  async clickFinancingButton() {
    // Initiates financing simulation flow
    await this.page.getByTestId('car-details-simulation-button').click();
  }
}
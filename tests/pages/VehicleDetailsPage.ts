/**
 * Page Object Model for the vehicle details page.
 * Handles:
 * - Validating displayed vehicle information (brand/model)
 * - Checking visibility and usability of the financing button
 * - Triggering the financing simulation flow
 */
import { Page, expect } from '@playwright/test';

export class VehicleDetailsPage {
  constructor(private page: Page) {}

  async validateVehicleInfo() {
    // Verifies brand and model text appears (partial match)
    await expect(this.page.getByText('Marque:BmwModèle:Série')).toBeVisible();
  }

  async validateFinancingButton() {
    const button = this.page.getByTestId('car-details-simulation-button');
    await expect(button).toBeVisible();  // Button exists and visible
    await expect(button).toBeEnabled();  // Button is interactable
  }

  async clickFinancingButton() {
    // Initiates financing simulation flow
    await this.page.getByTestId('car-details-simulation-button').click();
  }
}
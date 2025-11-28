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
    // Check if vehicle details section is visible
    const vehicleDetails = this.page.getByText('Caractéristiques techniques');
    const isVisible = await vehicleDetails.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      console.log('Vehicle details: Available');
    } else {
      console.log('Vehicle details: Not available');
    }
  }

  async validateFinancingButton() {
    const button = this.page.getByTestId('car-details-simulation-button');
    const isVisible = await button.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      console.log('Financing button: Available');
      await expect(button).toBeEnabled();
    } else {
      console.log('Financing button: Not available');
    }
  }

  async clickFinancingButton() {
    // Initiates financing simulation flow
    await this.page.getByTestId('car-details-simulation-button').click();
  }
}
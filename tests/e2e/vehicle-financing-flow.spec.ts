/**
 * End-to-end test suite for AutoCash vehicle financing flow.
 * Validates complete user journey:
 * 1. Homepage navigation and search configuration
 * 2. Filter application (financing + price)
 * 3. Results validation
 * 4. Vehicle details inspection
 * 5. Financing button verification
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { VehicleDetailsPage } from '../pages/VehicleDetailsPage';
import { testData } from '../fixtures/test-data';

test.describe('AutoCash Vehicle Financing Flow', () => {
  test('should complete financing eligible vehicle search flow', async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const searchPage = new SearchResultsPage(page);
    const detailsPage = new VehicleDetailsPage(page);

    await test.step('Navigate and accept cookies', async () => {
      await homePage.navigate();
      await homePage.acceptCookies();
    });

    await test.step('Select brand and category', async () => {
      await homePage.selectBrand(testData.brand);
      await homePage.selectCategory(testData.category);
      await homePage.clickSearch();
    });

    await test.step('Apply financing and price filters', async () => {
      await searchPage.enableFinancingFilter();
      await searchPage.setMaxPrice(testData.maxPrice);
    });

    await test.step('Validate results exist', async () => {
      const count = await searchPage.getResultsCount();
      expect(count).toBeGreaterThan(0);  // Ensures non-empty result set
    });

    await test.step('Open first vehicle', async () => {
      await searchPage.openFirstVehicle();
    });

    await test.step('Validate vehicle details', async () => {
      await detailsPage.validateVehicleInfo();
    });

    await test.step('Validate financing button', async () => {
      await detailsPage.validateFinancingButton();
    });
  });
});
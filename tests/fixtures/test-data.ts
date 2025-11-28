/**
 * Centralized test data fixture for vehicle search scenarios.
 * Provides:
 * - Brand and category selection values
 * - Price constraints for filtering
 * - Financing eligibility flags
 * Used across multiple test suites for consistency.
 */
export const testData = {
  brand: 'Hyundai',          // Target vehicle brand for search
  category: 'Citadine',      // Vehicle body type filter
  maxPrice: 350000,          // Upper price boundary (MAD)
  filters: {
    financingEligible: true  // Restrict to financing-eligible vehicles
  },
  // Alternative test data if primary search yields no results
  alternative: {
    brand: 'Bmw',
    category: 'Berline'
  },
  // Fallback test data
  fallback: {
    brand: 'Bmw',
    category: 'Coupé'
  }
};
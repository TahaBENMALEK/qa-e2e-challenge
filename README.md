# 🚗 AutoCash E2E Challenge

> End-to-end automated testing suite for AutoCash vehicle marketplace using Playwright and TypeScript

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()

## 🎯 Challenge Overview

Automated test suite covering complete vehicle financing flow on AutoCash platform:
- Brand/category selection with cookie consent handling
- Search filtering (financing eligibility + price constraints)
- Results validation with strict assertions
- Vehicle details verification
- Financing simulation button validation

## 🛠️ Tech Stack

- **Framework**: Playwright v1.57.0
- **Language**: TypeScript
- **Pattern**: Page Object Model (POM)
- **Assertions**: Built-in Playwright expect with custom error messages

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run tests (headless)
npx playwright test

# Run tests (headed with browser)
npx playwright test --headed

# View HTML report
npx playwright show-report
```

## 📁 Project Structure

```
tests/
├── e2e/
│   └── vehicle-financing-flow.spec.ts  # Main test suite
├── pages/
│   ├── HomePage.ts                     # Homepage interactions
│   ├── SearchResultsPage.ts            # Filters & results validation
│   └── VehicleDetailsPage.ts           # Vehicle details & financing
└── fixtures/
    └── test-data.ts                    # Centralized test data
```

## 📝 Test Coverage

### Test Scenario: Vehicle Financing Flow

**Steps:**
1. ✅ Navigate to AutoCash homepage
2. ✅ Accept cookie consent
3. ✅ Select brand (BMW) and category (Berline)
4. ✅ Apply financing eligibility filter
5. ✅ Set maximum price (350,000 MAD)
6. ✅ Validate filtered results (count + price verification)
7. ✅ Open first vehicle from results
8. ✅ Verify vehicle information is displayed
9. ✅ Verify financing simulation button is present and enabled

**Validations:**
- Non-empty result set after filtering
- Financing filter checkbox is checked
- Vehicle prices respect maximum threshold (sample of 3)
- Vehicle details section is visible
- Financing button is visible and enabled

## 🧪 Testing Strategy

### Two Approaches Available

**Branch `main` - Tolerant Approach**
- Continues execution even when expected elements are missing
- Logs informative error messages instead of failing
- Suitable for unstable test environments or variable data

**Branch `feat/e2e-vehicle-financing-strict-validations` - Strict Approach** ✅ **(Recommended)**
- Implements strict validations using `expect()` assertions
- **No financing available → Test fails**
- **No vehicles matching filters → Test fails**
- Price validation on sample results
- Filter application verification
- **Production-ready approach**

### Strict Assertions (Current Branch)
- All validations use `expect()` to fail fast on application bugs
- Business logic violations cause immediate test failure
- Custom error messages for better debugging

### Edge Case Handling
- Empty results: Test fails if no vehicles match criteria (indicates filter issue)
- Network issues: Playwright auto-retry handles transient failures
- Price validation: Samples first 3 vehicles to balance speed and coverage

## ⚙️ Configuration

Environment variables (`.env`):
```env
BASE_URL=https://www.autocash.ma
HEADLESS=false
DEFAULT_TIMEOUT=30000
NAVIGATION_TIMEOUT=30000
```

Playwright config highlights:
- Single worker for sequential execution
- Chromium browser only
- Screenshots on failure
- Video on failure retention
- HTML + JSON reporters

## 🎨 Page Object Model

**HomePage**
- `navigate()` - Go to homepage
- `acceptCookies()` - Handle consent banner
- `selectBrand(brand)` - Choose vehicle brand
- `selectCategory(category)` - Choose vehicle type
- `clickSearch()` - Submit search

**SearchResultsPage**
- `enableFinancingFilter()` - Toggle financing eligibility
- `setMaxPrice(price)` - Set price upper bound
- `getResultsCount()` - Count visible vehicles
- `validateFilteredResults(maxPrice)` - Verify filters applied correctly
- `openFirstVehicle()` - Navigate to first result

**VehicleDetailsPage**
- `validateVehicleInfo()` - Check vehicle details visibility
- `validateFinancingButton()` - Verify financing CTA
- `clickFinancingButton()` - Start financing flow

## 📊 Test Results

Latest run:
- ✅ 1 test passed
- ⏱️ Duration: ~14 seconds
- 🎯 Coverage: Complete financing flow with strict validations

## 🔧 Maintenance

**Updating test data:**
Edit `fixtures/test-data.ts` to change brand/category/price

**Adding new tests:**
Create new spec files in `tests/e2e/` following the existing pattern

**Modifying selectors:**
Update locators in respective Page Object files

## 📈 Future Enhancements

- [ ] Add negative test scenarios (invalid filters, no results)
- [ ] Implement data-driven testing with multiple brand/category combos
- [ ] Add visual regression testing for key pages
- [ ] Integrate with CI/CD pipeline
- [ ] Add performance metrics tracking

## 👤 Author

Taha BENMALEK - QA E2E Challenge AutoCash

---

**Note:** This test suite validates the complete vehicle financing flow with strict assertions to ensure application behavior matches business requirements. Any deviation from expected behavior will cause immediate test failure, making it suitable for production environments.
# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-10-06

### Added

- Test classification using `@e2e`, `@api`, `@smoke`, and `@regression` tags.
- Dedicated npm commands for smoke and regression suites.
- Playwright Projects for independent E2E and API execution.
- Cross-browser E2E execution with Chromium, Firefox, and WebKit.
- Dedicated npm commands for each supported browser.
- Multi-environment configuration using `TEST_ENV` and `.env.<environment>` files.
- Reusable custom E2E fixtures built with Playwright `test.extend()`.
- Reusable API test data structure.
- CI retry strategy with two retries.
- Controlled CI execution using a single worker.

### Changed

- API tests now run through a dedicated Playwright project.
- Browser tests use browser-specific Playwright projects.
- API requests use the API project's configured `baseURL`.
- Environment files are dynamically selected without hardcoded environment names.
- Local execution uses available workers while CI uses one worker.
- GitHub Actions installs Chromium, Firefox, and WebKit before running the complete suite.
- Project structure and documentation updated for the framework foundations introduced in v1.1.0.

## [1.0.0] - 2026-09-27

### Added

- Playwright Test with TypeScript.
- End-to-end browser testing with Chromium.
- API testing using Playwright request fixtures.
- Page Object Model example.
- Environment configuration with dotenv.
- HTML test reporting.
- JUnit XML reporting.
- Screenshots on test failure.
- Video retention on test failure.
- Playwright traces on test failure.
- TypeScript type checking.
- GitHub Actions continuous integration.
- CI test artifacts for reports and failure evidence.
- Project installation and usage documentation.

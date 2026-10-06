# Playwright Test Report

[![Playwright Tests](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml/badge.svg)](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml)
[![Release](https://img.shields.io/github/v/release/PacoMatias89/playwright-test-report)](https://github.com/PacoMatias89/playwright-test-report/releases)
[![License](https://img.shields.io/github/license/PacoMatias89/playwright-test-report)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Español](README.es.md) | **English**

A reusable Playwright + TypeScript automation starter for end-to-end and API testing.

The project is designed for QA Automation Engineers and developers who want a practical foundation they can clone, run, understand, and adapt to their own applications without unnecessary framework complexity.

The repository includes a small public demo implementation using Playwright's website for E2E testing and JSONPlaceholder for API testing. These targets are examples only: the automation infrastructure is designed to be replaced with the system under test of each team.

## Features

- Playwright Test with TypeScript
- End-to-end browser testing
- API testing with Playwright request fixtures
- Chromium, Firefox, and WebKit execution
- Independent Playwright Projects for E2E and API tests
- Test classification with `@e2e`, `@api`, `@smoke`, and `@regression`
- Multi-environment configuration with `TEST_ENV`
- Dynamic `.env.<environment>` support
- Custom E2E fixtures with `test.extend()`
- Reusable test data
- Page Object Model
- Environment-specific browser and API base URLs
- Local parallel execution
- Controlled CI execution with one worker
- CI retries
- HTML test reports
- JUnit XML reports
- Screenshots on failure
- Video retention on failure
- Playwright traces on failure
- TypeScript type checking
- GitHub Actions CI
- Test reports and failure evidence uploaded as CI artifacts

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Playwright Test
- dotenv
- Git
- GitHub Actions

## Project Structure

```text
playwright-test-report/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── environments.ts
│
├── fixtures/
│   └── e2eFixtures.ts
│
├── pages/
│   └── HomePage.ts
│
├── test-data/
│   └── api/
│       └── posts.ts
│
├── tests/
│   ├── api/
│   │   └── health.spec.ts
│   └── e2e/
│       └── navigation.spec.ts
│
├── reports/
│   ├── html/
│   └── junit/
│
├── test-results/
│
├── .env
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── README.es.md
└── tsconfig.json
```

Generated directories such as `reports/` and `test-results/` are ignored by Git.

Local environment files such as `.env`, `.env.qa`, `.env.staging`, or other `.env.*` profiles are also ignored. Example files can be committed using the `.env.example` or `.env.<environment>.example` naming convention.

## Requirements

Recommended environment:

- Node.js 22+
- npm
- Git

The CI pipeline runs using Node.js 22.

Check your installation:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/PacoMatias89/playwright-test-report.git
cd playwright-test-report
```

Install dependencies:

```bash
npm ci
```

Install the supported Playwright browsers:

```bash
npx playwright install chromium firefox webkit
```

On Linux or CI environments, browser system dependencies can also be installed with:

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Environment Configuration

The framework supports a default environment and optional named environments.

### Default environment

Create `.env` from the provided example.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Bash:

```bash
cp .env.example .env
```

Example:

```dotenv
BASE_URL=https://playwright.dev
API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Named environments

Set `TEST_ENV` to dynamically select an environment file.

For example:

```text
TEST_ENV=qa
        ↓
.env.qa
```

PowerShell:

```powershell
$env:TEST_ENV="qa"
npm test
```

Bash:

```bash
TEST_ENV=qa npm test
```

The framework does not hardcode environment names. A team can use any naming convention:

```text
.env.dev
.env.qa
.env.pre
.env.uat
.env.staging
.env.customer-a
```

The selected file follows this rule:

```text
TEST_ENV=<name>
        ↓
.env.<name>
```

If `TEST_ENV` is not defined, the default `.env` file is used.

Environment variables can also be injected directly by CI/CD systems without requiring a physical `.env` file.

### Variables

| Variable       | Purpose                               |
| -------------- | ------------------------------------- |
| `BASE_URL`     | Base URL used by browser projects     |
| `API_BASE_URL` | Base URL used by the API project      |
| `TEST_ENV`     | Optional environment profile selector |

Required URLs are validated when Playwright loads the configuration.

## Playwright Projects

The suite uses independent Playwright Projects to keep browser and API execution logically separated.

```text
Playwright
│
├── chromium ─┐
├── firefox  ─┼── tests/e2e/**
├── webkit   ─┘
│
└── api ───────── tests/api/**
```

Browser projects use `BASE_URL`.

The API project uses `API_BASE_URL`.

This prevents API tests from being unnecessarily executed once per browser.

## Test Classification

Tests are classified using two independent dimensions.

### Test type

```text
@e2e
@api
```

### Execution scope

```text
@smoke
@regression
```

Example:

```text
E2E critical test
→ @e2e @smoke @regression

API critical test
→ @api @smoke @regression
```

This allows tests to remain organized by technical type while also supporting execution strategies such as smoke and regression suites.

## Running Tests

### Complete suite

```bash
npm test
```

The complete suite currently executes:

```text
Chromium E2E
Firefox E2E
WebKit E2E
API
```

### E2E suite

```bash
npm run test:e2e
```

Runs E2E tests across Chromium, Firefox, and WebKit.

### API suite

```bash
npm run test:api
```

Runs only the API project.

### Smoke suite

```bash
npm run test:smoke
```

Runs tests tagged with `@smoke`.

### Regression suite

```bash
npm run test:regression
```

Runs tests tagged with `@regression`.

### Chromium

```bash
npm run test:chromium
```

### Firefox

```bash
npm run test:firefox
```

### WebKit

```bash
npm run test:webkit
```

### Headed mode

```bash
npm run test:headed
```

### Playwright UI Mode

```bash
npm run test:ui
```

### TypeScript checks

```bash
npm run typecheck
```

## End-to-End Testing

The public E2E example uses Playwright's website only as a demonstration system.

```text
tests/e2e/navigation.spec.ts
        │
        ▼
fixtures/e2eFixtures.ts
        │
        ▼
pages/HomePage.ts
        │
        ▼
Playwright page
        │
        ├── Chromium
        ├── Firefox
        └── WebKit
```

The project uses a small Page Object Model layer to keep selectors and page interactions outside test specifications.

E2E Page Objects can be provided to tests through custom fixtures.

Example:

```typescript
async ({ page, homePage }) => {
  await homePage.goto();

  await expect(page).toHaveTitle(/Playwright/);
  await expect(homePage.getStartedLink).toBeVisible();
};
```

A team adapting the project can replace `HomePage` with its own application objects without changing the underlying fixture mechanism.

## Custom Fixtures

Reusable E2E dependencies are defined using Playwright's native `test.extend()` mechanism.

Current example:

```text
Playwright built-in fixtures
        │
        └── page
             │
             ▼
      custom fixture
             │
             └── homePage
```

Tests request only the fixtures they need.

The fixture layer intentionally remains small and does not introduce custom fixture managers, factories, registries, or unnecessary abstraction layers.

## API Testing

API tests use Playwright's native `request` fixture.

The API project provides `API_BASE_URL` as its `baseURL`, allowing tests to use relative endpoints:

```typescript
const response = await request.get(`/posts/${existingPost.id}`);
```

Current public example:

```text
GET /posts/{id}
        │
        ├── status validation
        ├── response.ok()
        ├── content-type validation
        └── response body validation
```

The endpoint belongs to the demo implementation. Teams can replace it with their own API tests while retaining the surrounding project configuration, reporting, tags, environment handling, and execution model.

## Test Data

Reusable scenario data lives outside the test specifications.

Current structure:

```text
test-data/
└── api/
    └── posts.ts
```

Example:

```typescript
export const postTestData = {
  existingPost: {
    id: 1,
    userId: 1,
  },
} as const;
```

The goal is to separate reusable scenario data from test behavior without moving every literal or assertion into configuration files.

## Retries and Parallelism

Local execution prioritizes fast feedback:

```text
retries = 0
workers = Playwright default
```

CI execution prioritizes predictability:

```text
retries = 2
workers = 1
```

The configuration uses:

```typescript
fullyParallel: false,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
```

Retries are intentionally disabled locally so failures are visible immediately during development.

Full parallel execution inside individual test files is not enabled by default.

## HTML Report

Playwright generates an HTML report after test execution.

Location:

```text
reports/html/
```

Open the report with:

```bash
npm run report:html
```

The report includes information such as:

- executed tests
- passed, failed, and skipped tests
- duration
- Playwright project/browser
- failure information
- attached evidence

## JUnit XML Report

A JUnit-compatible report is generated at:

```text
reports/junit/results.xml
```

JUnit output can be consumed by CI/CD and reporting tools such as Jenkins, GitHub Actions integrations, GitLab CI, Azure DevOps, and other JUnit-compatible systems.

## Failure Artifacts

Playwright preserves debugging evidence when a test fails.

### Screenshot

Screenshots are captured only on failure.

### Video

Videos are retained only for failed tests.

### Trace

Traces are retained for failed tests and can be inspected with Playwright Trace Viewer:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer can help inspect:

- executed actions
- locators
- DOM snapshots
- timing
- network activity
- browser state

## Continuous Integration

The repository includes:

```text
.github/workflows/playwright.yml
```

The workflow runs for:

- pushes to `main`
- pull requests targeting `main`
- manual executions through `workflow_dispatch`

The CI pipeline performs:

```text
Checkout repository
        ↓
Set up Node.js 22
        ↓
npm ci
        ↓
TypeScript checks
        ↓
Install Chromium + Firefox + WebKit
        ↓
Run complete Playwright suite
        ↓
Upload reports and failure artifacts
```

CI runs on Ubuntu with:

```text
workers = 1
retries = 2
```

The `develop` branch is used for development and local validation. The stable `main` branch represents published code and triggers the release CI workflow.

## CI Artifacts

GitHub Actions uploads generated evidence unless the workflow is cancelled.

Artifacts include:

```text
reports/html/
reports/junit/
test-results/
```

Depending on the execution result, these directories can contain:

- HTML reports
- JUnit XML
- screenshots
- videos
- traces
- Playwright error context

## Available Commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `npm test`                | Run the complete Playwright suite           |
| `npm run test:e2e`        | Run E2E tests across all supported browsers |
| `npm run test:api`        | Run API tests                               |
| `npm run test:smoke`      | Run tests tagged with`@smoke`               |
| `npm run test:regression` | Run tests tagged with`@regression`          |
| `npm run test:chromium`   | Run Chromium E2E tests                      |
| `npm run test:firefox`    | Run Firefox E2E tests                       |
| `npm run test:webkit`     | Run WebKit E2E tests                        |
| `npm run test:headed`     | Run tests with visible browsers             |
| `npm run test:ui`         | Open Playwright UI Mode                     |
| `npm run typecheck`       | Run TypeScript type checking                |
| `npm run report:html`     | Open the generated HTML report              |

## Using the Framework With Your Project

The repository includes demo tests so a clean clone can be executed immediately.

To adapt it to another system:

1. Configure your own `BASE_URL` and `API_BASE_URL`.
2. Create the environment profiles required by your team.
3. Replace or extend the demo Page Objects.
4. Replace or extend the demo E2E specifications.
5. Replace or extend the demo API specifications.
6. Add your own test data.
7. Reuse the existing projects, tags, fixtures, reporting, retry strategy, and CI integration.

The infrastructure should remain independent from the specific system under test.

## Architecture Principles

The project intentionally favors a small architecture:

```text
Tests
  │
  ├── Test Data
  ├── Fixtures
  ├── Page Objects
  └── Configuration
          │
          ▼
      Playwright
```

The main principles are:

- maintainability
- clarity
- reuse
- easy onboarding
- native Playwright capabilities before custom abstractions
- separation between reusable framework infrastructure and demo implementation
- no architecture layer without a practical reason

## Release Strategy

`main` represents the current stable public version.

`develop` contains work for the next version.

Development changes are validated on `develop` and released to `main` as a clean release change after the version is complete.

## Roadmap

### v1.0.0 — Foundation

- Playwright + TypeScript foundation
- E2E testing
- API testing
- Page Object Model
- environment configuration
- reporting
- failure evidence
- GitHub Actions

### v1.1.0 — Framework Foundations

- test classification
- smoke and regression suites
- Playwright Projects
- Chromium, Firefox, and WebKit
- independent API project
- multi-environment support
- reusable custom fixtures
- reusable test data
- retries
- controlled parallel execution

### v1.2.0 — Real-world QA Patterns

Planned areas include:

- reusable authentication
- `storageState`
- API clients
- schema validation
- test parametrization
- network interception
- mocks

### v1.3.0 — CI/CD & Developer Experience

Planned areas include:

- Jenkins integration
- parameterized Jenkins pipelines
- additional CI/CD integrations where useful
- Docker
- developer tooling
- CLI and scaffolding exploration

### v2.0.0 — Reporting

Planned areas include:

- custom reporting
- richer result models
- dashboard exploration

The roadmap may evolve as practical requirements appear.

## Contributing

Issues and pull requests can be used to propose improvements, fixes, or additional testing capabilities.

Changes should keep the project practical, understandable, and close to native Playwright concepts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built as a practical Playwright automation foundation for QA engineers and developer

# Playwright Test Report

[![Playwright Tests](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml/badge.svg)](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml)
[![Release](https://img.shields.io/github/v/release/PacoMatias89/playwright-test-report)](https://github.com/PacoMatias89/playwright-test-report/releases)
[![License](https://img.shields.io/github/license/PacoMatias89/playwright-test-report)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A reusable Playwright + TypeScript starter project for end-to-end testing, API testing, automated reporting, failure artifacts, and CI execution.

Built for QA Automation Engineers and developers who want a clean, practical foundation they can clone and adapt without unnecessary framework complexity.

## Features

- Playwright Test
- TypeScript
- End-to-end browser testing
- API testing with Playwright `request`
- Page Object Model
- Environment configuration with `.env`
- HTML test report
- JUnit XML report
- Screenshots on test failure
- Video recording on test failure
- Playwright traces on test failure
- TypeScript type checking
- GitHub Actions CI
- Test reports uploaded as CI artifacts
- Chromium execution

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Playwright Test
- dotenv
- Git
- GitHub Actions

## Project Structure

```text
playwright-test-report/
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── environments.ts
│
├── pages/
│   └── HomePage.ts
│
├── tests/
│   ├── api/
│   │   └── health.spec.ts
│   │
│   └── e2e/
│       └── navigation.spec.ts
│
├── reports/
│   ├── html/
│   └── junit/
│
├── test-results/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

Generated directories such as `reports/` and `test-results/` are ignored by Git.

The local `.env` file is also ignored and must never contain committed secrets.

## Requirements

Recommended environment:

- Node.js 22+
- npm
- Git

The CI pipeline currently runs using Node.js 22.

Check your installation:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/PacoMatias89/playwright-test-report.git
cd playwright-test-report
```

Install dependencies:

```bash
npm ci
```

Install the Chromium browser used by Playwright:

```bash
npx playwright install chromium
```

On Linux or CI environments, browser system dependencies can also be installed with:

```bash
npx playwright install --with-deps chromium
```

## Environment Configuration

Create your local `.env` file from the provided example.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Bash:

```bash
cp .env.example .env
```

Current configuration:

```dotenv
BASE_URL=https://playwright.dev
API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Variables

| Variable       | Purpose                        |
| -------------- | ------------------------------ |
| `BASE_URL`     | Base URL used by browser tests |
| `API_BASE_URL` | Base URL used by API tests     |

Required environment variables are validated when the Playwright configuration is loaded.

## Running Tests

### Run the complete test suite

```bash
npm test
```

This executes both E2E and API tests.

### Run only E2E tests

```bash
npm run test:e2e
```

### Run only API tests

```bash
npm run test:api
```

### Run tests in headed mode

```bash
npm run test:headed
```

This opens the browser while the tests are running.

### Open Playwright UI Mode

```bash
npm run test:ui
```

### Run TypeScript checks

```bash
npm run typecheck
```

## End-to-End Testing

The current E2E example verifies the Playwright website using Chromium.

```text
tests/e2e/navigation.spec.ts
        │
        ▼
pages/HomePage.ts
        │
        ▼
Playwright Page
        │
        ▼
Chromium
```

The project uses a small Page Object Model layer to keep selectors and page interactions outside the test specifications.

Example:

```typescript
const homePage = new HomePage(page);

await homePage.goto();

await expect(page).toHaveTitle(/Playwright/);
await expect(homePage.getStartedLink).toBeVisible();
```

## API Testing

Playwright's `request` fixture is used for HTTP tests without opening a browser.

Current example:

```text
GET /posts/1
    │
    ├── status = 200
    ├── response.ok() = true
    ├── content-type = application/json
    └── response body validation
```

Run API tests with:

```bash
npm run test:api
```

API and browser tests can coexist in the same Playwright test suite.

## HTML Report

Playwright automatically generates an HTML report after test execution.

Location:

```text
reports/html/
```

Open the report with:

```bash
npm run report:html
```

The report provides information such as:

- executed tests;
- passed tests;
- failed tests;
- skipped tests;
- duration;
- project/browser;
- test details;
- failure information.

## JUnit XML Report

A JUnit-compatible XML report is generated at:

```text
reports/junit/results.xml
```

This format can be consumed by CI/CD platforms and reporting systems such as:

- Jenkins;
- GitHub Actions integrations;
- GitLab CI;
- Azure DevOps;
- other JUnit-compatible tools.

Example information contained in the report:

```text
tests
failures
errors
skipped
time
```

## Failure Artifacts

Playwright is configured to preserve debugging evidence when a test fails.

### Screenshot

```text
test-failed-1.png
```

A screenshot is automatically captured on failure.

### Video

```text
video.webm
```

Video is retained only when a test fails.

### Trace

```text
trace.zip
```

Traces can be opened using Playwright Trace Viewer:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer can help inspect:

- executed actions;
- locators;
- DOM snapshots;
- timing;
- network activity;
- browser state.

## Continuous Integration

The project includes a GitHub Actions workflow:

```text
.github/workflows/playwright.yml
```

The workflow runs automatically for:

- pushes to `main`;
- pull requests targeting `main`;
- manual executions using `workflow_dispatch`.

The CI process performs:

```text
Checkout repository
        ↓
Set up Node.js
        ↓
npm ci
        ↓
TypeScript checks
        ↓
Install Chromium
        ↓
Run Playwright tests
        ↓
Upload test artifacts
```

CI currently runs the Playwright suite on Ubuntu using one worker for predictable execution.

## CI Artifacts

GitHub Actions uploads the generated test artifacts even when tests fail, unless the workflow is manually cancelled.

The artifact contains:

```text
reports/html/
reports/junit/
test-results/
```

This makes it possible to inspect HTML reports, JUnit results, screenshots, videos, and traces from CI executions.

## Available Commands

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `npm test`            | Run the complete Playwright suite |
| `npm run test:e2e`    | Run E2E tests                     |
| `npm run test:api`    | Run API tests                     |
| `npm run test:headed` | Run tests with a visible browser  |
| `npm run test:ui`     | Open Playwright UI Mode           |
| `npm run typecheck`   | Run TypeScript type checking      |
| `npm run report:html` | Open the generated HTML report    |

## Current Scope

The project intentionally keeps the initial architecture small.

Current flow:

```text
Tests
  ↓
Page Objects
  ↓
Configuration
  ↓
Playwright
```

The project does not currently introduce additional framework layers unless they provide a clear practical benefit.

## Roadmap

Possible future improvements include:

- multiple browser projects;
- multiple environments;
- test tags;
- reusable fixtures;
- authentication state reuse;
- test data management;
- retries and parallel execution strategies;
- custom reporting;
- Allure Report;
- Docker;
- Jenkins integration;
- GitLab CI integration;
- Azure DevOps integration;
- Cucumber/Gherkin;
- CLI tooling;
- project scaffolding;
- Java version;
- Python version.

These features are intentionally outside the initial MVP.

## Contributing

The project is currently evolving toward its first stable public version.# Playwright Test Report

[![Playwright Tests](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml/badge.svg)](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml)
[![Release](https://img.shields.io/github/v/release/PacoMatias89/playwright-test-report)](https://github.com/PacoMatias89/playwright-test-report/releases)
[![License](https://img.shields.io/github/license/PacoMatias89/playwright-test-report)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**English** | [Español](README.es.md)

A reusable Playwright + TypeScript automation starter for end-to-end and API testing.

The project is designed for QA Automation Engineers and developers who want a practical foundation they can clone, run, understand, and adapt to their own applications without unnecessary framework complexity.

The repository includes a small public demo implementation using Playwright's website for E2E testing and JSONPlaceholder for API testing. These targets are examples only: the automation infrastructure is designed to be replaced with the system under test of each team.

## Features

- Playwright Test with TypeScript
- End-to-end browser testing
- API testing with Playwright request fixtures
- Chromium, Firefox, and WebKit execution
- Independent Playwright Projects for E2E and API tests
- Test classification with `@e2e`, `@api`, `@smoke`, and `@regression`
- Multi-environment configuration with `TEST_ENV`
- Dynamic `.env.<environment>` support
- Custom E2E fixtures with `test.extend()`
- Reusable test data
- Page Object Model
- Environment-specific browser and API base URLs
- Local parallel execution
- Controlled CI execution with one worker
- CI retries
- HTML test reports
- JUnit XML reports
- Screenshots on failure
- Video retention on failure
- Playwright traces on failure
- TypeScript type checking
- GitHub Actions CI
- Test reports and failure evidence uploaded as CI artifacts

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Playwright Test
- dotenv
- Git
- GitHub Actions

## Project Structure

```text
playwright-test-report/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── environments.ts
│
├── fixtures/
│   └── e2eFixtures.ts
│
├── pages/
│   └── HomePage.ts
│
├── test-data/
│   └── api/
│       └── posts.ts
│
├── tests/
│   ├── api/
│   │   └── health.spec.ts
│   └── e2e/
│       └── navigation.spec.ts
│
├── reports/
│   ├── html/
│   └── junit/
│
├── test-results/
│
├── .env
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── README.es.md
└── tsconfig.json
```

Generated directories such as `reports/` and `test-results/` are ignored by Git.

Local environment files such as `.env`, `.env.qa`, `.env.staging`, or other `.env.*` profiles are also ignored. Example files can be committed using the `.env.example` or `.env.<environment>.example` naming convention.

## Requirements

Recommended environment:

- Node.js 22+
- npm
- Git

The CI pipeline runs using Node.js 22.

Check your installation:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/PacoMatias89/playwright-test-report.git
cd playwright-test-report
```

Install dependencies:

```bash
npm ci
```

Install the supported Playwright browsers:

```bash
npx playwright install chromium firefox webkit
```

On Linux or CI environments, browser system dependencies can also be installed with:

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Environment Configuration

The framework supports a default environment and optional named environments.

### Default environment

Create `.env` from the provided example.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Bash:

```bash
cp .env.example .env
```

Example:

```dotenv
BASE_URL=https://playwright.dev
API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Named environments

Set `TEST_ENV` to dynamically select an environment file.

For example:

```text
TEST_ENV=qa
        ↓
.env.qa
```

PowerShell:

```powershell
$env:TEST_ENV="qa"
npm test
```

Bash:

```bash
TEST_ENV=qa npm test
```

The framework does not hardcode environment names. A team can use any naming convention:

```text
.env.dev
.env.qa
.env.pre
.env.uat
.env.staging
.env.customer-a
```

The selected file follows this rule:

```text
TEST_ENV=<name>
        ↓
.env.<name>
```

If `TEST_ENV` is not defined, the default `.env` file is used.

Environment variables can also be injected directly by CI/CD systems without requiring a physical `.env` file.

### Variables

| Variable       | Purpose                               |
| -------------- | ------------------------------------- |
| `BASE_URL`     | Base URL used by browser projects     |
| `API_BASE_URL` | Base URL used by the API project      |
| `TEST_ENV`     | Optional environment profile selector |

Required URLs are validated when Playwright loads the configuration.

## Playwright Projects

The suite uses independent Playwright Projects to keep browser and API execution logically separated.

```text
Playwright
│
├── chromium ─┐
├── firefox  ─┼── tests/e2e/**
├── webkit   ─┘
│
└── api ───────── tests/api/**
```

Browser projects use `BASE_URL`.

The API project uses `API_BASE_URL`.

This prevents API tests from being unnecessarily executed once per browser.

## Test Classification

Tests are classified using two independent dimensions.

### Test type

```text
@e2e
@api
```

### Execution scope

```text
@smoke
@regression
```

Example:

```text
E2E critical test
→ @e2e @smoke @regression

API critical test
→ @api @smoke @regression
```

This allows tests to remain organized by technical type while also supporting execution strategies such as smoke and regression suites.

## Running Tests

### Complete suite

```bash
npm test
```

The complete suite currently executes:

```text
Chromium E2E
Firefox E2E
WebKit E2E
API
```

### E2E suite

```bash
npm run test:e2e
```

Runs E2E tests across Chromium, Firefox, and WebKit.

### API suite

```bash
npm run test:api
```

Runs only the API project.

### Smoke suite

```bash
npm run test:smoke
```

Runs tests tagged with `@smoke`.

### Regression suite

```bash
npm run test:regression
```

Runs tests tagged with `@regression`.

### Chromium

```bash
npm run test:chromium
```

### Firefox

```bash
npm run test:firefox
```

### WebKit

```bash
npm run test:webkit
```

### Headed mode

```bash
npm run test:headed
```

### Playwright UI Mode

```bash
npm run test:ui
```

### TypeScript checks

```bash
npm run typecheck
```

## End-to-End Testing

The public E2E example uses Playwright's website only as a demonstration system.

```text
tests/e2e/navigation.spec.ts
        │
        ▼
fixtures/e2eFixtures.ts
        │
        ▼
pages/HomePage.ts
        │
        ▼
Playwright page
        │
        ├── Chromium
        ├── Firefox
        └── WebKit
```

The project uses a small Page Object Model layer to keep selectors and page interactions outside test specifications.

E2E Page Objects can be provided to tests through custom fixtures.

Example:

```typescript
async ({ page, homePage }) => {
  await homePage.goto();

  await expect(page).toHaveTitle(/Playwright/);
  await expect(homePage.getStartedLink).toBeVisible();
};
```

A team adapting the project can replace `HomePage` with its own application objects without changing the underlying fixture mechanism.

## Custom Fixtures

Reusable E2E dependencies are defined using Playwright's native `test.extend()` mechanism.

Current example:

```text
Playwright built-in fixtures
        │
        └── page
             │
             ▼
      custom fixture
             │
             └── homePage
```

Tests request only the fixtures they need.

The fixture layer intentionally remains small and does not introduce custom fixture managers, factories, registries, or unnecessary abstraction layers.

## API Testing

API tests use Playwright's native `request` fixture.

The API project provides `API_BASE_URL` as its `baseURL`, allowing tests to use relative endpoints:

```typescript
const response = await request.get(`/posts/${existingPost.id}`);
```

Current public example:

```text
GET /posts/{id}
        │
        ├── status validation
        ├── response.ok()
        ├── content-type validation
        └── response body validation
```

The endpoint belongs to the demo implementation. Teams can replace it with their own API tests while retaining the surrounding project configuration, reporting, tags, environment handling, and execution model.

## Test Data

Reusable scenario data lives outside the test specifications.

Current structure:

```text
test-data/
└── api/
    └── posts.ts
```

Example:

```typescript
export const postTestData = {
  existingPost: {
    id: 1,
    userId: 1,
  },
} as const;
```

The goal is to separate reusable scenario data from test behavior without moving every literal or assertion into configuration files.

## Retries and Parallelism

Local execution prioritizes fast feedback:

```text
retries = 0
workers = Playwright default
```

CI execution prioritizes predictability:

```text
retries = 2
workers = 1
```

The configuration uses:

```typescript
fullyParallel: false,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
```

Retries are intentionally disabled locally so failures are visible immediately during development.

Full parallel execution inside individual test files is not enabled by default.

## HTML Report

Playwright generates an HTML report after test execution.

Location:

```text
reports/html/
```

Open the report with:

```bash
npm run report:html
```

The report includes information such as:

- executed tests
- passed, failed, and skipped tests
- duration
- Playwright project/browser
- failure information
- attached evidence

## JUnit XML Report

A JUnit-compatible report is generated at:

```text
reports/junit/results.xml
```

JUnit output can be consumed by CI/CD and reporting tools such as Jenkins, GitHub Actions integrations, GitLab CI, Azure DevOps, and other JUnit-compatible systems.

## Failure Artifacts

Playwright preserves debugging evidence when a test fails.

### Screenshot

Screenshots are captured only on failure.

### Video

Videos are retained only for failed tests.

### Trace

Traces are retained for failed tests and can be inspected with Playwright Trace Viewer:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer can help inspect:

- executed actions
- locators
- DOM snapshots
- timing
- network activity
- browser state

## Continuous Integration

The repository includes:

```text
.github/workflows/playwright.yml
```

The workflow runs for:

- pushes to `main`
- pull requests targeting `main`
- manual executions through `workflow_dispatch`

The CI pipeline performs:

```text
Checkout repository
        ↓
Set up Node.js 22
        ↓
npm ci
        ↓
TypeScript checks
        ↓
Install Chromium + Firefox + WebKit
        ↓
Run complete Playwright suite
        ↓
Upload reports and failure artifacts
```

CI runs on Ubuntu with:

```text
workers = 1
retries = 2
```

The `develop` branch is used for development and local validation. The stable `main` branch represents published code and triggers the release CI workflow.

## CI Artifacts

GitHub Actions uploads generated evidence unless the workflow is cancelled.

Artifacts include:

```text
reports/html/
reports/junit/
test-results/
```

Depending on the execution result, these directories can contain:

- HTML reports
- JUnit XML
- screenshots
- videos
- traces
- Playwright error context

## Available Commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `npm test`                | Run the complete Playwright suite           |
| `npm run test:e2e`        | Run E2E tests across all supported browsers |
| `npm run test:api`        | Run API tests                               |
| `npm run test:smoke`      | Run tests tagged with`@smoke`               |
| `npm run test:regression` | Run tests tagged with`@regression`          |
| `npm run test:chromium`   | Run Chromium E2E tests                      |
| `npm run test:firefox`    | Run Firefox E2E tests                       |
| `npm run test:webkit`     | Run WebKit E2E tests                        |
| `npm run test:headed`     | Run tests with visible browsers             |
| `npm run test:ui`         | Open Playwright UI Mode                     |
| `npm run typecheck`       | Run TypeScript type checking                |
| `npm run report:html`     | Open the generated HTML report              |

## Using the Framework With Your Project

The repository includes demo tests so a clean clone can be executed immediately.

To adapt it to another system:

1. Configure your own `BASE_URL` and `API_BASE_URL`.
2. Create the environment profiles required by your team.
3. Replace or extend the demo Page Objects.
4. Replace or extend the demo E2E specifications.
5. Replace or extend the demo API specifications.
6. Add your own test data.
7. Reuse the existing projects, tags, fixtures, reporting, retry strategy, and CI integration.

The infrastructure should remain independent from the specific system under test.

## Architecture Principles

The project intentionally favors a small architecture:

```text
Tests
  │
  ├── Test Data
  ├── Fixtures
  ├── Page Objects
  └── Configuration
          │
          ▼
      Playwright
```

The main principles are:

- maintainability
- clarity
- reuse
- easy onboarding
- native Playwright capabilities before custom abstractions
- separation between reusable framework infrastructure and demo implementation
- no architecture layer without a practical reason

## Release Strategy

`main` represents the current stable public version.

`develop` contains work for the next version.

Development changes are validated on `develop` and released to `main` as a clean release change after the version is complete.

## Roadmap

### v1.0.0 — Foundation

- Playwright + TypeScript foundation
- E2E testing
- API testing
- Page Object Model
- environment configuration
- reporting
- failure evidence
- GitHub Actions

### v1.1.0 — Framework Foundations

- test classification
- smoke and regression suites
- Playwright Projects
- Chromium, Firefox, and WebKit
- independent API project
- multi-environment support
- reusable custom fixtures
- reusable test data
- retries
- controlled parallel execution

### v1.2.0 — Real-world QA Patterns

Planned areas include:

- reusable authentication
- `storageState`
- API clients
- schema validation
- test parametrization
- network interception
- mocks

### v1.3.0 — CI/CD & Developer Experience

Planned areas include:

- Jenkins integration
- parameterized Jenkins pipelines
- additional CI/CD integrations where useful
- Docker
- developer tooling
- CLI and scaffolding exploration

### v2.0.0 — Reporting

Planned areas include:

- custom reporting
- richer result models
- dashboard exploration

The roadmap may evolve as practical requirements appear.

## Contributing

Issues and pull requests can be used to propose improvements, fixes, or additional testing capabilities.

Changes should keep the project practical, understandable, and close to native Playwright concepts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built as a practical Playwright automation foundation for QA engineers and developers.

Issues and pull requests can be used to propose improvements, fixes, or additional testing capabilities.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built as a practical Playwright automation starter for QA engineers and developers.

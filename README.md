# Playwright Test Report

A reusable Playwright + TypeScript starter project for end-to-end testing, API testing, automated reporting, failure artifacts, and CI execution.

The goal of this repository is to provide a clean and practical foundation that QA Automation Engineers and developers can clone and adapt to their own projects without unnecessary complexity.

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

The project is currently evolving toward its first stable public version.

Issues and pull requests can be used to propose improvements, fixes, or additional testing capabilities.

## License

A license will be included before the first stable public release.

---

Built as a practical Playwright automation starter for QA engineers and developers.

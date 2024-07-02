# Playwright-Restful-Booker
[![Tests status](https://github.com/JakubRumpca/Playwright-Restful-Booker/actions/workflows/pipeline.yml/badge.svg)](https://github.com/JakubRumpca/Playwright-Restful-Booker/actions/workflows/pipeline.yml)

The repository contains playwright automated tests of Restful-booker which is a CRUD Web API that comes with authentication features that was created for training purposes. The API documentation is available at https://restful-booker.herokuapp.com/apidoc/index.html.

## Technologies

- **JavaScript**
- **Node** - Version used -> 20. (It is required for dependency installation)
- **NPM** - Version used -> 10.

## Repository content

- **/tests** - Main location for API tests.
- **playwright.config.js** - Playwright configuration file that contains settings for the test environment.
- **.env.template** - User data should be hidden, but the application was created for training purposes. Secrets are available on the documentation so I do not hide them in this repository, but .env file was added to .gitignore file as should. After removing ".template" from the file name, you can run the tests.
- **/.github/workflows/pipeline.yml** - File that contains Continuous Integration/Continuous Deployment (CI/CD) configuration.
- **/test-results** - Folder contains test results obtained using the Playwright Trace Viewer tool. The test results report is saved in zip format and only retained in case of failure. The file is named **"trace.zip"**, to view the report, drop the file on https://trace.playwright.dev/. The folder is also saved in pipeline. By opening workflow run in the artifacts section you can download the result of failed tests from the pipeline run.

## How to run tests

To run the tests, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Install playwright browsers:

```bash
npx playwright install
```

3. remove **.template** from the file name **.env.template**. It defines the secrets needed to log in.

```bash
cp .env.template .env
```

4. To runs all e2e tests:

```bash
npm run tests
```

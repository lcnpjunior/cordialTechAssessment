# DemoQA Automation Tests

### Clone Project 

```
git clone git@github.com:lcnpjunior/cordialTechAssessment.git
```
### Install dependencies

```
npm install
```

### Install Playwright 

```
npx playwright install
```

## How run the tests

### Running all tests(Api + Web)
```
npm run tests
```

### Running tests on a expecific browser
```
npm run chrome
```
#### Options:
- chrome
- safari
- firefox


### Running API Tests
```
npm run api-tests
```
### Running BOOKS Tests
```
npm run web-tests
```

### Running a test by Tag
```
npm run api-tests -- --grep @login
npm run web-tests -- --grep @login
```

#### Tags List:
- web
- @api
- @login
- @register
- @books
- @negative

### Running tests in headed mode (it will open the browser)
```
npm run headed
```

## Debugging tests

### Debugging all tests (It will open the playwright debug window)
```
npm run debug
```

### Debugging a test by Tag with a specific browser
```
npm run chrome -- --debug --grep @negative
npm run chrome -- --debug --grep @books
```

### Show test report
```
npx playwright show-report
```
### Json Schema Validator Reference

[Validating Json Schema](https://playwrightsolutions.com/the-definitive-guide-to-api-test-automation-with-playwright-part-9-validating-json-schema/)
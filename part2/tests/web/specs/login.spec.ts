import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { BooksPage } from '../page/books.page';
import { ServicesAPI } from '../../api/serviceApi/servicesAPI';
import { login } from "../../../fixtures/data";

let loginPage: any;
let booksPage: any;
const servicesApi = new ServicesAPI();

test.describe('Negative login scenarios @web @login @negavite', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        booksPage = new BooksPage(page);
        await test.step('Open browser and go to Login page', async () => {
            await page.goto('/books');
            await booksPage.clickOnLoginButton();
            await loginPage.waitForLoginPageTitle();
        });
    });
    test('Validate error when login with invalid username', async () => {
        await test.step('Login', async () => {
            await loginPage.login('QaTestInvalid', login.password);
        });
        await test.step('Validate error message', async () => {
            await loginPage.validateErrorMessage('Invalid username or password!')
        });
    });
    test('Validate error when login with invalid password', async () => {
        await test.step('Login', async () => {
            await loginPage.login(login.userName, 'test@12345');
        });
        await test.step('Validate error message', async () => {
            await loginPage.validateErrorMessage('Invalid username or password!')
        });
    });
    test('Validate error when login with empty username and password', async ({ page }) => {
        await test.step('Login', async () => {
            await loginPage.login('', '');
        });
        await test.step('Validate input border color red', async () => {
            const username = await page.locator('input[id="userName"]');
            const password = await page.locator('input[id="password"]');
            await expect(username).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(username).toHaveClass(/is-invalid/);
            await expect(password).toHaveCSS('border-color', 'rgb(220, 53, 69)');            
            await expect(password).toHaveClass(/is-invalid/);
        });
    });

});

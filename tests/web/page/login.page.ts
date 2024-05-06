import { expect, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForLoginPageTitle(timeout:number = 30000) {
        await this.page.waitForSelector('form[id="userForm"]:has-text("Login in Book Store")', { timeout: timeout });
    }

    async login(username: string, password: string) {
        await this.page.locator('input[id="userName"]').fill(username);
        await this.page.locator('input[id="password"]').fill(password);
        await this.page.locator('button[id="login"]').click();
    }

    async validateErrorMessage(message: string) {
        await expect(this.page.locator('p[id="name"]').filter({ hasText: message })).toBeVisible();
    }
}

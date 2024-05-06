import { Page, expect } from '@playwright/test';

export class BooksPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnLoginButton() {
        await this.page.locator('button[id="login"]').click();
    }
    
    async validateLoginSuccessfully(message: string) {
        await expect(async () => {
            await expect(this.page.locator('label[id="userName-value"]').filter({ hasText: message })).toBeVisible();
        }).toPass({
            timeout: 10_000
        });
    }

    async getBookTitleList() {
        const pageBookTitleList = await this.page.locator('div.rt-tbody span[id*="see-book-"] a').allTextContents();
        return pageBookTitleList
    }

    async searchBooks(content: string) {
        await this.page.locator('input[id="searchBox"]').fill(content);
    }
}

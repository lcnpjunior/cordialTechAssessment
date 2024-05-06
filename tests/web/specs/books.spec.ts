import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { BooksPage } from '../page/books.page';
import { ServicesAPI } from '../../api/serviceApi/servicesAPI';
import { login } from "../../../fixtures/data";
import { getRandomIndex } from "../../../helpers/helpers"

let loginPage: any;
let booksPage: any;
const servicesApi = new ServicesAPI();

test.describe('Validate Books @web @books', () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        booksPage = new BooksPage(page);
        await test.step('Open browser and go to Books page', async () => {            
            await page.goto('/books');
        });
    });

    test('Login and validate books title @login', async ({ page }) => {                
        await test.step('Login', async () => {
            await booksPage.clickOnLoginButton();
            await loginPage.waitForLoginPageTitle();
            await loginPage.login(login.userName, login.password);
            await booksPage.validateLoginSuccessfully(login.name);
        });

        await test.step('Validate displayed books', async () => {
            const booksResponse = await servicesApi.getBooks();
            expect(booksResponse.status()).toEqual(200);
            const apiBooksResponseJson = await booksResponse.json();
            const pageBookTitleList = await booksPage.getBookTitleList();
            expect(apiBooksResponseJson.books.length).toEqual(pageBookTitleList.length);
            for (let i = 0; i < apiBooksResponseJson.books.length; i++) {
                expect(pageBookTitleList[i]).toEqual(apiBooksResponseJson.books[i].title);
            }
        });
    });
    test('Random search for books title', async () => {
        const pageBookTitleList = await booksPage.getBookTitleList();
        const randomIndex = getRandomIndex(pageBookTitleList)
        await booksPage.searchBooks(pageBookTitleList[randomIndex])
        const searchResult = await booksPage.getBookTitleList()
        expect(searchResult.length).toEqual(1)
        expect(searchResult[0]).toEqual(pageBookTitleList[randomIndex])
        console.log(pageBookTitleList[randomIndex])
    });
});

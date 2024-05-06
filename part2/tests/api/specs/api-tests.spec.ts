import { test, expect } from '@playwright/test';
import { ServicesAPI } from '../serviceApi/servicesAPI';
import { createUser } from "../../../helpers/helpers";
import { login } from "../../../fixtures/data";
import { validateJsonSchema } from "../jsonSchemaValidatorClasses/validateJsonSchema";

let servicesApi = new ServicesAPI();

test.describe('API Tests @api', async () => {
    test('Register new user and login with success @register @login', async () => {
        let user = createUser();
        let userID: string;
        await test.step('Register new user', async () => {
            const newUserResponse = await servicesApi.postNewUser(user.userName, user.password);
            expect(newUserResponse.status()).toBe(201);
            const newUserResponseJson = await newUserResponse.json();
            expect(newUserResponseJson.username).toBe(user.userName);
            await validateJsonSchema('POST_NewUser', newUserResponseJson);  
            userID = await newUserResponseJson.userID
        });

        await test.step('Login and validate user', async () => {
            const loginResponse = await servicesApi.postLogin(user.userName, user.password);
            expect(loginResponse.status()).toBe(200);
            const loginResponseJson = await loginResponse.json();
            await validateJsonSchema('POST_Login', loginResponseJson);
            expect(loginResponseJson.username).toBe(user.userName)
            expect(loginResponseJson.password).toBe(user.password)
            expect(loginResponseJson.userId).toBe(userID)
        });

    });
    test('Get books @books', async () => {
        const booksResponse = await servicesApi.getBooks();
        expect(booksResponse.status()).toBe(200);
        const booksResponseJson = await booksResponse.json();
        await validateJsonSchema('GET_Books', booksResponseJson);            
        expect(booksResponseJson.books).toEqual(expect.arrayContaining([
            expect.objectContaining({ title: 'Git Pocket Guide' }),
            expect.objectContaining({ title: 'Learning JavaScript Design Patterns' }),
            expect.objectContaining({ title: 'Designing Evolvable Web APIs with ASP.NET' }),
            expect.objectContaining({ title: 'Speaking JavaScript' }),
            expect.objectContaining({ title: 'You Don\'t Know JS' }),
            expect.objectContaining({ title: 'Programming JavaScript Applications' }),
            expect.objectContaining({ title: 'Eloquent JavaScript, Second Edition' }),
            expect.objectContaining({ title: 'Understanding ECMAScript 6' }),
        ]));
    });
    test('Validate error when registering new user with existing user name @register @negative', async () => {
        let newUserResponse: any;
        let newUserResponseJson: any;

        await test.step('Register new user', async () => {
            newUserResponse = await servicesApi.postNewUser(login.userName, login.password);       
        });

        await test.step('Validate response status code and message error: "User exists!"', async () => {                        
            expect(newUserResponse.status()).toBe(406);
            newUserResponseJson = await newUserResponse.json();
            expect(newUserResponseJson.code).toBe('1204');
            expect(newUserResponseJson.message).toBe('User exists!');
            await validateJsonSchema('POST_InvalidUser', newUserResponseJson);
        });
    });
    test('Validate error when registering users without the password requirements @register @negavite', async () => {

        const passwordRequirementScenarios = [
            { "passwordRequirementTitle": "password without capital letters", "password": "test@12345" },
            { "passwordRequirementTitle": "password without lowercase letters", "password": "TEST@12345" },
            { "passwordRequirementTitle": "password without special characters", "password": "Test12345" },
            { "passwordRequirementTitle": "password with less than eight characters", "password": "Test@12" }] 

        for (const scenario of passwordRequirementScenarios) {
            let newUserResponse: any;
            let newUserResponseJson: any;
            await test.step(`Register new user with ${scenario.passwordRequirementTitle}`, async () => {
                newUserResponse = await servicesApi.postNewUser(login.userName, scenario.password); 
                
            });
            await test.step('Validate response status code and error message', async () => {
                expect(newUserResponse.status()).toBe(400);
                newUserResponseJson = await newUserResponse.json();
                expect(newUserResponseJson.code).toBe('1300');
                expect(newUserResponseJson.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
                await validateJsonSchema('POST_InvalidUser', newUserResponseJson);                
            });
        }
    });
});

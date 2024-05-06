import { expect, request } from "@playwright/test";

export class ServicesAPI {

    async postNewUser(user: string, password: string) {
        const context = await request.newContext()
        const response = await context.post(`/Account/v1/User`, {
            data: {
                "userName": user,
                "password": password
            },
        });
        return response
    }

    async postLogin(user: string, password: string) {
        const context = await request.newContext()
        const response = await context.post(`/Account/v1/Login`, {
            data: {
                "userName": user,
                "password": password
            },
        });
        return response
    }

    async getBooks() {
        const context = await request.newContext()
        const response = await context.get(`/BookStore/v1/Books`);
        return response
    }
}

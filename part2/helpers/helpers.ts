import { login } from '../fixtures/data'
import { faker } from '@faker-js/faker';

export function createUser() {
    const name = faker.person.middleName()
    const timestamp = Date.now()
    return {
        userName: `Qa${name}-${timestamp}`,
        password: login.password,
    };
}

export const getRandomIndex = (array: any) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex
}

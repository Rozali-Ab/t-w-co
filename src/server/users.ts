import {hashedPassword, verifyPassword} from "~/server/utils/passwordUtils";
import {UserType} from "~/types/user";

const fetchUsers = async (): Promise<Array<UserType> | null> => {

    const config = useRuntimeConfig();
    const url = config.public.NUXT_PUBLIC_USERS_URL;

    return await $fetch(url);
}

export const fetchUser = async (email: string, password: string): Promise<UserType | null> => {

    try {
        const users = await fetchUsers();

        if (users) {

            const foundedUser = users.find(user => user.credentials.username === email);

            if (!foundedUser) return null;

            const isPasswordValid = await verifyPassword(password, foundedUser.credentials.passphrase);

            if (!isPasswordValid) {
                throw new Error('Неверный пароль');
            }

            return foundedUser;
        }

        return null;
    } catch (e) {
        if (e instanceof TypeError) {
            throw new Error('Не удалось подключиться к серверу.');
        }
        throw e;
    }
}

export const postNewUser = async (userData: UserType): Promise<void> => {

    const config = useRuntimeConfig();
    const url = config.public.NUXT_PUBLIC_USERS_URL;

    try {
        userData.credentials.passphrase = await hashedPassword(userData.credentials.passphrase);

        await $fetch(url, {
            method: 'POST',
            body: userData
        });
    } catch (e) {
        throw new Error('Не удалось сохранить данные пользователя')
    }
}

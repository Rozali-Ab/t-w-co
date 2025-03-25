import type { UserType } from "~/types/user";
import {process} from "std-env";

export const useUserStore = () =>  {
    const isAuth = ref<boolean>(false);
    const user = ref<UserType | null>(null);

    if (process.client) {
        isAuth.value = JSON.parse(localStorage.getItem("isAuth") ?? "false");
        user.value = JSON.parse(localStorage.getItem("user") ?? "null");
    }

    function login(userData: UserType) {
        isAuth.value = true;
        user.value = { ...userData };

        if (process.client) {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isAuth", JSON.stringify(isAuth.value));
        }
    }

    function logout() {
        isAuth.value = false;
        user.value = null;

        if (process.client) {
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
        }

        navigateTo('/login');
    }

    return { isAuth, login, logout };
};

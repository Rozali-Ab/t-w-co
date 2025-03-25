import bcrypt from 'bcryptjs';

// Функция для хеширования пароля
export const hashedPassword = async (password: string): Promise<string> => {

    const config = useRuntimeConfig();

    const saltRounds = Number(config.public.NUXT_PUBLIC_SALT_SECRET);

    // Генерация соли и хеширование пароля
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}

// Функция для проверки пароля
export const verifyPassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
    return bcrypt.compare(inputPassword, storedPassword);
}

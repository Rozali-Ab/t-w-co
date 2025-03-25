// nuxt.config.ts
import {process} from "std-env";

export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/styles.scss'],
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SALT_SECRET: process.env.NUXT_PUBLIC_SALT_SECRET || '',
      NUXT_PUBLIC_USERS_URL: process.env.NUXT_PUBLIC_USERS_URL || '',
    }
  }
})

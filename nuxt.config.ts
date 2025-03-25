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
      VITE_SALT_SECRET: process.env.VITE_SALT_SECRET || '10',
    }
  }
})

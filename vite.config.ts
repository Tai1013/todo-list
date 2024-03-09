import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${env.VITE_APP_TITLE}</title>`
          )
        }
      },
      vue()
    ],
    base: env.VITE_APP_BASE,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src/')
      }
    }
  }
})

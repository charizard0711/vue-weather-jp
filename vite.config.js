// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',              // ★ 相対パスにしておく
  build: {
    outDir: 'docs',        // ★ ビルド結果を docs フォルダに出す
  },
  plugins: [vue()],
})


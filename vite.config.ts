import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: "/src/mock",
        localEnabled: process.env.IS_MOCK,
        prodEnabled: command !== "serve",
        injectCode: `
          // 这个路径需要注意是在你要注入的文件下的引用路径
          import { setupProdMockServer } from './utils/mockProdServer';
          setupProdMockServer();
        `,
        // 在全局中注入代码,不配置的话默认是在src/main.js/main.ts
        injectFile: path.resolve("src/main.js"),
      })
    ]
  }
})

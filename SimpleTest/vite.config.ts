import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //跨域代理
  // server:{
  //   //端口号
  //   port:9999,
  //   //
  //   open:true,
  //   //跨域代理
  //   proxy:{
  //     '/api':'http://xxxx.com'
  //   },
  //   //跨域允许
  //   cors:true
  // }
  //本地
  server:{
    proxy:{
      '/api':'http://localhost:1234/'
    }
  }
})

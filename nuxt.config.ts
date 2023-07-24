// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore']
      ]
    }],
    'nuxt-svgo'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://vjs.zencdn.net/5.10.4/video-js.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.rawgit.com/yanwsh/videojs-panorama/master/dist/videojs-panorama.css'
        }
      ],
      script: [
        {
          src: 'https://vjs.zencdn.net/5.10.4/video.js'
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.js'
        },
        {
          src: 'https://rawgit.com/yanwsh/videojs-panorama/master/dist/videojs-panorama.v5.js'
        }
      ]
    }
  }
})

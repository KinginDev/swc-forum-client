const pkg = require('./package')
const webpack =  require('webpack')
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'SWC Forum Sponsored By Apex Traingle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'shortcut icon',  href: 'images/57x57.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'},
      { rel: 'stylesheet', type: 'text/css', href: '/css/styles.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Arimo' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.css', type: 'text/css'},
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css'
      },
       {
        rel: 'stylesheet',
        href: 'css/prism.css'
      }


    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js', 
        crossorigin: 'anonymous'},
        
      { src: 
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js' }, 
      {
        src :"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/simplemde/1.11.2/simplemde.min.js', type: 'text/javascript'},
      { src : '/js/main.js', type: 'text/javascript'},
      { src : '/js/prism.js', type: 'text/javascript'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#333' },

  /*
  ** Global CSS
  */
  css: [
    '~/node_modules/vue-wysiwyg/dist/vueWysiwyg.css',
    '~/node_modules/froala-editor/css/froala_editor.pkgd.min.css',
    '~/node_modules/froala-editor/css/froala_style.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vue-alert.js', ssr: false },
    { src: '~plugins/editor.js',},
      { src: '~plugins/eventBus.js',}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    ['nuxt-validate', {
      lang: 'en', 
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL :'http://localhost/7000/'
  },
  apollo: {
    clientConfigs: {
      default: '~/config/apollo.js'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery'
      })
    ]
  }
}


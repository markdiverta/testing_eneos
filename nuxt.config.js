const environment = process.env.NODE_ENV;
const envSettings = require(`./env.${environment}.js`);
import axios from 'axios';
import endsWith from 'string.prototype.endswith';

export default {
    env: envSettings,
    /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
    mode: 'universal',
    ssr: true,
    srcDir: 'src/',
    /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
    target: 'static',
    /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
    head: {
        htmlAttrs: {
            lang: 'ja'
        },
        titleTemplate: '%s - ',
        title: envSettings.META_TITLE,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: envSettings.SITE_DESCRIPTION
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: envSettings.SITE_TITLE
              },
              { hid: 'og:type', property: 'og:type', content: 'article' },
              {
                hid: 'og:url',
                property: 'og:url',
                content: envSettings.BASE_URL
              },
              {
                hid: 'og:title',
                property: 'og:title',
                content: envSettings.SITE_TITLE
              },
              {
                hid: 'og:description',
                property: 'og:description',
                content: envSettings.SITE_DESCRIPTION
              },
              {
                hid: 'og:image:type"',
                property: 'og:image:type',
                content: 'image/jpg'
              },
              {
                hid: 'og:image',
                property: 'og:image',
                // content: `${envSettings.BASE_URL}/assets/images/og2.jpg`
                content: `${envSettings.BASE_URL}/files/user/og.jpg`
              },
              {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
              },
              {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: envSettings.SITE_TITLE
              },
              {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: envSettings.SITE_DESCRIPTION
              },
              {
                hid: 'twitter:image',
                name: 'twitter:image',
                // content: `${envSettings.BASE_URL}/assets/images/og2.jpg`
                content: `${envSettings.BASE_URL}/files/user/og.jpg`
              },      
            { hid: 'robots', name: 'robots', content: envSettings.ROBOTS }
        ],
        link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }]
    },
    /*
   ** Global CSS
   */
    css: [],
    /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
    plugins: ['@/plugins/parser'],
    /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
    components: true,
    /*
   ** Nuxt.js dev-modules
   */
    buildModules: [
        '@nuxtjs/vuetify',
        // '@nuxtjs/fontawesome',
        // ['@nuxtjs/fontawesome', {
        //     component: 'fas',
        //     suffix: true,
        //     icons: {
        //       solid: ['freeFasAngle-left', 'freeFasBars', 'freeFasChevron-up'],
        //     }
        // }],
    ],
    /*
    ** Fontawesome
    */
    // fontawesome: {
    //     icons: {
    //         regular: [],
    //         solid: true,
    //         brands: []
    //     }
    // },
    /*
   ** Nuxt.js modules
   */
   modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/meta',
        // '@nuxtjs/sitemap',
        '@nuxtjs/auth',
        ['@nuxtjs/pwa', { workbox: false, autoRegister: false, manifest: { publicPath: '/_nuxt/', crossorigin: 'use-credentials' } }],
        'nuxt-i18n',
        ['@nuxtjs/google-gtag', {
            id: 'G-5HDZ7M74GM',
            config: {
                anonymize_ip: true, // anonymize IP
                send_page_view: false // might be necessary to avoid duplicated page track on page reload
            },
            debug: true, // enable to track in dev mode
            disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
            additionalAccounts: [{
                id: 'UA-260921713-1' // required if you are adding additional accounts
            }]
        }],
    ],
    proxy: {
        '/rcms-api': {
            target: 'https://mtown.g.kuroco-mng.app',
            pathRewrite: { '^/rcms-api': '' }
        }
    },
    /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
    vuetify: {
        customVariables: ['@/assets/variables.scss'],
        theme: {
            disable: true
        }
    },
    i18n: {
        locales: [
             //{ code: 'en', iso: 'en-US' },
            { code: 'ja', iso: 'ja-JP' }
        ],
        defaultLocale: 'ja',
        strategy: 'prefix_except_default',
        vueI18n: {
            fallbackLocale: 'ja',
            messages: {
                /*
                en: {
                    welcome: 'Welcome'
                },
                */
                ja: {
                    welcome: 'ようこそ'
                }
            }
        },
        vueI18nLoader: false
    },
    /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
    build: {
        hardSource: false,
        babel: {
            presets({ isServer }, [preset, options]) {
                options.loose = true;
            }
        },  
        html: {
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }, 
    },
    typescript: {
        typeCheck: true,
        ignoreNotFoundWarnings: true
    },
    router: {
        middleware: ['auth'],
        // extendRoutes(routes, resolve) {
        //     routes.push({
        //         name: 'category',
        //         path: '/news/:category/:articleId?',
        //         component: resolve(__dirname, '@/pages/news/_id.vue')
        //     });
        //     routes.push({
        //         name: 'category',
        //         path: '/news/:category/',
        //         component: resolve(__dirname, '@/pages/news/index.vue')
        //     });
        // },
    },
    /*
    // generate: {
    //     async routes() {
    //       const categories = ['nikkei', 'politics', 'xxxx']
    //       const routes = []
    
    //       for (const category of categories) {
    //         const response = await this.$axios.$get(`/rcms-api/1/content/list/?topics_group_id=${category}`)
    //         const articles = response
    
    //         for (const article of articles) {
    //           routes.push({
    //             route: `/news/${category}/${article.id}`,
    //             payload: {
    //               article
    //             }
    //           })
    //         }
    //       }
    
    //       return routes
    //     }
    //   },
    // generate: {
    //     async routes() {
    //       const categories = ['politics', 'covid-19', 'economic', 'nikkei', 'others']
    //       const routes = []
          
    //       for (const category of categories) {
    //         const { contents } = await this.$axios.$get(`/rcms-api/1/content/list/?topics_group_id=${category}`)
    //         contents.forEach((article) => {
    //           routes.push({
    //             route: `/news/${category}/${article.id}`,
    //             payload: {
    //               component: '@/pages/blog/details/content.vue',
    //               article
    //             }
    //           })
    //         })
    //       }
    
    //       return routes
    //     }
    //   },
    // generate: {
    //     async routes() {
    //       const categories = ['politics', 'covid-19', 'economic', 'nikkei', 'others']
    //       const routes = []
    //       console.log('hihihi');
    //       for (const category of categories) {
    //         routes.push(`/news/${category}`)
    //       }
    //       return routes
    //     }
    // },
    // generate: {
    //     async routes() {
    //       const routes = []
    //       const categories = ['nikkei', 'politics', 'xxxx']
    
    //       for (const category of categories) {
    //         console.log(`Generating route for category: ${category}`)
    //         routes.push({
    //           route: `/news/${category}/`,
    //           payload: {
    //             component: '@/pages/news/index.vue'
    //           }
    //         })
    //       }
    
    //       return routes
    //     }
    // },
    */
    axios: {
        baseURL: envSettings.BASE_URL,
        credentials: true
    },
    auth: {
        localStorage: {
            prefix: 'rcms_api.'
        },
        redirect: {
            login: '/', // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
            logout: '/', // ログアウト時のリダイレクトURL(4.9.1ではそのままでは動かない)
            home: '/', // ログイン後のリダイレクトURL(4.9.1ではそのままでは動かない)
            callback: false
        },
        // strategies: {
        //     local: {
        //         endpoints: {
        //             login: {
        //                 url: '/rcms-api/1/login',
        //                 method: 'post'
        //             },
        //             // user: {
        //             //     url: '/rcms-api/1/profile',
        //             //     method: 'get',
        //             //     propertyName: false
        //             // },
        //             logout: {
        //                 url: '/rcms-api/1/logout',
        //                 method: 'post'
        //             }
        //         },
        //         tokenRequired: false,
        //         // autoFetchUser: false
        //     }
        // }
    },
    overrides: [
        {
            files: ['*.vue'],
            processor: 'vue/.vue'
        }
    ],
    /*
    generate: {
        // async routes() {
        //     try {
        //     console.log('enter');
        //     let routesPath = [];
        //     let res = await axios.get('https://api.mtown.my/rcms-api/1/content/details/');
        //     console.log(res);
        //     let data = res.data;
        //     data?.list?.forEach(page => {
        //         let slug = page.slug.length != 0 ? page.slug : page.subject.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        //         routesPath.push('/news/nikkei/' + slug);
        //     })
        //     return routesPath;
        //         } catch(err) {
        //             console.log(err);
        //         return [];
        //     }
        // }
        // async routes() {
        //     const categories = ['politics', 'covid-19', 'economic', 'nikkei', 'others']
        //     const routes = []
            
        //     for (const category of categories) {
        //         const response = await axios.get(`https://api.mtown.my/rcms-api/1/content/list/?topics_group_id=${category}`);
        //         const articles = response;
        //             for (const article of articles) {
        //                 console.log('1');
        //                 // routes.push({
        //                 //     route: `/news/${category}/${article.id}`,
        //                 //     payload: {
        //                 //         article
        //                 //     }
        //                 // })
        //             }
        //     }
        //     // return routes
        // }
        routes: async () => {
            // const categories = ['politics', 'covid-19', 'economic', 'nikkei', 'others']
            const routes = []
            // for (const category of categories) {
              const response = await axios.get('https://api.mtown.my/rcms-api/1/content/list?topics_group_id=1')
              const articles = response.data.list
              for (const article of articles) {
                // let id = article.topics_id;
                // routes.push('/news/' + id);
                console.log(article);
                routes.push({
                    // route: `/news/${article.topics_id}`,
                    // payload: {
                    //   component: '@/pages/news/_id.vue',
                    //   article
                    // }
                    route: (params) => `/news/${params.topics_id}`,
                    payload: {
                        component: '@/pages/news/_id.vue',
                        article
                    }
                })
              }
            return routes
                
                // let routesPath = [];
                // let res = await axios.get('https://api.mtown.my/rcms-api/1/content/list?topics_group_id%5B%5D=1');
                // let data = res.data;
                // data?.list?.forEach(page => {
                // let slug = page.slug.length != 0 ? page.slug : page.subject.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                //     routesPath.push('/news/' + slug);
                // })
                // return routesPath;
            // }
        }
    }
    */
    generate: {
        routes: async () => {
            const apiURL = 'https://api.mtown.my';
            const siteURL = 'https://www.mtown.my/';
            const routes = [];
            const listGenerate = [];
            const topics = [
                {
                    catSlug: '/news/',
                    catID: 1
                },
                {
                    catSlug: '/eat/',
                    catID: 7
                },
                // {
                //     catSlug: '/eats/',
                //     catID: 7
                // },
                {
                    catSlug: '/life/',
                    catID: 8
                },
                // {
                //     catSlug: '/lifes/',
                //     catID: 8
                // },
                {
                    catSlug: '/feature/',
                    catID: 9
                },
                {
                    catSlug: '/interview/',
                    catID: 10
                },
                {
                    catSlug: '/columns/comics/',
                    catID: 11
                },
                {
                    catSlug: '/community/',
                    catID: 12
                },
                {
                    catSlug: '/columns/malaysia-profiles/', //マレーシア美人ライフ
                    catID: 13
                },
                // {
                //     catSlug: '/columns/j-league/', //j-league
                //     catID: 14
                // },
                {
                    catSlug: '/columns/', //columns
                    catID: 14
                },
                {
                    catSlug: '/backnumbers/', //バックナンバー
                    catID: 15
                },
            ];

            // console.log(topics);
            for (const topic of topics) {
            // if (topic.catSlug == '/news/') {
                var index = topics.indexOf(topic)+1;
                var apiUrl;
                // if (process.env.NODE_ENV === 'development') {
                //     apiUrl = 'https://dev-mtown.g.kuroco.app/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=2';
                // } else {
                //     apiUrl = 'https://dev-mtown.g.kuroco.app/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=9999999';
                // };
                apiUrl = 'https://api.mtown.my/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=999';
                var response = await axios.get(apiUrl);
                var articles = response.data.list;
                // console.log(topic.catID);
                // console.log('run 1');
                // console.log(topics.length);
                // console.log('run 2');
                // console.log(response.data.list.length);
                
                for (const article of articles) {
                    let slug;
                    let url = topic.catSlug;
                    
                    // if (article.contents_type_slug == 'nikkei') {
                    if (article.contents_type_slug) { //If categories
                        let encodeSlug = article.contents_type_slug;
                        url += encodeSlug + '/';
                    };

                    if (/%[0-9a-fA-F]{2}/.test(article.slug)) { //If slug contain japanese text or percent-encoded characters
                        slug = article.topics_id
                    } else {
                        slug = article.slug ? article.slug : article.topics_id
                    };
                    
                    url += slug;
                    listGenerate.push({
                        url
                    });
                    routes.push({
                        route: url,
                        payload: { 
                            article,
                            listGenerate,
                            siteURL,
                            apiURL
                        }
                    })
                    // }
                }
                // Push all generate dynamic route in to log page at the end of topics loop
                if (index == topics.length) {
                    routes.push({
                        route: '/log',
                        payload: {
                            listGenerate
                        }
                    });
                };
            // };
            };

            // routes.push('/columns/testing');

            // console.log('here');
            // console.log(routes);
            // if (routes.route == '/log') {
            //     console.log('hahah');
            // };

            // const response = await axios.get('https://dev-mtown.g.kuroco.app/rcms-api/1/content/list?topics_group_id=1&cnt=10')
            // const articles = response.data.list
            // //   console.log(response.data.pageInfo);
            // //   console.log('hihih');
            // //   console.log(response.data.pageInfo.totalPageCnt);
            // //   let count = 1;
            // for (const article of articles) {
            //     // console.log(count);
            //     // count++;
            //     // console.log(article.slug);
            //     let url = '/news/'
            //     if (article.contents_type_slug) {
            //         url += article.contents_type_slug + '/';
            //     };
            //     let slug = article.slug ? article.slug : article.topics_id
            //     url += slug;
            //     routes.push({
            //         route: url,
            //         // route: `/news/${category}/${slug}`,
            //     })
            // }
            return routes
        }
    },
    router: {
        trailingSlash: true,
        middleware: 'slash-redirect',
    },
};
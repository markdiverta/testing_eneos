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
        link: [
            // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
            { rel: 'icon', href: '/favicon.png' },
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon-64x64.png' },
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon-96x96.png' },
            { rel: 'apple-touch-icon', type: 'image/svg+xml', href: '/favicon-32x32.png' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.png' },
        ]
    },
    /*
   ** Global CSS
   */
    css: [],
    /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
    plugins: [
        '@/plugins/parser',
        // { src: '@/plugins/vue-gtag', mode: 'client'},
    ],
    /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
    components: true,
    /*
   ** Nuxt.js dev-modules
   */
    buildModules: [
        // '@nuxtjs/vuetify',
        ['@nuxtjs/vuetify', {
            optionsPath: '@/vuetify.options.js',
            treeShake: true,
        }]
    ],
   modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/meta',
        '@nuxtjs/sitemap',
        '@nuxtjs/auth',
        ['@nuxtjs/pwa', { workbox: false, autoRegister: false, manifest: { publicPath: '/_nuxt/', crossorigin: 'use-credentials' } }],
        'nuxt-i18n',
        ['@nuxtjs/google-gtag', {
            id: 'G-50K7BNS543',
            config: {
                anonymize_ip: true, // anonymize IP
                send_page_view: false // might be necessary to avoid duplicated page track on page reload
            },
            debug: true, // enable to track in dev mode
            disableAutoPageTrack: true, // disable if you don't want to track each page route with router.afterEach(...).
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
    },
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
    },
    overrides: [
        {
            files: ['*.vue'],
            processor: 'vue/.vue'
        }
    ],
    generate: {
        routes: async () => {
            const apiDomain = 'https://api.mtown.my';
            const siteURL = 'https://www.mtown.my';
            const routes = [];
            const listGenerate = [];
            var testMode = true; //Change to true or false if you want to enable dev mode for quick generate
            const generateLimit = testMode ? 50 : 999; //Maximum topics per pagination is 999
            const topics = [
                {
                    catSlug: '/news/',
                    catID: 1
                },
                {
                    catSlug: '/eat/',
                    catID: 7
                },
                {
                    catSlug: '/life/',
                    catID: 8
                },
                {
                    catSlug: '/feature/',
                    catID: 9
                },
                {
                    catSlug: '/interview/',
                    catID: 10
                },
                {
                    catSlug: '/column/comics/',
                    catID: 11
                },
                {
                    catSlug: '/community/',
                    catID: 12
                },
                {
                    catSlug: '/column/malaysia-profiles/', //マレーシア美人ライフ
                    catID: 13
                },
                {
                    catSlug: '/column/', //columns
                    catID: 14
                },
                {
                    catSlug: '/backnumber/', //バックナンバー
                    catID: 15
                },
            ];
            
            //Sidebar eBook API
            const contentEbook = [];
            const apiEbook = apiDomain + '/rcms-api/1/content/details/47641';
            try {
                const responseEbook = await axios.get(apiEbook);
                const itemEbook = responseEbook.data.details;
                contentEbook.push({
                    url: itemEbook.ext_1,
                    thumb: itemEbook.ext_2
                });
            } catch (error) {
                console.error('API ERROR:', apiEbook + ' - ' + error.message);
            };

            //Sidebar Ranking API
            const apiRanking = apiDomain + '/rcms-api/1/content/ranking?cnt=5';
            const contentRanking = [];
            try {
                const responseRanking = await axios.get(apiRanking);
                const topicsCategory = [
                    {
                        catSlug: '/news/',
                        catID: 1
                    },
                    {
                        catSlug: '/eat/',
                        catID: 7
                    },
                    {
                        catSlug: '/life/',
                        catID: 8
                    },
                    {
                        catSlug: '/feature/',
                        catID: 9
                    },
                    {
                        catSlug: '/interview/',
                        catID: 10
                    },
                    {
                        catSlug: '/j-league/',
                        catID: 14
                    },
                ];
                for (let key in responseRanking.data.list) {
                    let item = responseRanking.data.list[key];
                    let newsSlug = item.contents_type_slug ? '/' + item.contents_type_slug + '/' : '';
                    let title = item.subject;
                    let catSlug = '';
                    let url;
                    if (title.length > 35) {
                        title = title.substring(0, 35);
                        title += '...';
                    };
                    for (let cat in topicsCategory) {
                        if (topicsCategory[cat].catID == item.topics_group_id) {
                            catSlug = topicsCategory[cat].catSlug;
                            break;
                        }
                    };
                    url = catSlug + newsSlug + item.slug;
                    if (url.includes('//')) {
                        url = url.replace(/\/{2,}/g, '/');
                    };
                    contentRanking.push({
                        title: title,
                        url: url,
                        thumb: item.ext_1,
                    });
                };
            } catch (error) {
                console.error('API ERROR:', apiRanking + ' - ' + error.message);
            };
            

            //Sidebar ADS & PR API
            const apiSidebarAds = apiDomain + '/rcms-api/1/content/details/47640';
            var contentAds = [];
            var contentPR = [];
            const carousel = [];
            const responseAdstopics = [];
            const responseAdsRelated = [];
            try {
                const responseAds = await axios.get(apiSidebarAds);
                const itemAds = responseAds.data.details;
                for (let key in itemAds.ext_1) {
                    const item = itemAds.ext_1[key];
                    let title = item.title;
                    carousel.push({
                        title: title,
                        url: item.url,
                        thumb: itemAds.ext_6[key],
                    });
                };
                if (itemAds.ext_2[0]) {
                    for (let key in itemAds.ext_2) {
                        let thumb = itemAds.ext_2[key];
                            responseAdstopics.push({
                                title: itemAds.ext_3[key].title,
                                url: itemAds.ext_3[key].url,
                                thumb: thumb,
                            });
                    };
                } else {
                    responseAdstopics.push({
                        notAvailable: '1',
                    });
                };
                if (itemAds.ext_4[0]) {
                    for (let key in itemAds.ext_4) {
                        let thumb = itemAds.ext_4[key];
                            responseAdsRelated.push({
                                title: itemAds.ext_5[key].title,
                                url: itemAds.ext_5[key].url,
                                thumb: thumb,
                            });
                    };
                } else {
                    responseAdsRelated.push({
                        notAvailable: '1',
                    });
                }; 
            } catch (error) {
                console.error('API ERROR:', apiEbook + ' - ' + error.message);
            };
            contentAds = responseAdsRelated;
            contentPR = responseAdstopics;


            //Generate News categories landing and setup SSG sidebar
            const apiNewsCategory = apiDomain + '/rcms-api/1/content/category?topics_group_id=1';
            try {
                const responseNewsCat = await axios.get(apiNewsCategory);
                var newsCat = responseNewsCat.data.list;
                for (const topic of newsCat) {
                    if (topic.slug && topic.child_level == 2) {
                        let url = '/news/' + topic.slug + '/';
                        routes.push({
                            route: url,
                            payload: { 
                                contentRanking,
                                contentEbook,
                                contentAds,
                                contentPR,
                            }
                        });
                    }
                };
            } catch (error) {
                console.error('API ERROR:', apiEbook + ' - ' + error.message);
            };
            

            //Topics API
            for (const topic of topics) {
            // if (topic.catSlug == '/news/') {
                var index = topics.indexOf(topic)+1;
                var apiUrl;
                apiUrl = apiDomain + '/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=' + generateLimit;
                var response = await axios.get(apiUrl);
                var articles = response.data.list;

                // Generate list landing page for each Topics group
                routes.push({
                    route: topic.catSlug,
                    payload: { 
                        contentRanking, //SSG sidebar only
                        contentEbook,
                        contentAds,
                        contentPR,
                    }
                });

                // Normal loop without pagination
                for (const article of articles) {
                    let slug;
                    let url = topic.catSlug;
                    
                    if (article.contents_type_slug && article.contents_type_parent_nm) { //If categories & has parent
                        let encodeSlug = article.contents_type_slug;
                        url += encodeSlug + '/';
                    };

                    if (/%[0-9a-fA-F]{2}/.test(article.slug)) { //If slug contain japanese text or percent-encoded characters
                        slug = article.topics_id
                    } else {
                        slug = article.slug ? article.slug : article.topics_id
                    };
                    
                    url += slug + '/';
                    listGenerate.push({
                        url
                    });
                    routes.push({
                        route: url,
                        payload: { 
                            article,
                            contentRanking,
                            contentEbook,
                            contentAds,
                            contentPR,
                            siteURL,
                            apiDomain
                        }
                    })
                    // }
                };

                //Additional loop for pagination
                let pageNum = testMode ? 0 : response.data.pageInfo.totalPageCnt;
                // pageNum = 0;
                if (pageNum >= 2){
                    for (let i = 2; i <= pageNum; i++){
                        let paginationURL = apiDomain + '/rcms-api/1/content/list?topics_group_id=' + topic.catID + '&cnt=' + generateLimit + '&pageID=' + i;
                        let response = await axios.get(paginationURL);
                        let articles = response.data.list;
                        // console.log(paginationURL);
                        // console.log(response.data.pageInfo);

                        for (const article of articles) {
                            let slug;
                            let url = topic.catSlug;
                            
                            if (article.contents_type_slug && article.contents_type_parent_nm) { //If categories & has parent
                                let encodeSlug = article.contents_type_slug;
                                url += encodeSlug + '/';
                            };
                            if (/%[0-9a-fA-F]{2}/.test(article.slug)) { //If slug contain japanese text or percent-encoded characters
                                slug = article.topics_id
                            } else {
                                slug = article.slug ? article.slug : article.topics_id
                            };
                            url += slug + '/';
                            listGenerate.push({
                                url
                            });
                            routes.push({
                                route: url,
                                payload: { 
                                    article,
                                    contentRanking,
                                    contentEbook,
                                    contentAds,
                                    contentPR,
                                    siteURL,
                                    apiDomain
                                }
                            })
                            // }
                        }
                    }
                };

                //Push all generate dynamic route in to log page at the end of topics loop
                // if (index == topics.length) {
                //     routes.push({
                //         route: '/log',
                //         payload: {
                //             listGenerate
                //         }
                //     });
                // };

                //Generate homepage
                routes.push({
                    route: '/',
                    payload: {
                        carousel,
                        contentRanking,
                        contentEbook,
                        contentAds,
                        contentPR,
                    }
                });
            // };
            };

            return routes
        }
    },
    router: {
        trailingSlash: true,
        middleware: 'slash-redirect',
    },
    sitemap: {
        hostname: 'https://www.mtown.my',
        gzip: true, 
    },
};

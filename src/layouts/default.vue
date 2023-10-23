<template>
    <v-app class="l-content_wrap">
    <!-- <v-app class="l-content_wrap" :class="pageCheck"> -->

        <header>
        <section class="l-header_top">
            <div class="l-content_maxWidth-lg">
            <div class="row">
                <div class="col-sm-6 col-12 d-sm-block d-none">
                    <a href="/" title="MTown"> 
                        <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="279" height="100">
                    </a>
                </div>
                <div class="col l-header_top-right">
                <div class="row">
                    <div class="col-5 d-sm-none d-block py-0">
                        <a href="/" title="MTown"> 
                            <img src="~/assets/images/logo.png" alt="MTown - マレーシアの週刊情報誌 Logo" class="l-header_logo" width="160" height="57">
                        </a>
                    </div>
                    <div class="col pb-0">
                        <a href="/newsletter/" class="c-btn c-btn_main">メルマガ登録</a>
                        <a href="/inquiry/" class="c-btn c-btn_main-dark">お問い合わせ<span class="d-sm-inline d-none">はこちら</span></a>
                    </div>
                    <div class="col-12 pt-0">
                        <form class="c-form row pt-4" action="/search">
                            <div class="col">
                                <v-text-field
                                    type="text"
                                    placeholder="ニュース検索　例：マレーシア Covid-19 感染者数"
                                    class="l-header_top-search"
                                    outlined
                                    name="keyword"
                                    v-model="keyword"
                                />
                            </div>
                            <div class="col-auto">
                                <button
                                    type="submit"
                                    block
                                    class="c-btn_main-dark c-btn submit-btn"
                                >
                                    検索
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section class="c-mainmenu_wrap">
            <div class="l-content_maxWidth-lg c-mainmenu_outer">
            <!-- <button class="c-mainmenu_trigger" @click="showMenu"><i aria-hidden="true" class="icon mdi mdi-menu" style="color"></i></button> -->
            <!-- <ul class="c-mainmenu" :class="{ 'c-mainmenu_open' : menuOpen }"> -->
            <ul class="c-mainmenu">
                <li :class="currentPage.includes('/news') || currentURL == '/' ? 'activePage' : ''">
                    <a href="/news">マレーシアニュース</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/news">新着</a></li>
                            <li :class="searchCat == '23' || searchCatPath == 'economic' ? 'active' : ''"><a href="/news/economic">経済・現地企業</a></li>
                            <li :class="searchCat == '21' || searchCatPath == 'politics' ? 'active' : ''"><a href="/news/politics">政治・社会</a></li>
                            <li :class="searchCat == '22' || searchCatPath == 'nikkei' ? 'active' : ''"><a href="/news/nikkei">日系企業動向</a></li>
                            <li :class="searchCat == '24' || searchCatPath == 'others' ? 'active' : ''"><a href="/news/others">芸能・スポーツ</a></li>
                            <li :class="searchCat == '1' || searchCatPath == 'covid-19' ? 'active' : ''"><a href="/news/covid-19">コロナ</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage.includes('/eat') ? 'activePage' : ''">
                    <a href="/eat/">グルメ</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage.includes('/eat') ? 'active' : ''"><a href="/eat/">グルメ記事</a></li>
                            <li><a href="https://gourmesian.com/" target="_blank">レストラン検索</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage.includes('/life')  || currentPage.includes('/community') ? 'activePage' : ''">
                    <a href="/life/">タウン情報</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage.includes('/life') ? 'active' : ''"><a href="/life/">街ぶらブログ</a></li>
                            <li :class="currentPage.includes('/community') ? 'active' : ''"><a href="/community/">コミュニティ</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage.includes('/interview') ? 'activePage' : ''">
                    <a href="/interview">インタビュー</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/interview">新着</a></li>
                        </ul>
                    </div>
                </li>
                <li :class="currentPage.includes('/feature') ? 'activePage' : ''">
                    <a href="/feature/">特集</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li><a href="/feature">新着</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="https://job.mtown.my/" target="_blank">求人・求職情報一覧</a>
                    <div class="c-mainmenu_dropdown-wrap"></div>
                </li>
                <li :class="currentPage.includes('/column/') ? 'activePage' : ''">
                    <a href="/column/comics">コラム</a>
                    <div class="c-mainmenu_dropdown-wrap">
                        <ul class="c-mainmenu_dropdown l-content_maxWidth-lg">
                            <li :class="currentPage.includes('/comics') ? 'active' : ''"><a href="/column/comics/">4コマ</a></li>
                            <li :class="currentPage.includes('/malaysia-profiles') ? 'active' : ''"><a href="/column/malaysia-profiles/">マレーシア美人ライフ</a></li>
                            <!-- <li :class="currentPage.includes('/j-league/') ? 'active' : ''"><a href="/column/j-league/">Jリーグ</a></li> -->
                            
                            <!-- <template v-if="menuColumnCategory.length > 0">
                                <li v-for="(item, index) in menuColumnCategory" :key="index" :class="currentPage.includes('/' + item.slug + '/') ? 'active' : ''">
                                    <a :href="item.url">{{ item.title }}</a>
                                </li>
                            </template> -->

                            <!-- Change from above dynamic menu to static, update below and at mobile menu around line 260 -->
                            <li :class="currentPage.includes('/j-league') ? 'active' : ''"><a href="/column/j-league/">Jリーグ</a></li>
                            <li :class="currentPage.includes('/malaysia-calendar') ? 'active' : ''"><a href="/column/malaysia-calendar/">マレーシアの暦</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="https://malaysialife.mtown.my/" target="_blank">暮らしのガイド</a>
                    <div class="c-mainmenu_dropdown-wrap"></div>
                </li>
            </ul>
            </div>
        </section>
        </header>
        
        <v-main>
            <section class="container-fluid l-content_maxWidth-lg">
            <section class="row l-page_content-row" ref="jscontentCheck">
                <nuxt />
            </section>
            </section>
        </v-main>

        <ul class="c-menu_footerfloat">
            <li><a href="/news/"><i class="icon mdi mdi-bullhorn"></i>ニュース</a></li>
            <li><a href="/search/?filter=topics"><i class="icon mdi mdi-file-document-outline"></i>記事</a></li>
            <li class="last"><a href="/feature/"><i class="icon mdi mdi-gift"></i>特集</a></li>
            <li class="more">
                <a id="menu_button" @click="showMenuFooter">
                    <span :class="{ 'd-none' : menuOpenFooter }">
                        <i class="icon mdi mdi-menu"></i>メニュー
                    </span>
                    <span :class="{ 'd-none' : !menuOpenFooter }">
                        <i class="icon mdi mdi-window-close"></i>閉じる
                    </span>
                </a>
            </li>
        </ul>
        <div class="c-menu_footerfloat-burger" :class="{ 'open' : menuOpenFooter }">
            <div class="content">

                <form class="c-menu_footerfloat-search c-form row pt-4" action="/search">
                    <div class="col pr-0">
                        <v-text-field
                            type="text"
                            placeholder="ニュース検索　例：マレーシア Covid-19 感染者数"
                            class="l-header_top-search"
                            outlined
                            name="keyword"
                            v-model="keyword"
                        />
                    </div>
                    <div class="col-auto pl-0">
                        <button
                            type="submit"
                            block
                            class="c-btn_main-dark c-btn submit-btn"
                        >
                            検索
                        </button>
                    </div>
                </form>

                <div class="c-menu_footerfloat-list section">
                    <p class="section_heading">カテゴリ</p>

                    <v-expansion-panels class="menu" accordion>
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="mdi-plus">
                                マレーシアニュース
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul class="innermenu">
                                    <li><a href="/news/">新着</a></li>
                                    <li><a href="/news/economic/">経済・現地企業</a></li>
                                    <li><a href="/news/politics/">政治・社会</a></li>
                                    <li><a href="/news/nikkei/">日系企業動向</a></li>
                                    <li><a href="/news/others/">芸能・スポーツ</a></li>
                                    <li><a href="/news/covid-19/">コロナ</a></li>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                             <v-expansion-panel-header expand-icon="mdi-plus">
                                グルメ
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul class="innermenu">
                                    <li><a href="/eat/">グルメ記事</a></li>
                                    <li><a href="https://gourmesian.com/" target="_blank">レストラン検索</a></li>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="mdi-plus">
                                タウン情報
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul class="innermenu">
                                    <li><a href="/life/">街ぶらブログ</a></li>
                                    <li><a href="/community/">コミュニティ</a></li>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel @click="windowOpen('/interview/')">
                             <v-expansion-panel-header expand-icon="mdi-chevron-right">
                                インタビュー
                            </v-expansion-panel-header>
                        </v-expansion-panel>
                        <v-expansion-panel @click="windowOpen('/feature/')">
                             <v-expansion-panel-header expand-icon="mdi-chevron-right">
                                特集
                            </v-expansion-panel-header>
                        </v-expansion-panel>
                        <v-expansion-panel @click="goTo('https://job.mtown.my/')">
                             <v-expansion-panel-header expand-icon="mdi-chevron-right">
                                求人・求職情報
                            </v-expansion-panel-header>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header expand-icon="mdi-plus">
                                コラム
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul class="innermenu">
                                    <li><a href="/column/comics/">4コマ</a></li>
                                    <li><a href="/column/malaysia-profiles/">マレーシア美人ライフ</a></li>

                                    <!-- <template v-if="menuColumnCategory.length > 0">
                                        <li v-for="(item, index) in menuColumnCategory" :key="index">
                                            <a :href="item.url">{{ item.title }}</a>
                                        </li>
                                    </template> -->

                                    <!-- Change from above dynamic menu to static, update below and at header menu -->
                                    <li><a href="/column/j-league/">Jリーグ</a></li>
                                    <li><a href="/column/malaysia-calendar/">マレーシアの暦</a></li>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel @click="goTo('https://malaysialife.mtown.my/')">
                             <v-expansion-panel-header expand-icon="mdi-chevron-right" collapse-icon="mdi-chevron-right">
                                暮らしのガイド
                            </v-expansion-panel-header>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>

                <div class="c-menu_footerfloat-social section">    
                    <p class="section_heading">Mtown公式SNSをフォロー</p>
                    <ul>
                        <li><a href="https://www.facebook.com/weeklymtown/" target="_blank"><img src="~/assets/images/fb.png" width="139" height="79"><noscript><img src="~/assets/images/fb.png"  width="139" height="79"/></noscript></a></li>
                        <li><a href="https://twitter.com/WeeklyMtown" target="_blank"><img src="~/assets/images/tw.png"  width="139" height="79" data-src="~/assets/images/tw.png" decoding="async" class=" lazyloaded"><noscript><img src="~/assets/images/tw.png"  width="139" height="79" data-eio="l" /></noscript></a></li>
                        <li><a href="https://www.instagram.com/accounts/login/?next=/weeklymtown/" target="_blank"><img src="~/assets/images/ins.png"  width="139" height="79" data-src="~/assets/images/ins.png" decoding="async" class=" lazyloaded"><noscript><img src="~/assets/images/ins.png"  width="139" height="79" data-eio="l" /></noscript></a></li>
                    </ul>
                </div>

                <div class="section">    
                    <p class="section_heading">関連メディア</p>
                    <div class="c-menu_footerfloat-related">
                        <p>グルメシアン[<a href="https://gourmesian.com/" target="_blank">外食・グルメ情報はこちら</a>]</p>
                        <p>生活情報サイト[<a href="https://malaysialife.mtown.my/" target="_blank">生活お役立ち情報はこちら</a>]</p>
                    </div>
                </div>

                <div class="c-menu_footerfloat-footer">
                    <a href="/newsletter/" class="c-btn c-btn_main">メルマガ登録</a>
                    <a href="/inquiry/" class="c-btn c-btn_main-dark">お問い合わせ<span class="d-sm-inline d-none">はこちら</span></a>
                    <p class="pt-4">週刊Mtown運営会社情報<br>
                    Mega Global Malaysia Sdn. Bhd.</p>
                </div>          
            </div>
        </div>
        
        <footer class="l-footer">
            <a class="c-btn_bcktop" href="#" v-show="scrollPosition > 100" v-on:click.prevent="scrollToTop"><i aria-hidden="true" class="icon mdi mdi-chevron-up" style="color"></i></a>

            <section class="l-content_maxWidth-lg">

                <div class="l-footer_social">
                    <div class="row">
                        <div class="col-md-auto col-12">
                            <img class="l-footer_logo" src="~/assets/images/logo-transparent.png" alt="MTown - マレーシアの週刊情報誌 Logo" width="186" height="56">
                        </div>
                        <div class="col l-footer_social-first">
                            <a class="l-footer_link fb" href="https://www.facebook.com/weeklymtown/" target="_blank">Facebook</a>
                        </div>
                        <div class="col">
                            <a class="l-footer_link insta" href="https://www.instagram.com/weeklymtown/" target="_blank">Instagram</a>
                        </div>
                        <div class="col">
                            <a class="l-footer_link twitter" href="https://twitter.com/WeeklyMtown" target="_blank">Twitter</a>
                        </div>
                    </div>
                </div>

                <div class="l-footer_menu">
                    <ul id="menu-footer-menu" class="menu">
                        <li><a href="/about-us/">会社情報</a></li>
                        <li><a href="/media/">関連メディア</a></li>
                        <li><a href="/inquiry/">お問い合わせ</a></li>
                    </ul>  
                </div>

                <p class="text-center">Copyright &copy; {{ currentYear }} mtown.my All right reserved.</p>
            </section>
        </footer>

        <v-snackbar
            v-model="snackbarVisible"
            top
            :color="snackbarColor"
            timeout="2000"
        >
            {{ this.$store.getters["snackbar/message"] }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbarVisible = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
import '../sass/style.scss';
// import '../css/style.css';
export default {
    auth: true,
    head() {
      return {
        title: 'MTown - マレーシアの週刊情報誌',
        meta: [
            {
            name: 'google-site-verification',
            content: 'v_uOGnyOdP7FGLwK_TQfn1emRKbhXij5OudQqn2IF9Q'
            }
        ],
        script: [
            {
                src: "https://platform.twitter.com/widgets.js",
                async: true,
                defer: true
            },
            // {
            //     src: 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v16.0',
            //     crossorigin: 'anonymous',
            //     async: true,
            //     defer: true,
            //     nonce: 'Q2mDUmEw'
            // }
        ]
      }
    },
    data() {
        return {
            latestUpdateTopics: [],
            showDropdown: false,
            currentYear: null,
            scrollPosition: 0,
            keyword: '',
            sidebarPR: '',
            sidebarRelated: '',
            sidebarMagazine: '',
            sidebarEbook: [],
            sidebarRanking: [],
            eBookLoaded: false,
            menuColumnCategory: [],
            drawer: false,
            group: null,
            items: [
                {
                title: 'Foo',
                value: 'foo',
                },
                {
                title: 'Bar',
                value: 'bar',
                },
                {
                title: 'Fizz',
                value: 'fizz',
                },
                {
                title: 'Buzz',
                value: 'buzz',
                },
            ],
            lang: ['English', 'Japanese', 'Mandarin'],
            langDefault: 'English',
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            menuOpen: false,
            menuOpenFooter: false,
        };
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

        // Check if the main content section return no content then display page not found
        const sectionElement = this.$refs.jscontentCheck;
        if (sectionElement.innerHTML.trim() === '' || sectionElement.innerHTML == '\x3C!---->' || sectionElement.innerHTML == '<!---->') {
            // Section has no content
            sectionElement.innerHTML = '<h3 class="text-center py-6 my-5">404 Page not found</h3>';
        };

        //Check if main menu no dropdown, change it's height
        const activePages = document.querySelectorAll('.activePage');
        if (activePages.length == 0 && this.$route.fullPath !== '/') {
            let mainMenu = document.querySelector(".c-mainmenu_wrap");
            if (mainMenu) {
                setTimeout(() => {
                    mainMenu.classList.add("--noDropdown");
                }, 1000);
            }
        };

        // Wait for the Twitter widgets library to load
        if (typeof twttr === "undefined") {
            setTimeout(() => {
                this.createTwitterTimeline();
            }, 1000);
        } else {
            // Create a Twitter timeline widget
            this.createTwitterTimeline();
        };

        // Latest topics check if anny (today update)
        var storedArray = JSON.parse(sessionStorage.getItem('updateList'));
        if(!storedArray) { //If haven't checked & localstorage is empty
            this.latestUpdate();
        };
        
        // this.contentMagazine();
        // if (!window.location.pathname.includes('/news/politics/')) {
        //     this.contentEbook();
        //     this.contentSidebarAds();
        //     this.contentRanking();
        // };

        // Disable use of dynamic menu for saving API call
        // this.menuColumnList();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    },
    created() {
        const year = new Date().getFullYear();
        this.currentYear = year;
    },
    computed: {
        politicsPage() {
            return this.$route.path.includes('/news/politics/');
        },
        searchCat() {
            return this.$route.query.contents_type;
        },
        searchCatPath() {
            return this.$route.params.category;
        },
        currentURL() {
            return this.$route.fullPath;
        },
        currentPage() {
            return this.$route.path;
        },
        user() {
            return this.$auth.user;
        },
        auth() {
            return this.$store.$auth;
        },
        loginPage() {
            if (this.$route.name === 'login___ja' || this.$route.name === 'signup___ja' || this.$route.name === 'reminder___ja') {
                return true;
            }
        },
        signUpPage() {
            return this.$route.name === 'signup___ja';
        },
        showLoginPage() {
            if (this.$route.name === 'login___ja') {
                return true;
            }
        },
        subtitle() {
            if (this.$store.$auth.loggedIn) {
                return 'Hi, ' + this.$auth.user.name1;
            } else {
                return '';
            }
        },
        // snackbarが自動でfalseに設定するためセッタを用意して、明示的にdispatchからOffするようにする
        snackbarVisible: {
            get() {
                return this.$store.state.snackbar.isEnable;
            },
            set() {
                return this.$store.dispatch('snackbar/snackOff');
            }
        },
        snackbarColor() {
            return this.$store.state.snackbar.color;
        }
    },
    methods: {
        showMenu() {
            if (this.menuOpen) {
                this.menuOpen = false;
            } else {
                this.menuOpen = true;
            }
        },
        showMenuFooter() {
            if (this.menuOpenFooter) {
                this.menuOpenFooter = false;
            } else {
                this.menuOpenFooter = true;
            }
        },
        handleResize() {
            this.viewportWidth = window.innerWidth;
        },
        createTwitterTimeline() {
            twttr.widgets.createTimeline(
                {
                    sourceType: "timeline",
                    screenName: "weeklymtown",
                },
                this.$el.querySelector("#twitter-timeline"),
                {
                    height: 500,
                    tweetLimit: 4
                }
            );
        },
        goTo(url){
            if (url.includes('http')) {
                // window.location.href = url;
                window.open(url, "_blank");
            } else {
                // this.$router.push({ path: url})
                window.location.href = url;
            }
        },
        windowOpen(url){
            window.location.href = url;
        },
        go_page(path) {
            this.$router.push(path);
        },
        handleScroll() {
            this.scrollPosition = window.scrollY;
        },
        scrollToTop() {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(this.scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        },
        latestUpdate() {
            let url = '/rcms-api/1/content/list?order_query=update_ymdhi%3DDESC';
            const self = this;
            this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
                // Get today's date in the same format
                const today = new Date();
                const todayFormatted = today.toISOString().split('T')[0];
                const latestTopics = [];

                for (let key in response.data.list) {
                    let item = response.data.list[key];
                    // Assuming updateDate is a Date object
                    let updateDate = new Date(item.update_ymdhi);
                    // Extract only the date part (YYYY-MM-DD) from updateDate
                    let updateDateFormatted = updateDate.toISOString().split('T')[0];
    
                    if (updateDateFormatted >= todayFormatted) {
                        latestTopics.push({
                            id: item.topics_id,
                        });
                    } else {
                        break;
                    }
                };
                sessionStorage.setItem('updateList', JSON.stringify(latestTopics));
                window.location.reload(); 
            })
            .catch(function (error) {
                console.log(error.response.data.errors?.[0].message);
            });
        },
        contentRanking() {
            let url = '/rcms-api/1/content/ranking?cnt=5';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
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
                    for (let key in response.data.list) {
                        let item = response.data.list[key];
                        let newsSlug = item.contents_type_slug ? item.contents_type_slug + '/' : '';
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
                        topics.push({
                            title: title,
                            url: url,
                            thumb: item.ext_1,
                        });
                    };
                    self.sidebarRanking = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        contentEbook() {
            let url =
            '/rcms-api/1/content/details/47641';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    let item = response.data.details;
                    self.sidebarEbook.url = item.ext_1;
                    self.sidebarEbook.thumb = item.ext_2;
                    self.eBookLoaded = true;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        contentMagazine() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=15&cnt=3';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    const topicsRelated = [];
                    for (let key in response.data.list) {
                        let item = response.data.list[key];
                        topics.push({
                            url: '/backnumber/' + item.topics_id,
                            thumb: item.ext_2,
                        });
                    };
                    self.sidebarMagazine = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        contentSidebarAds() {
            let url =
            '/rcms-api/1/content/details/47640';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    const topicsRelated = [];
                    for (let key in response.data.details.ext_2) {
                        let thumb = response.data.details.ext_2[key];
                        topics.push({
                            title: response.data.details.ext_3[key].title,
                            url: response.data.details.ext_3[key].url,
                            thumb: thumb,
                        });
                    };
                    for (let key in response.data.details.ext_4) {
                        let thumb = response.data.details.ext_4[key];
                        topicsRelated.push({
                            title: response.data.details.ext_5[key].title,
                            url: response.data.details.ext_5[key].url,
                            thumb: thumb,
                        });
                    };
                    self.sidebarPR = topics;
                    self.sidebarRelated = topicsRelated;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        menuColumnList() {
            let url =
            '/rcms-api/1/content/category?topics_group_id=14';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    for (let key in response.data.list) {
                        let item = response.data.list[key];
                        if (item.slug) {
                            topics.push({
                                slug: item.slug,
                                url: '/column/' + item.slug + '/',
                                // url: '/column/?cat=' + item.topics_category_id,
                                title: item.category_nm,
                            });
                        };
                    };
                    self.menuColumnCategory = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        async logout() {
            await this.$auth.logout().then((response) => {
                // this.login = false;
                this.$store.dispatch('snackbar/setMessage', 'ログアウトしました');
                this.$store.dispatch('snackbar/snackOn');
                this.$router.push('/');
                window.location.reload(); 
            });
        }
    }
};
</script>
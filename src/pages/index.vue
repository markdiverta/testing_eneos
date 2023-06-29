<template>
<section class="l-content_maxWidth-lg">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

        <!-- <template v-if="sidebarPR && sidebarPR.length > 0">
            <carousel class="c-carousel_ssg c-carousel l-content_padding -xs pb-0" 
                :autoplay="true" :nav="false" :dots="false" :loop="true" navClass=""
            >
                <div v-for="(slide, index) in sidebarPR" :key="index" @click="goTo(slide.url)" class="c-carousel_slide" :style="{backgroundImage: 'url(' + slide.thumb + ')' }">
                    <span class="c-carousel_title">{{slide.title}}</span>
                </div>
                <template slot="prev"><i aria-hidden="true" class="c-carousel_nav nav-prev v-icon mdi mdi-chevron-left"></i></template>
                <template slot="next"><i aria-hidden="true" class="c-carousel_nav nav-next v-icon mdi mdi-chevron-right"></i></template>
            </carousel>
        </template> -->
        <template v-if="articleFeature && articleFeature.length > 0">
            <carousel v-if="carouselContentLoaded" class="c-carousel l-content_padding -xs pb-0" 
                :autoplay="true" :nav="false" :dots="false" :loop="true" navClass=""
            >
                <div v-for="(slide, index) in articleFeature" :key="index" @click="goTo(slide.url)" class="c-carousel_slide" :style="{backgroundImage: 'url(' + slide.thumb + ')' }">
                    <span class="c-carousel_title">{{slide.title}}</span>
                </div>
                <template slot="prev"><i aria-hidden="true" class="c-carousel_nav nav-prev v-icon mdi mdi-chevron-left"></i></template>
                <template slot="next"><i aria-hidden="true" class="c-carousel_nav nav-next v-icon mdi mdi-chevron-right"></i></template>
            </carousel>
            <template v-if="sidebarPR && sidebarPR.length > 0">
                <div v-for="(slide, index) in sidebarPR" :key="index" @click="goTo(slide.url)" class="c-carousel_slide" :style="{backgroundImage: 'url(' + slide.thumb + ')' }">
                    <span class="c-carousel_title">{{slide.title}}</span>
                </div>
            </template>
        </template>

        <div class="l-content_padding pt-2 c-blog_list" v-if="articleNews.length > 0">
            <h2 class="c-heading_bg c-heading_h3">新着マレーシアニュース</h2>
            <div class="container">
                <div class="row c-blog_list-item" v-for="item in articleNews" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span>
                            <!-- <span class="label c-label">{{ item.cat }}</span> -->
                            <a :href="item.catURL"><span class="label c-label c-label_clickable">{{ item.cat }}</span></a>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
                <!--
                <div class="row c-blog_list-item">
                    <div class="col-3 thumb" style="background-image:url('https://mtown.my/wp-content/uploads/2019/11/マレーシア国内で洪水の被害が広がっている-300x192.png')">
                    </div>
                    <div class="col">
                        <h3>【新着】6州で洪水　被災民9000人超える</h3>
                        <div class="mb-3">
                            <span class="date">2023/03/02</span><span class="label c-label">政治・社会</span>
                        </div>
                        <p>洪水【新着】6州で洪水　被災民9000人超える2023/03/02政治・社会2月28日から降り続く雨で6州で洪水が発生し、避難センターへの人数が9000人を超えた。 ジョホール州はもっと.</p>
                    </div> 
                </div>
                <div class="row c-blog_list-item">
                    <div class="col-3 thumb" style="background-image:url('https://mtown.my/wp-content/uploads/2019/11/マレーシア国内で洪水の被害が広がっている-300x192.png')">
                    </div>
                    <div class="col">
                        <h3>【新着】6州で洪水　被災民9000人超える</h3>
                        <div class="mb-3">
                            <span class="date">2023/03/02</span><span class="label c-label">政治・社会</span>
                        </div>
                        <p>洪水【新着】6州で洪水　被災民9000人超える2023/03/02政治・社会2月28日から降り続く雨で6州で洪水が発生し、避難センターへの人数が9000人を超えた。 ジョホール州はもっと.</p>
                    </div>
                </div>
                -->
            </div>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/category/news/" class="c-btn c-btn_md c-btn_main-dark">ニュースをもっと読む</a>
            </div>
        </div>

        <section class="l-content_padding" v-if="articleEats.length > 0">
            <h2 class="c-heading_bg --bg_red c-heading_h3">グルメ</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-for="(item, index) in articleEats" v-if="index < 4" :key="item.id" @click="goTo(item.url)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleEats.length > 3">
                <div class="row c-blog_list-item" v-for="(item, index) in articleEats" v-if="index > 3" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div> 
                    </div>
                </div>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/eat/" class="c-btn c-btn_lg c-btn_main-dark">グルメ記事をもっと読む</a>
            </div>
        </section>

        <section class="l-content_padding" v-if="articleLifes.length > 0">
            <h2 class="c-heading_bg --bg_green c-heading_h3">タウン情報</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-for="(item, index) in articleLifes" v-if="index < 4" :key="item.id" @click="goTo(item.url)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleLifes.length > 3">
                <div class="row c-blog_list-item" v-for="(item, index) in articleLifes" v-if="index > 3" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/life/" class="c-btn c-btn_lg c-btn_main-dark">タウン情報をもっと読む</a>
            </div>
        </section>

        <section class="l-content_padding" v-if="articleInterview.length > 0">
            <h2 class="c-heading_bg --bg_orange c-heading_h3">インタビュー</h2>
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-for="(item, index) in articleInterview" v-if="index < 4" :key="item.id" @click="goTo('/interview/' + item.id)">
                        <div class="thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                        <div>
                            <h3 class="heading">{{ item.title }}</h3>
                            <div class="mb-3">
                                <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                            </div>
                            <div v-if="item.desc" v-html="item.desc"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container-fluid mt-4 c-blog_list" v-if="articleInterview.length > 3">
                <div class="row c-blog_list-item" v-for="(item, index) in articleInterview" v-if="index > 3" :key="item.id" @click="goTo('/interview/' + item.id)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
            </section>
            <div class="text-center l-content_padding -sm pb-0">
                <a href="/interview/" class="c-btn c-btn_lg c-btn_main-dark">インタビューをもっと読む</a>
            </div>
        </section>

    </div>

</section>
<Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/>
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script>
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import KurocoParser from '../plugins/parser.js';
import fieldUploadFile from '../components/vuetify_file_upload.vue';
import fieldVuetifyText from '../components/vuetify_text.vue';
import fieldVuetifyTextArea from '../components/vuetify_textarea.vue';
import fieldVuetifyDate from '../components/vuetify_date.vue';
import fieldVuetifyJson from '../components/vuetify_json.vue';
import fieldVuetifyPrefecture from '../components/vuetify_prefecture.vue';
import fieldVuetifyMultipleChoice from '../components/vuetify_multiple_choice.vue';
import fieldVuetifySingleChoice from '../components/vuetify_single_choice.vue';
import fieldVuetifySingleOption from '../components/vuetify_single_option.vue';

import Sidebar from '~/components/sidebar.vue';

// import carousel from 'vue-owl-carousel';

Vue.component('fieldUploadFile', fieldUploadFile);
Vue.component('fieldVuetifyDate', fieldVuetifyDate);
Vue.component('fieldVuetifyText', fieldVuetifyText);
Vue.component('fieldVuetifyTextArea', fieldVuetifyTextArea);
Vue.component('fieldVuetifyJson', fieldVuetifyJson);
Vue.component('fieldVuetifyPrefecture', fieldVuetifyPrefecture);
Vue.component('fieldVuetifySingleOption', fieldVuetifySingleOption);
Vue.component('fieldVuetifySingleChoice', fieldVuetifySingleChoice);
Vue.component('fieldVuetifyMultipleChoice', fieldVuetifyMultipleChoice);

Vue.use(VueFormGenerator);
Vue.use(KurocoParser);

export default {
    auth: false,
    data() {
        return {
            carouselSetting: {
                autoplay: true,
                nav: false
            },
            carouselContentLoaded: false,
            articleEats: [],
            articleLifes: [],
            articleNews: [],
            articleInterview: [],
            articleFeature: [],

            // inquirySubmitUrl: '/rcms-api/1/inquiry/1',
            // inquirySchemarl: '/rcms-api/1/inquiry/get/1',
            form_heading: '',
            form_description: '',
            form_thanks_msg: '',
            disabled: false,
            validForm: true,
            // loading: true,
            isSent: false,
            model: {},
            schema: {},
            meta: {
                title: 'MTown - マレーシアの週刊情報誌',
                description: 'To be a guiding light on the life of journey that is not easily visible'
            },
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: []
        };
    },
    head() {
        return {
        title: "MTown - マレーシアの週刊情報誌",
        meta: [
            {
            hid: 'og:title',
            property: 'og:title',
            content: "MTown - マレーシアの週刊情報誌"
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: 'To be a guiding light on the life of journey that is not easily visible'
            }
        ]
        }
    },
    async asyncData({ app, payload, route }) {
        if (payload) {
            return {
                ranking: payload.contentRanking,
                sidebarEbook: payload.contentEbook,
                sidebarAds: payload.contentAds,
                sidebarPR: payload.contentPR
            };
        };
        if (payload && payload.contentPR) {
            import('vue-owl-carousel').then((module) => {
                this.$options.components.Carousel = module.default;
            });
        };
    },
    components: {
        'vue-form-generator': VueFormGenerator.component,
        // carousel
        ClientOnly: () => import('vue-client-only'),
        Sidebar
    },
    mounted() {
        this.listNews();
        this.listEats();
        this.listLifes();
        this.listInterview();

        const SSG_Carousel = document.querySelector('.c-carousel_ssg');

        if (!SSG_Carousel) {
            console.log('SPA carousel');
            if (process.client) {
                import('vue-owl-carousel').then((module) => {
                    this.$options.components.Carousel = module.default;
                    this.featureCarousel();
                });
            }
        };
    },
    methods: {
        goTo(url){
            if (url.includes('http')) {
                window.open(url, "_blank");
            } else {
                // this.$router.push({ path: url})
                window.location.href = url;
            }
        },
        featureCarousel() {
            let url =
            '/rcms-api/1/content/details/47640';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    for (let key in response.data.details.ext_1) {
                        const item = response.data.details.ext_1[key];
                        let title = item.title;
                        // if (title.length > 17) {
                        //     title = title.substring(0, 16);
                        //     title += '...';
                        // };
                        topics.push({
                            title: title,
                            url: item.url,
                            thumb: response.data.details.ext_6[key],
                        });
                    }
                    self.articleFeature = topics;
                    self.carouselContentLoaded = true;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        listNews() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=1&cnt=8';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc;
                        let catURL = item.category_parent_id ? '/news/' + item.contents_type_slug : '/news/';
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 120) {
                                desc = desc.substring(0, 120);
                                desc += '...';
                            };
                        };

                        //Check if has child category or just parent category
                        if (item.contents_type_slug && item.category_parent_id) {
                            url = '/news/' + item.contents_type_slug + '/';
                        } else {
                            url = '/news/';
                        };
                        //Check if has page slug else use page id
                        if (item.slug) {
                            url += item.slug;
                        } else {
                            url += item.topics_id;
                        };

                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            catURL: catURL,
                            id: item.topics_id,
                            url: url,
                            thumb: item.ext_1,
                        });
                    }
                    self.articleNews = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        listEats() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=7&cnt=6';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc, url;
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                                desc += '...';
                            };
                        };
                        if (item.slug) {
                            url = '/eat/' + item.slug;
                        } else {
                            url = '/eat/' + item.topics_id;
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            id: item.topics_id,
                            url: url,
                            thumb: item.ext_1,
                        });
                    }
                    self.articleEats = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        listLifes() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=8&cnt=6';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc, url;
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                                desc += '...';
                            };
                        };
                        if (item.slug) {
                            url = '/life/' + item.slug;
                        } else {
                            url = '/life/' + item.topics_id;
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            id: item.topics_id,
                            url: url,
                            thumb: item.ext_1,
                        });
                    }
                    self.articleLifes = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        listInterview() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=10&cnt=6';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc, thumb;
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                                desc += '...';
                            };
                        };
                        if (item.ext_1) {
                            thumb = item.ext_1;
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            id: item.topics_id,
                            thumb: thumb,
                        });
                    }
                    self.articleInterview = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        // getSchema() {
        //     const self = this;
        //     this.loading = true;
        //     this.$store.$auth.ctx.$axios
        //         .get(this.inquirySchemaUrl)
        //         .then(function (response) {
        //             const schema = {};
        //             schema.fields = [];
        //             const columns = response.data.details.cols;
        //             for (const key in columns) {
        //                 let result = {};
        //                 if (columns.hasOwnProperty(key)) {
        //                     result = self.$parse(columns[key], key);
        //                     if (columns[key].msg) {
        //                         result.hint = columns[key].msg;
        //                     };
        //                     if (key == 'name' || key == 'ext_01' || key == 'ext_05' || key == 'ext_06') {
        //                         if (key == 'name' || key == 'ext_06') {
        //                             result.label = "";
        //                             result.styleClasses = 'c-form_col p-top_contact-form_nolabel --second';
        //                         } else {
        //                             if (key == 'ext_01') {
        //                                 result.label = 'Name (Japanese)';
        //                             } else {
        //                                 result.label = 'Name (English)';
        //                             }
        //                             result.styleClasses = 'c-form_col --first';
        //                         };
        //                         if (key == 'name') {
        //                             result.msg = '名';
        //                         } else {
        //                             result.msg = columns[key].attribute.placeholder;
        //                         }
        //                     };
        //                     if (
        //                         typeof result !== 'undefined' &&
        //         Object.keys(result).length !== 0 && columns[key].required > 0
        //                     ) {
        //                         if (key == 'from_mail') { //Change ordering of mail fields to no 2
        //                             schema.fields.splice(4, 0, result)
        //                         } else {
        //                             schema.fields.push(result);
        //                         }
        //                     }
        //                 }
        //             }
        //             self.form_heading = response.data.details.inquiry_name;
        //             self.form_description = response.data.details.inquiry_info;
        //             self.form_thanks_msg = response.data.details.thanks_text;
        //             self.schema = schema;
        //             self.loading = false;
        //         })
        //         .catch(function (error) {
        //             self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
        //             self.$store.dispatch('snackbar/snackOn');
        //             self.loading = false;
        //         });
        // },
        onInput (value, fieldName) {
            this.$set(this.model, fieldName, value);
        },
        submitF () {
            const self = this;
            this.validForm = true;
            for (const key in self.$children[1].$children) {
                self.$children[1].$children[key].$children[0].$refs.myForm.validate();
                if (self.$children[1].$children[key].$children[0].formValid === false) {
                    this.validForm = false;
                }
            }

            if (this.validForm) {
                const sendModel = JSON.parse(JSON.stringify(self.model));
                sendModel.body = 'example message';
                self.$store.$auth.ctx.$axios
                    .post(this.inquirySubmitUrl, sendModel)
                    .then(function (response) {
                        if (response.data.errors.length === 0) {
                            self.isSent = true;
                            /*
                            self.$store.dispatch(
                                'snackbar/setMessage',
                                'Thanks! Your inquiry submitted.'
                            );
                            self.$store.dispatch('snackbar/snackOn');
                            // self.$router.push("/");
                            */
                        }
                    })
                    .catch(function (error) {
                        self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                        self.$store.dispatch('snackbar/snackOn');
                    });
            } else {
                self.$store.dispatch('snackbar/setError', 'There is something wrong with the input.');
                self.$store.dispatch('snackbar/snackOn');
            }
        }
    }
};
</script>

<template>
<section class="container-fluid l-content_maxWidth-lg">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
        
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <a :href="path" class="item">{{ pageName }}</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{ items.title }}</span>
        </div>

        <section v-if="!items.title && contentChecked">

            <p class="text-center">Content not found</p>
            
        </section>
        <section v-else>

            <client-only>
            <section class="p-article_wrap">
                <h1 class="p-heading mb-3">{{ items.title }}</h1>
                {{ items.date }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ items.category }}</span>

                
                <CoolLightBox
                class="c-lightbox"
                :items="items.img"
                :index="index"
                @close="index = null">
                    <template #icon-previous>
                        <i aria-hidden="true" class="arrow --prev mdi mdi-chevron-left"></i>
                    </template>
                    <template #icon-next>
                        <i aria-hidden="true" class="arrow --next mdi mdi-chevron-right"></i>
                    </template>
                </CoolLightBox>
                <div class="row p-article_imgList l-content_padding">
                    <div v-for="(image, imageIndex) in items.img" :key="imageIndex" class="col-md-4 col-sm-6 col-12">
                    <img
                        class="image"
                        @click="index = imageIndex"
                        :src="image"
                    >
                    </div>
                </div>
            </section>
            </client-only>

            <SocialSharing/>

            <section class="p-article_nextprev">
                <div class="row">
                    <div class="col-6 text-left item" v-if="link_prev" @click="goTo(link_prev.url)">
                        <div class="row">
                            <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-left"></i></div>
                            <div class="col-3 thumb" v-if="link_prev.img" :style="{backgroundImage: 'url(' + link_prev.img + ')' }"></div>
                            <div class="col"><span class="link">{{ link_prev.title }}</span></div>
                        </div>
                    </div>
                    <div class="col-6 text-right item" v-if="link_next" @click="goTo(link_next.url)">
                        <div class="row">
                            <div class="col"><span class="link">{{ link_next.title }}</span></div>
                            <div class="col-3 thumb" v-if="link_next.img" :style="{backgroundImage: 'url(' + link_next.img + ')' }"></div>
                            <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </section>

        </section>

</div>

</section>
<Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/>
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script>
import SocialSharing from '~/components/social_sharing.vue';
import Sidebar from '~/components/sidebar.vue';
import item from '~/components/topic_detail';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
    auth: false,
    components: {
        'v-item': item,
        CoolLightBox,
        SocialSharing,
        Sidebar
    },
    head() {
      return {
        title: this.metaTitle,
        meta: [
            {
                hid: 'og:title',
                property: 'og:title',
                content: this.metaTitle
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: this.metaTitle
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: this.metaOGImg
            },
        ]
      }
    },
    async asyncData({ app, payload, route }) {
        if (payload) {
            let thumbnail = payload.article.ext_1 ? payload.article.ext_1 : payload.apiDomain + '/files/user/og.jpg';
            return {
                SSGTopics: payload.article,
                metaTitle: payload.article.subject,
                metaOGImg: thumbnail,
                ranking: payload.contentRanking,
                sidebarEbook: payload.contentEbook,
                sidebarAds: payload.contentAds,
                sidebarPR: payload.contentPR
            }
        };
    },
    data() {
        return {
            index: null,
            url: '',
            path: '/backnumber/',
            imageUrl: "",
            description: "",
            pageName: '',
            items: [
                {   
                    title: this.title,
                    category: '',
                    date: '',
                }
            ],
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: [],
            loading: true,
            category: '',
            topic_slug: '',
            topic_id: '',
            topics_group_id: 15,
            link_next: '',
            link_prev: '',
            contentChecked: false,
            SSGTopics: [],
        };
    },
    mounted() {
        //Load content API
        if (this.SSGTopics.topics_id) {
            //Check if latest update available on today
            var storedArray = JSON.parse(sessionStorage.getItem('updateList'));
            if (storedArray && storedArray.length >= 1) {
                //If have latest update, load SPA for fresh content
                var hasUpdate = false;
                for (const key in storedArray) {
                    if (storedArray[key].id === this.SSGTopics.topics_id) {
                        hasUpdate = true;
                        break;
                    };
                };
                if (hasUpdate) {
                    this.url = window.location.href;
                    this.topic_slug = this.$route.params.id;
                    this.loading = true;
                    const url =
                    '/rcms-api/1/content/details/' +
                    this.topic_slug;
                    const self = this;
                    this.$store.$auth.ctx.$axios
                        .get(url)
                        .then(function (response) {
                            const items = [];
                            const content = response.data.details;

                            self.topicsDetails(content);
                        })
                        .catch(function (error) {
                            self.contentChecked = true;
                        });
                } else {
                    this.topicsDetails(this.SSGTopics);
                };
            } else {
                //If no latest update just display standard SSG
                this.topicsDetails(this.SSGTopics);
            };
        } else {
            //Normal SPA
            this.url = window.location.href;
            this.topic_slug = this.$route.params.id;
            this.loading = true;
            const url =
            '/rcms-api/1/content/details/' +
            this.topic_slug;
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const items = [];
                    const content = response.data.details;

                    self.topicsDetails(content);
                })
                .catch(function (error) {
                    // self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    // self.$store.dispatch('snackbar/snackOn');
                    self.contentChecked = true;
                });
        }
    },
    methods: {
        goTo(url){
            // this.$router.push({ path: url})
            window.location.href = url;
        },
        topicsDetails(content) {
            const self = this;
            const items = [];

            if (content.ext_1) {
                items.img = content.ext_1;
            };

            self.category = content.contents_type;
            items.category = content.contents_type_nm;
            items.title = content.subject;
            items.date = content.ymd
                .substring(0, 10)
                .replaceAll('-', '.');

            self.pageName = content.group_nm;
            self.topic_slug = content.slug;
            self.topic_id = content.topics_id;
            self.items = items;
            self.loading = false;
            self.contentChecked = true;

            self.nextPrevLink();
        },
        nextPrevLink() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' + 
            this.topics_group_id +
            '&central_id=' +
            this.$route.params.id +
            '&cnt=1';
    
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (const key in response.data.list) {
                        let url = "";
                        const item = response.data.list[key];
                        if (item.slug) {
                            url = self.path + item.slug;
                        } else {
                            url = self.path + item.topics_id;
                        };
                        if (item.topics_id.toString() !== self.topic_id.toString() && item.slug.toString() !== self.topic_slug.toString()) {
                            if (!self.link_next && key == 0) {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_2;
                                container.url = url;
                                self.link_next = container;
                            } else {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_2;
                                container.url = url;
                                self.link_prev = container;
                            }
                        }
                    }
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        }
    },
};
</script>
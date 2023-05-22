<template>
    <section class="l-content_maxWidth-md l-content_padding -xs l-container">
        
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <a :href="path" class="item">{{ items.groupName }}</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <a :href="items.categoryUrl" class="item">{{ items.category }}</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{ items.title }}</span>
        </div>

        <section class="p-article_wrap">
            <div class="p-article_featureIMG">
                <img v-if="items.featureIMG" :src="items.featureIMG">
            </div>

            <h1 class="p-heading mb-3">{{ items.title }}</h1>
            {{ items.date }} 
            <!-- <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ items.category }}</span> -->
            <a :href="items.categoryUrl" class="c-btn c-btn_main c-btn_sm ml-4">{{ items.category }}</a>

            <div class="p-article_content" v-if="items.content" v-html="items.content"></div>
        </section>
        
        <SocialSharing/>

        <section v-if="" class="p-article_nextprev">
            <div class="row">
                <div class="col-6 text-left item mr-auto" v-if="link_prev" @click="goTo(link_prev.url)">
                    <div class="row">
                        <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-left"></i></div>
                        <div class="col-3 thumb" v-if="link_prev.img" :style="{backgroundImage: 'url(' + link_prev.img + ')' }"></div>
                        <div class="col"><span class="link">{{ link_prev.title }}</span></div>
                    </div>
                </div>
                <div class="col-6 text-right item ml-auto" v-if="link_next" @click="goTo(link_next.url)">
                    <div class="row">
                        <div class="col"><span class="link">{{ link_next.title }}</span></div>
                        <div class="col-3 thumb" v-if="link_next.img" :style="{backgroundImage: 'url(' + link_next.img + ')' }"></div>
                        <div class="col-auto p-article_nextprev-arrow"><i aria-hidden="true" class="icon mdi mdi-chevron-right"></i></div>
                    </div>
                </div>
            </div>
        </section>

    </section>
</template>

<script>
import SocialSharing from '~/components/social_sharing.vue';
import item from '~/components/topic_detail';
export default {
    auth: false,
    components: {
        'v-item': item,
        SocialSharing
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
                hid: 'og:description',
                property: 'og:description',
                content: this.metaDescription
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: this.metaOGImg
            },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: 'https://mtown.g.kuroco.app/files/user/og.jpg'
            },
            {
                hid: 'og:image:url',
                property: 'og:image:url',
                content: 'https://mtown.g.kuroco.app/files/user/og.jpg'
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
                hid: 'twitter:description',
                name: 'twitter:description',
                content: this.metaDescription
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: this.metaOGImg
            },
        ]
      }
    },
    async asyncData({ app, payload }) {
        if (payload) {
            let thumbnail = payload.article.ext_1 ? payload.article.ext_1 : '';
            let description = payload.article.contents.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, '');
            if (description.length > 120) {
                description = description.substring(0, 120) + '...';
            };
            return {
                metaTitle: payload.article.subject,
                metaDescription: description,
                metaOGImg: thumbnail
            }
        };
    },
    data() {
        return {
            url: '',
            path: '/columns/',
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
            loading: true,
            topic_id: '',
            topics_group_id: 14,
            category_id: '',
            link_next: '',
            link_prev: '',
        };
    },
    mounted() {
        //GA tracking dimension
        const slug = this.$route.params.id;
        this.$gtag('event', 'page_view', {
            'dimension1': slug
        });

        this.url = window.location.href;
        this.topic_id = this.$route.params.id;
        this.loading = true;
        const url =
        '/rcms-api/1/content/details/' +
        this.topic_id;
        const self = this;
        this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
                const items = [];
                const content = response.data.details;

                if (content.ext_1) {
                    items.featureIMG = content.ext_1;
                    self.imageUrl = content.ext_1;
                };
                if (content.contents) {
                    items.content = content.contents;
                     self.description = content.contents;
                }; 

                items.topicID = content.topics_id
                items.category = content.contents_type_nm;
                items.categoryUrl = self.path  + content.contents_type_slug + '/';
                items.groupName = content.group_nm;
                items.title = content.subject;
                items.date = response.data.details.ymd
                    .substring(0, 10)
                    .replaceAll('-', '.');

                self.pageName = content.contents_type_nm;
                self.category_id = content.contents_type;
                self.items = items;
                self.loading = false;
                console.log(items);
                self.nextPrevLink();
            })
            .catch(function (error) {
                self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                self.$store.dispatch('snackbar/snackOn');
            });
    },
    methods: {
        goTo(url){
            this.$router.push({ path: url})
        },
        nextPrevLink() {
            console.log('hi' + this.category_id);
            let url =
            '/rcms-api/1/content/list?topics_group_id=' + 
            this.topics_group_id +
            '&contents_type=' +
            this.category_id +
            '&cnt=2' +
            '&central_id=' +
            this.$route.params.id;
    
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        if (item.topics_id.toString() !== self.items.topicID.toString()) {
                            if (!self.link_next && key == 0) {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
                                container.url = self.items.categoryUrl;
                                container.url += item.slug ? item.slug : item.topics_id;
                                self.link_next = container;
                            } else {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
                                container.url = self.items.categoryUrl;
                                container.url += item.slug ? item.slug : item.topics_id;
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
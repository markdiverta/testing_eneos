<template>
<section class="container-fluid l-content_maxWidth-lg">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <a :href="path" class="item">{{ pageName }}</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{ title }} 12323123</span>
        </div>

        <div class="p-article_featureIMG">
            <img v-if="items.featureIMG" :src="items.featureIMG">
        </div>

        1111111111111111111111111111111

        <section v-if="title">
            
            <section class="p-article_wrap">
                <h1 class="p-heading mb-3">{{ title }}</h1>
                {{ date }} <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ label }}</span>

                <div class="p-article_content" v-if="items.content" v-html="items.content"></div>
            </section>

            <SocialSharing/>

            {{ metaTitle }}
            {{ metaDescription }}

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
        <section v-else>
             <p class="text-center">Content not found</p>
        </section>
        

        <div class="l-content_padding -lg pb-0 c-blog_list" v-if="relatedArticles.length > 0">
            <h2 class="c-heading_bg c-heading_h3">関連ニュース</h2>
            <div class="container">
                <div class="row c-blog_list-item" v-for="item in relatedArticles" :key="item.id" @click="goTo(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
            </div>
            <div class="text-center l-content_padding -sm pb-0">
                <a :href="path" class="c-btn c-btn_md c-btn_main-dark">ニュース記事一覧</a>
            </div>
        </div>

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
export default {
    auth: false,
    components: {
        'v-item': item,
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
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'MTown - ' + this.title
            },
            {
                hid: 'description',
                name: 'description',
                content: this.metaDescription
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: this.metaDescription
            },
            { hid: 'og:type', property: 'og:type', content: 'article' },
            { hid: 'og:locale', property: 'og:locale',  content: 'ja_JP' },
            { hid: 'robots', name: 'robots', content: 'max-image-preview:large' },
            { 
                hid: 'article:published_time', 
                property: 'article:published_time',  
                content: this.date
            },
            { 
                hid: 'article:modified_time', 
                property: 'article:modified_time',
                content: this.date
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: this.imageUrl 
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:title',
                name: 'twitter:title',
                content: this.title
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: this.ogDescription
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: this.imageUrl
            },
        ]
      }
    },
    async asyncData({ app }) {
        const route = app.context.route.params;
        const url =
        '/rcms-api/1/content/details/' +
        route.articleId;
        const response = await app.$axios.$get(url);
        const content = response.details;
        return {
            metaTitle: content.subject,
            metaDescription: content.contents,
            ranking: payload.contentRanking,
            sidebarEbook: payload.contentEbook,
            sidebarAds: payload.contentAds,
            sidebarPR: payload.contentPR
        }
    },
    data() {
        return {
            category: '',
            title: this.title,
            url: '',
            path: '/news/',
            imageUrl: "",
            description: "",
            pageName: '',
            label: '',
            date: '',
            title: '',
            mainImage: '',
            color: 'white',
            items: [
                {
                    text: '',
                    pattern: '1',
                    image_url: '',
                    // text_size: "H2",
                    subtitle: 'type 1'
                }
            ],
            loading: true,
            topic_id: '',
            topic_slug: '',
            topics_group_id: 1,
            file_type: '',
            file_url: '',
            link_url: '',
            link_title: '',
            file_download: '',
            categories: [],
            topicsList: [],
            link_next: '',
            link_prev: '',
            relatedArticles: '',
            ogDescription: ''
        };
    },
    mounted() {

         //GA tracking dimension
        const slug = this.$route.params.id;
        this.$gtag.set({
            'page_title': 'Page View',
            'dimension1': slug
        });

        this.url = window.location.href;
        this.topic_id = this.$route.params.articleId;
        this.category = this.$route.params.category;
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

                    let ogDescription = content.contents
                    ogDescription = ogDescription.replace(/<[^>]+>/g, ''); //remove HTML
                    if (ogDescription.length > 50) {
                        ogDescription = ogDescription.substring(0, 50);
                        self.ogDescription = ogDescription;
                    };

                }; 
                self.topic_slug = content.slug;
                self.label = content.contents_type_nm;
                self.title = content.subject;

                self.date = response.data.details.ymd
                    .substring(0, 10)
                    .replaceAll('-', '.');

                self.pageName = content.group_nm;

                self.items = items;
                self.loading = false;
            })
            .catch(function (error) {
                self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                self.$store.dispatch('snackbar/snackOn');
            });

            this.nextPrevLink();
            this.listArticles();
    },
    methods: {
        shareOnFacebook() {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
            window.open(url, "facebook-share-dialog", "width=626,height=436");
        },
        shareOnHatena() {
            const url = `https://b.hatena.ne.jp/add?mode=confirm&url=${encodeURIComponent(this.url)}&title=${encodeURIComponent(this.title)}`;
            window.open(url, "hatena-bookmark-dialog", "width=550,height=420");
        },
        saveToPocket() {
            const url = `https://getpocket.com/edit?url=${encodeURIComponent(this.url)}`;
            window.open(url, "pocket-bookmark-dialog", "width=350,height=550");
        },
        subscribeToRSS() {
            const url = "https://example.com/feed/";
            window.open(url, "rss-subscribe-dialog", "width=450,height=550");
        },
        subscribeOnFeedly() {
            const url = `https://feedly.com/i/subscription/feed/${encodeURIComponent(this.url)}/rss.xml`;
            window.open(url, "feedly-subscribe-dialog", "width=550,height=420");
        },
        pinOnPinterest() {
            const url = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(this.url)}&media=${encodeURIComponent(this.imageUrl)}&description=${encodeURIComponent(this.description)}`;
            window.open(url, "pinterest-pin-dialog", "width=750,height=420");
        },
        tweetOnTwitter() {
            const text = `${this.title} - ${this.url}`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(url, "twitter-tweet-dialog", "width=550,height=420");
        },
        goTo(url){
            // this.$router.push({ path: url})
            window.location.href = url;
        },
        nextPrevLink() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' + 
            this.topics_group_id +
            '&contents_type=' +
            this.category +
            '&cnt=2' +
            '&central_id=' +
            this.topic_id;
    
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        if (item.topics_id.toString() !== self.topic_id.toString() && item.slug.toString() !== self.topic_slug.toString()) {
                            if (item.slug) {
                                url = '/news/' + item.contents_type_slug + '/' + item.slug;
                            } else {
                                url = '/news/' + item.contents_type_slug + '/' + item.topics_id;
                            };
                            if (!self.link_next && key == 0) {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
                                container.url = url;
                                self.link_next = container;
                            } else {
                                let container = {};
                                container.title = item.subject;
                                container.id = item.topics_id;
                                container.img = item.ext_1;
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
        },
        listArticles() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=1' +
            '&contents_type=' +
            this.category +
            '&cnt=10';
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
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                            };
                        };
                        if (item.slug) {
                            url = '/news/' + item.contents_type_slug + '/' + item.slug;
                        } else {
                            url = '/news/' + item.contents_type_slug + '/' + item.topics_id;
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
                    self.relatedArticles = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        }
    },
};
</script>
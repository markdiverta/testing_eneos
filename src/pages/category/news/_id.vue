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
            <span class="item">{{ title }}</span>
        </div>

        <section v-if="!items.title && contentChecked">

            <p class="text-center">Content not found</p>
            
        </section>
        <section v-else>

            <section class="p-article_wrap">
                <div class="p-article_featureIMG">
                    <img v-if="items.featureIMG" :src="items.featureIMG" width="620" height="413">
                </div>

                <h1 class="p-heading mb-3">{{ title }}</h1>
                {{ date }} 
                <!-- <span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ label }}</span> -->
                <a :href="labelUrl"><span class="c-btn c-btn_main c-btn_sm c-btn_disable ml-4">{{ label }}</span></a>

                <div class="p-article_content" v-if="items.content" v-html="items.content"></div>

                <!-- <div class="p-article_share l-content_padding -sm">
                    <a href="#" class="c-btn c-btn_social --icon c-btn_twitter" @click.prevent="tweetOnTwitter">Tweet</a>
                    <a href="#" class="c-btn c-btn_social --icon c-btn_fb" @click.prevent="shareOnFacebook">Share</a>
                    <a href="#" class="c-btn c-btn_social c-btn_hatena" @click.prevent="shareOnHatena">Hatena</a>
                    <a href="#" class="c-btn c-btn_social --icon c-btn_pocket" @click.prevent="saveToPocket">Pocket</a>
                    <a href="#" class="c-btn c-btn_social --icon c-btn_rss" @click.prevent="subscribeToRSS">RSS</a>
                    <a href="#" class="c-btn c-btn_social c-btn_feedly" @click.prevent="subscribeOnFeedly">Feedly</a>
                    <a href="#" class="c-btn c-btn_social --icon c-btn_pinterest" @click.prevent="pinOnPinterest">Pin it</a>
                </div> -->
            </section>
            
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

        <div class="l-content_padding -lg pb-0 c-blog_list" v-if="relatedArticles.length > 0">
            <h2 class="c-heading_bg c-heading_h3">関連ニュース</h2>
            <div class="container">
                <div class="row c-blog_list-item" v-for="item in relatedArticles" :key="item.id" @click="goTo('/category/news/' + item.id)">
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
        title: this.title,
        meta: [
            {
            hid: 'og:title',
            property: 'og:title',
            content: this.title
            },
            {
            hid: 'description',
            name: 'description',
            content: this.ogDescription
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: this.ogDescription
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
    data() {
        return {
            title: this.title,
            url: '',
            path: '/news/',
            imageUrl: "",
            description: "",
            pageName: '',
            label: '',
            labelURL: '',
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
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: [],
            loading: true,
            category: '',
            topic_slug: '',
            topic_id: '',
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
            ogDescription: '',
            contentChecked: false,
        };
    },
    mounted() {
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


                // self.mainImage = response.data.details.ext_col_08.url;
                //     .substring(0, 10)
                //     .replaceAll('-', '.');
                // const positions = response.data.details.ext_col_04;
                // const imageUrls = response.data.details.ext_col_05;
                // // var text_size = response.data.details.ext_col_06;
                // const texts = response.data.details.ext_col_07;
                // const subtitle = response.data.details.ext_col_09;
                // self.file_type = response.data.details.ext_col_01.key;
                // self.file_url = response.data.details.ext_col_02.url;
                // if (self.file_download) {
                //     self.file_download = response.data.details.ext_col_02.dl_link;
                // };
                // self.link_url = response.data.details.ext_col_03.url;
                // self.link_title = response.data.details.ext_col_03.title;

                // for (let i = 0; i < positions.length; i++) {
                //     let imageUrl = null;
                //     if (
                //         imageUrls[i] !== undefined && imageUrls[i].hasOwnProperty('url')
                //     ) {
                //         imageUrl = imageUrls[i].url + '?width=800';
                //     }
                //     let pattern = '1';
                //     if (positions[i].key === '0') {
                //         pattern = 'no image';
                //     } else if (positions[i].key === '1') {
                //         pattern = 'top';
                //     } else if (positions[i].key === '2') {
                //         pattern = 'left';
                //     } else if (positions[i].key === '3') {
                //         pattern = 'bottom';
                //     } else if (positions[i].key === '4') {
                //         pattern = 'right';
                //     }
                //     items.push({
                //         text: texts[i],
                //         pattern,
                //         image_url: imageUrl,
                //         // text_size: textSize,
                //         subtitle: subtitle[i]
                //     });

                //     //Check URL page if is ID and turn to slug
                //     var onlyDigit = /^\d+$/;
                //     if (onlyDigit.test(self.topic_id) && response.data.details.slug) {
                //         history.pushState(self.subject, '', '/inveek/blog/' + response.data.details.slug);
                //     };
                // };

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
                
                self.label = content.contents_type_nm;
                self.labelUrl = '/news/' + content.contents_type_slug,
                self.title = content.subject;

                self.date = response.data.details.ymd
                    .substring(0, 10)
                    .replaceAll('-', '.');

                self.pageName = content.group_nm;

                self.items = items;
                self.loading = false;
                self.contentChecked = true;
            })
            .catch(function (error) {
                self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                self.$store.dispatch('snackbar/snackOn');
                self.contentChecked = true;
            });

            this.nextPrevLink();
            this.listArticles();

        // this.getCategory();
        // this.getTopicsList();
        //console.log(this.$route);
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
            '&cnt=1' +
            '&central_id=' +
            this.$route.params.id;
    
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
                        // console.log(item.topics_id + ' vs ' + self.$route.params.id);
                        // console.log(item.topics_id.toString() !== self.$route.params.id.toString());
                        if (item.topics_id.toString() !== self.topic_id.toString() && item.slug.toString() !== self.topic_slug.toString()) {
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
            '/rcms-api/1/content/list?topics_group_id=1&cnt=10';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc;
                        if (item.contents) {
                            desc = item.contents;
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                            };
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            catURL: '/news/' + item.contents_type_slug,
                            id: item.topics_id,
                            thumb: item.ext_1,
                        });
                    }
                    self.relatedArticles = topics;
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        getCategory() {
            let url = '/rcms-api/1/contents/categories?topics_group_id=' + this.topics_group_id;
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const categories = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        categories.push({
                            title: item.category_nm,
                            id: item.topics_category_id,
                        });
                    }
                    self.categories = categories;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
        getTopicsList() {
            let url = '/rcms-api/1/contents?topics_group_id=' +
            this.topics_group_id +
            '&cnt=8';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topicsList = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        if (self.topic_id.toString() !== item.topics_id.toString()) { //Filter out existing topics page to show again on sidebar
                            topicsList.push({
                                title: item.subject,
                                id: item.topics_id,
                                thumb: item.ext_col_08.url,
                            });
                        }
                    }
                    self.topicsList = topicsList;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        }
    },
};
</script>

<style>
.st-mybox {
    position: relative;
    margin: 25px 0;
    padding: 0 20px;
    border: solid 2px #9E9E9E;
    border-radius: 8px;
}

.st-in-mybox {
    padding: 20px 0;
}

.st-in-mybox p {
    margin-bottom: 10px;
}

.st-in-mybox p:last-child {
    margin-bottom: 0;
}

.st-mybox .fa {
    margin-right: 5px;
}

.st-mybox .st-mybox-title {
    position: absolute;
    display: inline-block;
    top: -8px;
    left: 10px;
    padding: 0 10px;
    line-height: 1;
    color:#9E9E9E;
    font-weight: bold;
    margin-bottom:10px;
    font-size: 95%;
}

.tki-heading-lv2 {
    position: relative;
    padding: 1em 1em 1em 1.3em;
        padding-top:15px!important;
    padding-bottom:15px!important;
    border: 1px solid #1e73be;
    color: #ffffff;
        background-color:#1e73be;
        font-weight:500;
}

.tki-heading-lv3 {
    border: none;
    border-bottom: 2px dashed #1e73be;
    padding-left:0;
    color: #1e73be;
    background-color: transparent;
    background: none;
        padding:10px 0px;
}
</style>
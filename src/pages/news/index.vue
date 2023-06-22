<template>
<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
        </div>

        <h1 class="p-heading">{{pageName}}</h1>

        <loading-spinner :content-checked="contentChecked" :topics="topics" />

        <section class="container-fluid c-blog_list" v-if="topics.length > 0">
            <div class="row c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
                <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                <div class="col">
                    <h3>{{ item.title }}</h3>
                    <div class="mb-3">
                        <span class="date">{{ item.date }}</span>
                        <!-- <span class="label c-label">{{ item.cat }}</span> -->
                        <a :href="item.catURL"><span class="label c-label c-label_clickable">{{ item.cat }}</span></a>
                    </div>
                    <p>{{ item.desc }}</p>
                </div>
            </div>
        </section>
        <section v-else-if="contentChecked && !topics.length">
            <p class="text-center">Sorry, content is coming soon, please come back later.</p>
        </section>

        <div class="c-pagination">
            <v-pagination v-if="Math.ceil(totalCnt / perPage) > 1"
                          v-model="page"
                          :length="Math.ceil(totalCnt / perPage)"
                          :total-visible="totalVisible"
                          @input="next"
            />
        </div>

    </div>

</section>
<Sidebar :contentRanking="ranking" :contentEBook="sidebarEbook" :contentAds="sidebarAds" :contentPR="sidebarPR"/>
</section><!--l-page_content-row-->
</section><!--container-fluid-->
</template>

<script>
import LoadingSpinner from '~/components/loading_spinner.vue';
import Sidebar from '~/components/sidebar.vue';
export default {
    auth: false,
    components: {
        LoadingSpinner,
        Sidebar
    },
    data() {
        return {
            text: '0',
            group_id: 1,
            categories: [],
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            totalCnt: 0,
            pageName: 'マレーシアニュース',
            paginationMax: 15,
            paginationMin: 8,
            search: '',
            searchCategory: '',
            contentChecked: false,
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: [],
        };
    },
    // head() {
    //     return {
    //     title: "MTown - マレーシアの週刊情報誌",
    //     meta: [
    //         {
    //         hid: 'og:title',
    //         property: 'og:title',
    //         content: "MTown - マレーシアの週刊情報誌"
    //         },
    //         {
    //         hid: 'og:description',
    //         property: 'og:description',
    //         content: 'To be a guiding light on the life of journey that is not easily visible'
    //         }
    //     ]
    //     }
    // },
    // async asyncData({ app }) { 
    //     const response = await app.$axios.$get('/rcms-api/1/content/details/47639');
    //     const self = this;
    //     return {
    //         title: response.details.subject,
    //         description: response.details.contents
    //     }
    // },
    computed: {
        totalVisible() {
            return this.$vuetify.breakpoint.smAndDown ? this.paginationMin : this.paginationMax;
        },
    },
    methods: {
        next(page) {
            this.updateBlog();
        },
        goTo(url){
            this.$router.push({ path: url})
        },
        categoryFilter() {
            let url =
            '/rcms-api/1/content/category?topics_group_id=' +
            this.group_id;
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        if (item.slug && item.slug == self.$route.params.category) {
                            self.searchCategory = item.topics_category_id;
                        }
                    }
                    self.updateBlog();
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
        updateBlog() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' +
            this.group_id +
            (this.searchCategory ? '&contents_type=' + this.searchCategory : '') +
            '&cnt=' +
            this.perPage +
            '&pageID=' +
            this.page;
            if (this.category_key == null && this.$route.query.contents_type) {
                url += '&contents_type=' + this.$route.query.contents_type;
            } else if (this.category_key != null) {
                if (this.category_key != 'all') {
                    url += '&contents_type=' + this.category_key;
                }
            };
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc = item.contents
                        let catURL = item.category_parent_id ? '/news/' + item.contents_type_slug : '/news/';
                        desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                        if (desc.length > 120) {
                            desc = desc.substring(0, 120);
                            desc += '...';
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
                    self.pageName = response.data.list[0].group_nm;
                    self.topics = topics;
                    self.contentChecked = true;
                })
                .catch(function (error) {
                    self.contentChecked = true;
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        }
    },
    mounted() {
        // //If there is search parameter in the URL
        // if (typeof this.$route.query.contents_type != 'undefined' && this.$route.query.contents_type != ''){
        //     this.search = this.$route.query.contents_type;
        // };
        if (this.$route.params.category) {
            this.categoryFilter();
        } else {
            this.updateBlog();
        };
    }
};
</script>

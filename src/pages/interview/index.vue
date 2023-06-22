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

        <section v-if="topics.length > 0">
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-sm-6 col-12 c-blog_list-item" v-for="(item, index) in topics" v-if="index < 8" :key="item.id" @click="goTo(item.url)">
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
            <section class="container-fluid mt-4 c-blog_list" v-if="topics.length > 9">
                <div class="row c-blog_list-item" v-for="(item, index) in topics" v-if="index > 7" :key="item.id" @click="goTo(item.url)">
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
            group_id: 10,
            path: '/interview/',
            categories: [],
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            totalCnt: 0,
            pageName: 'Special Interview 「マレーシアの旬な話題を訊く」',
            paginationMax: 15,
            paginationMin: 8,
            contentChecked: false,
            ranking: [],
            sidebarEbook: [],
            sidebarAds: [],
            sidebarPR: [],
        };
    },
    computed: {
        totalVisible() {
            return this.$vuetify.breakpoint.smAndDown ? this.paginationMin : this.paginationMax;
        },
    },
    methods: {
        next(page) {
            this.updateBlog();
            this.scrollToTop();
        },
        scrollToTop() {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(this.scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        },
        goTo(url){
            this.$router.push({ path: url})
        },
        updateBlog() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' +
            this.group_id +
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
                        let desc, thumb, url;
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
                        if (item.slug) {
                            url = self.path + item.slug;
                        } else {
                            url = self.path + item.topics_id;
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            id: item.topics_id,
                            url: url,
                            thumb: thumb,
                        });
                    }
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
        this.updateBlog();
    }
};
</script>

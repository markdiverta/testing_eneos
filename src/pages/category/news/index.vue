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
            <div class="row c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo('/category/news/' + item.id)">
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
            // this.$router.push({ path: url})
            window.location.href = url;
        },
        updateBlog() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' +
            this.group_id +
            '&cnt=' +
            (this.search ? '&contents_type=' + this.search : '') +
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
                        desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                        if (desc.length > 120) {
                            desc = desc.substring(0, 120);
                            desc += '...';
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
        //If there is search parameter in the URL
        if (typeof this.$route.query.contents_type != 'undefined' && this.$route.query.contents_type != ''){
            this.search = this.$route.query.contents_type;
        };
        this.updateBlog();
    }
};
</script>

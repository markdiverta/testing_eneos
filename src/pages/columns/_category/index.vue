<template>
    <section class="p-page_blog l-content_maxWidth-lg l-content_padding -xs l-container">
        
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <template v-if="parentCat">
                <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
                <a :href="path" class="item">{{parentCat}}</a>
            </template>
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
                        <span class="date">{{ item.date }}</span><span class="label c-label">{{ item.cat }}</span>
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

    </section>
</template>

<script>
import LoadingSpinner from '~/components/loading_spinner.vue';
export default {
    auth: false,
    components: {
        LoadingSpinner
    },
    data() {
        return {
            text: '0',
            group_id: 14,
            categories: [],
            path: '/columns/',
            searchCatID: '',
            parentCat: '',
            parentCatPath: '',
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            totalCnt: 0,
            pageName: '',
            paginationMax: 15,
            paginationMin: 8,
            contentChecked: false,
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
        categoryDetails() {
            let url =
            '/rcms-api/1/content/category?topics_group_id=14';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    for (let key in response.data.list) {
                        let item = response.data.list[key];
                        if (item.slug == self.$route.params.category) {
                            self.searchCatID = item.topics_category_id;
                            break;
                        }
                    };
                    self.updateBlog();
                })
                .catch(function (error) {
                    console.log(error.response.data.errors?.[0].message);
                });
        },
        updateBlog() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' +
            this.group_id +
            '&cnt=' +
            this.perPage +
            '&pageID=' +
            this.page;

            if (this.searchCatID) {
                url += '&contents_type=' + this.searchCatID;
            };

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
                            if (desc.length > 120) {
                                desc = desc.substring(0, 120);
                                desc += '...';
                            };
                        };
                        if (item.slug) {
                            url = self.path + item.contents_type_slug + '/' + item.slug;
                        } else {
                            url = self.path + item.contents_type_slug + '/' + item.topics_id;
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
                    self.pageName = self.searchCatID ? response.data.list[0].contents_type_nm : response.data.list[0].group_nm;
                    self.parentCat = self.searchCatID ? response.data.list[0].group_nm : '';
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
        if (this.$route.params.category) {
            this.categoryDetails();
        } else {
            this.updateBlog();
        } 
    }
};
</script>

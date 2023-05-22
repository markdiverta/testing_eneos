<template>
    <section class="p-page_blog l-content_maxWidth-lg l-content_padding -xs l-container">
        
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
        </div>

        <h1 class="p-heading">{{pageName}}</h1>

        <section class="c-search_bar l-content_margin-btm">
        <form @submit.prevent="search" class="c-form_sm">
            <v-container>
                <v-row justify="center">
                    <v-col class="col-md-4 col">
                        <v-text-field
                            label="キーワードを入力"
                            v-model="form.keyword"
                            type="text"
                            outlined
                        />
                    </v-col>
                    <v-col class="col-md-4 col">
                        <v-select
                        v-model="form.category"
                        item-text="value"
                        item-value="key"
                        :items="form.categoryOptions"
                        label="カテゴリ"
                        outlined
                        ></v-select>
                    </v-col>
                    <v-col class="col-auto">
                        <button
                        class="c-btn c-btn_main c-btn_md"
                        >
                        検索
                        </button>
                    </v-col>
                </v-row>
            </v-container>
        </form>
        </section>

        <loading-spinner :content-checked="contentChecked" :topics="topics" />

        <section v-if="topics.length > 0">
            <section class="container-fluid c-blog_list --list_2col">
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-12 c-blog_list-item" v-for="item in topics" :key="item.id" @click="goTo(item.url)">
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
        </section>
        <section v-else-if="contentChecked && !topics.length">
            <p class="text-center">No content is found</p>
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
            pageName: ' サークル・コミュニティをみる/参加する',
            path: '/community/',
            group_id: 12,
            categories: [],
            topics: [],
            page: 1,
            perPage: 30,
            category_key: null,
            totalCnt: 0,
            paginationMax: 15,
            paginationMin: 8,
            form: {
                keyword: '',
                categoryOptions: [
                    {value: '', label: 'ALL'}
                ],
            },
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
        searchFilter() {
            let url = '/rcms-api/1/content/category?topics_group_id=' +
            this.group_id;
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    for (const key in response.data.list) {
                        const item = response.data.list[key];
                        self.form.categoryOptions.push({
                            key: item.topics_category_id,
                            value: item.category_nm,
                        });
                        self.form.categoryOptions.unshift({
                            key: '',
                            value: 'ALL',
                        });
                    }
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
                        let desc, url;
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 80) {
                                desc = desc.substring(0, 80);
                                desc += '...';
                            };
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
                            url: url,
                            id: item.topics_id,
                        });
                    }
                    // self.pageName = response.data.list[0].group_nm;
                    self.topics = topics;
                    self.contentChecked = true;
                })
                .catch(function (error) {
                    self.contentChecked = true;
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
        async search() {
            let url =
            '/rcms-api/1/content/list?topics_group_id=' +
            this.group_id +
            '&cnt=' +
            this.perPage +
            '&pageID=' +
            this.page +
            (this.form.keyword ? '&topics_keyword=' + this.form.keyword : '') +
            (this.form.category ? '&contents_type=' + this.form.category : '');

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
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 80) {
                                desc = desc.substring(0, 80);
                                desc += '...';
                            };
                        };
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            id: item.topics_id,
                        });
                    }
                    self.topics = topics;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
    },
    mounted() {
        this.updateBlog();
        this.searchFilter();
    }
};
</script>

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
            <section class="container-fluid mt-4 c-blog_list" v-if="topics.length > 0">
                <div class="row c-blog_list-item" v-for="(item, index) in topics" :key="item.id" @click="windowOpen(item.url)">
                    <div class="col-sm-3 col-12 thumb" :class="{ '--noIMG': !item.thumb }" :style="item.thumb ? {backgroundImage: 'url(' + item.thumb + ')' } : ''"></div>
                    <div class="col">
                        <h3>{{ item.title }}</h3>
                        <div class="mb-3">
                            <span class="date">{{ item.date }}</span>
                            <a :href="item.catURL"><span class="label c-label c-label_clickable">{{ item.cat }}</span></a>
                        </div>
                        <div v-if="item.desc" v-html="item.desc"></div>
                    </div>
                </div>
            </section>
        </section>
        <section v-else-if="contentChecked && !topics.length">
            <p class="text-center">Couldn't find any content. Please try searching for different keywords.</p>
            <form class="c-form_sm row pt-4">
                <div class="col-auto ml-auto">
                    <v-text-field
                        type="text"
                        placeholder="ニュース検索　例：マレーシア Covid-19 感染者数"
                        class="l-header_top-search"
                        outlined
                        name="keyword"
                        v-model="keyword"
                        style="min-width: 330px"
                    />
                </div>
                <div class="col-auto mr-auto">
                    <button
                        type="submit"
                        block
                        class="c-btn_main-dark c-btn submit-btn"
                    >
                        検索
                    </button>
                </div>
            </form>
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
            group_id: '',
            categories: [],
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            totalCnt: 0,
            pageName: '検索結果',
            paginationMax: 15,
            paginationMin: 8,
            keywords: '',
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
        },
        goTo(url){
            // this.$router.push({ path: url})
            window.location.href = url;
        },
        windowOpen(url){
            window.location.href = url;
        },
        updateBlog() {
            let url =
            '/rcms-api/1/content/list' +
            '?cnt=' +
            this.perPage +
            (this.keywords ? '&topics_keyword=' + this.keywords : '') +
            '&pageID=' +
            this.page;

            if (this.category_key == null && this.$route.query.contents_type) {
                url += '&contents_type=' + this.$route.query.contents_type;
            } else if (this.category_key != null) {
                if (this.category_key != 'all') {
                    url += '&contents_type=' + this.category_key;
                }
            };

            //If coming from footer mobile menu
            if (this.$route.query.filter && this.$route.query.filter == 'topics') {
                url += '&topics_group_id%5B%5D=10&topics_group_id%5B%5D=7&topics_group_id%5B%5D=8';
            };

            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    self.totalCnt = response.data.pageInfo.totalCnt;
                    const topics = [];
                    for (let key in response.data.list) {
                        const item = response.data.list[key];
                        let desc, thumb, path;
                        if (item.contents) {
                            desc = item.contents;
                            desc = desc.replace(/<[^>]+>/g, ''); //remove HTML
                            if (desc.length > 100) {
                                desc = desc.substring(0, 100);
                                desc += '...';
                            };
                        };
                        if (item.ext_1 && item.ext_1.includes('http://') || item.ext_1 && item.ext_1.includes('https://') ) {
                            thumb = item.ext_1;
                        } else if (item.ext_2 && item.ext_2.includes('http://') || item.ext_2 && item.ext_2.includes('https://') ) {
                            thumb = item.ext_2;
                        };
                        if (item.topics_group_id) {
                            let parentID = item.topics_group_id;
                            path = parentID == '1' ? '/news/'
                                : parentID == '7' ? '/eat/'
                                : parentID == '8' ? '/life/'
                                : parentID == '9' ? '/feature/'
                                : parentID == '10' ? '/interview/'
                                : parentID == '11' ? '/comics/'
                                : parentID == '12' ? '/community/'
                                : parentID == '13' ? '/malaysia-profiles/'
                                : parentID == '14' ? '/j-league/'
                                : parentID == '15' ? '/backnumbers/'
                                : '';
                        };
                        let url = item.contents_type_slug ? path + item.contents_type_slug + '/' : path;
                        url = item.slug ? url + item.slug : url + item.topics_id;
                        topics.push({
                            date: item.ymd.substring(0, 10).replaceAll('-', '.'),
                            title: item.subject,
                            desc: desc,
                            cat: item.contents_type_nm,
                            catURL: path + item.contents_type_slug,
                            id: item.topics_id,
                            url: url,
                            thumb: thumb,
                            path: path,
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
        if (typeof this.$route.query?.keyword != 'undefined' && this.$route.query?.keyword != ''){
            this.keywords = this.$route.query.keyword;
        };
        this.updateBlog();
    }
};
</script>

<template>
    <section class="p-page_blog l-content_maxWidth-lg l-content_padding -xs l-container">
        
        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{topics.title}}</span>
        </div>

        <h1 class="p-heading">{{topics.title}}</h1>

        <section>
            <div v-if="topics.desc" v-html="topics.desc"></div>
        </section>

    </section>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            text: '0',
            group_id: 8,
            categories: [],
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            pageName: '',
            paginationMax: 15,
            paginationMin: 8,
        };
    },
    computed: {
        totalVisible() {
            return this.$vuetify.breakpoint.smAndDown ? this.paginationMin : this.paginationMax;
        },
    },
    methods: {
        goTo(url){
            this.$router.push({ path: url})
        },
        mainContent() {
            let url = '/rcms-api/1/content/details/47639';
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(url)
                .then(function (response) {
                    const topics = [];
                    const item = response.data.details;

                    topics.date = item.ymd.substring(0, 10).replaceAll('-', '.');
                    topics.title = item.subject;
                    topics.desc = item.contents;
                    topics.cat = item.contents_type_nm;
                    topics.id = item.topics_id;

                    self.topics = topics;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        }
    },
    mounted() {
        this.mainContent();
    }
};
</script>

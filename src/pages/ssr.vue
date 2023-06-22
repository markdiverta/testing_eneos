<template>
<section class="p-page_blog l-content_maxWidth-lg l-container">
<section class="row l-page_content-row">
<section class="col-md-9 col-12" fluid>

    <div class="l-page_content">
        <h1 class="p-heading">{{ title }}</h1>
        <p>{{ description }}</p>

        <SocialSharing/>
    </div>

</section>
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
    // async asyncData({ app }) {
    //     const response = await app.$axios.$get('/rcms-api/1/content/details/47639');
    //     const self = this;
    //     console.log(response);
    //     return {
    //         title: response.details.subject,
    //         description: response.details.contents
    //     }
    // },
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
            hid: 'og:description',
            property: 'og:description',
            content: this.description
            }
        ]
        }
    },
    computed: {
        totalVisible() {
            return this.$vuetify.breakpoint.smAndDown ? this.paginationMin : this.paginationMax;
        },
    },
    methods: {
        goTo(url){
            // this.$router.push({ path: url})
            window.location.href = url;
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

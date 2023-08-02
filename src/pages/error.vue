<template>
    <section class="l-content_maxWidth-sm l-content_padding text-center">
        <h1 v-if="error.statusCode && error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else>
            {{ otherError }}
        </h1>
        <NuxtLink to="/">
            Click here to return to Home page
        </NuxtLink>
    </section>
</template>

<script>
export default {
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            pageNotFound: '404 Page Not Found',
            otherError: 'An error occurred'
        };
    },
    head() {
        const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            title
        };
    },
    mounted() {
        // console.log(this.$route.fullPath.includes('news/'));
        // if (this.$route.fullPath.includes('news/')) {
        //     window.location = '/news/' + '?redirect'
        // };
    }
};
</script>

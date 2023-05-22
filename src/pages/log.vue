<template>
    <section class="l-content_maxWidth-lg l-content_padding -xs l-container">

        <section>
            <p>List of page generated</p>
            <!-- {{ this.metaDescription }} -->
            <ol>
                <li v-for="(url, index) in this.metaDescription" :key="index">{{ url.url }}</li>
            </ol>
        </section>

    </section>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            urlList: [],
            metaTitle: '123',
        };
    },
    head() {
      return {
        title: this.metaTitle,
        meta: [
            {
                hid: 'og:title',
                property: 'og:title',
                content: this.metaTitle
            },
            // {
            //     hid: 'og:description',
            //     property: 'og:description',
            //     content: this.metaDescription
            // },
        ]
      }
    },
    async asyncData({ payload }) {
        if (payload) {
            // console.log('enter payload');
            // let content;
            // for (const key in payload.listGenerate) {
            //     // console.log(payload.listGenerate[key].url);
            //     content +=  payload.listGenerate[key].url + '<br>';
            // }
            // console.log(content);
            return {
                metaTitle: 'Route generate log',
                metaDescription: payload.listGenerate,
            };
        }
    },
};
</script>

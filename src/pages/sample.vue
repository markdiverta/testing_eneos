<template>
    <div class="p-article_share l-content_padding -sm">
        <h1>Testing content from sample.vue</h1>
        {{testingTitle}}
    </div> 
</template>

<script>
export default {
  name: 'Sample',
  data() {
        return {
            title: '',
            url: '',
            description: '',
        }
  },
  async asyncData({ app }) {
    try {
        const response = await app.$axios.get('/rcms-api/1/content/details/78288');
        const data = response.data.details;

        return {
            testingTitle: data.subject,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {};
    }
  },
//   mounted() {
//         this.url = window.location.href;
//         this.topic_slug = this.$route.params.id;
//         this.loading = true;
//         const url =
//         '/rcms-api/1/content/details/78288';
//         const self = this;
//         this.$store.$auth.ctx.$axios
//             .get(url)
//             .then(function (response) {
//                 const items = [];
//                 const content = response.data.details;

//                 if (content.ext_1) {
//                     items.featureIMG = content.ext_1;
//                     self.imageUrl = content.ext_1;
//                 };
//                 if (content.contents) {
//                     items.content = content.contents;
//                      self.description = content.contents;
//                 }; 

//                 self.category = content.contents_type;
//                 items.category = content.contents_type_nm;
//                 items.categoryUrl = self.path  + content.contents_type_slug;
//                 items.title = content.subject;
//                 items.date = response.data.details.ymd
//                     .substring(0, 10)
//                     .replaceAll('-', '.');

//                 self.pageName = content.group_nm;
//                 self.topic_slug = content.slug;
//                 self.topic_id = content.topics_id;
//                 self.items = items;
//                 self.loading = false;

//                 self.nextPrevLink();
//                 self.listArticles();
//             })
//             .catch(function (error) {
//                 self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
//                 self.$store.dispatch('snackbar/snackOn');
//             });
//             self.contentLoaded = true;
//   }
}
</script>
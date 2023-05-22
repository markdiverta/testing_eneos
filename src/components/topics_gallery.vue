<template>
    <section>
        <div class="container c-article_gallery">
            <div v-if="topics.length > 0" class="row">

                <v-col class="col-md-4 col-sm-6 col-12" v-for="item in topics" :key="item.id">
                    <a :href="'https://' + item.link" target="_blank">
                    <v-card class="c-article">
                        <div class="c-article_thumb" :class="item.thumbnail ? '' : 'no-image'">
                        <v-img v-if="item.thumbnail"
                            :src="item.thumbnail"
                            height="200"
                        ></v-img>
                        </div>
                    </v-card>
                    </a>
                </v-col>

            </div>
            <div v-else class="row">
                <div class="text-center py-4 grey--text col">
                    No data available
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        edit_topic(topicId) {
            this.$router.push('/profile/topic_edit/' + topicId);
        },
        goURL(url) {
            window.open(url);
        },
    },
    props: {
        topics: {
            type: Array,
            required: false,
            default: () => []
        }
    }
};
</script>

<template>
    <section>
        <div class="container">
            <div v-if="topics.length > 0" class="row justify-content-around">

                <v-col class="col-md-4 col-sm-6 col-12" v-for="item in topics" :key="item.id">
                    <v-card class="c-article" :to="{ path: topicsURL + item.id }">
                        <div class="c-article_thumb" :class="item.thumbnail ? '' : 'no-image'">
                        <v-img v-if="item.thumbnail"
                            :src="item.thumbnail"
                            height="246"
                        ></v-img>
                        </div>
                        <v-card-title v-text="item.link" class="pb-0 c-article_title"></v-card-title>
                        <v-card-actions>
                            <span v-if="item.label" class="c-btn c-btn_sub c-btn_sm c-btn_disable mr-3">
                                {{ item.label }}
                            </span>
                            
                            {{ item.date }}
                        </v-card-actions>
                    </v-card>
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
        }
    },
    computed: {
        topicsURL() {
            if (this.$route.name == 'event___en') {
                return '/event/detail/'
            }
            else if (this.$route.name == 'marche___en') {
                return '/marche/detail/'
            } 
            else {
                return '/topics_detail/'
            }
        }
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

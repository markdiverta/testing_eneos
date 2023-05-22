<template>
    <section>
        <div class="container">
            <div
                v-if="topics.length > 0"
                class="row justify-content-around"
            >
                <v-col
                    class="col-md-4 col-sm-6 col-12" v-for="item in topics"
                    :key="item.id"
                >
                    <v-card
                        :href="item.linkurl"
                        class="c-article"
                        target="_blank"
                    >
                        <div class="c-article_thumb" :class="item.thumbnail ? '' : 'no-image'">
                            <v-img
                                v-if="item.thumbnail"
                                :src="item.thumbnail"
                                height="246"
                            />
                        </div>
                        <v-card-title
                            v-text="item.title"
                            class="pb-0 c-article_title"
                        />
                        <v-card-actions>
                            <span class="c-btn c-btn_sub c-btn_sm c-btn_disable mr-3">
                                お知らせ
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
    </section>
</template>

<script>
export default {
    props: {
        topics: {
            type: Array,
            required: false,
            default: () => []
        }
    }
};
</script>

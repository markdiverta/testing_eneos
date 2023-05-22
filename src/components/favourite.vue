<template>
        <!--
        <section class="c-table">
        <div class="container">
            <div class="row c-table_title c-table_row">
                <div class="col-2 c-table_col">
                    Date
                </div>
                <div class="col-4 c-table_col">
                    Category
                </div>
                <div class="col c-table_col">
                    Title
                </div>
            </div>
            <div v-if="topics.length > 0" class="row">
                <div class="col">
                    <div v-for="item in topics" :key="item.id" class="row c-table_row">
                        <div class="col-sm-2 col-auto c-table_col">
                            {{ item.date }}
                        </div>
                        <div class="col-sm-4 col c-table_col">
                            {{ item.label }}
                        </div>
                        <div class="col-sm col-12 c-table_col">
                            <div v-if="item.icon == 'pdf'">
                                <a :href="item.fileurl">{{ item.link }}</a>
                                <v-icon>mdi-pdf-box</v-icon>
                            </div>
                            <div v-else-if="item.icon == 'excel'">
                                <a :href="item.fileurl">{{ item.link }}</a>
                                <v-icon>mdi-file-excel</v-icon>
                            </div>
                            <div v-else-if="item.icon == 'word'">
                                <a :href="item.fileurl">{{ item.link }}</a>
                                <v-icon>mdi-file-word</v-icon>
                            </div>
                            <div v-else-if="item.icon == 'url'">
                                <a :href="item.linkurl">{{ item.link }}</a>
                                <v-icon>mdi-launch</v-icon>
                            </div>
                            <div v-else>
                                <NuxtLink :to="{ path: '/topics_detail/' + item.id }" no-prefetch>
                                    {{
                                        item.link
                                    }}
                                </NuxtLink>
                            </div>
                        </div>
                        <v-col v-if="item.edit == true" class="py-2">
                            <v-btn
                                class="mx-3 c-icon_main c-icon_sm"
                                fab
                                dark
                                small
                                @click="edit_topic(item.id)"
                            >
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div class="text-center py-4 grey--text col">
                    No data available
                </div>
            </div>
        </div>
        </section>
        -->

        <v-app>
        <v-card>
            <v-list two-line>
                <v-list-item-group
                multiple
                >
                <template v-for="(item, index) in topics">
                    <v-list-item :key="item.id" @click="onClick()">
                    <template v-slot:default="{ active }">
                        <v-list-item-content>
                            
                            <v-row>
                                <v-col cols="auto">
                                    <span class="c-btn c-btn_dark c-btn_xs c-btn_disable">
                                        {{ item.label }}
                                    </span>
                                </v-col>
                                <v-col class="pl-2">
                                    <v-list-item-subtitle v-text="item.date" class="pt-1"></v-list-item-subtitle>
                                </v-col>
                            </v-row>
                            <v-list-item-title v-text="item.link" class="c-heading_h3"></v-list-item-title>
                        
                        </v-list-item-content>
        
                        <v-list-item-action>
                        <v-icon
                            v-if="!active"
                            color="grey lighten-1"
                        >
                            mdi-star-outline
                        </v-icon>
        
                        <v-icon
                            v-else
                            color="yellow darken-3"
                        >
                            mdi-star
                        </v-icon>
                        </v-list-item-action>
                    </template>
                    </v-list-item>
        
                    <v-divider
                    v-if="index < topics.length - 1"
                    :key="index"
                    ></v-divider>
                </template>
                </v-list-item-group>
            </v-list>
        </v-card>
        </v-app>

</template>

<script>
export default {
    methods: {
        edit_topic(topicId) {
            this.$router.push('/profile/topic_edit/' + topicId);
        },
        onClick() {
            const self = this;
            if (this.color === 'gray') {
                this.$store.$auth.ctx.$axios
                    .post('/rcms-api/1/favorites', {
                        module_type: 'topics',
                        module_id: parseInt(this.topic_id)
                    })
                    .then(function (response) {
                        self.color = 'red';
                    })
                    .catch(function () {});
            } else {
                this.$store.$auth.ctx.$axios
                    .post('/rcms-api/1/favorites/delete', {
                        module_type: 'topics',
                        module_id: parseInt(this.topic_id)
                    })
                    .then(function (response) {
                        self.color = 'gray';
                    })
                    .catch(function (error) {
                        self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                        self.$store.dispatch('snackbar/snackOn');
                    });
            }
        }
    },
    props: {
        topics: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    mounted() {
        const favoritesUrl =
        '/rcms-api/1/favorites?member_id=' +
        this.$auth.user.member_id +
        '&module_type=topics&module_id=' +
        this.topic_id;
        this.$store.$auth.ctx.$axios
        .get(favoritesUrl)
        .then(function (response) {
            if (response.data.pageInfo.totalCnt > 0) {
                self.color = 'red';
            } else {
                self.color = 'gray';
            }
        })
        .catch(function (error) {
            self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
            self.$store.dispatch('snackbar/snackOn');
            self.color = 'gray';
        });
        console.log(favoritesUrl)
    }
};
</script>

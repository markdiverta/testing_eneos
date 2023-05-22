<template>

    <v-container v-if="pattern == 'no image' && text" fluid>
        <v-card class="mx-auto" max-width="7000" flat>
            <v-card-title v-if="subtitle" class="c-heading_h2" v-text="subtitle" />
            <v-card-text v-if="text">
                <div class="text--primary p-article_wysiwyg" v-html="text">
                </div>
            </v-card-text>
        </v-card>
    </v-container>

    <v-container v-else-if="pattern == 'top'" fluid>
        <v-card class="mx-auto" max-width="7000" flat>
            <v-card-title v-if="subtitle" class="c-heading_h2" v-text="subtitle" />
            <!--
            <v-img
                class="mx-auto"
                :src="image_url"
                max-width="600"
                max-height="800"
                position="center"
                :aspect-ratio="1"
                contain
            />
            -->
            <v-img
                class="mx-auto"
                v-if="image_url"
                :src="image_url"
                max-width="600"
                max-height="800"
                position="center"
            />
            <!--
            <div class="text-center">
                <img v-if="image_url" :src="image_url" style="max-width: 100%; max-height:800px">
            </div>-->
            <div v-if="image_caption" class="p-article_img-caption-wrap">
                <small class="p-article_img-caption">{{image_caption}}</small>
            </div>
            <v-card-text v-if="text">
                <div class="text--primary p-article_wysiwyg" v-html="text">
                </div>
            </v-card-text>
        </v-card>
    </v-container>

    <v-container v-else-if="pattern == 'bottom'" fluid>
        <v-card class="mx-auto" max-width="7000" flat>
            <v-card-title v-if="subtitle" class="c-heading_h2" v-text="subtitle" />
            <v-card-text>
                <div v-if="text" class="text--primary pb-5 p-article_wysiwyg" v-html="text">
                </div>
                <v-img
                    class="mx-auto"
                    v-if="image_url"
                    :src="image_url"
                    max-width="600"
                    max-height="800"
                    position="center"
                />
                <div v-if="image_caption" class="p-article_img-caption-wrap">
                    <small class="p-article_img-caption">{{image_caption}}</small>
                </div>
            </v-card-text>
        </v-card>
    </v-container>

    <v-container v-else-if="pattern == 'left'" fluid>
        <v-card class="mx-auto" max-width="7000" flat>
            <v-card-title v-if="subtitle" class="c-heading_h2" v-text="subtitle" />
            <v-card-text>
                <v-row>
                    <v-col>
                        <!--
                        <v-img
                            fluid
                            class="mr-auto img-responsive"
                            :aspect-ration="16 / 9"
                            :src="image_url"
                            max-height="900"
                            max-width="500"
                        />
                        <img v-if="image_url" :src="image_url" style="max-width: 100%; max-height:900px">
                         -->
                         <v-img
                            fluid
                            class="mr-auto img-responsive"
                            v-if="image_url"
                            :src="image_url"
                            max-width="500"
                            max-height="900"
                        />
                        <small v-if="image_caption" class="p-article_img-caption">{{image_caption}}</small>
                    </v-col>
                    <v-col>
                        <div class="text--primary p-article_wysiwyg" v-html="text">
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>

    <v-container v-else-if="pattern == 'right'" fluid>
        <v-card class="mx-auto" max-width="7000" flat>
            <v-card-title v-if="subtitle" class="c-heading_h2" v-text="subtitle" />
            <v-container key="start">
                <v-row>
                    <v-col>
                        <div class="text--primary p-article_wysiwyg" v-html="text">
                        </div>
                    </v-col>
                    <v-col>
                        <!--
                        <v-img
                            fluid
                            class="ml-auto img-responsive"
                            :aspect-ration="16 / 9"
                            :src="image_url"
                            max-height="900"
                            max-width="500"
                        />
                        <img v-if="image_url" :src="image_url" style="max-width: 100%; max-height:900px">
                        -->
                        <v-img
                            fluid
                            class="ml-auto img-responsive"
                            v-if="image_url"
                            :src="image_url"
                            max-width="500"
                            max-height="900"
                        />
                        <small v-if="image_caption" class="p-article_img-caption">{{image_caption}}</small>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>

</template>

<script>
export default {
    props: {
        subtitle: {
            type: String,
            required: false,
            default: ''
        },
        image_url: {
            type: String,
            required: false,
            default: ''
        },
        image_caption: {
            type: String,
            required: false,
            default: ''
        },
        pattern: {
            type: String,
            required: false,
            default: null
        },
        text: {
            type: String,
            required: false,
            default: ''
        },
    }
};
</script>

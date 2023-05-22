<template>
    <section>
        <div class="container">
            <div
                v-if="mediaList.length > 0"
                class="row justify-content-around"
            >
                <v-col
                    class="col-md-4 col-sm-6 col-12" v-for="(media, index) in mediaList"
                    :key="index"
                >
                    <v-card
                        class="card"
                    >
                        <a
                            :href="media.logo.linkPath"
                            target="_blank"
                            class="card_thumbnail"
                            :class="media.logo.imgSrc ? '' : 'no-image'"
                        >
                            <v-img
                                :src="media.logo.imgSrc"
                                class="card_thumbnail_img"
                                height="246"
                            />
                            <v-icon class="card_thumbnail_icon">mdi-launch</v-icon>
                        </a>
                        <div class="card_textWrap">
                            <div v-html="media.content.title" class="card_textWrap_title" />
                            <template v-if="media.content.links.length >= 1">
                                <ul class="card_links">
                                    <li
                                        v-for="(item, index) in media.content.links"
                                        :key="index"
                                        class="card_links_item"
                                    >
                                        <p class="-label">■{{ item.label }}</p>
                                        <a :href="item.path" target="_blank" class="-link">{{ item.path }}</a>
                                    </li>
                                </ul>
                            </template>
                        </div>
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
        mediaList: {
            type: Array,
            required: false,
            default: () => []
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    padding: 8px 8px 16px 8px;
    height: 100%;
    transition: all 0.5s;
    &:hover {
        text-decoration: none;
        transform: scale(0.99);
    }
    &_thumbnail {
        display: block;
        position: relative;
        transition: all 0.3s;
        &:hover {
            opacity: 0.7;
            text-decoration: none;
            transform: scale(0.99);
            .card_thumbnail_icon {
                color: rgba($color: #222, $alpha: 0.6);
            }
        }
        &_img {
            border-radius: 4px;
            object-fit: cover;
        }
        &_icon {
            position: absolute;
            right: 8px;
            bottom: 8px;
            z-index: 10;
            color: #222;
        }
    }
    &_textWrap {
        padding: 24px 8px 0;
        &_title {
            padding-bottom: 16px;
            font-size: 1.25rem;
            font-weight: 500;
            letter-spacing: 0.0125em;
            line-height: 2rem;
            word-break: break-all;
        }
    }
    &_links {
        padding-left: 0;
        list-style-type: none;
        &_item {
            & + & {
                margin-top: 16px;
            }
            .-label {
                margin-bottom: 0;
                letter-spacing: 0.08em;
            }
            .-link {
                color: #1558d6;
                word-break: break-all;
                text-decoration: underline;
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
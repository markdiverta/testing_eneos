<template>
    <section class="l-content_maxWidth-lg l-content_padding -xs l-container">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{pageName}}</span>
        </div>

        <h1 class="p-heading">{{pageName}}</h1>
        
        <div class="row c-block">
            <div class="col-sm-4 col-6">
                <div class="c-block_item --withButton">
                    <div class="c-block_thumb">
                        <img src="https://mtown.g.kuroco-img.app/files/user/klgourmesian-logo-alt-768x80.png" alt="klgourmesian-logo">
                    </div>
                    <h2 class="heading">グルメシアン Gourmesian</h2>
                    <p>マレーシアに住んでいる方/訪れている方のためのレストラン情報サイト「Gourmesian」はマレーシア国内にあるレストラン情報を多数掲載中！ 料理のジャンルや予算、エリア、クーポンのあるお店などの条件から、用途に合わせてベストなお店を検索できます！</p>
                    <a class="c-block_link c-btn c-btn_main" href="https://gourmesian.com/" target="_blank">サイトを見る</a>
                </div>
            </div>
            <div class="col-sm-4 col-6">
                <div class="c-block_item --withButton">
                    <div class="c-block_thumb">
                        <img src="https://mtown.g.kuroco-img.app/files/user/logo2.png">
                    </div>
                    <h2 class="heading">マレーシア生活情報サイト MTownlife.my</h2>
                    <p>マレーシアの基礎情報をはじめ、現地への渡航情報や交通情報、就職、ショッピング、グルメ、医療・美容情報などマレーシアで暮らすための生活情報が満載！</p>
                    <a class="c-block_link c-btn c-btn_main" href="https://malaysialife.mtown.my/" target="_blank">サイトを見る</a>
                </div>
            </div>
            <div class="col-sm-4 col-6">
                <div class="c-block_item --withButton">
                    <div class="c-block_thumb">
                        <img src="https://mtown.g.kuroco-img.app/files/user/logo1-1.png">
                    </div>
                    <h2 class="heading">マレーシア ビジネス交流サイト『CONNECTION』｜ビジネス情報源</h2>
                    <p>マレーシア進出日系企業のビジネス　コネクション作りをサポート！マレーシア進出の事前リサーチ、会社設立、人材採用、人事労務、ITサービス導入、事業拡大など各フェーズで有益な情報・知識を発信いたします。</p>
                    <a class="c-block_link c-btn c-btn_main" href="https://connection.com.my/" target="_blank">サイトを見る</a>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    auth: false,
    head() {
        return {
        title: '関連メディア',
        // meta: [
        //     { hid: 'description', name: 'description', content: 'My page description 1111' },
        //     { hid: 'og:title', property: 'og:title', content: 'My Page Title 111' },
        //     { hid: 'og:description', property: 'og:description', content: 'My page description 11111' },
        //     { hid: 'og:image', property: 'og:image', content: 'https://example.com/image.jpg' },
        //     { hid: 'og:url', property: 'og:url', content: 'https://example.com/my-page' }
        // ]
        }
    },
    data() {
        return {
            text: '0',
            group_id: 8,
            categories: [],
            topics: [],
            page: 1,
            perPage: 20,
            category_key: null,
            pageName: '関連メディア',
            paginationMax: 15,
            paginationMin: 8,
        };
    },
    computed: {
        totalVisible() {
            return this.$vuetify.breakpoint.smAndDown ? this.paginationMin : this.paginationMax;
        },
    },
    methods: {
        goTo(url){
            this.$router.push({ path: url})
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

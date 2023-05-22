<template>

    <section class="l-content_maxWidth-md l-content_padding -xs l-container">

        <div class="l-breadcum">
            <!--<a href="/"><i aria-hidden="true" class="icon home item mdi mdi-home"></i></a>-->
            <!-- <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i> -->
            <a href="/" class="item">ホーム</a>
            <i aria-hidden="true" class="icon item arrow mdi mdi-chevron-right"></i>
            <span class="item">{{ pageName }}</span>
        </div>

        <h1 class="p-heading">{{pageName}}</h1>

        <section class="l-content_maxWidth-xs pt-5">

            <template v-if="invitationSent">
                <div class="text-center mt-10">
                    <h2>Thanks for your subscribe to our newsletter.</h2>
                </div>
            </template> 
            <template v-else>

                <p class="c-heading_h3">週刊Mtownでは最新のニュースやお得なクーポン情報を<br>
                メールマガジンでもお届けしています。<br>
                ご希望の方は下記フォームよりご登録下さいませ。<br>
                皆様のご登録、心よりお待ちしております。</p>

                <v-form 
                    ref="form1"
                    lazy-validation
                    class="c-form mt-8"
                    @submit.prevent="submitRegister"
                >
                    <div class="form-group required field-vuetifyText">
                        <label class="pb-1"><span>お名前</span></label>
                        <v-text-field
                            v-model="name1"
                            label=""
                            type="text"
                            :rules="[rules.required]"
                            outlined
                            dense
                        />
                        <p class="c-form_notes">全角文字で入力してください。</p>
                    </div>
                    <div class="form-group required field-vuetifyText">
                        <label class="pb-1"><span>メールアドレス</span></label>
                        <v-text-field
                            v-model="email"
                            label=""
                            type="email"
                            :rules="[rules.email]"
                            outlined
                            dense
                        />
                    </div>
                    <div class="form-group required field-vuetifyText">
                        <label class="pb-1"><span>お電話番号</span></label>
                        <v-text-field
                            v-model="tel"
                            label=""
                            type="text"
                            :rules="[rules.required]"
                            outlined
                            dense
                        />
                        <p class="c-form_notes">数字とハイフンのみ（すべて半角）で入力してください。</p>
                    </div>
                    <div class="form-group required field-vuetifyText">
                        <label class="pb-1"><span>住所</span></label>
                        <v-text-field
                            v-model="address1"
                            label=""
                            type="text"
                            :rules="[rules.required]"
                            outlined
                            dense
                        />
                    </div>
                    <div class="text-center">
                    <button
                        type="submit"
                        :loading="loading"
                        class="c-btn c-btn_main c-btn_lg mt-5"
                    >
                        次へ
                    </button>
                    </div>
                </v-form>
            </template>

        </section>

    </section>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            loading: false,
            invitationSent: false,
            pageName: '週刊Mtownメールマガジン配信中！',
            email: '',
            name1: '',
            tel: '',
            address1: '',
            userID: '',
            rules: {
                required: (value) => !!value || 'This field is required',
                email: (v) => /.+@.+/.test(v) || 'Invalid email, please key in a valid email',
            }
        };
    },
    computed: {
        user() {
            return this.$auth.user;
        },
        auth() {
            return this.$store.$auth;
        }
    },
    methods: {
        refresh() {
            window.location.reload();
        },
        submitRegister() {
            this.loading1 = true;
            const self = this;

            this.$store.$auth.ctx.$axios
            .post('/rcms-api/1/member/register', {
                email: this.email,
                name1: this.name1,
                tel: this.tel,
                address1: this.address1,
            })
            .then(function (response) {
                if (response.data.errors.length === 0) {
                    self.invitationSent = true;
                    self.userID = response.data.id; //Record new user ID
                    self.subscribeNewsletter();     //Submit user ID for newsletter subcription
                };
                self.loading = false;
            })
            .catch(function (error) {
                var errorMsg;
                var errorInfo = error.response.data.errors?.[0];
                if (errorInfo.code === 'unprocessable_entity' && errorInfo.field === "email") {
                    errorMsg = 'ユーザーのメールアドレスはすでに登録されています。'
                } else {
                    errorMsg = error.response.data.errors?.[0].message
                };
                self.$store.dispatch('snackbar/setError', errorMsg);
                self.$store.dispatch('snackbar/snackOn');
                self.loading = false;
            });
        },
        subscribeNewsletter() {
            this.loading1 = true;
            const self = this;
            this.$store.$auth.ctx.$axios
            .post('/rcms-api/1/notification/subscribe/1', {
                member_id: self.userID,
            })
            .then(function (response) {
                if (response.data.errors.length === 0) {
                    self.$store.dispatch(
                        'snackbar/setMessage',
                        'Successful register and subcribe to newsletter'
                    );
                    self.$store.dispatch('snackbar/snackOn');
                    self.invitationSent = true;
                }
                self.loading = false;
            })
            .catch(function (error) {
                var errorMsg;
                var errorInfo = error.response.data.errors?.[0];
                if (errorInfo.code === 'unprocessable_entity' && errorInfo.field === "email") {
                    errorMsg = 'ユーザーのメールアドレスはすでに登録されています。'
                } else {
                    errorMsg = error.response.data.errors?.[0].message
                };
                self.$store.dispatch('snackbar/setError', errorMsg);
                self.$store.dispatch('snackbar/snackOn');
                self.loading = false;
            });
        }
    }
};
</script>

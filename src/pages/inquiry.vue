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

        <section class="l-content_maxWidth-xs">
            <!-- <div class="row pb-4">
                <div class="col-md col-12">
                    <a class="c-btn c-btn_md c-btn_main py-6 mb-2 c-btn_fullWidth" href="/community/notice/">お知らせ等の掲載申込</a> 
                    クラシファイドお知らせ欄へ掲載のお申し込みは
                    <a href="/community/notice/">こちら</a>
                </div>
                <div class="col-md col-12">
                    <a class="c-btn c-btn_md c-btn_main py-6 mb-2 c-btn_fullWidth" href="/community/member/">メンバー募集-掲載申込</a> 
                    サークルのメンバー募集などを掲載希望の方は
                    <a href="/community/member/">こちら</a>から
                </div>
                <div class="col-md col-12">
                    <a class="c-btn c-btn_md c-btn_main py-6 mb-2 c-btn_fullWidth" href="/community/socialmeeting/">懇親会写真-掲載申込</a> 
                    懇親会やコンペの開催報告などの記事掲載をご希望の方は
                    <a href="/community/socialmeeting/">こちら</a>から
                </div>
            </div> -->

            <div v-if="isSent==false">
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    top
                    color="orange white-4"
                />
                <div class="c-form_border mt-4">
                    <vue-form-generator
                        ref="form"
                        :schema="schema"
                        :model="model"
                        :class="!validForm ? 'after-submit' : ''"
                        class="c-form"
                        @model-updated="onInput"
                    />
                    <div class="text-center mb-5">
                        <button
                            type="submit"
                            class="c-btn c-btn_grey c-btn_lg"
                            @click="submitF()"
                        >
                            送信
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="my-5 pt-6 text-center">
                    <!-- <h2 v-html="form_thanks_msg" /> -->
                    <h2>あなたのメッセージは送信されました。ありがとうございました。</h2>
                </div>
            </div>
        </section>

    </section>
        
</template>

<script>
import '../assets/form.css';
import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import KurocoParser from '../plugins/parser.js';
import fieldUploadFile from '../components/vuetify_file_upload.vue';
import fieldVuetifyText from '../components/vuetify_text.vue';
import fieldVuetifyTextArea from '../components/vuetify_textarea.vue';
import fieldVuetifyDate from '../components/vuetify_date.vue';
import fieldVuetifyJson from '../components/vuetify_json.vue';
import fieldVuetifyPrefecture from '../components/vuetify_prefecture.vue';
import fieldVuetifyMultipleChoice from '../components/vuetify_multiple_choice.vue';
import fieldVuetifySingleChoice from '../components/vuetify_single_choice.vue';
import fieldVuetifySingleOption from '../components/vuetify_single_option.vue';

Vue.component('fieldUploadFile', fieldUploadFile);
Vue.component('fieldVuetifyDate', fieldVuetifyDate);
Vue.component('fieldVuetifyText', fieldVuetifyText);
Vue.component('fieldVuetifyTextArea', fieldVuetifyTextArea);
Vue.component('fieldVuetifyJson', fieldVuetifyJson);
Vue.component('fieldVuetifyPrefecture', fieldVuetifyPrefecture);
Vue.component('fieldVuetifySingleOption', fieldVuetifySingleOption);
Vue.component('fieldVuetifySingleChoice', fieldVuetifySingleChoice);
Vue.component('fieldVuetifyMultipleChoice', fieldVuetifyMultipleChoice);

Vue.use(VueFormGenerator);
Vue.use(KurocoParser);

export default {
    auth: false,
    data() {
        return {
            inquirySubmitUrl: '/rcms-api/1/inquiry/submit',
            inquirySchemaUrl: '/rcms-api/1/inquiry/1',
            form_id: '1',
            form_heading: '',
            form_description: '',
            form_thanks_msg: '',
            disabled: false,
            validForm: true,
            loading: true,
            isSent: false,
            model: {},
            schema: {},
            pageName: 'お問い合わせ'
        };
    },
    components: {
        'vue-form-generator': VueFormGenerator.component
    },
    mounted() {
        this.getSchema();
        this.getModel();
    },
    methods: {
        getModel() {
            const self = this;
            this.$store.$auth.ctx.$axios
                .get(this.inquirySchemaUrl)
                .then(function (response) {
                    const model = {};
                    const columns = response.data.details.cols;
                    for (const key in columns) {
                        if (columns.hasOwnProperty(key)) {
                            if (columns[key].hasOwnProperty('msg')) {
                                model[key] = columns[key].msg;
                            }
                        }
                    }
                    self.model = model;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                });
        },
        getSchema() {
            const self = this;
            this.loading = true;
            this.$store.$auth.ctx.$axios
                .get(this.inquirySchemaUrl)
                .then(function (response) {
                    const schema = {};
                    schema.fields = [];
                    const columns = response.data.details.cols;
                    for (const key in columns) {
                        let result = {};
                        if (columns.hasOwnProperty(key)) {
                            result = self.$parse(columns[key], key);
                            if (columns[key].msg) {
                                result.hint = columns[key].msg;
                            };
                            if (
                                typeof result !== 'undefined' &&
                Object.keys(result).length !== 0 && columns[key].required > 0
                            ) {
                                schema.fields.push(result);
                            }
                        }
                    }
                    self.form_heading = response.data.details.inquiry_name;
                    self.form_description = response.data.details.inquiry_info;
                    self.form_thanks_msg = response.data.details.thanks_text;
                    self.schema = schema;
                    self.loading = false;
                })
                .catch(function (error) {
                    self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                    self.$store.dispatch('snackbar/snackOn');
                    self.loading = false;
                });
        },
        onInput (value, fieldName) {
            this.$set(this.model, fieldName, value);
        },
        submitF () {
            const self = this;
            this.validForm = true;
            var checked;
            var emptyField = false;
            // console.log(self.$children[1].$children[0].model)
            for (const key in self.$children[1].$children) {
                self.$children[1].$children[key].$children[0].$refs.myForm.validate();
                if (self.$children[1].$children[key].$children[0].formValid === false) {
                    this.validForm = false;
                }
                if (!self.$children[1].$children[key].field.text && !checked && self.$children[1].$children[key].field.inputType != 'password') {
                     emptyField = true;
                     checked = true;
                }
            };
            if (this.validForm) {
                const sendModel = JSON.parse(JSON.stringify(self.model));
                sendModel.id = this.form_id;
                self.$store.$auth.ctx.$axios
                    .post(this.inquirySubmitUrl, sendModel)
                    .then(function (response) {
                        if (response.data.errors.length === 0) {
                            self.isSent = true;
                            /*
                            self.$store.dispatch(
                                'snackbar/setMessage',
                                'Thanks! Your inquiry submitted.'
                            );
                            self.$store.dispatch('snackbar/snackOn');
                            // self.$router.push("/");
                            */
                        }
                    })
                    .catch(function (error) {
                        self.$store.dispatch('snackbar/setError', error.response.data.errors?.[0].message);
                        self.$store.dispatch('snackbar/snackOn');
                    });
            } else {
                if (emptyField) {
                    self.$store.dispatch('snackbar/setError', 'Please fill in all required fields');   
                } else {
                    self.$store.dispatch('snackbar/setError', 'Please check all details are filled in correctly');
                };
                self.$store.dispatch('snackbar/snackOn');
            }
        }
    },
    title() {
        return 'Inquiry';
    }
};
</script>

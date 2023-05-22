<template>
    <v-form ref="myForm" v-model="formValid" :class="schema.hint ? 'c-form_text-with-hint' : ''">
        <v-text-field
            ref="schema.model"
            v-model="schema.text"
            outlined
            dense
            :readonly="schema.readonly"
            :disabled="schema.disabled"
            :rules="[
                (v) =>
                    schema.required == false ||
                    (schema.required == true && !!v) ||
                    '',//'入力必須'
                (v) =>
                    v.length >= schema.min || 'minimum ' + schema.min + ' characters',
                (v) =>
                    v.length <= schema.max || 'maximum ' + schema.max + ' characters',
                (v) => isValid(schema, v),
            ]"
            :placeholder="schema.msg"
            
            :class="schema.hint ? 'c-form_text-with-hint_inner' : ''"
            @change="check($event)"
        >
        <template v-slot:append-outer v-if="schema.hint">
            <div class="c-form_text-hint">
                {{schema.hint}}
            </div>
        </template>
        </v-text-field>
    </v-form>
</template>

<script>
import { abstractField } from 'vue-form-generator';
import validator from 'validator';
export default {
    mixins: [abstractField],
    data () {
        return {
            formValid: true
        };
    },
    methods: {
        isValid (schema, value) {
            if (schema.texttype === 'email') {
                if (!validator.isEmail(value)) {
                    return 'メールアドレスのフォーマットが正しくありません\n\n＜登録できないアドレス例＞\n・特殊記号が含まれている\n・ピリオド「.」が連続している（c..cc@xxxxx.ne.jp）\n・ピリオド「.」が最初にある（.bbb@xxxxx.ne.jp）\n・ピリオド「.」が@の直前にある（aaa.@xxxxx.ne.jp）';
                }
            } else if (schema.texttype === 'tel') {
                if (!validator.isMobilePhone(value)) {
                    return '電話番号は半角英数字、ハイフン無しでご入力ください';
                }
            } else if (schema.texttype === 'zip') {
                if (value.length !== 7) {
                    return 'Wrong zip format for Japan. Example 0212141';
                }
            } else if (schema.texttype === 'number') {
                if (!validator.isNumeric(value)) {
                    return 'Wrong numeric format.';
                }
            } else if (schema.texttype === 'url') {
                if (!validator.isURL(value)) {
                    return 'Wrong url format.';
                }
            } else if (schema.texttype === 'regex') {
                const regex = new RegExp(schema.regex);
                if (!regex.test(value)) {
                    return 'Wrong regex format. ' + regex;
                }
            }
            return true;
        },
        check (e) {
            this.formValid = this.$refs.myForm.validate();
            if (this.formValid) {
                this.$emit('model-updated', this.schema.text, this.schema.model);
            }
        }
    },
    mounted() {
    // this.formValid = this.$refs.myForm.validate()
    }
};
</script>
<template>
    <div class="v-input">
        <div class="v-input__label" v-if="label">
            <label @click="$refs.input.focus()" :tooltip="tooltipText" :position="tooltipPosition">
                {{ label }} <span v-if="required"> * </span>
            </label>
        </div>
        <div class="v-input__input" :class="inputClass" :tooltip="`${isShowErrorMessage && error ?  errorMess : ''}`"
            :position="tooltipPosition">
            <input ref="input" v-if="type === 'checkbox' || type === 'radio'" :type="type"
                :class="[className, {'error' : error}]" :id="id" :value="value" :disabled="disabled" :style="style"
                v-model="tempValue" :tabindex="(type === 'radio') ? (modelValue == value ? 0 : -1) : 0" />
            <input v-else ref="input" :type="type" :placeholder="placeholder"
                :class="[className, {'error' : error}, {'v-input__outline' : outline}]" :id="id" :disabled="disabled"
                :style="style" v-model.trim="tempValue" :data-error="`${isShowErrorMessage && error ?  errorMess : ''}`"
                @focus="isShowErrorMessage=false" @blur="validateCheck ? validate() : ''" />
            <label class="v-input__checkbox" v-if="type === 'checkbox'" @click="$refs.input.click()">
                <label class="label_custom" v-if="label_custom">{{label_custom}}</label>
            </label>
            <label class="v-input__radio" v-if="type === 'radio'" @click="$refs.input.click()">
                <label class="label_custom">{{ label_custom}}</label>
            </label>
            <div class="v-input__icon" v-if="icon">
                <div :class="icon"></div>
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Validate from '@/utils/validate';
export default {
    name: "VInput",
    props: {
        label: {
            type: String,
            default: "",
        },
        label_custom: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        className: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        id: {
            type: String,
            required: false,
            default: null,
        },
        name: {
            type: String,
            required: false,
            default: null,
        },
        modelValue: {
            required: false,
            default: null,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        styleProps: {
            type: Array,
            required: false,
            default: () => [],
        },
        outline: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        value: {
            required: false,
        },
        focus: {
            type: Boolean,
            required: false,
            default: false,
        },
        inputClass: {
            type: String,
            required: false,
        },
        tabIndex: {
            type: Number,
            required: false,
        },
        errorLabel: {
            type: String,
            required: false,
        },
        isEmail: {
            type: Boolean,
            required: false,
            default: false,
        },
        isPhoneNumber: {
            type: Boolean,
            required: false,
            default: false,
        },
        isNumber: {
            type: Boolean,
            required: false,
            default: false,
        },
        minLength: {
            type: Number,
            required: false,
            default: 0,
        },
        maxLength: {
            type: Number,
            required: false,
            default: 0,
        },
        validateCheck: {
            type: Boolean,
            required: false,
            default: false,
        },
        isSubmit: {
            type: Boolean,
            required: false,
            default: false,
        },
        tooltipText: {
            type: String,
            required: false,
        },
        tooltipPosition: {
            type: String,
            required: false,
            default: "bottom",
        },
    },
    data() {
        return {
            error: false, // có hiển thị lỗi hay không
            errorMess: "", // nội dung lỗi
            isShowErrorMessage: false, // trạng thái hiển thị lỗi
        };
    },
    watch: {
        /**
         * @description: Nếu form submit thì kiểm tra validate
         * Author: AnhDV 08/10/2022
         */
        isSubmit: {
            handler(newVal) {
                if (newVal) {
                    this.validate();
                }
            },
            deep: true,
        },
    },
    computed: {
        /**
         * @description: Tạo style cho input
         * Author: AnhDV 14/09/2022
         */
        style() {
            let styleProps = {};
            if (this.styleProps.length > 0) {
                this.styleProps.forEach((item) => {
                    const key = item.split(":")[0];
                    const value = item.split(":")[1];
                    styleProps[key] = value;
                });
                return styleProps;
            } else {
                return {};
            }
        },

        /**
        * @description: Reactivity cho input v-model 
        * Author: AnhDV 14/09/2022
        */
        tempValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
                if (this.validateCheck) { // nếu validateCheck = true thì validate
                    this.errorMess = "";
                    this.$nextTick(() => { // sau khi set giá trị thì kiểm tra validate
                        this.validate();
                    });
                }
            },
        },
    },
    methods: {
        /**
        * @description: Hàm này dùng để bắt sự kiện blur của input nếu input rỗng thì sẽ hiển thị lỗi
        * @param: {any} 
        * Author: AnhDV 27/09/2022
        */
        validate() {
            const self = this;
            let errorLabel = self.errorLabel;
            let value = self.modelValue;
            if ((!self.required && Validate.isNullOrEmpty(value)) || self.required) {
                if (!Validate.isNullOrEmpty(value)) {
                    self.errorMess = this.$t("validate_error.required", [errorLabel]);
                }
                if (self.isEmail && !Validate.isEmail(value)) {
                    self.errorMess = this.$t("validate_error.invalid", [errorLabel])
                }
                if (self.isPhoneNumber && !Validate.isPhoneNumber(value)) {
                    self.errorMess = this.$t("validate_error.invalid_number", [errorLabel])
                }
                if (self.isNumber && !Validate.isNumber(value)) {
                    self.errorMess = this.$t("validate_error.invalid_number", [errorLabel]);
                }
                if (self.maxLength > 0 && !Validate.isLength(value, 0, self.maxLength)) {
                    self.errorMess = this.$t("validate_error.max_length", [errorLabel, self.maxLength]);
                }
                if (self.minLength > 0 && !Validate.isLength(value, self.minLength)) {
                    self.errorMess = this.$t("validate_error.min_length", [errorLabel, self.minLength]);
                }
            }
            if (self.errorMess) {
                this.isShowErrorMessage = true;
                this.error = true;
            } else {
                this.isShowErrorMessage = false;
                this.error = false;
            }
        },
    },
    created() {
        // nếu props focus là true thì đợi dom render xong sau đó focus vào 
        if (this.focus) {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }
    },
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/base/input.scss";
</style>

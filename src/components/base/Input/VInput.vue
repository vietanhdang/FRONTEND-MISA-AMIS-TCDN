<template>
    <div class="v-input" tabindex="-1" :class="className">
        <!-- Label for input -->
        <div class="v-input__label" v-if="label">
            <v-tooltip :content="tooltipText" :position="tooltipPosition">
                <label @click="handleInputFocus">
                    <!-- :tooltip="tooltipText" :position="tooltipPosition" -->
                    {{ label }} <span v-if="required"> * </span>
                </label>
            </v-tooltip>

        </div>
        <div class="v-input__input" :class="inputClass" :tooltip="`${isShowErrorMessage && error ? errorMess : ''}`"
            :error="error">
            <!-- Base for radio and checkbox -->
            <input ref="input" v-if="type === 'checkbox' || type === 'radio'" :type="type" :class="[{ error: error }]"
                :id="id" :value="value" :disabled="disabled" :style="style" v-model="tempValue"
                :tabindex="type === 'radio' ? (modelValue == value ? 0 : -1) : tabIndex" />
            <!-- Base for text area -->
            <textarea ref="input" v-else-if="type === 'textarea'" :class="[{ error: error }]" :id="id"
                :disabled="disabled" :style="style" v-model.trim="tempValue" :tabindex="tabIndex" :rows="rows"
                :placeholder="placeholder" autocomplete="off" spellcheck="false" @focus="handleInputFocus"
                @click="hideErrorMessage" @mouseover="showErrorMessage" @keypress="filterInput($event)"
                @mouseleave="hideErrorMessage" @focusout="handleInputFocusOut"></textarea>
            <!-- Base for input type is text -->
            <input v-else ref="input" :placeholder="placeholder"
                :class="[{ error: error }, { 'v-input__outline': outline }]" :id="id" :disabled="disabled"
                v-model.trim="tempValue" :tabindex="tabIndex" autocomplete="off" spellcheck="false"
                @focus="handleInputFocus" :style="[style, { textAlign: type === 'number' ? 'right' : 'left' }]"
                @focusout="handleInputFocusOut" @click="hideErrorMessage" @mouseover="showErrorMessage"
                @keypress="filterInput($event)" @mouseleave="hideErrorMessage" />
            <!-- Label custom for checkbox -->
            <label class="v-input__checkbox" v-if="type === 'checkbox'" @click="$refs.input.click()">
                <label class="label_custom" v-if="label_custom">{{ label_custom }}</label>
            </label>
            <!-- Label custome for radio -->
            <label class="v-input__radio" v-if="type === 'radio'" @click="$refs.input.click()">
                <label class="label_custom">{{ label_custom }}</label>
            </label>
            <!-- Icon for input -->
            <div class="v-input__icon" v-if="icon">
                <div :class="icon"></div>
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Validate from "@/utils/validate";

export default {
    name: "VInput",
    props: {
        label: {
            // Label for input
            type: String,
            default: "",
        },
        label_custom: {
            // Label custom for checkbox and radio
            type: String,
            default: "",
        },
        placeholder: {
            // Placeholder for input
            type: String,
            default: "",
        },
        icon: {
            // Icon for input
            type: String,
            default: "",
        },
        className: {
            // Class for input
            type: String,
            default: "",
        },
        type: {
            // Type for input
            type: String,
            default: "text",
        },
        rows: {
            // Rows for textarea
            type: Number,
            default: 2,
        },
        id: {
            // Id for input
            type: String,
            required: false,
            default: null,
        },
        name: {
            // Name for input
            type: String,
            required: false,
            default: null,
        },
        modelValue: {
            // Value for input
            required: false,
            default: null,
        },
        required: {
            // Required for input
            type: Boolean,
            required: false,
            default: false,
        },
        styleProps: {
            // Style for input
            type: Array,
            required: false,
            default: () => [],
        },
        outline: {
            // Outline for input
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            // Disabled for input
            type: Boolean,
            required: false,
            default: false,
        },
        value: {
            // Value for checkbox and radio
            required: false,
        },
        focus: {
            // Focus for input
            type: Boolean,
            required: false,
            default: false,
        },
        inputClass: {
            // Class for input
            type: String,
            required: false,
        },
        tabIndex: {
            // Tabindex for input
            type: Number,
            required: false,
            default: 0,
        },
        errorLabel: {
            // Error label for input
            type: String,
            required: false,
        },
        isEmail: {
            // Email for input
            type: Boolean,
            required: false,
            default: false,
        },
        isPhoneNumber: {
            // Phone number for input
            type: Boolean,
            required: false,
            default: false,
        },
        isNumber: {
            // Number for input
            type: Boolean,
            required: false,
            default: false,
        },
        minLength: {
            // Min length for input
            type: Number,
            required: false,
            default: 0,
        },
        maxLength: {
            // Max length for input
            type: Number,
            required: false,
            default: 0,
        },
        validateCheck: {
            // Validate check for input
            type: Boolean,
            required: false,
            default: false,
        },
        tooltipText: {
            // tooltip text
            type: String,
            required: false,
        },
        tooltipPosition: {
            // tooltip position
            type: String,
            required: false,
            default: 'right',
        },

    },
    data() {
        return {
            error: false, // có hiển thị lỗi hay không
            errorMess: "", // nội dung lỗi
            isShowErrorMessage: false, // trạng thái hiển thị lỗi
            isChange: false, // trạng thái thay đổi

        };
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
         * @description: Giá trị để emit về cho component cha
         * Author: AnhDV 14/09/2022
         */
        tempValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                const self = this;
                self.isChange = true;
                self.$emit("update:modelValue", value);
                if (self.validateCheck || self.required) {
                    // nếu validateCheck = true thì validate cho trường dữ liệu không bắt buộc nhưng cố tình nhập sai
                    self.errorMess = "";
                    self.$nextTick(() => {
                        // sau khi set giá trị thì kiểm tra validate
                        self.validate();
                    });
                }
            },
        },

    },
    methods: {
        /**
         * @description: showErrorMessage cho tooltip khi hover vào input
         * Author: AnhDV 14/09/2022
         */
        showErrorMessage() {
            if (this.error) {
                this.isShowErrorMessage = true;
            }
        },
        /**
         * @description: hideErrorMessage cho tooltip khi hover vào input
         * Author: AnhDV 14/09/2022
         */
        hideErrorMessage() {
            this.isShowErrorMessage = false;
        },
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
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else if (self.isEmail && !Validate.isEmail(value)) {
                    self.errorMess = this.$t("validate_error.invalid", [errorLabel]);
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else if (self.isPhoneNumber && !Validate.isPhoneNumber(value)) {
                    self.errorMess = this.$t("validate_error.invalid_phone_number", [errorLabel]);
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else if (self.isNumber && !Validate.isNumber(value)) {
                    self.errorMess = this.$t("validate_error.invalid_number", [errorLabel]);
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else if (self.maxLength > 0 && !Validate.isLength(value, 0, self.maxLength)) {
                    self.errorMess = this.$t("validate_error.max_length", [errorLabel, self.maxLength]);
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else if (self.minLength > 0 && !Validate.isLength(value, self.minLength)) {
                    self.errorMess = this.$t("validate_error.min_length", [errorLabel, self.minLength]);
                    self.error = true;
                    self.isShowErrorMessage = true;
                    return;
                } else {
                    self.error = false;
                    self.isShowErrorMessage = false;
                }
            } else {
                self.error = false;
                self.isShowErrorMessage = false;
            }
        },
        /**
         * @description: Hàm này dùng để focus vào input
         * Author: AnhDV 20/10/2022
         */
        handleInputFocus() {
            this.$refs.input.focus();
        },
        /**
         * @description: Hàm này dùng để validate khi input blur
         * Author: AnhDV 25/10/2022
         */
        handleInputFocusOut() {
            const self = this;
            if (self.required || self.validateCheck) {
                self.validate();
                self.$emit('validate', { error: self.error, errorMess: self.errorMess });
            }
        },
        /**
         * @description: Hàm này dùng để chặn dữ liệu nhập vào theo định dạng
         * Author: AnhDV 26/10/2022
         */
        filterInput(event) {
            const self = this;
            if (self.type === "number") {
                event = (event) ? event : window.event;
                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    event.preventDefault();
                }
            } else {
                if (self.maxLength > 0 && self.tempValue && self.tempValue.length > self.maxLength) {
                    event.preventDefault();
                    return;
                }
            }


        },
        /**
         * @description: Hàm này dùng để reset lại input
         * @param: {any} 
         * Author: AnhDV 25/10/2022
         */
        handleResetValue() {
            this.error = false;
            this.errorMess = "";
            this.isShowErrorMessage = false;
        },

    },
    created() {
        // nếu props focus là true thì đợi dom render xong sau đó focus vào
        if (this.focus) {
            this.$nextTick(() => {
                this.handleInputFocus();
            });
        }
    },

};
</script>
<style scoped lang="scss">
@import "@/assets/scss/base/input.scss";
</style>

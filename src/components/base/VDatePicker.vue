<template>
    <div class="v-date__picker" :tooltip="`${isShowErrorMessage && error ?  errorMess : ''}`">
        <div class="v-date__picker-label" v-if="label">
            {{ label }} <span v-if="required"> * </span>
        </div>
        <date-picker :required="required" pickerType="date" format="DD/MM/yyyy" :locale="locale" :allowClear="true"
            :popupStyle="popupStyleCustom" :onChange="onChange" :value="defaultPickerValue" @focus="onHandleBorder"
            @blur="onHandleBorder">
            <template #nextIcon>
                <div class="ms-24 ms-icon ms-icon-arrow-right"></div>
            </template>
            <template #superNextIcon>
                <div class="ms-24 ms-icon ms-icon-arrow-right"></div>
            </template>
            <template #prevIcon>
                <div class="ms-24 ms-icon ms-icon-arrow-left"></div>
            </template>
            <template #superPrevIcon>
                <div class="ms-24 ms-icon ms-icon-arrow-left"></div>
            </template>
            <template #suffixIcon>
                <div class="ms-30 d-flex align-items-center justify-content-center">
                    <div class="ms-24 ms-icon ms-icon-datepicker"></div>
                </div>
            </template>
        </date-picker>
    </div>
</template>

<script>
import DatePicker from 'ant-design-vue/es/date-picker/moment';
import "ant-design-vue/lib/date-picker/style/css";
import locale from "ant-design-vue/lib/date-picker/locale/vi_VN"; // gọi locale tiếng việt cho datepicker
import moment from 'moment'; // gọi moment để format date
import { formatDate } from '@/utils/format'; // gọi hàm format date
import Validate from '@/utils/validate'; // gọi hàm validate
locale.lang = { // format lại locale cho datepicker
    ...locale.lang,
    monthFormat: "MMMM",
    dateFormat: "DD/MM/yyyy",
    dayFormat: "DD",
    placeholder: "DD/MM/YYYY",
}

export default {
    name: "VDatePicker",
    components: {
        DatePicker
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        required: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            required: false,
        },
        errorLabel: {
            type: String,
            required: false,
        },
        isLessThanToday: {
            type: Boolean,
            default: false,
        },
        isSubmit: {
            type: Boolean,
            default: false,
        },
        validateCheck: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            locale,
            defaultPickerValue: null,
            error: false, // Hiển thị lỗi
            errorMess: "", // Nội dung lỗi
            isShowErrorMessage: false, // Hiển thị nội dung lỗi

        };
    },
    watch: {
        /**
         * @description: theo giõi giá trị truyền vào để set cho datepicker
         * Author: AnhDV 08/10/2022
         */
        modelValue: {
            handler: function (newVal) {
                const self = this;
                if (newVal) {
                    self.defaultPickerValue = moment(formatDate(newVal), 'DD/MM/YYYY');
                } else {
                    self.defaultPickerValue = null;
                }
                if (self.validateCheck) {
                    self.errorMess = "";
                    self.$nextTick(() => { // đợi cho update lên model value xong rồi mới kiểm tra
                        self.validate();
                    });
                }
            },
            deep: true,
        },
        /**
         * @description: theo giõi form submit để hiển thị lỗi
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
    methods: {
        /**
         * @description: Hàm này dùng để validate dữ liệu trước khi truyền ra ngoài
         * Author: AnhDV 08/10/2022
         */
        validate() {
            const self = this;
            let errorLabel = self.errorLabel;
            let picker = this.$el.getElementsByClassName("ant-picker")[0];
            let pickerInput = picker.getElementsByTagName("input")[0];
            pickerInput.removeAttribute("title");
            if ((!self.required && Validate.isNullOrEmpty(self.modelValue)) || self.required) {
                if (self.isLessThanToday && !moment().isAfter(self.defaultPickerValue)) {
                    self.errorMess = self.$t("validate_error.over_current_date", [errorLabel]);
                }
                if (!Validate.isNullOrEmpty(self.modelValue)) {
                    self.errorMess = self.$t("validate_error.required", [errorLabel])
                }
            }
            if (self.errorMess) {
                self.isShowErrorMessage = true;
                self.error = true;
                picker.classList.add("error");
                picker.setAttribute("data-error", self.errorMess);
            } else {
                self.isShowErrorMessage = false;
                self.error = false;
                picker.classList.remove("error");
                picker.removeAttribute("data-error");
            }
        },
        /**
         * @description: Hàm này dùng để format lại date khi chọn date
         * @param: {dateString} - moment date
         * Author: AnhDV 02/10/2022
         */
        onChange(dateString) {
            const self = this;
            try {
                if (dateString) {
                    self.$emit("update:modelValue", moment(dateString).format("YYYY-MM-DD"));
                } else {
                    self.$emit("update:modelValue", "");
                    self.defaultPickerValue = null;
                }
            } catch (error) {
                console.log(error);
            }
        },
        onHandleBorder() {
            const self = this;
            this.$nextTick(() => {
                let picker = self.$el.getElementsByClassName("ant-picker")[0];
                if (self.error) {
                    picker.classList.add("error");
                } else {
                    picker.classList.remove("error");
                }
            });

        },
    },
    created() {
        this.popupStyleCustom = { // style cho popup datepicker
            width: "auto",
            height: "auto",
            zIndex: 9999,
        };


    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/datepicker.scss";
</style>
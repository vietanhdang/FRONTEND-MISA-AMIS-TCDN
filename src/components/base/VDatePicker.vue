<template>
    <div class="v-date__picker">
        <div class="v-date__picker-label" v-if="label">
            {{ label }} <span v-if="required"> * </span>
        </div>
        <date-picker :required="required" pickerType="date" format="DD/MM/yyyy" :locale="locale" :allowClear="true"
            :popupStyle="popupStyleCustom" :onChange="onChange" :value="defaultPickerValue">
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
    },
    data() {
        return {
            locale,
            defaultPickerValue: null,
        };
    },
    watch: {
        modelValue: {
            handler: function (newVal) {
                if (newVal) {
                    this.defaultPickerValue = moment(formatDate(newVal), 'DD/MM/YYYY');
                } else {
                    this.defaultPickerValue = null;
                }
            },
            immediate: true,
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để format lại date khi chọn date
         * @param: {dateString} - moment date
         * Author: AnhDV 02/10/2022
         */
        onChange(dateString) {
            try {
                if (dateString) {
                    this.$emit("update:modelValue", moment(dateString).format("YYYY-MM-DD"));
                } else {
                    this.$emit("update:modelValue", "");
                    this.defaultPickerValue = null;
                }
            } catch (error) {
                console.log(error);
            }
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
.v {
    &-date__picker {
        &-label {
            cursor: pointer;
            font-weight: 600;

            font-family: "MISA Fonts Bold";
            margin-bottom: 8px;

            span {
                color: $border-red;
            }
        }
    }
}
</style>
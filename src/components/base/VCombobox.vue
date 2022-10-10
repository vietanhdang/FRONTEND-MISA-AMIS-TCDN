<template>
    <div class="v-combobox">
        <div class="v-combobox__label" v-if="label">
            <label @click="showListData();$refs.input.focus()">{{ label }} <span v-if="required">*</span>
            </label>
        </div>
        <div class="v-combobox__body">
            <div class="v-combobox__selected" :class="[{error: error}]" :style="style"
                :data-error="`${!isShowListData && error ? errorMess : ''}`"
                :tooltip="`${!isShowListData && error ? errorMess : ''}`">
                <input ref="input" type="text" v-model="textInput" @click="showListData" :placeholder="placeholder"
                    :disabled="selectBox" @focus="showListData" @blur="hideListData" @keydown="selecItemUpDown" />
                <div class="v-combobox__icon" tabindex="-1" @click="showListData" @blur="hideListData"
                    @keydown="selecItemUpDown">
                    <div
                        :class="['ms-16 ms-icon', { 'ms-icon-arrow-down-black': !isShowListData, 'ms-icon-arrow-up-black': isShowListData }]">
                    </div>
                </div>
            </div>
            <transition name="slide-fade">
                <div class="v-select__list" v-if="isShowListData"
                    :style="[position === 'top' ? { bottom: '100%' } : {}]" ref="combobox__data">
                    <div v-if="filterData.length === 0" class="v-select__items">
                        Không tìm thấy kết quả
                    </div>
                    <div v-else class="v-select__items" v-for="(option, index) of filterData" :key="index"
                        @mousedown="onHandleSelected(option, index)"
                        :class="[{'v-select__hover': index == indexItemFocus},{ 'v-select__focus':  option[propKey] === keyItemSelected }]">
                        <slot name="item" :option="option" :index="index">
                            {{ option[propValue] }}
                        </slot>
                        <div v-if="!selectBox"
                            :class="{ 'v-select__items--checked': option[propKey] === keyItemSelected }">
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { removeVietnameseTones } from '@/utils/format';
import Validate from '@/utils/validate';
import axios from 'axios';
import Enum from '@/utils/enum';
const keycode = Enum.KEY_CODE;
export default {
    name: "VCombobox",
    props: {
        data: { // Danh sách dữ liệu
            type: Array,
            required: false
        },
        placeholder: { // Placeholder của input
            type: String,
            required: false,
            default: "",
        },
        position: { // Vị trí hiển thị danh sách dữ liệu
            type: String,
            required: false,
            default: "bottom",
        },
        label: { // Label của combobox
            type: String,
            required: false,
            default: null,
        },
        required: { // Bắt buộc nhập
            type: Boolean,
            required: false,
            default: false,
        },
        selectBox: { // Nếu là select box thì không cho gõ text
            type: Boolean,
            required: false,
            default: false,
        },
        modelValue: { // Giá trị của combobox
            required: false,
            default: null,
        },
        propKey: { // Key của dữ liệu
            required: false,
            default: "key",
        },
        propValue: { // Value của dữ liệu
            required: false,
            default: "value",
        },
        styleProps: { // Style của combobox
            type: Array,
            required: false,
            default: () => [],
        },
        propApi: { // Nếu có api thì lấy dữ liệu từ api
            type: String,
            required: false,
            default: null,
        },
        errorLabel: { // Hiển thị lỗi
            required: false,
        },
        isSubmit: { // Kiểm tra khi submit form
            required: false,
            default: false,
        },
    },
    computed: {
        /**
         * @description: Tạo style cho combobox
         * Author: AnhDV 25/09/2022
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
    },
    data() {
        return {
            isShowListData: false, // Hiển thị danh sách dữ liệu
            indexItemFocus: null, // index của item được focus
            indexItemSelected: -1, // index của item được chọn
            keyItemSelected: "", // giá trị của item được chọn
            textInput: "", // Text input
            dataApi: [], // dữ liệu lấy từ api
            filterData: [], // dữ liệu lọc
            scrollY: 0, // vị trí scroll của danh sách dữ liệu
            error: false, // Hiển thị lỗi
            errorMess: "", // Nội dung lỗi
        };
    },
    watch: {
        textInput() { // Nếu có text input thì filter data theo text input và lưu lại vào filterData
            this.filterData = this.dataApi.filter((option) =>
                removeVietnameseTones(option[this.propValue])
                    .toLowerCase()
                    .includes(removeVietnameseTones(this.textInput).toLowerCase())
            );
            this.indexItemFocus = null;
        },
        modelValue(newVal) {
            if (newVal === null) { // Nếu modelValue bằng null thì set textInput = "" và keyItemSelected = ""
                this.resetCombobox();
            }
        },
        isSubmit: { // nếu isSubmit là true thì validate
            handler(newVal) {
                if (newVal) {
                    this.validate();
                }
            },
            deep: true,
        }
    },
    methods: {
        /**
         * @description: Hàm này dùng để validate combobox xem có trống hay không
         * @param {String} giá trị của combobox
         * Author: AnhDV 08/10/2022
         */
        validate() {
            if (this.required) {
                this.error = !Validate.isNullOrEmpty(this.keyItemSelected);
                if (this.error) {
                    this.errorMess = Enum.INPUT_VALIDATION.REQUIRED(this.errorLabel);
                } else {
                    this.errorMess = "";
                }
            }
        },
        /**
         * @description: Hàm này dùng để ẩn đi danh sách dữ liệu
         * Author: ANHDV - 08/09/2022 
         */
        hideListData() {
            const self = this;
            try {
                if (self.textInput === "") {  // Nếu text input không có giá trị thì set lại giá trị cho combobox
                    self.resetCombobox();
                } else {
                    if (self.indexItemSelected != null) { // Nếu text input có giá trị và có index selected thì set lại giá trị cho combobox
                        self.onHandleSelected(self.dataApi[self.indexItemSelected], self.indexItemSelected);
                    }
                }
                this.validate();
                this.isShowListData = false; // Hide list data
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để hiển thị danh sách dữ liệu
         * Author: ANHDV - 08/09/2022 
         */
        showListData() {
            const self = this;
            try {
                self.isShowListData = true; // Chuyển trạng thái hiển thị danh sách dữ liệu
                self.filterData = self.dataApi; // Gán dữ liệu đã lọc bằng dữ liệu từ api
                if (self.indexItemSelected !== -1 && self.scrollY !== null) {
                    self.$nextTick(() => { // Đợi DOM render xong thì mới scroll đến vị trí đã chọn
                        self.$refs["combobox__data"].scrollTop = self.scrollY;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để lấy dữ liệu khi click vào item hoặc nhấn enter
         * @param {Object} option - Dữ liệu của item được chọn
         * @param {Number} index - Index của item được chọn
         * Author: ANHDV - 08/09/2022 
         */
        onHandleSelected(option, index) {
            const self = this;
            try {
                const value = option[self.propValue];
                self.textInput = value; // Gán giá trị cho textInput
                self.indexItemSelected = index; // Gán index của item được chọn
                self.indexItemFocus = index; // Gán index của item được focus
                self.keyItemSelected = option[self.propKey]; // Gán key của item được chọn
                self.isShowListData = false; // Ẩn danh sách dữ liệu
                self.$emit("update:modelValue", self.keyItemSelected); // Emit giá trị của item được chọn
                self.$emit("update:textInput", value); // Emit giá trị của text input
                this.validate();
            } catch (error) {
                console.log(error);
            }
            try {
                self.scrollY = self.$refs["combobox__data"].scrollTop; // Lấy vị trí scroll Y của item được chọn
            } catch (error) {
            }
        },
        /**
         * @description: Hàm này dùng để chọn item khi nhấn phím mũi tên lên, xuống, enter, esc
         * Author: ANHDV - 08/09/2022 
         */
        selecItemUpDown(event) {
            if (!this.isShowListData) return false; // Nếu danh sách dữ liệu đang ẩn thì không xử lý
            const keyCodePress = event.keyCode; // Lấy mã phím được nhấn
            try {
                const heightOfBox = this.$refs["combobox__data"].offsetHeight - 16 // Lấy chiều cao của box chứa dữ liệu
                switch (keyCodePress) {
                    case keycode.ENTER:
                        if (this.indexItemFocus !== null) { // Nếu có item được focus
                            this.onHandleSelected(this.filterData[this.indexItemFocus], this.indexItemFocus); // Lấy dữ liệu của item được focus
                        }
                        break;
                    case keycode.ARROW_DOWN:
                        if (this.indexItemFocus === null) { // Nếu không có item nào được focus
                            this.indexItemFocus = 0; // Focus item đầu tiên
                        } else {
                            this.indexItemFocus = this.indexItemFocus === this.filterData.length - 1 ? 0 : this.indexItemFocus + 1; // Focus vào item tiếp theo
                        }
                        const disItemFocusDown = this.$refs["combobox__data"].children[this.indexItemFocus].offsetTop - 8; // Lấy vị trí của item được focus so với vị trí của box chứa dữ liệu
                        if (disItemFocusDown >= heightOfBox) { // Nếu vị trí của item được focus lớn hơn vị trí của box chứa dữ liệu thì scroll xuống
                            this.$refs["combobox__data"].scrollTop = disItemFocusDown - heightOfBox + 36;
                        } else { // Nếu vị trí của item được focus nhỏ hơn vị trí của box chứa dữ liệu thì scroll lên
                            this.$refs["combobox__data"].scrollTop = 0;
                        }
                        break;
                    case keycode.ARROW_UP:
                        if (this.indexItemFocus === null) { // Nếu không có item nào được focus thì focus vào item cuối cùng
                            this.indexItemFocus = this.filterData.length - 1;
                        } else { // Nếu có item được focus thì focus vào item trước đó
                            this.indexItemFocus = this.indexItemFocus === 0 ? this.filterData.length - 1 : this.indexItemFocus - 1;
                        }
                        const disItemFocusUp = this.$refs["combobox__data"].children[this.indexItemFocus].offsetTop - 8; // Lấy vị trí của item được focus so với vị trí của box chứa dữ liệu
                        if (disItemFocusUp >= heightOfBox) { // Nếu vị trí của item được focus lớn hơn vị trí của box chứa dữ liệu thì scroll xuống
                            this.$refs["combobox__data"].scrollTop = disItemFocusUp - heightOfBox + 36;
                        } else { // Nếu vị trí của item được focus nhỏ hơn vị trí của box chứa dữ liệu thì scroll lên
                            this.$refs["combobox__data"].scrollTop = 0;
                        }
                        break;
                    case keycode.ESC:
                        this.hideListData(); // Ẩn danh sách dữ liệu
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để reset lại combobox
         * Author: AnhDV 25/09/2022
         */
        resetCombobox() {
            this.textInput = ""; // Reset lại text input
            this.indexItemSelected = null; // Reset lại index item được chọn
            this.indexItemFocus = null; // Reset lại index item được focus
            this.keyItemSelected = null; // Reset lại key item được chọn
            this.filterData = []; // Reset lại dữ liệu lọc
        },
    },
    /**
     * @description: Hook khởi tạo để gán giá trị vào combo box
     * Author: AnhDV 25/09/2022
     */
    async created() {
        const self = this;
        try {
            if (self.propApi) { // Nếu có prop api thì gọi api lấy dữ liệu
                const response = await axios.get(self.propApi);
                self.dataApi = response.data;
                self.filterData = response.data;
            }
            if (self.data) { // Nếu có dữ liệu truyền từ component cha thì gán dữ liệu
                self.dataApi = self.data;
                self.filterData = self.data;
            }
            if (self.modelValue) { // Nếu có giá trị mặc định truyền từ component cha
                const index = self.dataApi.findIndex((item) => item[self.propKey] === self.modelValue); // Tìm index của item có key trùng với giá trị mặc định
                if (index !== -1) { // Nếu tồn tại item có key trùng với giá trị mặc định
                    self.onHandleSelected(self.dataApi[index], index); // Lấy dữ liệu của item được focus
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/base/combobox.scss";
</style>
    
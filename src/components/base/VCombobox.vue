<template>
    <div class="v-combobox">
        <div class="v-combobox__label" v-if="label">
            <label @click="showListData();$refs.input.focus()">{{ label }} <span v-if="required"> *
                </span></label>
        </div>
        <div class="v-combobox__body">
            <div class="v-combobox__selected" :class="[{ isShowListData: isShowListData },{error: error}]"
                :style="style">
                <input ref="input" type="text" v-model="textInput" @click="showListData" :placeholder="placeholder"
                    :required="required" @focus="showListData" @blur="hideListData" @keydown="selecItemUpDown" />
            </div>
            <div class="ms-32 v-combobox__icon" @click="showListData" tabindex="-1" @blur="hideListData"
                @keydown="selecItemUpDown">
                <div class="icon-arrow-down"></div>
            </div>
            <div class="v-select__list" v-if="isShowListData" :style="[position === 'top' ? { bottom: '100%' } : {}]"
                ref="combobox__data">
                <div v-if="filterData.length === 0" class="v-select__items">
                    Không tìm thấy kết quả
                </div>
                <div v-else class="v-select__items" v-for="(option, index) of filterData" :key="index"
                    @mousedown="onHandleSelected(option, index)"
                    :class="[{'itemFocus': index == indexItemFocus},{ 'hover':  option[propKey] === keyItemSelected }]">
                    <slot name="item" :option="option" :index="index">
                        {{ option[propValue] }}
                    </slot>
                    <div :class="{ 'v-select__items--checked': option[propKey] === keyItemSelected }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { removeVietnameseTones } from '@/utils/format';
import axios from 'axios';
import keycode from '@/utils/keycode';
export default {
    name: "VCombobox",
    props: {
        data: {
            type: Array,
            required: false
        },
        placeholder: {
            type: String,
            required: false,
            default: "",
        },
        position: {
            type: String,
            required: false,
            default: "bottom",
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        modelValue: {
            type: String,
            required: false,
            default: null,
        },
        propKey: {
            required: false,
            default: "key",
        },
        propValue: {
            required: false,
            default: "value",
        },
        styleProps: {
            type: Array,
            required: false,
            default: () => [],
        },
        propApi: {
            type: String,
            required: false,
            default: null,
        },
        error: {
            required: false,
        },
    },
    computed: {
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
            isShowListData: false,
            indexItemFocus: null, // index item focus
            indexItemSelected: -1, // index item selected
            keyItemSelected: "", // key item focus
            textInput: "", // Text input
            dataApi: [], // Data from api
            filterData: [], // Data has been filtered
            scrollY: 0, // position scroll Y of selected item
        };
    },
    watch: {
        /**
         * Watch input text change and filter data
         * Author: ANHDV - 08/09/2022 
         */
        textInput() {
            this.filterData = this.dataApi.filter((option) =>
                removeVietnameseTones(option[this.propValue])
                    .toLowerCase()
                    .includes(removeVietnameseTones(this.textInput).toLowerCase())
            );
            this.indexItemFocus = null;
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để ẩn đi danh sách dữ liệu
         * Author: ANHDV - 08/09/2022 
         */
        hideListData() {
            if (this.textInput === "" && this.keyItemSelected !== "") {
                this.textInput = this.dataApi.find((item) => item[this.propKey] === this.keyItemSelected)[
                    this.propValue
                ];
            }
            this.isShowListData = false; // Hide list data
        },
        /**
         * @description: Hàm này dùng để hiển thị danh sách dữ liệu
         * Author: ANHDV - 08/09/2022 
         */
        showListData() {
            this.isShowListData = true; // Chuyển trạng thái hiển thị danh sách dữ liệu
            this.filterData = this.dataApi; // Gán dữ liệu đã lọc bằng dữ liệu từ api
            if (this.indexItemSelected !== -1 && this.scrollY !== 0) {
                this.$nextTick(() => { // Đợi DOM render xong thì mới scroll đến vị trí đã chọn
                    this.$refs["combobox__data"].scrollTop = this.scrollY;
                });
            }

        },
        /**
         * @description: Hàm này dùng để lấy dữ liệu khi click vào item hoặc nhấn enter
         * @param {Object} option - Dữ liệu của item được chọn
         * @param {Number} index - Index của item được chọn
         * Author: ANHDV - 08/09/2022 
         */
        onHandleSelected(option, index) {
            try {
                this.scrollY = this.$refs["combobox__data"].scrollTop; // Lấy vị trí scroll Y của item được chọn
            } catch (error) {
                this.scrollY = 0;
            }
            const value = option[this.propValue];
            this.textInput = value; // Gán giá trị cho textInput
            this.indexItemSelected = index; // Gán index của item được chọn
            this.indexItemFocus = index; // Gán index của item được focus
            this.keyItemSelected = option[this.propKey]; // Gán key của item được chọn
            this.isShowListData = false; // Ẩn danh sách dữ liệu
            this.$emit("update:modelValue", this.dataApi[index][this.propKey]); // Emit dữ liệu lên component cha
        },
        /**
         * @description: Hàm này dùng để chọn item khi nhấn phím mũi tên lên, xuống, enter, esc
         * Author: ANHDV - 08/09/2022 
         */
        selecItemUpDown(event) {
            if (!this.isShowListData) return false;
            const keyCodePress = event.keyCode;
            try {
                const heightOfBox = this.$refs["combobox__data"].offsetHeight - 16 // Lấy chiều cao của box chứa dữ liệu
                switch (keyCodePress) {
                    case keycode.ENTER:
                        if (this.indexItemFocus !== null) { // Nếu có item được focus
                            this.onHandleSelected(this.filterData[this.indexItemFocus], this.indexItemFocus); // Lấy dữ liệu của item được focus
                            this.$emit("update:modelValue", this.filterData[this.indexItemFocus][this.propKey]); // Emit dữ liệu lên component cha
                        }
                        break;
                    case keycode.DOWN:
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
                    case keycode.UP:
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
    },
    created() {
        const self = this;
        if (self.propApi) {
            axios.get(self.propApi).then((res) => {
                self.dataApi = res.data;
                self.filterData = res.data;
                if (self.modelValue) { // Nếu có giá trị mặc định truyền từ component cha
                    const index = self.dataApi.findIndex((item) => item[self.propKey] === self.modelValue); // Tìm index của item có key trùng với giá trị mặc định
                    if (index !== -1) { // Nếu có item trùng với giá trị mặc định
                        self.onHandleSelected(self.dataApi[index], index); // Lấy dữ liệu của item được focus
                    }
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (self.data) { // Nếu có dữ liệu truyền từ component cha thì gán dữ liệu
            self.dataApi = self.data;
            self.filterData = self.data;
        }
    },
    mounted() {
        // this.textInput = "";
        // this.indexItemSelected = -1;
        // this.indexItemFocus = null;
        // this.keyItemSelected = "";
        // this.$emit("update:modelValue", "");
    },
    updated() {
        if (!this.modelValue) {
            this.textInput = "";
            this.indexItemSelected = -1;
            this.indexItemFocus = null;
            this.keyItemSelected = "";
            this.$emit("update:modelValue", "");
        }
    },
}
</script>
<style lang="scss" scoped>
.error {
    border: 1px solid red !important;
}

.v-combobox {
    .v-combobox__label {
        label {
            cursor: pointer;
        }

        font-weight: 600;
        font-family: "MISA Fonts Bold";
        margin-bottom: 8px;

        span {
            color: red;
        }
    }

    .v-combobox__body {
        position: relative;
        width: 100%;
        text-align: left;
        outline: none;
        height: 32px;
        box-sizing: border-box;

        .v-combobox__selected {
            background-color: $bg-white;
            border-radius: 2px;
            color: $text-black;
            user-select: none;
            height: 100%;
            width: 100%;
            padding: 0 36px 0 10px;
            border: 1px solid #bbbbbb;
            outline: none;

            input {
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                padding: 0;
            }

            &.isShowListData {
                border: 1px solid $bg-green;
            }


        }

        .v-combobox__icon {
            width: 32px;
            height: 32px;
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            outline: none;


            &:hover {
                background-color: $bg-grey-hover;
            }

            .icon-arrow-down {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -560px -359px;
                width: 16px;
                height: 16px;
            }

            .icon-arrow-up {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -560px -359px;
                width: 16px;
                height: 16px;
                transform: rotate(180deg);
            }
        }

        .hover {
            background-color: $bg-green-hover !important;
            color: $text-white !important;
        }

        .v-select__list {
            color: $text-black;
            position: absolute;
            background-color: $bg-white;
            padding: 8px;
            left: 0;
            right: 0;
            z-index: 9999;
            max-height: 200px;
            overflow-y: auto;
            box-shadow: 0 0 10px rgba(23, 27, 42, 0.24);

            .v-select__items {
                padding: 0 4px;
                cursor: pointer;
                user-select: none;
                border-radius: 2px;
                min-height: 32px;
                line-height: 32px;
                position: relative;

                &:hover {
                    background-color: $bg-grey-hover;
                }

                &.itemFocus {
                    background-color: $bg-grey-hover;
                }


                .v-select__items--checked {
                    background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -1499px -309px;
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    right: 0;
                    top: 6px;
                    right: 8px;
                }
            }
        }
    }
}
</style>
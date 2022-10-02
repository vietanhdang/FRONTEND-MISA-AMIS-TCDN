<template>
    <div class="v-select">
        <div class="v-select__label" v-if="label" @click="openSelect">
            {{ label }} <span v-if="required"> * </span>
        </div>
        <div class="v-select__selected" :class="{ open: open }" @click="toggleSelect" @blur="closeSelect" tabindex="-1"
            @keydown="selecItemUpDown">
            {{ data[indexItemSelected][propValue] }}
        </div>
        <div class="v-select__icon" @click="toggleSelect" @blur="closeSelect" tabindex="-1" @keydown="selecItemUpDown">
            <div class="icon-arrow-down" v-if="position === 'bottom'"></div>
            <div class="icon-arrow-down" v-if="!open && position === 'top'"></div>
            <div class="icon-arrow-up" v-if="open && position === 'top'"></div>
        </div>
        <div class="v-select__items" v-if="open" :style="[position === 'top' ? { bottom: '100%' } : {}]">
            <div v-for="(option, index) of data" :key="index" @mousedown="onHandleSelected(option, index)"
                :class="{ selected: indexItemSelected === index }">
                {{ option[propValue] }}
            </div>
        </div>
    </div>
</template>

<script>
import Enum from '@/utils/enum';
const keycode = Enum.KEY_CODE;
export default {
    name: "VSelect",
    props: {
        data: {
            type: Array,
            required: true,
        },
        position: {
            type: String,
            required: false,
            default: "bottom",
        },
        modelValue: {
            required: false,
            default: null,
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
        propKey: {
            required: false,
            default: "key",
        },
        propValue: {
            required: false,
            default: "value",
        },
    },
    data() {
        return {
            open: false,
            indexItemSelected: 0,
            indexItemFocus: null,
            value: null,
        };
    },
    watch: {
        modelValue: {
            handler: function (val) {
                this.setValue(val);
            },
            immediate: true,
        },
    },
    methods: {
        /**
         * @description: Gán giá trị cho Select
         * Author: AnhDV 23/09/2022
         */
        setValue(val) {
            this.indexItemSelected = this.data.findIndex((item) => item[this.propKey] === val);
            this.value = val;
        },
        /**
         * Mở select box
         * Author: AnhDV 10/09/2022
         */
        openSelect() {
            this.open = true;
        },
        /**
         * @description: Đóng mở select box
         * Author: AnhDV 12/09/2022
         */
        toggleSelect() {
            this.open = !this.open;
        },
        /**
         * @description: Đóng select box 
         * Author: AnhDV 10/09/2022
         */
        closeSelect() {
            this.open = false;
        },
        /**
         * @description: Xử lý khi chọn một item trong select box
         * @param {Object} option 
         * @param {Number} index
         * Author: AnhDV 10/09/2022
         */
        onHandleSelected(option, index) {
            this.indexItemSelected = index;
            this.open = false;
            this.$emit("update:modelValue", option[this.propKey]);
            this.$emit('change');
        },
        /**
         * @description: Xử lý khi nhấn phím lên xuống trong select box
         * @param {Object} event
         * Author: AnhDV 10/09/2022
         */
        selecItemUpDown(event) {
            if (!this.open) return;
            switch (event.keyCode) {
                case keycode.ARROW_UP:
                    this.indexItemSelected = this.indexItemSelected > 0 ? this.indexItemSelected - 1 : this.data.length - 1;
                    break;
                case keycode.ARROW_DOWN:
                    this.indexItemSelected = this.indexItemSelected < this.data.length - 1 ? this.indexItemSelected + 1 : 0;
                    break;
                case keycode.ESC:
                    this.open = false;
                    break;
                case keycode.ENTER:
                    this.onHandleSelected(this.data[this.indexItemSelected], this.indexItemSelected);
                    this.open = false;
                    break;
                default:
                    break;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.v {
    &-select {
        position: relative;
        width: 100%;
        text-align: left;
        height: 30px;
        line-height: 30px;
        min-width: 200px;
    }

    &-select__label {
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

    &-select__selected {
        background-color: $white;
        border-radius: 4px;
        color: $black;
        cursor: pointer;
        user-select: none;
        padding-left: 10px;
        border: 1px solid #bbbbbb;
        outline: none;

        &.open {
            border: 1px solid $bg-green;

        }
    }

    &-select__icon {
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
    }

    &-select__items {
        color: $black;
        border-radius: 4px;
        overflow: hidden;
        position: absolute;
        background-color: $white;
        padding: 4px;
        left: 0;
        right: 0;
        z-index: 1;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 0 0 10px rgba(23, 27, 42, 0.24);

        div {
            padding: 0 8px;
            cursor: pointer;
            user-select: none;
            border-radius: 4px;

            &:hover {
                background-color: $bg-grey-hover;
            }

            &.selected {
                background-color: $bg-green-hover !important;
                color: $white;
            }
        }
    }
}

.icon {
    &-arrow-down {
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -560px -359px;
        width: 16px;
        height: 16px;
    }

    &-arrow-up {
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -560px -359px;
        width: 16px;
        height: 16px;
        transform: rotate(180deg);
    }
}
</style>


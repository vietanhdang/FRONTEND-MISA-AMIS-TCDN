<template>
    <div class="v-dropdown" v-if="isShow">
        <div class="v-dropdown__button" @click="toggleContent" :class="className" @blur="handleHide" tabindex="-1">
            <div class="v-dropdown__text">
                <slot></slot>
                {{ text }}
            </div>
            <div class="v-dropdown__icon" v-if="icon">
                <div :class="icon"></div>
                <slot name="icon"></slot>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="v-dropdown__content" v-show="showContent">
                <div class="v-dropdown__content-item" v-for="(option, index) in items" :key="index"
                    @click="$emit('onSelect',option[propKey])"
                    :class="{'v-dropdown__content-item--active': option[propKey] === value && backgroundActive}">
                    <slot name="item" :option="option" :index="index">
                        {{option[propValue]}}
                    </slot>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
export default {
    name: "VDropdown",
    props: {
        icon: { // Dropdown có icon hay không
            type: String,
            default: "",
        },
        className: { // Class của dropdown
            type: String,
            default: "",
        },
        text: { // Text của dropdown
            type: String,
            default: "",
        },
        items: { // Danh sách các item của dropdown
            type: Array,
            default: () => [],
        },
        isShow: { // Dropdown có show hay không
            type: Boolean,
            default: true,
        },
        propKey: { // Key của dữ liệu
            type: String,
            default: "key",
        },
        propValue: { // Value của dữ liệu
            type: String,
            default: "value",
        },
        value: { // Giá trị của dropdown
            type: String,
            default: "",
        },
        backgroundActive: { // Có để màu nền khi active hay không
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            showContent: false, // Dropdown có show content hay không
        };
    },
    methods: {
        /**
         * @description: Hiển thị content của dropdown 
         * Author: AnhDV 03/10/2022
         */
        toggleContent() { // Toggle content của dropdown
            this.showContent = !this.showContent;
        },

        /**
         * @description: Ẩn content của dropdown
         * Author: AnhDV 03/10/2022
         */
        handleHide() { // Ẩn content của dropdown
            this.showContent = false;
        },
        /**
         * @description: Xử lý khi chọn item của dropdown
         * Author: AnhDV 03/10/2022
         */
        handleSelect(item) { // Xử lý khi chọn item của dropdown
            this.$emit("onSelect", item.key, null);
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/dropdown.scss";
</style>
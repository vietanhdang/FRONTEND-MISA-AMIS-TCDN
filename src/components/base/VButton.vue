<template>
    <div class="v-button">
        <button class="v-button__button" :type="type" :class="[buttonType,className]" :disabled="disabled"
            :style="style" @blur="$emit('blur')">
            <div class="v-button__icon" v-if="icon">
                <div :class="icon"></div>
            </div>
            <div class="v-button__text">
                <slot></slot>
                {{ text }}
            </div>
        </button>
    </div>
</template>

<script>
export default {
    name: "VButton",
    props: {
        type: { // Thiết lập type của button (submit, button, reset)
            type: String,
            default: "button",
        },
        icon: { // Button có icon hay không
            type: String,
            default: "",
        },
        disabled: { // Button có disabled hay không
            type: Boolean,
            default: false,
        },
        className: { // Class của button
            type: String,
            default: "",
        },
        text: { // Text của button
            type: String,
            default: "",
        },
        width: { // Width của button
            type: String,
        },
        height: { // Height của button
            type: String,
            default: "36px",
        },
        backgroundColor: { // Background color của button
            type: String,
            default: "#2ca01c",
        },
        backgroundColorHover: { // Background color hover của button
            type: String,
            default: "#35bf22",
        },
        backgroundColorActive: { // Background color active của button
            type: String,
            default: "#248b15",
        },
        backgroundColorFocus: { // Background color focus của button
            type: String,
            default: "#2ca01c",
        },
        color: { // Màu chữ của button
            type: String,
            default: "#fff",
        },
        colorHover: { // Màu chữ khi hover của button
            type: String,
            default: "#fff",
        },
        styleProps: {
            type: Array,
            required: false,
            default: () => [],
        },
        buttonType: {
            type: String,
            default: "primary",
        },
    },
    computed: {
        /**
         * @description: tạo style cho button
         * Example: styleProps: ['color: red', 'background-color: blue']
         * 
         * Author: AnhDV 14/09/2022
         */
        style() {
            let styleProps = {};
            if (this.styleProps.length > 0) {
                this.styleProps.forEach((item) => {
                    const key = item.split(":")[0].trim();
                    const value = item.split(":")[1].trim();
                    styleProps[key] = value;
                });
                return styleProps;
            } else {
                return {};
            }
        },
    },
};
</script>
<style scoped lang="scss">
.v {
    &-button {
        white-space: nowrap;

        &__button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: v-bind(height);
            width: v-bind(width);
            border-radius: 3px;
            background-color: v-bind(backgroundColor);
            color: v-bind(color);
            outline: none;
            border: none;
            cursor: pointer;
            padding: 0 16px;
            transition: all .25s ease;

            &:hover {
                background-color: v-bind(backgroundColorHover);
            }

            &:active {
                background-color: v-bind(backgroundColorActive);
            }

            &:focus {
                background-color: v-bind(backgroundColorFocus);
            }

            &.secondary {
                border: 1px solid #8d9096;
                color: #111;
                background-color: transparent;

                &:hover {
                    background-color: #d2d3d6;
                }

                &:active {
                    background-color: #bbbcbc;
                }

                &:focus {
                    box-shadow: 0 0 0 4px #d2d3d6;
                }
            }
        }


        &__text {
            font-family: 'MISA Fonts Bold';
            font-size: 13px;
        }
    }
}
</style>
<template>
    <div class="v-button">
        <button class="v-button__button" :type="type" :class="className" :disabled="disabled" :style="style"
            @blur="$emit('blur')">
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
        type: {
            type: String,
            default: "button",
        },
        icon: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        className: {
            type: String,
            default: "",
        },
        text: {
            type: String,
            default: "",
        },
        styleProps: {
            type: Array,
            required: false,
            default: () => [],
        },

    },
    computed: {
        /**
         * @description: tạo style cho button
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
            height: 36px;
            border-radius: 4px;
            outline: none;
            border: none;
            cursor: pointer;
            // min-width: 80px; 
            padding: 0 16px;
            background-color: $bg-green;
            color: #ffffff;
            transition: all .25s ease;


            &:hover {
                background-color: $bg-green-hover;
            }

            &:active,
            &:focus {
                background-color: #089740;
            }

            &-secondary {
                background-color: #e0e0e0;
                color: #000000;

                &:hover {
                    background-color: #bdbdbd;
                }

                &:active,
                &:focus {
                    background-color: #9e9e9e;
                }
            }

            &-no-bg {
                background-color: $bg-white;
                color: $text-black;

                &:hover {
                    background-color: #bdbdbd;
                }

                &:active,
                &:focus {
                    background-color: #9e9e9e;
                }

                &.border {
                    border: 1px solid #8d9096;
                }
            }
        }

        &__icon {}

        &__text {
            font-size: 13px;
            font-weight: 600;
        }
    }

}
</style>
<template>
    <div class="v-button">
        <button class="v-button__button" :type="type" :class="className" :disabled="disabled" @click="$emit('click')">
            <div class="v-button__icon" v-if="icon">
                <div :class="icon"></div>
            </div>
            <div class="v-button__text">
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
        border: {
            type: Boolean,
            default: false,
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
    },
};
</script>
<style scoped lang="scss">
.v {
    &-button {
        // margin: 0 4px;
    }

    &-button__button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        border-radius: 4px;
        outline: none;
        border: none;
        cursor: pointer;
        min-width: 80px;
        padding: 0 16px;
        background-color: $bg-green;
        color: #ffffff;

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

    &-button__icon {}

    &-button__text {
        font-size: 14px;
        font-weight: 700;
    }
}
</style>
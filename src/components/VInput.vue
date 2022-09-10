<template>
    <div class="v-input">
        <div class="v-input__label" v-if="label">
            <label @click="$refs.input.focus()">
                {{ label }} <span v-if="required"> * </span>
            </label>
        </div>
        <div class="v-input__input">
            <input ref="input" :type="type" :placeholder="placeholder" :class="className" :id="id" :checked="checked"
                :value="modelValue" :required="required" @input="bindValue" :name="name" :style="style" />
            <label class="v-input__checkbox" v-if="type === 'checkbox'" @click="$refs.input.click()">{{ label_custom
            }}</label>
            <label class="v-input__radio" v-if="type === 'radio'" @click="$refs.input.click()">{{ label_custom
            }}</label>
            <div class="v-input__icon" v-if="icon">
                <div :class="icon"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VInput",
    props: {
        label: {
            type: String,
            default: "",
        },
        label_custom: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        className: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        id: {
            type: String,
            required: false,
            default: null,
        },
        name: {
            type: String,
            required: false,
            default: null,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            required: false,
            default: null,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        styleProps: {
            type: Array,
            required: false,
            default: () => [],
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
    methods: {
        /**
         * @description: Tự động bind value cho input
         * @param: {event} e
         * Author: AnhDV 10/09/2022
         */
        bindValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
    },

}
</script>
<style scoped lang="scss">
.v {
    &-input {
        display: flex;
        flex-direction: column;
    }

    &-input__label {
        label {
            cursor: pointer;
        }

        font-weight: 600;
        margin-bottom: 8px;

        span {
            color: red;
        }
    }

    &-input__input {
        display: flex;
        flex-direction: column;
        position: relative;

        label {
            font-weight: 400;
            cursor: pointer;
        }

        input {
            height: 36px;
            outline: none;
            border-radius: 4px;
            border: 1px solid #bbbbbb;
            padding: 8px 8px 8px 12px;

            &:focus {
                border: 1px solid #019160;
            }

            &::placeholder {
                font-size: 12px;
                color: #bbbbbb;
            }
        }
    }

    &-input__with-icon {
        padding: 8px 36px 8px 12px;
    }

    &-input__checkbox {}

    &-input__radio {}

    &-input__icon {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 8px;
        top: 8px;
        overflow: hidden;
    }
}

.icon {
    &-search {
        background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -317px -148px;
        width: 16px;
        height: 16px;
        opacity: 0.7;
    }
}

input[type="checkbox"],
input[type="radio"] {
    display: none;
}

@keyframes rotate {
    0% {
        transform: rotate(-90deg);
    }
}

@keyframes rotateRevert {
    100% {
        transform: rotate(-90deg);
    }
}

input[type="checkbox"]+label:before {
    content: "";
    border: 1px solid #bbbbbb;
    border-radius: 4px;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: bottom;
    margin-right: 10px;
    cursor: pointer;
    animation: rotateRevert 0.2s;
}

input[type="checkbox"]:checked+label:before {
    border-color: $bg-green;
    background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -1501px -311px;
    width: 16px;
    height: 16px;
    animation: rotate 0.3s;
}

input[type="radio"]+label:before {
    border-radius: 50%;
    border: 1px solid #bbbbbb;
    content: "";
    cursor: pointer;
    display: inline-block;
    height: 16px;
    margin-right: 8px;
    position: relative;
    vertical-align: bottom;
    width: 16px;
}

input[type="radio"]:checked+label:before {
    border: 1px solid $bg-green;
    background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -115.5px -460.5px;
}
</style>

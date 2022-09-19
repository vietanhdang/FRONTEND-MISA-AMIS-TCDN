<template>
    <div class="v-input">
        <div class="v-input__label" v-if="label">
            <label @click="$refs.input.focus()">
                {{ label }} <span v-if="required"> * </span>
            </label>
        </div>
        <div class="v-input__input">
            <input ref="input" :type="type" :placeholder="placeholder"
                :class="[className, {'error' : error}, {'v-input__outline' : outline}]" :id="id"
                :checked="type === 'checkbox' || type === 'radio' ? (modelValue == value? true : false) : checked"
                :value="type === 'checkbox' || type === 'radio' ? value : modelValue" :required="required" :name="name"
                :disabled="disabled" :style="style" v-model="model">
            <label class="v-input__checkbox" v-if="type === 'checkbox'" @click="$refs.input.click()">
                <label class="label_custom" v-if="label_custom">{{label_custom}}</label>
            </label>
            <label class="v-input__radio" v-if="type === 'radio'" @click="$refs.input.click()">
                <label class="label_custom">{{ label_custom}}</label>
            </label>
            <div class="v-input__icon ms-16 ms-icon ms-icon-search" v-if="icon">
            </div>
        </div>
    </div>
</template>
  <!-- <div class="error-tooltip">
                <div class="error-tooltip__text">
                    {{ error }}
                </div>
            </div> -->
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
        error: {
            type: String,
            required: false,
            default: "",
        },
        outline: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        value: {
            required: false,
        },
        focus: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            model: this.modelValue,
        };
    },
    watch: {
        /**
         * @description: Hàm này dùng để lắng nghe sự thay đổi của input để emit ra ngoài 
         * Author: AnhDV 16/09/2022
         */
        model(value) {
            this.$emit("update:modelValue", value);
        },

        /**
         * @description: Hàm này dùng để lắng nghe sự thay đổi của giá trị truyền vào để cập nhật giá trị cho input
         * Author: AnhDV 16/09/2022
         */
        modelValue(value) {
            this.model = value;
        },
    },
    computed: {
        /**
         * @description: Tạo style cho input
         * Author: AnhDV 14/09/2022
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
    mounted() {
        if (this.focus) { // Nếu có truyền focus vào thì focus vào input
            this.$refs.input.focus();
        }
    },

}
</script>
<style scoped lang="scss">
// .error {
//     &-tooltip {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         min-width: 100%;
//         max-width: 100%;
//         position: absolute;
//         top: 115%;

//     }

//     &-tooltip__text {
//         background-color: #F06666;
//         min-width: 40px;
//         text-align: center;
//         border-radius: 2px;
//         font-size: 13px;
//         font-weight: 500;
//         color: #fff;
//         position: relative;

//         &:after {
//             content: "";
//             position: absolute;
//             bottom: 100%;
//             left: 50%;
//             margin-left: -5px;
//             border-width: 5px;
//             border-style: solid;
//             border-color: transparent transparent #F06666 transparent;
//         }
//     }
// }

.v {
    &-input {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    &-input__outline {
        &:hover {
            outline: 1px solid #e2e2e2;
        }
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
        align-items: flex-start;
        flex-direction: column;
        position: relative;
        justify-content: center;

        label {
            font-weight: 400;
            cursor: pointer;
        }

        input {
            height: 32px;
            outline: none;
            border-radius: 4px;
            border: 1px solid #bbbbbb;
            padding: 0 10px;

            &:focus {
                border: 1px solid #019160;
            }

            &::placeholder {
                font-size: 12px;
                color: #bbbbbb;
            }
        }

        .error {
            border: 1px solid red;
        }
    }

    &-input__with-icon {
        padding: 8px 36px 8px 12px;
    }

    &-input__checkbox {

        .label_custom {
            margin-left: 10px;
        }
    }

    &-input__radio {
        line-height: 18px;
        cursor: pointer;

        label {
            margin-left: 10px;
        }
    }

    &-input__icon {
        position: absolute;
        right: 11px;
    }

}


.inpur__normal {
    padding: 0 12px 0 10px;
}

input[type="checkbox"],
input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
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
    width: 20px;
    height: 20px;
    vertical-align: bottom;
    cursor: pointer;
    animation: rotateRevert 0.2s;
}

input[type="checkbox"]:checked+label:before {
    border-color: $bg-green;
    background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -1500px -311px;
    width: 20px;
    height: 20px;
    animation: rotate 0.3s;
}


input[type="checkbox"]:focus+label:before,
input[type="radio"]:focus+label:before {
    border-color: #019160;
}


input[type="radio"]+label:before {
    border-radius: 50%;
    border: 1px solid #bbbbbb;
    content: "";
    cursor: pointer;
    display: inline-block;
    height: 18px;
    width: 18px;
    position: relative;
    vertical-align: bottom;
}

input[type="radio"]:checked+label:before {
    border: 1px solid $bg-green;
    background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -115.5px -460.5px;
}
</style>

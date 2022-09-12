<template>
    <Transition name="fade">
        <div class="v-dialog" v-if="modelValue" @keypress="onHandleKey">
            <div class="v-dialog__overlay" ref="overlay"></div>
            <div class="v-dialog__content" tabindex="-1" ref="dialog-content" @mousedown="startDrag" @mousemove="drag"
                :class="{'v-dialog__content--form': dialogType === 'form'}" @mouseup="stopDrag">
                <div class="v-dialog__header" v-if="header">
                    <div class="v-dialog__title">
                        <slot name="title"></slot>
                    </div>
                    <div class="v-dialog__close">
                        <v-tooltip content="GIÚP (F1)" position="bottom" :fixed="true">
                            <div class="v-icon-help"></div>
                        </v-tooltip>
                        <v-tooltip content="ĐÓNG (ESC)" :fixed="true" position="bottom">
                            <div class="v-icon-close" @click="$emit('update:modelValue', false)">
                            </div>
                        </v-tooltip>
                    </div>
                </div>
                <div class="v-dialog__body" v-if="dialogType !== 'form'">
                    <div class="v-dialog__icon" v-if="icon">
                        <div :class="`v-icon-${icon}`"></div>
                    </div>
                    <div class="v-dialog__text" @mousemove="stopDrag">
                        <slot name="body"></slot>
                    </div>
                </div>
                <div class="v-dialog__body" v-else>
                    <slot name="body"></slot>
                </div>
                <div class="v-line"></div>
                <div class="v-dialog__footer">
                    <div class="footer__left" @mousemove="stopDrag">
                        <slot name="footer__left"></slot>
                    </div>
                    <div class="footer__right" @mousemove="stopDrag">
                        <slot name="footer__right"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import keycode from '@/utils/keycode';
export default {
    name: "VDialog",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        header: {
            type: Boolean,
            default: true,
        },
        icon: {
            type: String,
            default: "",
        },
        dialogType: {
            type: String,
            default: "popup",
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để lấy ra tọa độ của chuột khi click vào dialog
         * @param: {any}  event - Sự kiện click chuột
         * Author: AnhDV 11/09/2022
         */
        startDrag(event) {
            this.draggable = true; // cho phép di chuyển dialog
            const { clientX, clientY } = event; // lấy tọa độ của chuột
            const { left, top } = this.$refs["dialog-content"].getBoundingClientRect(); // lấy tọa độ của dialog so với viewport
            // this.$refs["dialog-content"].style.cursor = "grabbing"; // thay đổi con trỏ chuột
            this.offsetX = clientX - left; // tính độ dời của chuột so với dialog theo trục x
            this.offsetY = clientY - top; // tính độ dời của chuột so với dialog theo trục y
        },
        /**
         * @description: Hàm di chuyển dialog theo tọa độ mà chuột di chuyển
         * @param: {any}  event - Sự kiện di chuyển chuột
         * Author: AnhDV 11/09/2022
         */
        drag(event) {
            if (this.draggable) { // nếu cho phép di chuyển dialog
                const { clientX, clientY } = event; // lấy tọa độ của chuột
                const { width, height } = this.$refs["dialog-content"].getBoundingClientRect(); // lấy tọa độ của dialog so với viewport
                let left = clientX - this.offsetX; // tính tọa độ mới của dialog theo trục x
                let top = clientY - this.offsetY; // tính tọa độ mới của dialog theo trục y

                // kiểm tra tọa độ mới của dialog có nằm trong viewport không
                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                left = left + width > window.innerWidth ? window.innerWidth - width : left; // nếu dialog vượt quá viewport thì dialog sẽ nằm ở cuối viewport
                top = top + height > window.innerHeight ? window.innerHeight - height : top; // nếu dialog vượt quá viewport thì dialog sẽ nằm ở cuối viewport

                this.$refs["dialog-content"].style.left = `${Math.round(left)}px`; // thay đổi tọa độ của dialog theo trục x
                this.$refs["dialog-content"].style.top = `${Math.round(top)}px`; // thay đổi tọa độ của dialog theo trục y
            }
        },
        /**
         * @description: Hàm dừng di chuyển dialog khi thả chuột
         * Author: AnhDV 11/09/2022
         */
        stopDrag() {
            // this.$refs["dialog-content"].style.cursor = "grab"; // thay đổi con trỏ chuột
            this.draggable = false;
        },
        /**
         * @description: Hàm này dùng để thao tác với dialog bằng bàn phím
         * Author: AnhDV 11/09/2022
         */
        onHandleKeydown(event) {
            if (event.keyCode === keycode.ESC) {
                console.log("ESC");
                this.$emit("update:modelValue", false);
            }
        }
    },
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.v {
    &-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;

        &__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 48px;
            height: 48px;
        }

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        &__content {
            position: fixed;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            width: 444px;
            min-width: 444px;
            padding: 32px;
            cursor: grab;

            // padding: 24px;
            // width: 400px;
            // max-width: 100%;
            &--form {
                width: auto;
            }
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__close {
            display: flex;
            align-items: center;
        }

        &__title {
            // font-size: 20px;
            // font-weight: 700;
        }

        &__text {
            overflow: auto;
            max-height: 400px;
            margin-bottom: 32px;
            padding-left: 16px;
            padding-top: 12px;
        }

        &__body {
            // padding: 24px 0;
            // font-size: 14px;
            // line-height: 18px;
            // letter-spacing: 0;
            display: flex;
            justify-content: flex-start;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .footer {
                &__left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .v-button {
                        margin-right: 8px;
                    }
                }

                &__right {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    .v-button {
                        margin-left: 8px;
                    }
                }
            }
        }
    }


    &-icon {
        &-info {
            background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -826px -456px;
            width: 48px;
            height: 48px;
        }

        &-danger {
            background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -592px -456px;
            width: 48px;
            height: 48px;
        }


        &-close {
            background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -144px -144px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                color: #333;
            }
        }

        &-help {
            background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -89px -144px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: all 0.3s;
            margin-right: 6px;
        }

    }

    &-line {
        height: 1px;
        background: #b8bcc3;
        margin-bottom: 20px;
    }


}
</style>
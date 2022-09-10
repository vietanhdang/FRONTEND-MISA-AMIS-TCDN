<template>
    <Transition name="fade">
        <div class="v-dialog" v-if="modelValue">
            <div class="v-dialog__overlay"></div>
            <div class="v-dialog__content">
                <div class="v-dialog__header">
                    <div class="v-dialog__title">
                        <slot name="title"></slot>
                    </div>
                    <div class="v-dialog__close" @click="$emit('update:modelValue', false)">
                    </div>
                </div>
                <div class="v-dialog__body">
                    <slot name="body"></slot>
                </div>
                <div class="v-dialog__footer">
                    <div class="footer__left">
                        <slot name="footer__left"></slot>
                    </div>
                    <div class="footer__right">
                        <slot name="footer__right"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: "VDialog",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
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

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        &__content {
            position: relative;
            background-color: #fff;
            border-radius: 4px;
            padding: 24px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            width: 400px;
            max-width: 100%;
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__title {
            font-size: 20px;
            font-weight: 700;
        }

        &__close {
            background: url("@/assets/img/Sprites.64af8f61.svg") no-repeat -144px -144px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                color: #333;
            }
        }

        &__body {
            padding: 24px 0;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: 0;
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
}
</style>
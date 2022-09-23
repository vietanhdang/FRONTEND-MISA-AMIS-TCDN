<template>
    <v-modal ref="popup">
        <div class="v__popup">
            <div class="v__popup--body">
                <div class="v__popup--icon" @mousemove="stopDrag">
                    <div :class="`ms-48 ms-icon ms-icon-${icon}`"></div>
                </div>
                <div class="v__popup--text">
                    {{message}}
                    <slot name="body"></slot>
                </div>
            </div>
            <div class="v-line"></div>
            <div class="v__popup--footer">
                <div class="footer__left">
                    <v-button v-if="closeButton" className="secondary" @click="_close" :text="closeButton" />
                </div>
                <div class="footer__center">
                    <VButton v-if="hideButton" @click="_close" :text="Đóng" />
                </div>
                <div class="footer__right">
                    <v-button v-if="cancelButton" className="secondary" @click="_cancel" :text="cancelButton" />
                    <v-button v-if="okButton" @click="_confirm" :text="okButton" />
                </div>
            </div>
        </div>
    </v-modal>
</template>


<script>
export default {
    name: "VPopup",
    data: () => ({
        message: undefined, // nội dung thông báo
        icon: undefined, // icon hiển thị
        okButton: undefined, // nút ok
        cancelButton: undefined, // nút cancel
        closeButton: undefined, // nút close
        hideButton: false, // ẩn nút close
        // khai báo biến private để lưu trữ giá trị trả về
        resolvePromise: undefined,
        rejectPromise: undefined,

    }),
    methods: {
        /**
         * @description: Hàm này dùng để hiển thị popup
         * @param: {Object}  options - Các tham số truyền vào  {message, icon, okButton, cancelButton}
         * Author: AnhDV 22/09/2022
         */
        show(opts = {}) {
            this.message = opts.message
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            if (opts.okButton) {
                this.okButton = opts.okButton
            }
            if (opts.closeButton) {
                this.closeButton = opts.closeButton
            }
            if (opts.icon) {
                this.icon = opts.icon
            }
            // gọi hàm show của v-modal
            this.$refs.popup.open()

            // Trả về promise để người gọi có thể lấy kết quả
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)

        },

        _close() {
            this.$refs.popup.close()
        }
    },
}
</script>

<style lang="scss" scoped>
.v {
    &__popup {
        padding: 32px;
        min-width: 444px;
        width: 444px;
    }

    &__popup--body {
        display: flex;
        justify-content: flex-start;
    }

    &__popup--text {
        overflow: auto;
        max-height: 400px;
        margin-bottom: 32px;
        padding-left: 16px;
        padding-top: 12px;
    }

    &-line {
        height: 1px;
        background: #b8bcc3;
        margin-bottom: 20px;
    }

    &__popup--footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.footer {
    &__left {
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
</style>
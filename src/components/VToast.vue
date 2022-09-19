<template>
    <div class="v-toast">
        <TransitionGroup name="v">
            <div class="v-toast__content" v-for="item in toasts" :key="item.id" @mouseover="pauseProgress(item)"
                @mouseleave="resumeProgress(item)">
                <template v-if="item.timeout > 0 && item.showProgress">
                    <div class="v-toast__content__icon" :class="item.type">
                        <div class="v-icon" :class="getIcon(item.type)">
                        </div>
                    </div>
                    <div class="v-toast__content__text">
                        <div class="v-toast__content__message">
                            <span :style="{'color': colorMessage[item.type]}">{{noticeMessage[item.type]}}!</span>
                            {{item.message}}
                        </div>
                        <!-- <div class="v-toast__content__action" v-if="item.type === 'success'">
                            <span>Hoàn tác</span>
                        </div> -->
                    </div>
                    <div class="v-toast__content__button">
                        <div class="v-icon" :class="getIcon('x')" @click="removeMessage(item)"></div>
                    </div>
                </template>
            </div>
        </TransitionGroup>
    </div>
</template>


<script>

/**
 * Khai báo màu sắc của các loại thông báo
 * Author: AnhDV 10/09/2022
 */
const colorMessage = {
    'success': '#4caf50',
    'error': '#f44336',
    'warning': '#ff9800',
    'info': '#2196f3',
}
/**
 * Khai báo nội dung của các loại thông báo
 * Author: AnhDV 10/09/2022
 */
const noticeMessage = {
    'success': 'Thành công',
    'error': 'Lỗi',
    'warning': 'Cảnh báo',
    'info': 'Thông tin',
};
export default {
    name: "VToast",
    props: {
        showProgress: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: "info",
        },
        message: {
            type: String,
            default: "Đây là thông báo mang tính nhắc nhở",
        },
        timeout: {
            type: Number,
            default: 3000,
        },
        maxMessage: {
            type: Number,
            default: 5,
        },
        order: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            noticeMessage,
            colorMessage,
            toasts: [],
            count: 0,
        };
    },
    watch: {
        toasts: {
            /**
            * @description: Hàm này dùng để theo giõi nếu số lượng thông báo vượt quá maxMessage
            * @param: {any} 
            * Author: AnhDV 10/09/2022
            */
            handler: function (val) {
                if (val.length > this.maxMessage) {
                    this.toasts.splice(this.maxMessage);
                }
            },
            deep: true,
        },
    },
    created() {
        /**
         * Tạo API để truyên thông báo từ các component khác
         * Author: AnhDV 10/09/2022
         */
        let toast = {
            success: (message, options = { timeout: 3000 }) => {
                this.addMessage(message, "success", options);
            },
            error: (message, options = { timeout: 3000 }) => {
                this.addMessage(message, "error", options);
            },
            warning: (message, options = { timeout: 3000 }) => {
                this.addMessage(message, "warning", options);
            },
            info: (message, options = { timeout: 3000 }) => {
                this.addMessage(message, "info", options);
            },
        };
        this.$root.$toast = toast;
    },
    methods: {
        /**
         * Dùng để thêm thông báo vào danh sách thông báo hiển thị
         * @param {*} message - Thông báo 
         * @param {*} type  - Loại thông báo
         * @param {*} options - Các thông số khác
         */
        addMessage(message, type, options = {}) {
            // Khởi tạo mặc định giá trị cho 1 toast message
            var messageData = {
                id: this.count++,
                message: message,
                type: type,
                timeout: this.timeout,
                showProgress: this.showProgress,
                paused: false,
                order: this.order,
                progress: 0,
                animationFrame: null,
            };

            // Gán giá trị cho các thuộc tính của toast message
            messageData = Object.assign(messageData, options);

            // Kiểm tra xem lựa chọn khi có thông báo mới thêm vào sau hay trước
            if (messageData.order) {
                this.toasts.push(messageData);
            } else {
                this.toasts.unshift(messageData);
            }
            // Nếu thời gian hiển thị thông báo lớn hơn 0 thì bắt xử lý tiến trình
            if (messageData.timeout > 0) {
                this.startProgress(messageData);
            } else {
                messageData.showProgress = false;
            }
        },
        /**
         * Bắt đầu xử lý tiến trình thông báo
         * @param {*} messageData 
         * Author: AnhDV 10/09/2022
         */
        startProgress(messageData, startFrom = 0) {
            const self = this;

            // lấy thời gian bắt đầu xuât hiện thông báo
            const startTime = performance.now();

            const start = () => {

                // cho phép gọi tới animationFrame để tính toán thời gian hiển thị thông báo
                messageData.animationFrame = requestAnimationFrame((timestamp) => {

                    // tính toán thời gian đã trôi qua từ khi thông báo xuất hiện
                    const timeElapsed = timestamp - startTime + startFrom;
                    self.time = timeElapsed;
                    // kiểm tra xem thông báo đã bị xóa chưa hoặc người dùng đã 
                    // tạm dừng thông báo bằng cách di chuột qua thông báo hay chưa
                    if (!self.isToast(messageData) || messageData.paused) {
                        // dừng xử lý tiến trình thông báo và hủy yêu cầu gọi animationFrame
                        cancelAnimationFrame(messageData.animationFrame);
                        return;
                    } else if (timeElapsed < messageData.timeout) {
                        // nếu thời gian hiển thị thông báo chưa đạt đến thời gian timeout
                        // thì cập nhật lại tiến trình thông báo
                        messageData.progress = timeElapsed / messageData.timeout;

                        // tiếp tục xử lý tiến trình thông báo
                        start();
                    } else {
                        // nếu thời gian hiển thị thông báo đã đạt đến thời gian timeout thì đặt tiến trình thông báo là 100%
                        messageData.progress = 1;

                        // hủy yêu cầu gọi tới animationFrame của thông báo
                        cancelAnimationFrame(messageData.animationFrame);

                        // xóa thông báo
                        self.removeMessage(messageData);
                        return;
                    }
                });
            }

            // bắt đầu xử lý tiến trình thông báo
            start();
        },
        /**
         * Dừng xử lý tiến trình thông báo
         * @param {*} messageData 
         * Author: AnhDV 10/09/2022
         */
        pauseProgress(messageData) {
            // Nếu thông báo đang được hiển thị thì dừng xử lý tiến trình thông báo
            if (messageData.timeout > 0) {
                messageData.paused = true;
                cancelAnimationFrame(messageData.animationFrame);
            }
        },
        /**
        * Tiếp tục xử lý tiến trình thông báo
        * @param {*} messageData 
        * Author: AnhDV 10/09/2022
        */
        resumeProgress(messageData) {
            // Nếu thông báo đang được hiển thị thì tiếp tục xử lý tiến trình thông báo
            if (messageData.timeout > 0) {
                messageData.paused = false;
                this.startProgress(messageData, messageData.progress * messageData.timeout);
            }
        },
        /**
        * Xóa 1 toast khỏi danh sách các toast
        * @param {*} messageData 
        * Author: AnhDV 10/09/2022
        */
        removeMessage(messageData) {
            this.toasts = this.toasts.filter((toast) => toast.id !== messageData.id);
        },
        /**
        * Lấy ra các icon tương ứng với từng loại toast
        * @param {string} type loại toast
        * Author: AnhDV 10/09/2022
        */
        getIcon(type) {
            return `v-toast-icon-${type}`;
        },
        /**
         * Kiểm tra xem thông báo có nằm trong danh sách các thông báo hiển thị hay không
         * @param {*} messageData
         * Author: AnhDV 10/09/2022
         */
        isToast(messageData) {
            return this.toasts.some((toast) => toast.id === messageData.id);

        },
    }
}
</script>

<style lang="scss" scoped>
.v-move,
/* apply transition to moving elements */
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.v-leave-active {
    position: absolute;
}


.v {
    &-toast {
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 9999;
        font-size: 14px;

        &-icon {

            &-success {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -1602px -258px;
                width: 20px;
                height: 20px;
            }

            &-error {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -538px -146px;
                width: 20px;
                height: 20px;
            }

            &-warning {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -593px -145px;
                width: 22px;
                height: 23px;
            }

            &-info {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -873px -145px;
                width: 22px;
                height: 22px;

            }

            &-x {
                background: url('@/assets/img/Sprites.64af8f61.svg') no-repeat -1178px -362px;
                width: 12px;
                height: 12px;
            }

        }
    }

    &-toast__content {
        align-items: center;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        display: flex;
        height: 56px;
        margin-top: 18px;
        max-width: 650px;
        min-width: 450px;
        padding: 16px;
    }

    &-toast__content__icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;

        &.info {
            background-color: $bg-info;
        }
    }

    &-toast__content__text {
        padding: 0 16px 0 8px;
        flex-shrink: 0;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;

        span {
            font-weight: 600;
        }
    }

    &-toast__content__message {}

    &-toast__content__action {
        span {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    &-toast__content__button {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        flex-shrink: 0;
    }




    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(calc(100% + 20px));
        }

        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
}
</style>
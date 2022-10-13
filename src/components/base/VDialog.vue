<template>
    <v-modal :isShow="isShow" :tabIndex="tabIndex">
        <div class="v-dialog">
            <div class="v-dialog__content" ref="dialog-content" @mousedown="startDrag" @mousemove="drag"
                @mouseup="stopDrag">
                <div class="v-dialog__header" @mousemove="stopDrag">
                    <div class="v-dialog__title">
                        <slot name="title"></slot>
                    </div>
                    <div class="v-dialog__close">
                        <div class="ms-24 ms-icon ms-icon-help" :tooltip="$t('action_form.help') +' (F1)'"></div>
                        <div class="ms-24 ms-icon ms-icon-close" :tooltip="$t('action_form.close') +' (ESC)'"
                            @click="onHandleClose"></div>
                    </div>
                </div>
                <div class="v-dialog__body" @mousemove="stopDrag">
                    <slot name="body"></slot>
                </div>
                <div v-if="line" class="v-line"></div>
                <div class="v-dialog__footer">
                    <div class="footer__right" @mousemove="stopDrag">
                        <slot name="footer__right"></slot>
                    </div>
                    <div class="footer__left" @mousemove="stopDrag">
                        <slot name="footer__left"></slot>
                    </div>
                </div>
            </div>
        </div>
    </v-modal>
</template>

<script>
export default {
    name: "VDialog",
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        line: {
            type: Boolean,
            default: true
        },
        tabIndex: {
            type: Number,
            default: 0
        }
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
            this.draggable = false;
        },
        /**
         * @description: Hàm đóng dialog
         * Author: AnhDV 11/09/2022
         */
        onHandleClose() {
            this.$emit("close");
        },
    },
}
</script>
<style lang="scss" >
@import '@/assets/scss/base/dialog.scss';
</style>
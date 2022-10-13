<template>
    <transition name="fade">
        <div class="modal" v-if="isVisible" ref="modal" :tabindex="tabIndex">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "VModal",
    props: {
        isShow: { // Modal có show hay không
            type: Boolean,
            default: false,
        },
        tabIndex: { // Tab index của modal
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        isVisible: false, // Modal có hiển thị hay không
    }),
    watch: {
        /**
         * @description: Khi isShow thay đổi thì thay đổi isVisible
         * @param: {any} 
         * Author: AnhDV 14/10/2022
         */
        isShow: function (val) {
            if (val) {
                this.open();
            } else {
                this.close();
            }
        },
    },

    methods: {
        /**
         * @description: Hàm này dùng để mở modal
         * Author: AnhDV 07/10/2022
         */
        open() {
            this.isVisible = true;
            this.$nextTick(() => {
                this.oldFocus = document.activeElement; // Lấy element đang focus
                this.$refs.modal.focus(); // Focus vào modal
            });
        },
        /**
        * @description: Hàm này dùng để đóng modal (nếu có tab index thì sẽ set lại tab index cũ)
        * Author: AnhDV 07/10/2022
        */
        close() {
            this.isVisible = false
            if (this.oldFocus) {
                this.oldFocus.focus();
            }
        },
    },
}
</script>

<style  lang="scss" scoped>
@import "@/assets/scss/base/modal.scss";
</style>
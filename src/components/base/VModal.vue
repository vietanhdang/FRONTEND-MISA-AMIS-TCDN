<template>
    <transition name="fade">
        <div class="modal" v-if="isVisible" :tabindex="tabIndex" ref="modal">
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
            default: -1,
        },
    },
    data: () => ({
        isVisible: false,
    }),
    watch: {
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
            this.isVisible = true
            this.$nextTick(() => {
                this.$refs.modal.focus()
            })
        },
        /**
         * @description: Hàm này dùng để đóng modal
         * Author: AnhDV 07/10/2022
         */
        close() {
            this.isVisible = false
        },
    },
}
</script>

<style  lang="scss" scoped>
@import "@/assets/scss/base/modal.scss";
</style>
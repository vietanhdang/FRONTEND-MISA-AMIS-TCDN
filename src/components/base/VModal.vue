<template>
    <transition name="fade">
        <div class="modal" v-if="isVisible">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "VModal",
    data: () => ({
        isVisible: false,
    }),

    methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    },
}
</script>

<style  lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background: #fff;
    border-radius: 2px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    min-width: 444px;
    margin-left: auto;
    margin-right: auto;
}
</style>
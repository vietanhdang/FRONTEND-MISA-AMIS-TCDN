<template>
    <div class="v-tooltip" @mousemove="onMouseOver" @mouseleave="onMouseLeave" @mousedown="onMouseDown">
        <span v-if="content" class="v-tooltip__text" ref="tooltip" :class="isShow ? 'show' : ''">
            {{content}}
        </span>
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: {
        content: {
            type: String,
        },
        top: {
            type: Number,
            default: 20,
        },
        left: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            isShow: false,
            isMouseDown: false,
        }
    },
    methods: {
        /**
        * @description: Hàm này dùng để ẩn tooltip khi hover ra và set lại giá trị isMouseDown = false để cho phép hiển thị tooltip khi hover vào
        * Author: AnhDV 14/09/2022
        */
        onMouseLeave() {
            this.isShow = false;
            this.isMouseDown = false;
        },
        /**
         * @description: Hàm này dùng để ẩn tooltip khi click vào và set lại giá trị isMouseDown = true để không cho phép hiển thị tooltip khi hover vào
         * Author: AnhDV 14/09/2022
         */
        onMouseDown() {
            this.isShow = false;
            this.isMouseDown = true;
        },
        /**
         * @description: Hàm này dùng để hiển thị tooltip khi hover vào
         * Author: AnhDV 14/09/2022
         */
        onMouseOver(event) {
            if (!this.isMouseDown) { // nếu isMouseDown = false thì mới cho phép hiển thị tooltip
                this.isShow = true;
                const { clientX, clientY } = event; // lấy tọa độ của chuột
                const tooltip = this.$refs.tooltip;
                if (tooltip) {
                    // tạo tooltip ở dưới vị trí của chuột
                    tooltip.style.top = clientY + this.top + "px";
                    tooltip.style.left = clientX + this.left + "px";
                }
            }
        },
    },
};
</script>
<style scoped lang="scss">
@import '@/assets/scss/base/tooltip.scss';
</style>
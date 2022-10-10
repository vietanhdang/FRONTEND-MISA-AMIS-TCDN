<template>

    <div class="v-tooltip" :class="`${fixed ? position : ''}`" @mouseenter="onMouseOver" @mouseleave="onMouseLeave"
        ref="tooltipParent">
        <span v-if="content && showTooltip" class="v-tooltip__text" ref="tooltip" :class="isShow ? 'show' : ''"
            :style="style">
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
        position: {
            type: String,
            default: 'auto',
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        minWidth: {
            type: Number,
            default: 0,
        },
        equalWidth: {
            type: Boolean,
            default: false,
        },
        maxWidth: {
            type: Number,
            default: 0,
        },
        showTooltip: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isShow: false,
            tooltipWidth: 0,
        }
    },
    methods: {
        /**
         * @description: Hàm này dùng để hiển thị tooltip khi hover vào
         * Author: AnhDV 14/09/2022
         */
        onMouseOver(event) {
            this.isShow = true;
            const { clientX, clientY } = event; // lấy tọa độ của chuột
            const tooltip = this.$refs.tooltip;
            if (tooltip) {
                if (this.fixed) { // Nếu có truyền fixed vào thì set tọa độ cho tooltip
                    tooltip.style.position = 'absolute';
                    if (this.minWidth > 0) {
                        tooltip.style.transform = `translate(-25%,-50%)`;
                    }
                    return;
                }
                if (this.equalWidth) {
                    tooltip.style.transform = `translateY(150%)`;
                    tooltip.style.padding = '0 5px';
                    return;
                }
                // tạo tooltip ở dưới vị trí của chuột
                const { width, height } = tooltip.getBoundingClientRect(); // lấy width và height của tooltip
                switch (this.position) { // set tọa độ cho tooltip
                    case 'top':
                        tooltip.style.left = `${Math.round(clientX - width / 2)}px`;
                        tooltip.style.top = `${Math.round(clientY - height - 10)}px`;
                        break;
                    case 'bottom':
                        tooltip.style.left = `${Math.round(clientX - width / 2)}px`;
                        tooltip.style.top = `${Math.round(clientY + 10)}px`;
                        break;
                    case 'left':
                        tooltip.style.left = `${Math.round(clientX - width - 10)}px`;
                        tooltip.style.top = `${Math.round(clientY - height / 2)}px`;
                        break;
                    case 'right':
                        tooltip.style.left = `${Math.round(clientX + 10)}px`;
                        tooltip.style.top = `${Math.round(clientY - height / 2)}px`;
                        break;
                    default:
                        tooltip.style.position = 'fixed';
                        tooltip.style.top = `${clientY + 10}px`;
                        tooltip.style.left = `${clientX + 10}px`;
                        break;
                }
            }
        },
        /**
         * @description: Hàm này dùng để ẩn tooltip khi hover ra
         * Author: AnhDV 14/09/2022
         */
        onMouseLeave() {
            this.isShow = false;
        }
    },
    computed: {
        /**
         * @description: Hàm này dùng để set style cho tooltip
         * Author: AnhDV 14/09/2022
         */
        style() {
            return {
                minWidth: `${this.minWidth}px`,
                width: `${this.equalWidth ? 'auto' : ''}`,
            }
        }
    },
};
</script>
<style scoped lang="scss">
@import '@/assets/scss/base/tooltip.scss';

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
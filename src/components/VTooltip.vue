<template>
    <div :class="`tooltip ${position}`" @mouseenter="onMouseOver" @mouseleave="onMouseLeave">
        <span class="tooltip-text" ref="tooltip" :class="isShow ? 'show' : ''">{{content}}</span>
        <slot></slot>
    </div>
</template>
  
  
<script>
export default {
    props: {
        content: String,
        position: {
            type: String,
            default: 'right',
        },
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        onMouseOver() {
            this.isShow = true;
            const { clientX, clientY } = event; // lấy tọa độ của chuột
            const tooltip = this.$refs.tooltip;
            if (tooltip) {
                const { width, height } = tooltip.getBoundingClientRect(); // lấy kích thước của tooltip bao gồm cả padding và border
                switch (this.position) {
                    case 'top':
                        tooltip.style.left = `${clientX - width / 2}px`;
                        tooltip.style.top = `${clientY - height - 10}px`;
                        break;
                    case 'bottom':
                        tooltip.style.left = `${clientX - width / 2}px`;
                        tooltip.style.top = `${clientY + 10}px`;
                        break;
                    case 'left':
                        tooltip.style.left = `${clientX - width - 10}px`;
                        tooltip.style.top = `${clientY - height / 2}px`;
                        break;
                    case 'right':
                        tooltip.style.left = `${clientX + 10}px`;
                        tooltip.style.top = `${clientY - height / 2}px`;
                        break;
                }
            }
        },
        onMouseLeave() {
            this.isShow = false;
        }
    }
};
</script>
<style scoped lang="scss">
.tooltip {
    position: relative;

    /* display: inline-block; */
    .tooltip-text {
        visibility: hidden;
        max-width: 200px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding: 4px 8px;
        position: fixed;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;

        &::after {
            content: "";
            position: absolute;

        }

        &.show {
            visibility: visible;
            opacity: 1;
        }

    }
}
</style>
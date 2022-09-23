<template>
    <div class="tooltip" :class="`${fixed ? position : ''}`" @mouseenter="onMouseOver" @mouseleave="onMouseLeave">
        <span v-if="content && showTooltip" class="tooltip-text" ref="tooltip" :class="isShow ? 'show' : ''"
            :style="style">{{content}}</span>
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
            default: 'right',
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        minWidth: {
            type: Number,
            default: 0,
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
            isShow: false
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
                const { width, height } = tooltip.getBoundingClientRect(); // lấy width và height của tooltip
                switch (this.position) {
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
                    case 'auto':
                        tooltip.style.left = `${Math.round(clientX - width / 2)}px`;
                        tooltip.style.top = `${Math.round(clientY + 10)}px`;
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
            }
        }
    }
};
</script>
<style scoped lang="scss">
.tooltip {
    position: relative;

    .tooltip-text {
        visibility: hidden;
        width: 100px;
        background-color: #555;
        color: #fff;
        text-align: center;
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

    &:hover {
        .tooltip-text {
            visibility: visible;
            opacity: 1;
        }
    }
}

.top {
    .tooltip-text {
        bottom: 125%;
        left: 50%;
        margin-left: -60px;

        &::after {
            // margin-left: -5px;
            left: 50%;
            top: 100%;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }
    }
}

.right {
    .tooltip-text {
        top: -5px;
        left: 110%;

        &::after {
            top: 50%;
            margin-top: -5px;
            right: 100%;
            border-width: 5px;
            border-style: solid;
            border-color: transparent #555 transparent transparent;
        }
    }
}

.bottom {
    .tooltip-text {
        top: 125%;
        left: 50%;
        margin-left: -60px;

        &::after {
            // margin-left: -5px;
            bottom: 100%;
            left: 50%;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent #555 transparent;
        }
    }
}

.left {
    .tooltip-text {
        top: -5px;
        right: 110%;

        &::after {
            top: 50%;
            margin-top: -5px;
            left: 100%;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent #555;
        }
    }
}
</style>
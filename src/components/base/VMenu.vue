<template>
    <div class="v-menu" :class="{'v-menu__content--show': isVisible}">
        <div class="v-menu__main">
            <div class="v-menu__button" @mousedown="handleSelect({key:'edit'})">{{$t('action.edit')}}</div>
            <div class="v-menu__dropdown">
                <div class="v-menu__icon" @click="open" @blur="close" tabindex="-1">
                    <div class="v-menu__line"></div>
                    <div class="ms-16 ms-icon ms-icon-arrow-down" :tooltip="$t('action.more_action')" position="left">
                    </div>
                </div>
                <Transition name="slide">
                    <div class="v-menu__content" v-if="isVisible" :class="[{'v-menu__content--up': isUp}]"
                        ref="content">
                        <div class="v-menu__item" v-for="(item, index) in items" :key="index"
                            @mousedown="handleSelect(item)">
                            {{ item.value }}
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        propKey: { // Key của menu
            required: true,
        },
        isUp: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isVisible: false,
        }
    },
    methods: {
        /**
         * @description: Hàm này dùng để mở dropdown
         * Author: AnhDV 25/09/2022
         */
        open() {
            this.isVisible = true
        },

        /**
         * @description: Hàm này dùng để đóng dropdown
         * Author: AnhDV 25/09/2022
         */
        close() {
            this.isVisible = false
        },

        /**
         * @description: Hàm này dùng để xử lý khi chọn item
         * Author: AnhDV 03/10/2022
         */
        handleSelect(item) {
            this.$emit('onSelect', {
                key: item.key,
                value: this.propKey,
            });
            this.close()
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/menu.scss";
</style>
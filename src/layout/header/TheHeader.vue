<template>
    <div class="header" :class="{'collapsed': collapsed}">
        <div class="header__left">
            <div class="header__left-menu"></div>
            <div class="header__left-logo"></div>
        </div>
        <div class="header__right">
            <div class="header__right__user">
                <div class="header__right__user--info">
                    <div class="header__right__avatar"></div>
                    <div class="header__right__name">
                        <p>Đặng Việt Anh</p>
                    </div>
                    <div class="header__right__setting">
                    </div>
                </div>
                <div class="header__right__user--notification">
                </div>
            </div>
            <div class="header__right__info">
                <div class="header__right__menu" @click="toggleSidebar">
                </div>
                <v-combobox :data="[{ key: '1', value: 'CÔNG TY THHN SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC', },
                { key: '2', value: 'CÔNG TY CỔ PHẦN MISA', },
                { key: '3', value: 'CÔNG TY TNHH DỊCH VỤ AN PHÁT', },
                ]" position="bottom" propKey="key" propValue="value" defaultSelected="2"
                    :styleProps="['border: none']" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },
    },
}
</script>
<style lang="scss" scoped>
.header {

    &.collapsed {
        .header__left {
            transition: width .3s ease-in-out;
            width: 74px;

            .header__left-logo {
                display: none;
            }
        }

        .content {
            max-width: calc(100% - 74px);
        }
    }
}
</style>

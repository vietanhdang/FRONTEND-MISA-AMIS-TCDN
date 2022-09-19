<template>
    <div class="header">
        <div class="d-flex align-items-center">
            <div class="ms-24 ms-icon ms-icon-three-stripes ml-x-2" @click="toggleSidebar" v-if="!collapsed"></div>
            <div class="ml-l-2 font-weight-600 font-size-13">CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
            </div>
            <button class="pl-x-2 bg-color-white border-none">
                <div class="ms-14 ms-icon ms-icon-chevron-big-down"></div>
            </button>
        </div>
        <div class="d-flex align-items-center">
            <v-tooltip content="Thông báo">
                <div class="ms-24 ms-icon ms-icon-bell"></div>
            </v-tooltip>
            <div class="header__user d-flex align-items-center p-x-3 ml-r-3">
                <div class="ms-32 ms-icon ms-round ms-icon-small-user ms-l-2"></div>
                <div class="m-2 font-weight-600 font-size-13 cursor-pointer">Đặng Việt Anh</div>
                <div class="ms-14 ms-icon ms-icon-chevron-down"></div>
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
<template>
    <div class="sidebar" :class="{ 'collapsed': collapsed }">
        <div class="ms-48 d-flex align-items-center justify-content-center" :class="{ 'width-100': collapsed }"
            v-if="collapsed" @click="$emit('toggleSidebar')">
            <v-tooltip :content="$t('sidebar.menu_action.expand')">
                <div class="ms-16 ms-icon ms-icon-three-stripes--white">
                </div>
            </v-tooltip>
        </div>
        <div class="sidebar__header">
            <div class="ms-24 ms-icon ms-icon-nine-dots ml-r-2"></div>
            <div class="sidebar__logo">
                <img src="@/assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="logo" />
            </div>
        </div>
        <div class="sidebar__content">
            <div class="sidebar__item__list">
                <div v-for="(item, index) of routerLinks" :key="index">
                    <VRouterLink :link="item.path" :content="item.sideBar.title" :icon="item.sideBar.icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
const routers = router.options.routes;
export default {
    name: "TheSidebar",
    props: {
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /**
         * @description: Hàm này trả về kiểm tra xem trong router có sideBar hay không nếu có thì sort theo order và trả về danh sách gồm các router-link vả title
         * @return {Array} Trả về mảng các router-link và title
         * 
         * Author: AnhDV 26/09/2022
         */
        routerLinks() {
            let routes = routers.filter((item) => {
                return item.sideBar;
            });
            routes.sort((a, b) => {
                return a.sideBar.order - b.sideBar.order;
            });
            return routes;
        },
    },
}
</script>
<style lang="scss" scoped>

</style>>



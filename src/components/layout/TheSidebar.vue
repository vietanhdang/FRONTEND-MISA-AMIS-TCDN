<template>
    <div class="sidebar" :class="{ 'collapsed': collapsed }">
        <div class="ms-48 d-flex align-items-center justify-content-center" v-if="collapsed"
            @click="$emit('toggleSidebar')">
            <div class="ms-16 ms-icon ms-icon-three-stripes--white">
            </div>
        </div>
        <div class="sidebar__header">
            <div class="ms-24 ms-icon ms-icon-nine-dots ml-r-2"></div>
            <div class="sidebar__logo">
                <img src="@/assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="logo" />
            </div>
        </div>
        <div class="sidebar__content">
            <div class="sidebar__item__list">
                <template v-for="(item, index) of routerLinks" :key="index">
                    <VRouterLink :link="item.path" :content="item.sideBar.title" :icon="item.sideBar.icon" />
                </template>

                <!-- <v-tooltip content="Tổng quan">
                    <router-link to="/tong-quan" class="sidebar__item" data-tooltip="Tổng quan">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-dashboard"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tổng quan
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Tiền mặt">
                    <router-link to="/nhan-vien" class="sidebar__item" data-tooltip="Tiền mặt">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-cash"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tiền mặt
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Tiền gửi">
                    <router-link to="/tien-gui" class="sidebar__item" data-tooltip="Tiền gửi">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-bank"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tiền gửi
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Mua hàng">
                    <router-link to="/mua-hang" class="sidebar__item" data-tooltip="Mua hàng">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-buy"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Mua hàng
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Bán hàng">
                    <router-link to="/ban-hang" class="sidebar__item" data-tooltip="Bán hàng">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-sell"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Bán hàng
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Quản lý hóa đơn">
                    <router-link to="/quan-ly-hoa-don" class="sidebar__item" data-tooltip="Quản lý hóa đơn">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-bill"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Quản lý hóa đơn
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Kho">
                    <router-link to="/quan-ly-kho" class="sidebar__item" data-tooltip="Quản lý kho">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-warehouse"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Kho
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Công cụ dụng cụ">
                    <router-link to="/cong-cu" class="sidebar__item" data-tooltip="Công cụ dụng cụ">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-tool"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Công cụ dụng cụ
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Tài sản cố định">
                    <router-link to="/tai-san-co-dinh" class="sidebar__item" data-tooltip="Tài sản cố định">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-fixed-asset"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tài sản cố định
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content=" Thuế">
                    <router-link to="/thue" class="sidebar__item" data-tooltip="Thuế">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-tax"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Thuế
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Giá thành">
                    <router-link to="/gia-thanh" class="sidebar__item" data-tooltip="Giá thành">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-price"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Giá thành
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Tổng hợp">
                    <router-link to="/tong-hop" class="sidebar__item" data-tooltip="Tổng hợp">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-summary"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tổng hợp
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Ngân sách">
                    <router-link to="/ngan-sach" class="sidebar__item" data-tooltip="Ngân sách">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-budget"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Ngân sách
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Báo cáo">
                    <router-link to="/bao-cao" class="sidebar__item" data-tooltip="Báo cáo">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-report"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Báo cáo
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Phân tích tài chính">
                    <router-link to="/phan-tich-tai-chinh" class="sidebar__item" data-tooltip="Phân tích tài chính">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-analysis"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Phân tích tài chính
                        </div>
                    </router-link>
                </v-tooltip> -->
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



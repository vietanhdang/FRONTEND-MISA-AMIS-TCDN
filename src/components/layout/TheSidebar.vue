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
                <v-tooltip content="Tổng quan">
                    <router-link to="/nhan-vien" class="sidebar__item" data-tooltip="Tổng quan">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-dashboard"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tổng quan
                        </div>
                    </router-link>
                </v-tooltip>
                <v-tooltip content="Tiền mặt">
                    <a class="sidebar__item" data-tooltip="Tiền mặt">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-cash"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tiền mặt
                        </div>
                    </a>
                </v-tooltip>
                <v-tooltip content="Tiền gửi">
                    <a class="sidebar__item" data-tooltip="Tiền gửi">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-bank"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tiền gửi
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Mua hàng">
                    <a class="sidebar__item" data-tooltip="Mua hàng">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-buy"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Mua hàng
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Bán hàng">
                    <a class="sidebar__item" data-tooltip="Bán hàng">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-sell"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Bán hàng
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Quản lý hóa đơn">
                    <a class="sidebar__item" data-tooltip="Quản lý hóa đơn">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-bill"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Quản lý hóa đơn
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Kho">
                    <a class="sidebar__item" data-tooltip="Quản lý kho">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-warehouse"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Kho
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Công cụ dụng cụ">
                    <a class="sidebar__item" data-tooltip="Công cụ dụng cụ">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-tool"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Công cụ dụng cụ
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Tài sản cố định">
                    <a class="sidebar__item" data-tooltip="Tài sản cố định">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-fixed-asset"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tài sản cố định
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content=" Thuế">
                    <a class="sidebar__item" data-tooltip="Thuế">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-tax"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Thuế
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Giá thành">
                    <a class="sidebar__item" data-tooltip="Giá thành">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-price"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Giá thành
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Tổng hợp">
                    <a class="sidebar__item" data-tooltip="Tổng hợp">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-summary"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Tổng hợp
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Ngân sách">
                    <a class="sidebar__item" data-tooltip="Ngân sách">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-budget"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Ngân sách
                        </div>
                    </a>
                </v-tooltip>

                <v-tooltip content="Báo cáo">
                    <a class="sidebar__item" data-tooltip="Báo cáo">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-report"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Báo cáo
                        </div>
                    </a>
                </v-tooltip>
                <v-tooltip content="Phân tích tài chính">
                    <a class="sidebar__item" data-tooltip="Phân tích tài chính">
                        <div class="sidebar__item--icon">
                            <div class="ms-icon ms-icon-analysis"></div>
                        </div>
                        <div class="sidebar__item--text">
                            Phân tích tài chính
                        </div>
                    </a>
                </v-tooltip>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheSidebar",
    props: {
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style lang="scss" scoped>
.sidebar {

    .router-link-active {
        border-left-color: #2ca01c;
        background-color: #58595D;

        .sidebar__item--icon {
            div {
                opacity: 1;
            }
        }

        .sidebar__item--text {
            font-family: 'MISA Fonts Bold';
        }
    }

    &.collapsed {

        width: 52px;

        .sidebar__header {
            display: none;
        }

        .sidebar__item__list {
            .sidebar__item {
                .sidebar__item--text {
                    display: none;
                }
            }
        }
    }
}
</style>>



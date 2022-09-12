<template>
    <div class="navbar" :class="{ 'collapsed': collapsed }">
        <div class="navbar__item__list">
            <v-tooltip content="Tổng quan">
                <router-link to="/nhan-vien" class="navbar__item" data-tooltip="Tổng quan">
                    <div class="navbar__item--icon">
                        <div class="icon-dashboard"></div>
                    </div>
                    <div class="navbar__item--text">
                        Tổng quan
                    </div>
                </router-link>
            </v-tooltip>
            <v-tooltip content="Tiền mặt">
                <router-link to="/khach-hang" class="navbar__item" data-tooltip="Tiền mặt">
                    <div class="navbar__item--icon">
                        <div class="icon-cash"></div>
                    </div>
                    <div class="navbar__item--text">
                        Tiền mặt
                    </div>
                </router-link>
            </v-tooltip>
            <v-tooltip content="Tiền gửi">
                <a class="navbar__item" data-tooltip="Tiền gửi">
                    <div class="navbar__item--icon">
                        <div class="icon-bank"></div>
                    </div>
                    <div class="navbar__item--text">
                        Tiền gửi
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Mua hàng">
                <a class="navbar__item" data-tooltip="Mua hàng">
                    <div class="navbar__item--icon">
                        <div class="icon-buy"></div>
                    </div>
                    <div class="navbar__item--text">
                        Mua hàng
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Bán hàng">
                <a class="navbar__item" data-tooltip="Bán hàng">
                    <div class="navbar__item--icon">
                        <div class="icon-sell"></div>
                    </div>
                    <div class="navbar__item--text">
                        Bán hàng
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Quản lý hóa đơn">
                <a class="navbar__item" data-tooltip="Quản lý hóa đơn">
                    <div class="navbar__item--icon">
                        <div class="icon-bill"></div>
                    </div>
                    <div class="navbar__item--text">
                        Quản lý hóa đơn
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Kho">
                <a class="navbar__item" data-tooltip="Quản lý kho">
                    <div class="navbar__item--icon">
                        <div class="icon-warehouse"></div>
                    </div>
                    <div class="navbar__item--text">
                        Kho
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Công cụ dụng cụ">
                <a class="navbar__item" data-tooltip="Công cụ dụng cụ">
                    <div class="navbar__item--icon">
                        <div class="icon-tool"></div>
                    </div>
                    <div class="navbar__item--text">
                        Công cụ dụng cụ
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Tài sản cố định">
                <a class="navbar__item" data-tooltip="Tài sản cố định">
                    <div class="navbar__item--icon">
                        <div class="icon-fixed-asset"></div>
                    </div>
                    <div class="navbar__item--text">
                        Tài sản cố định
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content=" Thuế">
                <a class="navbar__item" data-tooltip="Thuế">
                    <div class="navbar__item--icon">
                        <div class="icon-tax"></div>
                    </div>
                    <div class="navbar__item--text">
                        Thuế
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Giá thành">
                <a class="navbar__item" data-tooltip="Giá thành">
                    <div class="navbar__item--icon">
                        <div class="icon-price"></div>
                    </div>
                    <div class="navbar__item--text">
                        Giá thành
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Tổng hợp">
                <a class="navbar__item" data-tooltip="Tổng hợp">
                    <div class="navbar__item--icon">
                        <div class="icon-summary"></div>
                    </div>
                    <div class="navbar__item--text">
                        Tổng hợp
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Ngân sách">
                <a class="navbar__item" data-tooltip="Ngân sách">
                    <div class="navbar__item--icon">
                        <div class="icon-budget"></div>
                    </div>
                    <div class="navbar__item--text">
                        Ngân sách
                    </div>
                </a>
            </v-tooltip>

            <v-tooltip content="Báo cáo">
                <a class="navbar__item" data-tooltip="Báo cáo">
                    <div class="navbar__item--icon">
                        <div class="icon-report"></div>
                    </div>
                    <div class="navbar__item--text">
                        Báo cáo
                    </div>
                </a>
            </v-tooltip>
            <v-tooltip content="Phân tích tài chính">
                <a class="navbar__item" data-tooltip="Phân tích tài chính">
                    <div class="navbar__item--icon">
                        <div class="icon-analysis"></div>
                    </div>
                    <div class="navbar__item--text">
                        Phân tích tài chính
                    </div>
                </a>
            </v-tooltip>

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
.navbar {

    .router-link-active {
        font-size: 14px;
        font-weight: 700 !important;
        background-color: $bg-grey-bold-active;

        .navbar__item--icon {
            div {
                opacity: 1;
            }
        }
    }

    &.collapsed {
        transition: width .3s ease-in-out;
        width: 74px;

        .navbar__item__list {
            .navbar__item {
                .navbar__item--text {
                    display: none;
                }
            }
        }
    }
}
</style>>



<template>
    <div class="inventory-container">
        <div class="content-header">
            <div class="content-header__info">
                <div class="content-header__title flex-shrink white-space-nowrap">Danh sách hàng hóa, dịch vụ</div>
                <div class="content-header__action">
                    <div class="guide-tour d-flex align-items-center cursor-pointer">
                        <div class="ms-24 ms-icon ms-icon-tour"></div>
                        <div class="guide-tour__text color-blue pl-l-1 flex-shrink white-space-nowrap">Hướng dẫn</div>
                    </div>
                    <v-dropdown className="secondary-light border-bold rounded ms-l-3 "
                        icon="ms-16 ms-icon ms-icon-arrow-down-black opacity-5"
                        :items="[{ key: 'merge', value: 'Gộp VTHH tự động' }]">
                        Tiện ích
                    </v-dropdown>
                    <router-link to="/nhom-vat-tu">
                        <v-button :rounded="true" className="secondary-light border-bold rounded ms-l-3">
                            Nhóm hàng hóa, dịch vụ
                        </v-button>
                    </router-link>
                    <v-dropdown className="primary rounded ms-l-3" icon="ms-16 ms-icon ms-icon-arrow-down-white"
                        :items="[{ key: 'delete', value: 'Xóa' }]" :hasButton="true" @onClick="toggleInventoryForm">
                        Thêm
                    </v-dropdown>
                </div>
            </div>
            <div class="content-header__breadcumb">
                <div class="ms-16 ms-icon ms-icon-chevron-left"></div>
                <router-link to="/quan-ly-kho" class="content-header__breadcumb--text">Tất cả danh mục</router-link>
            </div>
        </div>
        <div class="inventory-body">
            <Transition name="collapse-transition">
                <div class="inventory-overview" v-show="isShowOverview">
                    <div class="inventory-overview__item">
                        <div class="inventory-overview__icon">
                            <v-tooltip content="Bấm vào để lọc">
                                <div class="ms-90 ms-icon ms-icon-minimun-stock"></div>
                            </v-tooltip>
                        </div>
                        <div class="inventory-overview__content">
                            <div class="inventory-overview__number">5</div>
                            <div class="inventory-overview__label">Hàng hóa</div>
                            <div class="inventory-overview__status">Sắp hết hàng</div>
                        </div>
                    </div>
                    <div class="inventory-overvie__line"></div>
                    <div class="inventory-overview__item">
                        <div class="inventory-overview__icon">
                            <v-tooltip content="Bấm vào để lọc">
                                <div class="ms-90 ms-icon ms-icon-over-stock"></div>
                            </v-tooltip>

                        </div>
                        <div class="inventory-overview__content">
                            <div class="inventory-overview__number">41949</div>
                            <div class="inventory-overview__label">Hàng hóa</div>
                            <div class="inventory-overview__status">Hết hàng</div>
                        </div>
                    </div>
                    <div class="inventory-overview__reload">
                        <v-tooltip content="Tải lại số liệu tổng hợp" :equalWidth="true">
                            <div class="ms-16 ms-icon-v2 ms-icon-reload-small"></div>
                        </v-tooltip>
                    </div>
                </div>
            </Transition>
            <div class="inventory-toolbar ">
                <div class="inventory-toolbar__left ms-l-3">
                    <div class="ms-24 ms-icon-v2 ms-icon-arrow-check-all"></div>
                    <v-dropdown className="secondary-light border-bold rounded ms-l-3"
                        icon="ms-16 ms-icon ms-icon-arrow-down-black opacity-5"
                        :items="[{ key: 'delete', value: 'Xóa' }]">
                        Thực hiện hàng loạt
                    </v-dropdown>
                    <v-dropdown className="secondary-light border-bold rounded ms-l-3"
                        icon="ms-16 ms-icon ms-icon-arrow-down-black" :hasContent="true">
                        Lọc
                        <template #content>
                            <InventoryPageFilter :filterPopup="{ isShow: true }" />
                        </template>
                    </v-dropdown>
                </div>
                <div class="inventory-toolbar__right">
                    <v-input placeholder="Tìm theo mã, tên hàng hóa, dịch vụ" icon="ms-16 ms-icon ms-icon-search"
                        :outline="true" :styleProps="['width: 250px', 'font-style: italic']" :focus="true" />
                    <div :tooltip="$t('action.reload_data')" class="ms-24 ms-icon ms-icon-reload ml-l-2">
                    </div>
                    <div class="ms-24 ms-icon-v2 ms-icon-meter ml-l-2"></div>
                    <div :tooltip="$t('action.export_excel')" class="ms-24 ms-icon ms-icon-excel ml-l-2"></div>
                    <div class="ms-24 ms-icon-v2 ms-icon-setting ml-l-2"></div>
                </div>
                <div class="inventory-overview__collapse" @click="toggleOverview">
                    <v-tooltip :content="isShowOverview ? 'Ẩn bảng tổng hợp' : 'Hiện bảng tổng hợp'" :equalWidth="true">
                        <div class="ms-16 ms-icon-v2"
                            :class="isShowOverview ? 'ms-icon-chevron-up--primary' : 'ms-icon-chevron-down--primary'">
                        </div>
                    </v-tooltip>
                </div>

            </div>
            <div class="inventory-table d-flex scrollable">
                <!-- Table hiển thị danh sách nhân viên -->
                <v-table v-model:columns="columns" :data="employeeList.data" @action="handleSelectAction"
                    :actions="tableAction">
                </v-table>
            </div>
            <div class="inventory-pagination">
                <!-- Phân trang -->
                <v-pagination v-model:pageSize="pagination.pageSize" v-model:pageNumber="pagination.pageNumber"
                    v-model:totalRecord="employeeList.totalRecord">
                </v-pagination>
            </div>
        </div>
        <InventoryForm v-model="isShowInventoryForm" />
    </div>
</template>

<script>
import InventoryForm from './InventoryForm.vue'
import InventoryPageFilter from './InventoryPageFilter.vue'
import Enum from "@/utils/enum";
export default {
    name: 'InventoryPage',
    components: {
        InventoryForm,
        InventoryPageFilter
    },
    data() {
        return {
            isShowInventoryForm: false,
            isShowOverview: true,
            employeeList: [], // biến này dùng để lưu danh sách nhân viên
            pagination: {
                pageNumber: 1,
                pageSize: 20,
                keyword: "",
            }, // biến này dùng để lưu thông tin phân trang và tìm kiếm
        }
    },
    watch: {
        /**
         * @description: Lắng nghe sự thay đổi khi người dùng thay đổi liên quan tới phân trang
         * Author: AnhDV 06/10/2022
         */
        pagination: {
            handler: function (newVal) {
                this.getEmployeeList(newVal);
            },
            deep: true,
        },
        /**
         * @description: Theo giõi action key có sẵn
         * @param: {any} 
         * Author: AnhDV 29/10/2022
         */
        '$store.getters.getActionKey': {
            handler(actionKey) {
                if (Enum.ACTION.ADD === actionKey && !this.isShowInventoryForm) {
                    this.toggleInventoryForm(Enum.ACTION.ADD)
                }
            },
            deep: true
        }
    },
    computed: {
        /**
        * @description: Khai báo các cột hiển thị trong table
        * Author: AnhDV 11/10/2022
        */
        columns: {
            get() {
                return [
                    {
                        title: '',
                        key: 'employeeID',
                        fixed: true,
                        checkbox: true,
                        type: 'checkbox',
                        width: "40px",
                    },
                    {
                        title: this.$t(`employee_table.code`),
                        key: 'employeeCode',
                        search: true,
                    },
                    {
                        title: this.$t(`employee_table.name`),
                        key: 'employeeName',
                        width: "200px",
                        search: true,
                    },
                    {
                        title: this.$t(`employee_table.gender`),
                        key: 'gender',
                        type: 'gender',
                    },
                    {
                        title: this.$t(`employee_table.date_of_birth`),
                        key: 'dateOfBirth',
                        textAlign: 'center',
                        type: 'date',

                    },
                    {
                        title: this.$t(`employee_table.identity_card`),
                        key: 'identityNumber',

                    },
                    {
                        title: this.$t(`employee_table.job_title`),
                        key: 'jobTitle',
                        width: "250px",
                    },
                    {
                        title: this.$t(`employee_table.department`),
                        key: 'departmentName',
                        width: "250px",
                    },
                    {
                        title: this.$t(`employee_table.bank_number`),
                        key: 'bankAccountNumber',

                    },
                    {
                        title: this.$t(`employee_table.bank_name`),
                        key: 'bankName',
                        width: "250px",
                    },
                    {
                        title: this.$t(`employee_table.bank_branch`),
                        key: 'bankBranch',
                        width: "250px",
                    },
                    {
                        title: this.$t(`employee_table.action`),
                        key: 'action',
                        type: 'action',
                        fixed: true,
                        textAlign: 'center',
                        width: "120px",
                    },
                ];
            },
            set(value) {
                this.columns = value;
                console.log(this.columns);
            }
        },
        /**
         * @description: Khai báo các action thực hiện trên từng dòng của table
         * Author: AnhDV 11/10/2022
         */
        tableAction: {
            get() {
                return [
                    {
                        'key': Enum.ACTION.DUPLICATE,
                        'value': this.$t('action.duplicate'),
                    },
                    {
                        'key': Enum.ACTION.DELETE,
                        'value': this.$t('action.delete'),
                    },
                    {
                        'key': Enum.ACTION.INACTIVE,
                        'value': this.$t('action.inactive'),
                    }
                ]; // Khởi tạo danh sách action trên từng dòng
            }
        },
        /**
        * @description: Get và set trạng thái của form lưu trữ trong store 
        * Author: AnhDV 08/10/2022
        */
        formMode: {
            set(val) {
                this.$store.dispatch('setMode', val);
            },
            get() {
                return this.$store.getters.getMode;
            },
        },
    },
    methods: {
        /**
        * @description: Hàm này dùng để nhận các action từ table và thực hiện các nghiệp vụ tương ứng
        * Author: AnhDV 27/10/2022
        */
        handleSelectAction(action) {
            switch (action) {
                case Enum.ACTION.DELETE:
                    break;
                case Enum.ACTION.EDIT:
                    break;
                case Enum.ACTION.DUPLICATE:
                    break;
                case Enum.ACTION.INACTIVE:
                    break;
            }
        },
        toggleOverview() {

            this.isShowOverview = !this.isShowOverview
        },

        toggleInventoryForm(formMode) {
            this.formMode = formMode ? formMode : Enum.FORM_MODE.ADD;
            this.isShowInventoryForm = !this.isShowInventoryForm
        },
        /**
         * @description: Hàm này dùng để tải lại danh sách nhân viên
         * Author: AnhDV 07/10/2022
         */
        async reloadData() {
            const self = this;
            const res = await self.getEmployeeList();
            if (res) {
                self.$root.$toast.success(self.$t('notice_message.reload_data_success'));
            } else {
                self.$root.$toast.error(self.$t('notice_message.reload_data_fail'));
            }
        },
        /**
        * @description: Hàm này dùng để lấy danh sách nhân viên
        * Author: AnhDV 19/09/2022
        */
        async getEmployeeList() {
            const self = this;
            try {
                const result = await self.$api.employee.getEmployeesFilter(self.pagination);
                if (result.status == Enum.MISA_CODE.SUCCESS) {
                    self.employeeList = result.data;
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            } catch (error) {
                self.$refs.popup.showError(self.$t('notice_message.get_employee_list_fail'));
                console.log(error);
                return Promise.reject(false);
            }
        },
    },
    created() { // Hàm này chạy khi component được tạo
        const self = this;
        self.getEmployeeList(); // Lấy danh sách nhân viên
        self.Enum = Enum; // Khởi tạo enum
    },
}
</script>

<style lang="scss" scoped>
.collapse-transition-enter,
.collapse-transition-leave-to {
    height: 0;

    opacity: 0;
}

.collapse-transition-enter-active,
.collapse-transition-leave-active {
    transition: all 0.2s ease;
}



.inventory {
    &-container {
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    &-overview {
        height: 120px;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: $white;
    }

    &-body {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    &-overview__collapse {
        border: 2px solid #e2e9f2;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f2f5f8;
        position: absolute;
        width: 26px;
        height: 26px;
        cursor: pointer;
        z-index: 9;
        right: -13px;
        top: -13px;

    }

    &-overview__reload {
        position: absolute;
        right: 0;
        top: 0;
    }

    &-overview__item {
        display: flex;
    }

    &-overview__icon {
        // .ms-icon {
        //     &:hover {
        //         border: 2px solid;
        //         border-radius: 50%;
        //         box-sizing: content-box !important;
        //     }
        // }
    }

    &-overview__content {
        text-align: right;
        margin-left: 30px;
    }

    &-overview__number {
        padding: 4px 0px;
        font-size: 38px;
        line-height: 38px;
    }

    &-overview__label {
        color: #212121;
        font-size: 14px;
        font-weight: 700;
    }

    &-overview__status {
        color: #8c8c8e;
        font-size: 16px;
        text-transform: uppercase;
    }

    &-overvie__line {
        width: 1px;
        height: 90px;
        background: #707070;
        margin: 0px 40px;
    }

    &-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        // margin-bottom: 16px;
        margin-top: 20px;
        position: relative;
        background: #fff;
    }

    &-toolbar__left {
        display: flex;
        align-items: center;
    }

    &-toolbar__right {
        display: flex;
        align-items: center;
    }

    &-table {
        background: #fff;
        flex: 1;
    }
}
</style>
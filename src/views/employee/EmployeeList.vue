<template>
    <div class="employee">
        <div class="employee-header">
            <div class="employee-title">Nhân viên</div>
            <v-button text="Thêm mới nhân viên" @click="handleAction('add')"></v-button>
        </div>
        <div class="employee-body">
            <!-- Các action như search, export, reload -->
            <div class="employee-body__toolbar">
                <div class="employee-body__toolbar-left">
                    <slot name="toolbar-left"></slot>
                </div>
                <div class="employee-body__toolbar-right">
                    <slot name="toolbar-right"></slot>
                    <v-input placeholder="Tìm theo mã, tên nhân viên" icon="icon-search" v-model="keyword"
                        :outline="true" :styleProps="['width: 240px','font-style: italic']"
                        className="v-input__with-icon" />
                    <v-tooltip content="Tải lại dữ liệu" position="bottom" :fixed="true">
                        <div class="ms-24 ms-icon ms-icon-reload ms-r-2 ml-l-2" @click="handleReloadData"></div>
                    </v-tooltip>
                    <v-tooltip content="Xuất ra excel" position="bottom" :fixed="true">
                        <div class="ms-24 ms-icon ms-icon-excel ms-x-2"></div>
                    </v-tooltip>
                </div>
            </div>
            <!-- Table hiển thị danh sách nhân viên -->
            <v-table :columns="columns" :data="employeeList" :options="options" @action="handleAction"
                v-model:pagination="pagination" v-model:dataState="isLoaded">
            </v-table>
        </div>
        <!-- Form sửa và thêm nhân viên -->
        <employee-form v-model="showEmployeeForm" @insertEmployee="insertEmployee" @updateEmployee="updateEmployee">
        </employee-form>
        <!-- Khu vực hiển thị popup và toast thông báo -->
        <v-popup ref="popup"></v-popup>
        <v-toast ref="toast" :showProgress="true"></v-toast>
    </div>
</template>
<script>
import EmployeeForm from './EmployeeForm.vue';
import Enum from "@/utils/enum";
import _ from 'lodash';
export default {
    components: { EmployeeForm },
    data() {
        return {
            options: [
                { key: 10, value: '10 bản ghi trên 1 trang' },
                { key: 20, value: '20 bản ghi trên 1 trang' },
                { key: 30, value: '30 bản ghi trên 1 trang' },
                { key: 50, value: '50 bản ghi trên 1 trang' },
                { key: 100, value: '100 bản ghi trên 1 trang' },
            ], // render các option lựa chọn số bản ghi trên 1 trang
            keyword: "", // biến này dùng để lưu từ khóa tìm kiếm
            showEmployeeForm: false, // biến này dùng để hiển thị form thêm mới hoặc cập nhật nhân viên
            isLoaded: false, // biến này dùng để kiểm tra dữ liệu đã được load hay chưa
            employeeList: [], // biến này dùng để lưu danh sách nhân viên
            pagination: {
                pageNumber: 1,
                pageSize: 20,
                totalRecord: 0,
                search: "",
            }, // biến này dùng để lưu thông tin phân trang và tìm kiếm
        };
    },
    watch: {
        pagination: {
            handler: function (newVal) {
                this.getEmployeeList(newVal);
            },
            deep: true,
        },
        keyword: {
            /**
             * @description: Dùng kỹ thuật debounce để giảm số lần gọi api khi người dùng nhập từ khóa tìm kiếm
             * Author: AnhDV 23/09/2022
             */
            handler: _.debounce(function (newVal) {
                const self = this;
                self.pagination = {
                    ...self.pagination,
                    search: newVal.trim(),
                };
            }, 500),
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để reload lại dữ liệu
         * Author: AnhDV 23/09/2022
         */
        handleReloadData() {
            const self = this;
            self.getEmployeeList();
        },
        /**
         * @description: Bắt các sự kiện click vào button thêm và action của table (sửa và xóa)
         * @param {string} action - Tên của action
         * Author: AnhDV 16/09/2022
         */
        handleAction(action, data) {
            const self = this;
            const actionDefine = {
                add: () => {
                    self.$store.dispatch('setMode', Enum.FORM_MODE.ADD);
                    self.showEmployeeForm = true;
                },
                edit: async () => {
                    self.$store.dispatch('setMode', Enum.FORM_MODE.EDIT);
                    self.$store.dispatch('setEmployeeId', data.employeeID);
                    self.showEmployeeForm = true;
                },
                delete: async () => {
                    const confirm = await self.$refs.popup.show({
                        message: `Bạn có thực sự muốn xóa Nhân viên <${data.employeeCode}> không?`,
                        icon: 'danger',
                        okButton: "Có",
                        // cancelButton: "Không",
                        closeButton: "Không",
                    });
                    if (confirm) {
                        self.deleteEmployeeBackend(data);
                    }
                },
            };
            actionDefine[action]();
        },
        /**
         * @description: Hàm này dùng để xóa nhân viên ở bên backend
         * Author: AnhDV 19/09/2022
         */
        async deleteEmployeeBackend(data) {
            try {
                const self = this;
                const result = await self.$api.employee.deleteEmployee(data.employeeID);
                if (result) {
                    self.deleteEmployeeFrontEnd(data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để xóa nhân viên trong danh sách ở bên frontend
         * @param: {object} data - Dữ liệu của nhân viên cần xóa 
         * Author: AnhDV 22/09/2022
         */
        deleteEmployeeFrontEnd(data) {
            const self = this;
            try {
                const { employeeID, employeeCode } = data;
                const index = self.employeeList.data.findIndex((item) => item.employeeID === employeeID);
                if (index !== -1) {
                    self.employeeList.data.splice(index, 1);
                    self.$root.$toast.success(`Xóa nhân viên <${employeeCode}> thành công`, {
                        timeout: 5000,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * @description: Hàm này dùng để lấy danh sách nhân viên
         * @param: {Object} pagination - Dữ liệu phân trang
         * Author: AnhDV 19/09/2022
         */
        async getEmployeeList() {
            const self = this;
            try {
                self.isLoaded = false;
                const result = await self.$api.employee.getEmployeesFilter(self.pagination);
                if (result.data) {
                    this.isLoaded = true;
                    self.employeeList = result.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này đùng để nhận emit từ con nếu thành công thì thêm nhân viên vào bảng 
         * @param: {Object} employee - Dữ liệu của nhân viên
         * Author: AnhDV 01/10/2022
         */
        insertEmployee(employee) {
            const self = this;
            try {
                self.employeeList.data.unshift(employee); // Thêm nhân viên vào đầu mảng
                self.$root.$toast.success(`Thêm nhân viên <${employee.employeeCode}> thành công`, {
                    timeout: 5000,
                });
            } catch (error) {
                console.log(error);
            }
        },
        updateEmployee(employee) {
            const self = this;
            try {
                const index = self.employeeList.data.findIndex((item) => item.employeeID === employee.employeeID);
                if (index !== -1) {
                    self.employeeList.data.splice(index, 1, employee);
                    self.$root.$toast.success(`Cập nhật nhân viên <${employee.employeeCode}> thành công`, {
                        timeout: 5000,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        const self = this;
        self.getEmployeeList(); // Lấy danh sách nhân viên
        self.columns = [
            {
                title: '',
                key: 'employeeID',
                fixed: true,
                checkbox: true,
                width: 40,
            },
            {
                title: 'Mã nhân viên',
                key: 'employeeCode',
                search: true,
            },
            {
                title: 'Tên nhân viên',
                key: 'employeeName',
                width: 200,
                search: true,
            },
            {
                title: 'Giới tính',
                key: 'gender',
                type: 'gender',
            },
            {
                title: 'Ngày sinh',
                key: 'dateOfBirth',
                textAlign: 'center',
                type: 'date',

            },
            {
                title: 'Đơn vị',
                key: 'departmentName',
                width: 250,
            },
            {
                title: 'Chức danh',
                key: 'jobTitle',
                width: 250,
            },
            {
                title: 'Số CMND',
                key: 'identityNumber',

            },
            {
                title: 'Ngày cấp',
                key: 'identityDate',
                textAlign: 'center',
                type: 'date',
            },
            {
                title: 'Nơi cấp',
                key: 'identityPlace',
                width: 250,
            },
            {
                title: 'Địa chỉ',
                key: 'employeeAddress',
                width: 250,
            },
            {
                title: 'Số điện thoại',
                key: 'phoneNumber',
            },
            {
                title: 'Số điện thoại cố định',
                key: 'telephoneNumber',
            },
            {
                title: 'Email',
                key: 'email',
                width: 250,
            },
            {
                title: 'Số tài khoản ngân hàng',
                key: 'bankAccountNumber',

            },
            {
                title: 'Tên ngân hàng',
                key: 'bankName',
                width: 250,
            },
            {
                title: 'Chi nhánh ngân hàng',
                key: 'bankBranch',
                width: 250,
            },
            // {
            //     title: 'Là khách hàng',
            //     key: 'isCustomer',
            //     checkbox: true,
            // },
            // {
            //     title: 'Là nhà cung cấp',
            //     key: 'isSupplier',
            //     checkbox: true,
            // },
            // {
            //     title: 'Ngày tạo',
            //     key: 'createdDate',
            //     textAlign: 'center',
            //     type: 'date',
            // },
            // {
            //     title: 'Người tạo',
            //     key: 'createdBy',
            //     width: 200,
            // },
            // {
            //     title: 'Ngày sửa',
            //     key: 'modifiedDate',
            //     textAlign: 'center',
            //     type: 'date',
            // },
            // {
            //     title: 'Người sửa',
            //     key: 'modifiedBy',
            //     width: 200,
            // },
            {
                title: 'Chức năng',
                key: 'action',
                fixed: true,
                type: 'action',
                textAlign: 'center',
                width: 120,
            },
        ]; // Tạo cột cho bảng để hiển thị dữ liệu lên bảng
    },
}
</script>
<style lang="scss" scoped>
.employee {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        box-sizing: border-box;
    }

    &-title {
        font-size: 24px;
        font-family: "MISA Fonts Bold";
    }

    &-body {
        background-color: #fff;
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        &__toolbar {
            display: flex;
            justify-content: space-between;
            padding: 16px;
            margin-bottom: 16px;
            margin-top: 20px;

            &-left {
                display: flex;
                align-items: center;
            }

            &-right {
                display: flex;
                align-items: center;
            }

        }
    }
}
</style>
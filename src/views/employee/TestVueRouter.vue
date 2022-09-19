<template>
    <div class="employee__content">
        <div class="content__header">
            <div class="content__header--title">Nhân viên</div>
            <v-button :text="'Thêm mới nhân viên'" type="button'" @click="handleAction('add')"></v-button>
        </div>
        <div class="content__main">
            <v-table :columns="columns" :data="employeeList" :options="options" @action="handleAction">
            </v-table>
        </div>
        <employee-form v-model="employeeFormData"></employee-form>
        <v-dialog v-model="deleteConfirm" :header="false" icon="danger" dialogType="popup">
            <template #body>
                {{msg}}
            </template>
            <template #footer__left>
                <v-button @click="closeConfirmHandle" className="v-button__button-no-bg border" text="Không">
                </v-button>
            </template>
            <template #footer__right>
                <v-button text="Có" @click="deleteEmployee"></v-button>
            </template>
        </v-dialog>
    </div>
</template>
<script>
import EmployeeForm from './EmployeeForm.vue'
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
            ], // giá trị hiển thị trên select option
            employeeFormData: { // dữ liệu truyền vào form nhân viên để check xem là thêm mới hay sửa
                showEmployeeForm: false,
                mode: null,
                data: null,
            },
            employeeList: {
                isLoaded: false,
            }, // danh sách nhân viên
            deleteConfirm: false,
            msg: '',
        };
    },
    methods: {
        showToast() {
            this.$root.$toast.info(`Message`, { timeout: 5000 });
        },
        /**
         * @description: Bắt các sự kiện click vào các nút của table
         * @param {string} action - Tên của action
         * Author: AnhDV 16/09/2022
         */
        handleAction(action, data) {
            const actionDefine = {
                add: () => {
                    this.employeeFormData = {
                        showEmployeeForm: true,
                        mode: 'add',
                        data: null,
                    };
                },
                edit: () => {
                    this.employeeFormData = {
                        showEmployeeForm: true,
                        mode: 'edit',
                        data: data,
                    };
                },
                delete: () => {
                    this.deleteConfirm = true;
                    this.employeeFormData = {
                        showEmployeeForm: false,
                        mode: 'delete',
                        data: data,
                    };
                    this.msg = `Bạn có thực sự muốn xóa Nhân viên <${data.employeeCode}> không?`;
                },
            };
            actionDefine[action]();
        },
        /**
         * @description: Hàm này dùng để đóng dialog xác nhận xóa
         * Author: AnhDV 19/09/2022
         */
        closeConfirmHandle() {
            this.deleteConfirm = false;
            this.msg = '';
        },
        /**
         * @description: Hàm này dùng để xóa nhân viên
         * Author: AnhDV 19/09/2022
         */
        deleteEmployee() {
            const self = this;
            self.closeConfirmHandle();
            const { employeeID, employeeCode } = self.employeeFormData.data;
            self.$api.employee.deleteEmployee(employeeID).then((res) => {
                if (res.status === 200) {
                    self.$root.$toast.success(`Xóa nhân viên <${employeeCode}> thành công`, {
                        timeout: 5000,
                    });
                    self.getEmployeeList();
                } else {
                    self.$root.$toast.error(`Xóa nhân viên <${employeeCode}> thất bại`, {
                        timeout: 5000,
                    });
                }
            });
            self.employeeFormData = {};
        },

        /**
         * @description: Hàm này dùng để lấy danh sách nhân viên
         * @param: {any} 
         * @return: {any} 
         * Author: AnhDV 19/09/2022
         */
        getEmployeeList() {
            const self = this;
            self.$api.employee.getAllEmployees({
                pageSize: 20,
            }).then((res) => {
                self.employeeList = {
                    isLoaded: true,
                    data: res.data,
                }
            })
        },
    },
    created() {
        this.getEmployeeList();
        this.columns = [
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
                width: 150,
                search: true,
            },
            {
                title: 'Tên nhân viên',
                key: 'employeeName',
                width: 250,
                search: true,
            },
            {
                title: 'Giới tính',
                key: 'gender',
                type: 'gender',
                width: 120,
            },
            {
                title: 'Ngày sinh',
                key: 'dateOfBirth',
                textAlign: 'center',
                type: 'date',
                width: 150,
            },
            {
                title: 'Địa chỉ',
                key: 'employeeAddress',
                width: 250,
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
                width: 200,
            },
            {
                title: 'Ngày cấp',
                key: 'identityDate',
                textAlign: 'center',
                type: 'date',
                width: 150,
            },
            {
                title: 'Nơi cấp',
                key: 'identityPlace',
                width: 250,
            },
            {
                title: 'Số điện thoại',
                key: 'phoneNumber',
                width: 200,
            },
            {
                title: 'Số điện thoại cố định',
                key: 'telephoneNumber',
                width: 200,
            },
            {
                title: 'Email',
                key: 'email',
                width: 250,
            },
            {
                title: 'Số tài khoản ngân hàng',
                key: 'bankAccountNumber',
                width: 250,
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
            {
                title: 'Là khách hàng',
                key: 'isCustomer',
                width: 150,
            },
            {
                title: 'Là nhà cung cấp',
                key: 'isSupplier',
                width: 150,
            },
            {
                title: 'Ngày tạo',
                key: 'createdDate',
                textAlign: 'center',
                type: 'date',
                width: 150,
            },
            {
                title: 'Người tạo',
                key: 'createdBy',
                width: 250,
            },
            {
                title: 'Ngày sửa',
                key: 'modifiedDate',
                textAlign: 'center',
                type: 'date',
                width: 150,
            },
            {
                title: 'Người sửa',
                key: 'modifiedBy',
                width: 250,
            },
            {
                title: 'Chức năng',
                key: 'action',
                fixed: true,
                type: 'action',
                width: 120,
            },
        ];// Tạo cột cho bảng để hiển thị dữ liệu lên bảng
    },
}
</script>

<style lang="scss" scoped>

</style>
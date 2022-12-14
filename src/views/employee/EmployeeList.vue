<template>
    <div class="employee">
        <div class="employee-header">
            <div class="employee-title">{{$t('employee_page.title')}}</div>
            <v-button @click="handleAction(Enum.ACTION.ADD)">
                {{$t('employee_page.add_employee')}}
            </v-button>
        </div>
        <div class="employee-body">
            <!-- Các action như search, export, reload -->
            <div class="employee-body__toolbar">
                <div class="employee-body__toolbar-left">
                    <slot name="toolbar-left">
                        <v-dropdown className="secondary-light border-bold rounded" @onSelect="handleAction"
                            icon="ms-16 ms-icon ms-icon-arrow-down-black opacity-5" :items="bathAction"
                            :isShow="isEmployeeSelected">
                            {{$t('action.batch_action')}}
                        </v-dropdown>
                    </slot>
                </div>
                <div class="employee-body__toolbar-right">
                    <slot name="toolbar-right"></slot>
                    <v-input :placeholder="$t('employee_page.search_function')" icon="ms-16 ms-icon ms-icon-search"
                        v-model="keyword" :outline="true" :styleProps="['width: 240px','font-style: italic']"
                        className="v-input__with-icon" :focus="true" />
                    <div :tooltip="$t('action.reload_data')" class="ms-24 ms-icon ms-icon-reload ms-r-2 ml-l-2"
                        @click="handleAction(Enum.ACTION.RELOAD)">
                    </div>
                    <div :tooltip="$t('action.export_excel')" class="ms-24 ms-icon ms-icon-excel ms-x-2"
                        @click="handleAction(Enum.ACTION.EXPORT)"></div>
                </div>
            </div>
            <!-- Table hiển thị danh sách nhân viên -->
            <v-table :columns="columns" :data="employeeList" :options="options" @action="handleAction"
                v-model:pagination="pagination" :actions="tableAction">
            </v-table>
        </div>
        <!-- Form sửa và thêm nhân viên -->
        <employee-form v-model="showEmployeeForm" @insertEmployee="insertEmployee" @updateEmployee="updateEmployee">
        </employee-form>
        <!-- Khu vực hiển thị popup và toast thông báo -->
        <v-popup ref="popup"></v-popup>
        <v-toast ref="toast" :showProgress="true" :maxMessage="10"></v-toast>
    </div>
</template>
<script>
import EmployeeForm from './EmployeeForm.vue';
import Enum from "@/utils/enum";
import { mapGetters } from 'vuex';
export default {
    components: { EmployeeForm },
    data() {
        return {
            keyword: "", // biến này dùng để lưu từ khóa tìm kiếm
            showEmployeeForm: false, // biến này dùng để hiển thị form thêm mới hoặc cập nhật nhân viên
            employeeList: [], // biến này dùng để lưu danh sách nhân viên
            pagination: {
                pageNumber: 1,
                pageSize: 20,
                keyword: "",
            }, // biến này dùng để lưu thông tin phân trang và tìm kiếm
            debounce: null, // biến này dùng để lưu hàm debounce,
        };
    },
    computed: {
        ...mapGetters(['isEmployeeSelected']), // lấy giá trị từ store kiểm tra xem có nhân viên nào được chọn hay không
        /**
         * @description: Lấy ra các action key (phím tắt) lưu trữ trong store 
         * Author: AnhDV 11/10/2022
         */
        action: {
            get() {
                return this.$store.getters.getActionKey;
            },
            set(value) {
                this.$store.commit('setActionKey', value);
            }
        },
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
                        width: 40,
                    },
                    {
                        title: this.$t(`employee_table.code`),
                        key: 'employeeCode',
                        search: true,
                    },
                    {
                        title: this.$t(`employee_table.name`),
                        key: 'employeeName',
                        width: 200,
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
                        width: 250,
                    },
                    {
                        title: this.$t(`employee_table.department`),
                        key: 'departmentName',
                        width: 250,
                    },
                    {
                        title: this.$t(`employee_table.bank_number`),
                        key: 'bankAccountNumber',

                    },
                    {
                        title: this.$t(`employee_table.bank_name`),
                        key: 'bankName',
                        width: 250,
                    },
                    {
                        title: this.$t(`employee_table.bank_branch`),
                        key: 'bankBranch',
                        width: 250,
                    },
                    {
                        title: this.$t(`employee_table.action`),
                        key: 'action',
                        fixed: true,
                        type: 'action',
                        textAlign: 'center',
                        width: 120,
                    },
                ];
            }
        },
        /**
         * @description: Khai báo các lựa chọn phân trang
         * @param: {any} 
         * Author: AnhDV 11/10/2022
         */
        options: {
            get() {
                return [{ key: 10, value: this.$t('pagination.10') },
                { key: 20, value: this.$t('pagination.20') },
                { key: 30, value: this.$t('pagination.30') },
                { key: 50, value: this.$t('pagination.50') },
                { key: 100, value: this.$t('pagination.100') }];
            },
        },
        /**
         * @description: Khai báo các action thực hiện hàng loạt
         * Author: AnhDV 11/10/2022
         */
        bathAction: {
            get() {
                return [{ 'key': Enum.ACTION.DELETE_MANY, 'value': this.$t('action.delete') }];
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
        }
    },
    watch: {
        /**
         * @description: Lắng nghe sự thay đổi khi người dùng thay đổi liên quan tới phân trang
         * Author: AnhDV 06/10/2022
         */
        pagination: {
            handler: function (newVal, oldVal) {
                try { // đề phòng trường hợp newVal và oldVal không có giá trị
                    if (oldVal.pageSize !== newVal.pageSize) {
                        newVal.pageNumber = 1;
                    }
                } catch (e) {
                    console.log(e);
                }
                this.getEmployeeList(newVal);
            },
            deep: true,
        },
        /**
         * @description: Lắng nghe sự thay đổi khi người dùng thay đổi liên quan tới từ khóa tìm kiếm
         * Author: AnhDV 06/10/2022
         */
        keyword: {
            /**
            * @description: Dùng debounce để tránh việc gọi api liên tục khi người dùng nhập từ khóa
            * Author: AnhDV 23/09/2022
            */
            handler: function (newVal) {
                const self = this;
                clearTimeout(self.debounce);
                self.debounce = setTimeout(() => {
                    self.pagination.keyword = newVal.trim();
                }, 500); // triển khai debounce để giảm số lần gọi api
            },
        },
        /**
         * @description: Lắng nghe sự kiện khi người dùng thay đổi trạng thái của form thêm mới hoặc cập nhật nhân viên bằng phím tắt
         * Author: AnhDV 10/10/2022
         */
        action: {
            handler: function (newVal) {
                // let curentFocus = document.activeElement; // lấy phần tử đang được active
                switch (newVal) {
                    case Enum.ACTION.ADD: // tổ hợp phím  Ctrl + Alt + A để thêm mới nhân viên
                        this.handleAction(newVal);
                        break;
                    case Enum.ACTION.DELETE: // phím delete để xóa nhân viên
                        if (this.isEmployeeSelected) {
                            this.handleAction(Enum.ACTION.DELETE_MANY);
                        }
                        break;
                    case Enum.ACTION.EXPORT:
                        this.handleAction(Enum.ACTION.EXPORT);
                        break;
                    case Enum.ACTION.RELOAD: // tổ hợp phím Ctrl + R để reload lại table
                        this.handleAction(Enum.ACTION.RELOAD);
                        break;
                    default:
                        break;
                }
            },
            deep: true,
        }
    },

    methods: {
        /**
         * @description: Thực hiện các action như thêm mới, sửa, xóa, xóa nhiều, tải lại dữ liệu, xuất ra excel
         * @param {string} action - Tên của action
         * @param {object} data - Dữ liệu của action
         * Author: AnhDV 16/09/2022
         */
        handleAction(action, data) {
            const self = this;
            try {
                switch (action) {
                    case Enum.ACTION.ADD: // thêm mới nhân viên
                        self.showAddEmployeeForm();
                        break;
                    case Enum.ACTION.EDIT: // sửa nhân viên
                        self.showEditEmployeeForm(data);
                        break;
                    case Enum.ACTION.DELETE: // xóa nhân viên
                        self.deleteEmployee(data);
                        break;
                    case Enum.ACTION.DELETE_MANY: // xóa nhiều nhân viên
                        self.deleteManyEmployee(data);
                        break;
                    case Enum.ACTION.DUPLICATE: // Nhân bản nhân viên
                        self.duplicateEmployee(data);
                        break;
                    case Enum.ACTION.INACTIVE:
                        self.$root.$toast.info(self.$t('notice_message.developing'));
                        break;
                    case Enum.ACTION.RELOAD: // Tải lại danh sách nhân viên
                        self.reloadData();
                        break;
                    case Enum.ACTION.EXPORT: // Xuất file excel
                        self.exportExcel();
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để hiển thị form thêm mới nhân viên
         * Author: AnhDV 07/10/2022
         */
        showAddEmployeeForm() {
            const self = this;
            self.$store.dispatch('setMode', Enum.FORM_MODE.ADD);
            self.showEmployeeForm = true;
        },
        /**
         * @description: Hàm này dùng để sửa nhân viên
         * @param {object} employee - Dữ liệu của nhân viên
         * Author: AnhDV 07/10/2022
         */
        showEditEmployeeForm(employee) {
            const self = this;
            self.$store.dispatch('setMode', Enum.FORM_MODE.EDIT);
            self.$store.dispatch('setEmployeeId', employee.employeeID);
            self.showEmployeeForm = true;
        },
        /**
         * @description: Hàm này dùng để xóa nhân viên
         * @param {object} employee - Dữ liệu của nhân viên
         * Author: AnhDV 07/10/2022
         */
        deleteEmployee(employee) {
            const self = this;
            self.deleteEmployeeBackend(employee);
        },
        /**
         * @description: Hàm này dùng để xóa nhiều nhân viên
         * Author: AnhDV 04/10/2022
         */
        async deleteManyEmployee() {
            const self = this;
            const confirm = await self.$refs.popup.show({
                message: self.$t('notice_message.confirm_delete_many'),
                icon: Enum.ICON.WARNING,
                okButton: self.$t('confirm_popup.yes'),
                closeButton: self.$t('confirm_popup.cancel'),
            });
            if (confirm == self.$t('confirm_popup.yes')) {
                const result = await self.$store.dispatch('deleteMultipleEmployee');
                if (result > 0) {
                    self.$root.$toast.success(self.$t('notice_message.delete_many_success', [result]));
                    self.getEmployeeList();
                } else {
                    self.$root.$toast.error(self.$t('notice_message.delete_many_fail'));
                }
            }
        },
        /**
         * @description: Hàm này dùng để nhân bản nhân viên
         * @param {object} employee - Dữ liệu của nhân viên
         * Author: AnhDV 07/10/2022
         */
        async duplicateEmployee(employee) {
            const self = this;
            self.$store.dispatch('setMode', Enum.FORM_MODE.DUPLICATE);
            self.$store.dispatch('setEmployeeId', employee.employeeID);
            self.showEmployeeForm = true;
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
         * @description: Hàm này dùng để xuất danh sách nhân viên ra file excel
         * Author: AnhDV 05/10/2022
         */
        async exportExcel() {
            const self = this;
            try {
                self.$root.$toast.info(self.$t('notice_message.export_excel_processing'));
                const res = await self.$api.employee.exportEmployees(); // kiểm tra xem có dữ liệu không
                if (res.status == Enum.MISA_CODE.SUCCESS) {
                    const link = document.createElement('a'); // tạo thẻ a để download file
                    link.href = res.request.responseURL; // đường dẫn tải file
                    link.click();
                    self.$root.$toast.success(self.$t('notice_message.export_excel_success'));
                }
            } catch (error) {
                self.$root.$toast.error(self.$t('notice_message.export_excel_fail'));
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để xóa nhân viên ở bên backend
         * @param {object} data - Dữ liệu của nhân viên cần xóa
         * Author: AnhDV 19/09/2022
         */
        async deleteEmployeeBackend(employee) {
            const self = this;
            try {
                const confirm = await self.$refs.popup.show({
                    message: self.$t('notice_message.confirm_delete', [employee.employeeCode]),
                    icon: Enum.ICON.WARNING,
                    okButton: self.$t('confirm_popup.yes'),
                    closeButton: self.$t('confirm_popup.cancel'),
                });
                if (confirm == self.$t('confirm_popup.yes')) {
                    const res = await self.$api.employee.deleteEmployee(employee.employeeID);
                    if (res.status == Enum.MISA_CODE.SUCCESS) {
                        self.deleteEmployeeFrontEnd(employee);
                    } else {
                        self.$root.$toast.error(self.$t('notice_message.delete_fail', [employee.employeeCode]));
                    }
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
            const { employeeID, employeeCode } = data;
            try {
                const index = self.employeeList.data.findIndex((item) => item.employeeID === employeeID);
                if (index !== -1) {
                    self.employeeList.data.splice(index, 1);
                    self.$root.$toast.success(self.$t('notice_message.delete_success', [employeeCode]));
                    self.employeeList.totalRecord -= 1; // Giảm tổng số bản ghi đi 1
                }
            } catch (error) {
                self.$root.$toast.success(self.$t('notice_message.delete_fail', [employeeCode]));
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
                self.$root.$toast.success(self.$t('notice_message.insert_success', [employee.employeeCode]));
                self.employeeList.totalRecord += 1; // Tăng tổng số bản ghi lên 1
            } catch (error) {
                self.$root.$toast.error(self.$t('notice_message.insert_fail', [employee.employeeCode]));
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để cập nhật nhân viên ở bên frontend
         * Author: AnhDV 05/10/2022
         */
        updateEmployee(employee) {
            const self = this;
            try {
                const index = self.employeeList.data.findIndex((item) => item.employeeID === employee.employeeID);
                if (index !== -1) {
                    self.employeeList.data.splice(index, 1);
                    self.employeeList.data.unshift(employee);
                    self.$root.$toast.success(self.$t('notice_message.update_success', [employee.employeeCode]));
                }
            } catch (error) {
                self.$root.$toast.error(self.$t('notice_message.update_fail', [employee.employeeCode]));
                console.log(error);
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
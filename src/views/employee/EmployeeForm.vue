<template>
    <div>
        <v-dialog v-model="closeFormHandler" :header="true" icon="info" dialogType="form">
            <template #title v-if="isLoaded">
                <div class="row e-header">
                    <div class="e-header__title col">
                        Thông tin nhân viên
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là khách hàng" v-model="employee.isCustomer"></v-input>
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là nhà cung cấp" v-model="employee.isSupplier"></v-input>
                    </div>
                </div>
            </template>
            <template #body v-if="isLoaded">
                <div class="grid wide v-max-900">
                    <div class="row">
                        <div class="col l-6 md-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-5">
                                    <v-input label="Mã" placeholder="Nhập mã nhân viên" :required="true" :focus="true"
                                        v-model="employee.employeeCode"></v-input>
                                </div>
                                <div class="form-group col l-7 md-7 c-7">
                                    <v-input label="Tên" :required="true" placeholder="Nhập tên nhân viên"
                                        v-model="employee.employeeName"></v-input>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-combobox position="bottom" placeholder="Chọn đơn vị" propKey="departmentID"
                                        v-model="employee.departmentID" propValue="departmentName" label="Đơn vị"
                                        :defaultSelected="employee.departmentID"
                                        propApi="https://localhost:7033/api/v1/departments">
                                        <template #item="item">
                                            {{item.option['departmentCode']}} - {{item.option['departmentName']}}
                                        </template>
                                    </v-combobox>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-input label="Chức danh" placeholder="Nhập chức danh" v-model="employee.jobTitle">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                        <div class="col l-6 md-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-12">
                                    <v-date-picker label="Ngày sinh" :required="true" v-model="employee.dateOfBirth">
                                    </v-date-picker>
                                </div>
                                <div class="form-group col l-7 md-7 c-12">
                                    <label class="label form-control">Giới tính</label>
                                    <div class="row sm-gutter e-body__gender">
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nam" :value="1"
                                                v-model="employee.gender">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nữ" :value="0"
                                                v-model="employee.gender">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Khác" :value="2"
                                                v-model="employee.gender">
                                            </v-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col l-7 md-7 c-12">
                                    <v-input label="Số CMND" placeholder="Nhập số CMND"
                                        v-model="employee.identityNumber"> </v-input>
                                </div>
                                <div class="form-group col l-5 md-5 c-12">
                                    <v-date-picker label="Ngày cấp" v-model="employee.identityDate" :required="true" />
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-input label="Nơi cấp" placeholder="Nhập nơi cấp"
                                        v-model="employee.identityPlace">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-12 md-12 c-12">
                            <v-input label="Địa chỉ" v-model="employee.employeeAddress" placeholder="Nhập địa chỉ">
                            </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="ĐT di động" v-model="employee.phoneNumber"
                                placeholder="Nhập số điện thoại di động"></v-input>

                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="ĐT cố định" placeholder="Nhập số điện thoại cố định"
                                v-model="employee.telephoneNumber">
                                > </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Email" v-model="employee.email" placeholder="Nhập email"> </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Tài khoản ngân hàng" v-model="employee.bankAccountNumber"
                                placeholder="Nhập tài khoản ngân hàng"> </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Tên ngân hàng" placeholder="Nhập tên ngân hàng" v-model="employee.bankName">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Chi nhánh" placeholder="Nhập chi nhánh" v-model="employee.bankBranch">
                            </v-input>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer__left>
                <v-button @click="closeDialog" className="v-button__button-no-bg border" text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button className="v-button__button-no-bg border" text="Cất" @click="saveHandler"></v-button>
                <v-button text="Cất và thêm"></v-button>
            </template>
        </v-dialog>
        <v-dialog v-model="closeFormConfirm" :header="false" icon="info" dialogType="popup" v-if="closeFormConfirm">
            <template #body>
                Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
            </template>
            <template #footer__left>
                <v-button @click="closeFormConfirm=false" className="v-button__button-no-bg border" text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button className="v-button__button-no-bg border" @click="closeDialog" text="Không"></v-button>
                <v-button text="Có"></v-button>
            </template>
        </v-dialog>
        <v-dialog v-model="errorFormHandler.status" :header="false" icon="danger" dialogType="popup"
            v-if="errorFormHandler.status">
            <template #body>
                {{errorFormHandler.message}}
            </template>
            <template #footer__right>
                <v-button text="Đồng ý" @click="errorFormHandler.status = false"></v-button>
            </template>
        </v-dialog>
        <v-toast ref="toast" :showProgress="true"></v-toast>
    </div>

</template>

<script>
import message from '@/utils/message';
export default {
    name: "EmployeeForm",
    props: {
        modelValue: {
            type: Object,
        },
    },
    data() {
        return {
            employeeFormData: {}, // lưu thông tin form bao gồm trạng thái form và dữ liệu
            dataChanged: false, // để kiểm tra xem dữ liệu có thay đổi hay không
            closeFormHandler: false, // để kiểm tra xem có đóng form hay không
            closeFormConfirm: false, // để hiển thị dialog xác nhận đóng form
            isLoaded: true, // để kiểm tra xem dữ liệu đã được load hay chưa
            employee: {
                employeeID: "",
                employeeCode: "",
                employeeName: "",
                dateOfBirth: "",
                employeeAddress: "",
                gender: 0,
                departmentID: "",
                departmentName: "",
                jobTitle: "",
                identityNumber: "",
                identityDate: "",
                identityPlace: "",
                phoneNumber: "",
                telephoneNumber: "",
                email: "",
                bankAccountNumber: "",
                bankName: "",
                bankBranch: "",
                isCustomer: "",
                isSupplier: "",
                createdDate: "",
                createdBy: "",
                modifiedDate: "",
                modifiedBy: ""
            },
            errorFormHandler: {
                status: false,
                message: "",
                icon: "danger",
            }
        };
    },
    watch: {
        modelValue: { // theo dõi sự thay đổi của modelValue
            handler: function (val) {
                let self = this;
                self.employeeFormData = val; // gán giá trị modelValue cho employeeFormData để emit ngược lại
                let { showEmployeeForm, mode, data } = self.employeeFormData; // lấy giá trị showEmployeeForm, mode, data từ employeeFormData
                self.closeFormHandler = showEmployeeForm; // gán giá trị showEmployeeForm cho closeFormHandler để xử lý sự kiện đóng form
                if (mode === "add") { // nếu mode là add thì gán giá trị mặc định cho employee
                    self.$api.employee.getNewEmployeeCode()
                        .then((res) => {
                            self.employee.employeeCode = res.data; // gán giá trị employeeCode từ api
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (mode === "edit") { // nếu mode là edit thì gán giá trị data cho employee
                    this.isLoaded = false;
                    self.$api.employee.getEmployeeById(data.employeeID)
                        .then((res) => {
                            self.employee = res.data; // gán giá trị employee từ api
                            self.$nextTick(() => {
                                self.isLoaded = true;
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            },
            deep: true,
        },
        employee: { // theo dõi sự thay đổi của employee
            handler: function () {
                this.dataChanged = true; // nếu employee thay đổi thì gán dataChanged = true
            },
            deep: true,
        },
        closeFormHandler: {
            handler: function (val) {
                let { showEmployeeForm } = this.employeeFormData; // lấy giá trị showEmployeeForm từ employeeFormData
                if (!showEmployeeForm) return false; // nếu showEmployeeForm = false (tức là nhấn nút hủy thì không làm gì)
                if (!val && this.dataChanged) { // nếu val = false (tức là nhấn nút đóng form) và dataChanged = true (tức là có sự thay đổi dữ liệu) thì hiển thị dialog xác nhận
                    this.closeFormHandler = true; // gán closeFormHandler = true để không tắt dialog
                    this.closeFormConfirm = true;  // hiển thị dialog xác nhận
                }
            },
            deep: true,
        },
    },
    methods: {
        /**
         * @description: Hàm này dùng để đóng dialog
         * Author: AnhDV 16/09/2022
         */
        closeDialog() {
            this.employeeFormData = {
                ...this.employeeFormData,
                showEmployeeForm: false,
                mode: null,
                data: null,
            } // gán giá trị showEmployeeForm, mode = false, null
            this.employee = {};
            this.closeFormConfirm = false; // tắt dialog xác nhận
            this.$emit("update:modelValue", this.employeeFormData); // emit giá trị employeeFormData cho modelValue
        },
        /**
         * @description: Hàm này dùng để thêm mới nhân viên
         * @param: {any} 
         * Author: AnhDV 19/09/2022
         */
        addEmployee() {
            let self = this;
            self.$api.employee.insertEmployee(self.employee)
                .then((res) => {
                    self.$emit("addEmployee", res.data); // emit giá trị employee vừa thêm mới
                    self.closeDialog(); // đóng dialog
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         * @description: Hàm này dùng để cập nhật nhân viên
         * @param: {any}
         * Author: AnhDV 19/09/2022
         */
        updateEmployee() {
            let self = this;
            self.$api.employee.updateEmployee(self.employee)
                .then((res) => {
                    self.$emit("updateEmployee", res.data); // emit giá trị employee vừa cập nhật
                    self.$root.$toast.success(`Cập nhật nhân viên <${self.employee.employeeCode}> thành công`, {
                        timeout: 5000,
                    });
                    self.closeDialog(); // đóng dialog
                })
                .catch((err) => {
                    this.errorFormHandler = {
                        status: true,
                        icon: "danger",
                        message: `${message(err, self.employee.employeeCode)}. Vui lòng thử lại`,
                    };
                });
        },
        /**
         * @description: Hàm này dùng để xử lý sự kiện cất
         * Author: AnhDV 19/09/2022
         */
        saveHandler() {
            let { mode } = this.employeeFormData; // lấy giá trị mode từ employeeFormData
            if (mode === "add") { // nếu mode là add thì gọi hàm thêm mới
                this.addEmployee();
            } else if (mode === "edit") { // nếu mode là edit thì gọi hàm cập nhật
                this.updateEmployee();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.v-dialog__header {
    padding-bottom: 32px;
}

.e-header {
    align-items: center;

    &__title {
        font-size: 24px;
        font-weight: 700;
    }
}

.e-body {
    &__gender {
        height: 32px;
        align-items: center;
    }
}

.v-max-900 {
    &.wide {
        margin: 20px 0;
        max-width: 900px;
    }
}
</style>
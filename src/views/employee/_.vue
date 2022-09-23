<!-- <template>
    <div ref="employeeForm">
        <v-dialog v-model="closeFormHandler" :header="true" icon="info" dialogType="form">
            <template #title v-if="isLoaded">
                <div class="row e-header">
                    <div class="e-header__title col font-weight-700">
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
                <div class="grid wide v-max-900" ref="employeeForm">
                    <div class="row">
                        <div class="col l-6 md-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-5">
                                    <v-tooltip content="Mã nhân viên không được để trống" :minWidth="220"
                                        :showTooltip="missingCode && attemptSubmit" :fixed="true" position="bottom">
                                        <v-input label="Mã" :focus="true" v-model="employee.employeeCode"
                                            :required="true" :error="missingCode && attemptSubmit" ref-="firstInput">
                                        </v-input>
                                    </v-tooltip>
                                </div>
                                <div class="form-group col l-7 md-7 c-7">
                                    <v-tooltip content="Tên không được để trống" :minWidth="200"
                                        :showTooltip="missingName && attemptSubmit" :fixed="true" position="bottom">
                                        <v-input label="Tên" v-model="employee.employeeName" :required="true"
                                            :error="missingName && attemptSubmit">
                                        </v-input>
                                    </v-tooltip>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-tooltip content="Đơn vị không được để trống" :minWidth="200"
                                        :showTooltip="missingDepartment && attemptSubmit" :fixed="true"
                                        position="bottom">
                                        <v-combobox position="bottom" propKey="departmentID"
                                            v-model="employee.departmentID" propValue="departmentName" label="Đơn vị"
                                            :defaultSelected="employee.departmentID"
                                            propApi="https://localhost:7033/api/v1/departments" :required="true"
                                            :error="missingDepartment && attemptSubmit">
                                            <template #item="item">
                                                {{item.option['departmentCode']}} - {{item.option['departmentName']}}
                                            </template>
                                        </v-combobox>
                                    </v-tooltip>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-input label="Chức danh" v-model="employee.jobTitle">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                        <div class="col l-6 md-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-12">
                                    <v-date-picker label="Ngày sinh" v-model="employee.dateOfBirth">
                                    </v-date-picker>
                                </div>
                                <div class="form-group col l-7 md-7 c-12">
                                    <label class="label form-control font-weight-700">Giới tính</label>
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
                                    <v-input label="Số CMND" v-model="employee.identityNumber">
                                    </v-input>
                                </div>
                                <div class="form-group col l-5 md-5 c-12">
                                    <v-date-picker label="Ngày cấp" v-model="employee.identityDate" />
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-input label="Nơi cấp" v-model="employee.identityPlace">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-12 md-12 c-12">
                            <v-input label="Địa chỉ" v-model="employee.employeeAddress">
                            </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="ĐT di động" v-model="employee.phoneNumber"></v-input>

                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="ĐT cố định" v-model="employee.telephoneNumber">
                                > </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Email" v-model="employee.email"> </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Tài khoản ngân hàng" v-model="employee.bankAccountNumber">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Tên ngân hàng" v-model="employee.bankName">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="Chi nhánh" v-model="employee.bankBranch">
                            </v-input>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer__left>
                <v-button buttonType="secondary" @click="closeDialog" className="v-button__button-no-bg border"
                    text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button @click="saveHandler()" text="Cất" buttonType="secondary"></v-button>
                <v-button text="Cất và thêm" @click="saveHandler()"></v-button>
                <button @focus="focusFirstInput"></button>
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
        <v-dialog v-model="errorFormHandler.status" :header="false" :icon="errorFormHandler.icon" dialogType="popup"
            v-if="errorFormHandler.status">
            <template #body>
                {{errorFormHandler.message}}
            </template>
            <template #footer__center>
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
            },
            attemptSubmit: false,
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
    computed: {
        missingCode() { // kiểm tra xem employeeCode có bị thiếu hay không
            return this.employee.employeeCode === "";
        },
        missingName() { // kiểm tra xem employeeName có bị thiếu hay không
            return this.employee.employeeName === "";
        },
        missingDepartment() { // kiểm tra xem departmentID có bị thiếu hay không
            return this.employee.departmentID === "";
        },
    },
    methods: {
        /**
         * @description: Hàm để focus lại vào input đầu tiên của form
         * Author: AnhDV 21/09/2022
         */
        focusFirstInput() {
            this.$refs.employeeForm.querySelector("input").focus();
        },
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
        * @description: Hàm này dùng để thêm mới nhân viên
        * @param: {any} 
        * Author: AnhDV 19/09/2022
        */
        insertEmployee() {
            let self = this;
            self.$api.employee.insertEmployee(self.employee)
                .then((res) => {
                    self.$emit("insertEmployee", res.data); // emit giá trị employee vừa thêm mới
                    self.$root.$toast.success(`Thêm mới nhân viên <${self.employee.employeeCode}> thành công`, {
                        timeout: 5000,
                    });
                    self.closeDialog(); // đóng dialog
                })
                .catch((err) => {
                    this.errorFormHandler = {
                        status: true,
                        icon: "danger",
                        message: `${err}. Vui lòng thử lại`,
                    };
                });
        },
        /**
         * @description: Hàm này dùng để xử lý sự kiện cất
         * Author: AnhDV 19/09/2022
         */
        saveHandler() {
            let self = this;
            let { mode } = self.employeeFormData; // lấy giá trị mode từ employeeFormData
            self.attemptSubmit = true;
            self.errorFormHandler = {
                icon: "error",
                message: "",
            };
            if (self.missingCode) {
                self.errorFormHandler.message = "Mã nhân viên không được để trống";
                self.errorFormHandler.status = true;
                return false;
            }
            if (self.missingName) {
                self.errorFormHandler.message = "Tên không được để trống";
                self.errorFormHandler.status = true;
                return false;
            }
            if (self.missingDepartment) {
                self.errorFormHandler.message = "Đơn vị không được để trống";
                self.errorFormHandler.status = true;
                return false;
            }
            Object.keys(self.employee).forEach((key) => {
                if (self.employee[key] === "") {
                    delete self.employee[key];
                }
            });
            if (mode === "add") { // nếu mode là add thì gọi hàm thêm mới
                self.insertEmployee();
            } else if (mode === "edit") { // nếu mode là edit thì gọi hàm cập nhật
                self.updateEmployee();
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
</style> -->
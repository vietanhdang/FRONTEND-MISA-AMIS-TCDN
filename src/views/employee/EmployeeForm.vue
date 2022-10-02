<template>
    <div>
        <!-- Khu vực hiển thị dialog form thêm hoặc sửa nhân viên -->
        <v-dialog :isShow="modelValue" @close="closeFormHandle">
            <template #title>
                <div class="row e-header">
                    <div class="e-header__title col font-weight-700">
                        {{title}} nhân viên
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là khách hàng" v-model="employee.isCustomer"
                            :value="true"></v-input>
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là nhà cung cấp" v-model="employee.isSupplier"
                            :value="true"></v-input>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="grid wide v-max-900" ref="employeeForm">
                    <div class="row">
                        <div class="col l-6 md-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-5">
                                    <v-input label="Mã" :focus="true" v-model="employee.employeeCode"
                                        :error="missingCode" ref-="firstInput" :required="true"
                                        errorMessage="Mã không được để trống">
                                    </v-input>
                                </div>
                                <div class="form-group col l-7 md-7 c-7">
                                    <v-input label=" Tên" v-model="employee.employeeName" :error="missingName"
                                        :required="true" errorMessage="Tên không được để trống">
                                    </v-input>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-combobox position="bottom" propKey="departmentID" v-model="employee.departmentID"
                                        propValue="departmentName" label="Đơn vị"
                                        errorMessage="Đơn vị không được để trống"
                                        v-model:textInput="employee.departmentName"
                                        propApi="https://localhost:7033/api/v1/departments" :required="true"
                                        :error="missingDepartment">
                                        <template #item="item">
                                            {{item.option['departmentCode']}} - {{item.option['departmentName']}}
                                        </template>
                                    </v-combobox>
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
                                    <label class="label form-control font-weight-700">Giới tính
                                    </label>
                                    <div class="row sm-gutter e-body__gender">
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nam" :value=1 v-model="employee.gender">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nữ" :value=0 v-model="employee.gender">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Khác" :value=2
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
                <v-button buttonType="secondary" @click="closeFormHandle(false)"
                    className="v-button__button-no-bg border" text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button @click="saveHandler(true)" text="Cất" buttonType="secondary"></v-button>
                <v-button text="Cất và thêm" @click="saveHandler(false)"></v-button>
                <div style="max-width: 0; max-height: 0; overflow: hidden;">
                    <input @focus="returnFocus()" />
                </div>
            </template>
        </v-dialog>
        <!-- Khu vực hiển thị popup cảnh báo -->
        <v-popup ref="popup"></v-popup>
    </div>
</template>

<script>
import { isNullOrEmpty } from '@/utils/validate';
import { mapGetters } from 'vuex';
import Enum from "@/utils/enum";
export default {
    name: "EmployeeForm",
    props: {
        modelValue: { // dùng để đóng mở form
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            employee: {
                employeeID: "",
                employeeCode: "",
                employeeName: "",
                dateOfBirth: "",
                employeeAddress: "",
                gender: 1,
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
                isCustomer: false,
                isSupplier: false,
                createdDate: "",
                createdBy: "",
                modifiedDate: "",
                modifiedBy: ""
            },
            attemptSubmit: false,
        };
    },
    watch: {
        getMode: async function (value) {
            const self = this;
            switch (value) {
                case Enum.FORM_MODE.ADD:
                    self.title = "Thêm mới";
                    self.resetForm();
                    break;
                case Enum.FORM_MODE.EDIT:
                    self.title = "Cập nhật";
                    await self.getEmployeeById();
                    break;
                default:
                    break;
            }
        },
    },
    computed: {
        missingCode() { // kiểm tra xem employeeCode có bị thiếu hay không
            return isNullOrEmpty(this.employee.employeeCode) && this.attemptSubmit;
        },
        missingName() { // kiểm tra xem employeeName có bị thiếu hay không
            return isNullOrEmpty(this.employee.employeeName) && this.attemptSubmit;
        },
        missingDepartment() { // kiểm tra xem departmentID có bị thiếu hay không
            return isNullOrEmpty(this.employee.departmentID) && this.attemptSubmit;
        },
        ...mapGetters(["getMode", "getEmployeeId"]),
    },
    methods: {
        /**
         * @description: Hàm xử lý sự kiện đóng form nhân viên
         * @param {boolean} foceClose: có bắt buộc đóng form hay không
         * Author: AnhDV 22/09/2022
         */
        async closeFormHandle(foceClose = true) {
            try {
                const self = this;
                if (foceClose) {
                    const confirm = await self.$refs.popup.show({
                        message: "Dữ liệu đã bị thay đổi bạn có muốn cất không?",
                        icon: 'info',
                        okButton: "Có",
                        cancelButton: "Không",
                        closeButton: "Hủy",
                    });
                    if (confirm) {
                        this.resetForm();
                    } else {
                        self.$emit("update:modelValue", false);
                        self.$store.dispatch("setMode", null);
                    }
                } else {
                    this.resetForm();
                    self.$emit("update:modelValue", false);
                    self.$store.dispatch("setMode", null);
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để cập nhật nhân viên
         * @param: {boolean} isClose: có đóng form sau khi cập nhật hay không
         * Author: AnhDV 19/09/2022
         */
        async updateEmployee(isClose) {
            let self = this;
            try {
                const response = await self.$api.employee.updateEmployee(self.employee); // gọi api update nhân viên
                if (response.status === 200) {
                    self.$emit("updateEmployee", self.employee); // emit giá trị employee vừa cập nhật
                    if (!isClose) {
                        self.$store.dispatch("setMode", Enum.FORM_MODE.ADD); // đổi mode thành thêm mới
                    } else {
                        self.closeFormHandle(false);
                    }
                }

            } catch (error) {
                self.$refs.popup.show({
                    message: `Có lỗi xảy ra vui lòng thử lại`,
                    icon: 'danger',
                    hideButton: true,
                });
                console.log(error);
            }
        },
        /**
        * @description: Hàm này dùng để thêm mới nhân viên
        * @param: {any} 
        * Author: AnhDV 19/09/2022
        */
        async insertEmployee(isClose) {
            let self = this;
            try {
                const response = await self.$api.employee.insertEmployee(self.employee);
                if (response.status === 201) {
                    self.employee.employeeID = response.data;
                    self.$emit("insertEmployee", self.employee); // emit giá trị employee vừa thêm mới
                    if (!isClose) { // nếu không đóng form thì reset lại form
                        self.resetForm();
                    } else { // nếu đóng form thì đóng form
                        self.closeFormHandle(false);
                    }
                }
            } catch (error) {
                self.$refs.popup.show({
                    message: error.response.data.userMsg,
                    icon: 'danger',
                    hideButton: true,
                });
            }
        },
        /**
         * @description: Hàm này dùng để reset form thêm mới
         * Author: AnhDV 22/09/2022
         */
        async resetForm() {
            try { // reset lại form
                let self = this;
                const employeeCode = await self.$api.employee.getNewEmployeeCode(); // lấy mã nhân viên mới
                if (employeeCode.data) { // nếu có mã nhân viên mới thì gán vào
                    self.attemptSubmit = false; // reset lại trạng thái submit
                    self.employee = { // gán giá trị mặc định cho employee
                        employeeCode: employeeCode.data,
                        gender: 1,
                        isCustomer: false,
                        isSupplier: false,
                    };
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để lấy thông tin chi tiết nhân viên theo id và gán vào employee
         * Author: AnhDV 22/09/2022
         */
        async getEmployeeById() {
            try {
                let self = this;
                const response = await self.$api.employee.getEmployeeById(self.getEmployeeId);
                if (response.data) {
                    self.employee = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để xử lý sự kiện cất
         * @param: {boolean} isClose: có đóng form hay không
         * Author: AnhDV 19/09/2022
         */
        saveHandler(isClose) {
            try {
                let self = this;
                self.attemptSubmit = true;
                let isSummited = true;
                // let indexError = 0;
                // const validateFields = [{
                //     name: "employeeCode",
                //     message: "Mã nhân viên không được để trống"
                // }, {
                //     name: "employeeName",
                //     message: "Tên nhân viên không được để trống"
                // }, {
                //     name: "departmentID",
                //     message: "Đơn vị không được để trống"
                // }];
                // validateFields.forEach((field, index) => {
                //     if (isNullOrEmpty(self.employee[field.name], true)) {
                //         self.employee[field.name] = ""; // set giá trị mặc định cho trường bị thiếu để hiển thị lỗi
                //         isSummited = false;
                //         // lấy ra vị trí đâu tiên bị lỗi để focus vào
                //         if (indexError === 0) {
                //             indexError = index;
                //         }
                //     } else {
                //         indexError = 0;
                //         self.employee[field.name] = self.employee[field.name].trim();
                //     }
                // });
                // nếu không có trường nào bị thiếu thì thực hiện cất
                if (isSummited) {
                    Object.keys(self.employee).forEach((key) => {
                        // xóa các trường không cần thiết
                        if (self.employee[key] == null || self.employee[key] === "") {
                            delete self.employee[key];
                        }
                    });
                    switch (self.getMode) {
                        case Enum.FORM_MODE.ADD:
                            self.insertEmployee(isClose);
                            break;
                        case Enum.FORM_MODE.EDIT:
                            self.updateEmployee(isClose);
                            break;
                    }
                } else {
                    // self.$refs.popup.show({
                    //     message: validateFields[indexError].message,
                    //     icon: 'error',
                    //     hideButton: true,
                    // });
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * @description: Hàm này dùng để focus vào trường đầu tiên 
        * Author: AnhDV 02/10/2022
        */
        returnFocus() {
            try {
                let self = this;
                self.$refs.employeeForm.querySelector("input").focus();
            } catch (error) {
                console.log(error);
            }
        },
    },
    updated() {
        console.log(this.getMode);
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
        max-width: 800px;
    }
}
</style>
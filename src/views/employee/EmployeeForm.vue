<template>
    <div>
        <!-- Khu vực hiển thị dialog form thêm hoặc sửa nhân viên -->
        <v-dialog :isShow="modelValue" @close="closeFormHandle">
            <template #title>
                <div class="row e-header">
                    <div class="e-header__title col font-weight-700">
                        {{$t('employee_info.title')}}
                    </div>
                    <div class="col">
                        <v-input type="checkbox" :label_custom="$t('employee_info.is_customer')"
                            v-model="employee.isCustomer" :value="true"></v-input>
                    </div>
                    <div class="col">
                        <v-input type="checkbox" :label_custom="$t('employee_info.is_supplier')"
                            v-model="employee.isSupplier" :value="true"></v-input>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="grid wide v-max-900" ref="employeeForm">
                    <div class="row">
                        <div class="col l-6 md-6">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5 c-5 focus">
                                    <v-input :label="$t('employee_info.code')" v-model="employee.employeeCode"
                                        :isSubmit="attemptSubmit" :required="true" :validateCheck="true"
                                        :errorLabel="$t('employee_info.code')">
                                    </v-input>
                                </div>
                                <div class="form-group col l-7 md-7 c-7">
                                    <v-input :label="$t('employee_info.name')" v-model="employee.employeeName"
                                        :maxLength="100" :validateCheck="true" :required="true"
                                        :isSubmit="attemptSubmit" :errorLabel="$t('employee_info.name')">
                                    </v-input>
                                </div>
                                <div class="form-group col l-12 md-12">
                                    <v-combobox position="bottom" propKey="departmentID" v-model="employee.departmentID"
                                        propValue="departmentName" :label="$t('employee_info.department')"
                                        :errorLabel="$t('employee_info.department')"
                                        v-model:textInput="employee.departmentName" :isSubmit="attemptSubmit"
                                        propApi="https://localhost:44365/api/v2/departments" :required="true">
                                        <template #item="item">
                                            {{item.option['departmentCode']}} - {{item.option['departmentName']}}
                                        </template>
                                    </v-combobox>
                                </div>
                                <div class="form-group col l-12 md-12">
                                    <v-input :label="$t('employee_info.job_title')" v-model="employee.jobTitle"
                                        :maxLength="100" :validateCheck="true"
                                        :errorLabel="$t('employee_info.job_title')">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                        <div class="col l-6 md-6">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 md-5">
                                    <v-date-picker :label="$t('employee_info.date_of_birth')"
                                        v-model="employee.dateOfBirth" :isLessThanToday="true"
                                        :errorLabel="$t('employee_info.date_of_birth')" :validateCheck="true">
                                    </v-date-picker>
                                </div>
                                <div class="form-group col l-7 md-7">
                                    <label class="label form-control font-weight-700">{{$t('employee_info.gender')}}
                                    </label>
                                    <div class="row ml-x-1 justify-content-between e-body__gender">
                                        <v-input type="radio" :label_custom="$t('employee_info.male')" :value=1
                                            v-model="employee.gender">
                                        </v-input>
                                        <v-input type="radio" :label_custom="$t('employee_info.female')" :value=0
                                            v-model="employee.gender">
                                        </v-input>
                                        <v-input type="radio" :label_custom="$t('employee_info.other')" :value=2
                                            v-model="employee.gender">
                                        </v-input>
                                    </div>
                                </div>
                                <div class="form-group col l-7 md-7">
                                    <v-input :label="$t('employee_info.identity_card')"
                                        v-model="employee.identityNumber" :validateCheck="true"
                                        :errorLabel="$t('employee_info.identity_card')" :isNumber="true"
                                        tooltipPosition="right" :tooltipText="$t('employee_info.identity_card_label')">
                                    </v-input>
                                </div>
                                <div class="form-group col l-5 md-5">
                                    <v-date-picker :label="$t('employee_info.issued_date')"
                                        :isLessThanValue="employee.dateOfBirth" :validateCheck="true"
                                        :errorLabel="$t('employee_info.issued_date')"
                                        :isLessThanValueLabel="$t('employee_info.date_of_birth')"
                                        v-model="employee.identityDate" />
                                </div>
                                <div class="form-group col l-12 md-12">
                                    <v-input :label="$t('employee_info.issued_by')" v-model="employee.identityPlace"
                                        :maxLength="255" :validateCheck="true"
                                        :errorLabel="$t('employee_info.issued_by')">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-12 md-12">
                            <v-input :label="$t('employee_info.address')" v-model="employee.employeeAddress"
                                :maxLength="255" :validateCheck="true" :errorLabel="$t('employee_info.address')">
                            </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.phone_number')" v-model="employee.phoneNumber"
                                :isPhoneNumber="true" :isNumber="true" :errorLabel="$t('employee_info.phone_number')"
                                :validateCheck="true" :tooltipText="$t('employee_info.phone_number_label')"
                                tooltipPosition="right">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.home_phone_number')" v-model="employee.telephoneNumber"
                                :isPhoneNumber="true" :isNumber="true"
                                :errorLabel="$t('employee_info.home_phone_number')" :validateCheck="true"
                                :tooltipText="$t('employee_info.home_phone_number_label')" tooltipPosition="right">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.email')" v-model="employee.email" :isEmail="true"
                                :errorLabel="$t('employee_info.email')" :validateCheck="true"> </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.bank_number')" v-model="employee.bankAccountNumber">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.bank_name')" v-model="employee.bankName">
                            </v-input>
                        </div>
                        <div class="form-group col l-3 md-3">
                            <v-input :label="$t('employee_info.bank_branch')" v-model="employee.bankBranch">
                            </v-input>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer__left>
                <v-button buttonType="secondary" @click="closeFormHandle" className="v-button__button-no-bg border">
                    {{$t('action_form.cancel')}}
                </v-button>
                <div style="max-width: 0; max-height: 0; overflow: hidden;">
                    <input @focus="inputFocus()" />
                </div>
            </template>
            <template #footer__right>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_CLOSE)" buttonType="secondary"
                    :tooltip="$t('action_form.save') + Enum.KEY_DEFINE.CTRL_S">
                    {{$t('action_form.save')}}
                </v-button>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_ADD)"
                    :tooltip="$t('action_form.save_and_add') + Enum.KEY_DEFINE.CTRL_SHIFT_S">
                    {{$t('action_form.save_and_add')}}
                </v-button>
            </template>
        </v-dialog>
        <!-- Khu vực hiển thị popup cảnh báo -->
        <v-popup ref="popup" :tabIndex="0"></v-popup>
    </div>
</template>

<script>
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
            employee: { // dữ liệu nhân viên
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
            attemptSubmit: true, // biến kiểm tra đã submit form chưa
            Enum: Enum, // dùng để gọi Enum trong template 
            isChaged: false, // dùng để check xem có thay đổi dữ liệu hay không
            departmentList: [], // danh sách phòng ban
        };
    },
    computed: {
        ...mapGetters(["getEmployeeId"]),
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
        }
    },
    watch: {
        /**
         * @description: Xử lý khi form được mở sau khi đóng thì set mode lại là null
         * Author: AnhDV 08/10/2022
         */
        modelValue: {
            handler(val) {
                if (!val) {
                    this.formMode = Enum.FORM_MODE.NULL;
                }
            },
            deep: true
        },
        /**
         * @description: Nhận các mode từ bên component employee-list và xử lý các nghiệp vụ tương ứng
         * Author: AnhDV 04/10/2022
         */
        formMode: {
            handler: async function (formMode) {
                const self = this;
                switch (formMode) {
                    case Enum.FORM_MODE.ADD:
                        await self.resetForm();
                        break;
                    case Enum.FORM_MODE.EDIT:
                        await self.getEmployeeById();
                        self.isChaged = false;
                        break;
                    case Enum.FORM_MODE.DUPLICATE:
                        await self.getEmployeeById(true);
                        break;
                    default:
                        break;
                }
                self.inputFocus();
            },
            deep: true,
        },
        /**
         * @description: Lấy ra các action key (phím tắt) và xử lý các nghiệp vụ tương ứng
         * Author: AnhDV 04/10/2022
         */
        action: {
            handler: async function (action) {
                const self = this;
                if (self.formMode !== Enum.FORM_MODE.NULL) {
                    switch (action) {
                        case Enum.ACTION.CLOSE:
                            self.closeFormHandle();
                            break;
                        case Enum.ACTION.SAVE_AND_CLOSE:
                            self.saveHandler(action);
                            break;
                        case Enum.ACTION.SAVE_AND_ADD:
                            self.saveHandler(action);
                            break;
                        default:
                            break;
                    }
                }
            },
            deep: true,
        },
        /**
         * @description: Bắt sự thay đổi của employee nếu thay đổi thì set isChaged = true
         * Author: AnhDV 04/10/2022
         */
        employee: {
            handler: function () {
                this.isChaged = true;
            },
            deep: true
        },
    },
    methods: {
        /**
         * @description: Hàm xử lý sự kiện đóng form nhân viên
         * @param {boolean} foceClose: có bắt buộc đóng form hay không
         * Author: AnhDV 22/09/2022
         */
        async closeFormHandle(forceClose = false) {
            try {
                const self = this;
                if (forceClose || !self.isChaged) {
                    self.resetForm(false);
                    self.$emit("update:modelValue", false);
                    self.$store.dispatch("setMode", null);
                    return;
                }
                if (self.isChaged) {
                    const confirm = await self.$refs.popup.show({
                        message: self.$t("notice_message.confirm_data_close"),
                        icon: Enum.ICON.INFO,
                        okButton: self.$t("confirm_popup.yes"),
                        cancelButton: self.$t("confirm_popup.no"),
                        closeButton: self.$t("confirm_popup.cancel"),
                    }); // hiển thị popup cảnh báo
                    switch (confirm) {
                        case self.$t("confirm_popup.yes"):
                            self.saveHandler(Enum.ACTION.SAVE_AND_CLOSE);
                            break;
                        case self.$t("confirm_popup.no"):
                            self.$emit("update:modelValue", false);
                            break;
                        default:
                            break;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để cập nhật nhân viên và emit giá trị employee vừa cập nhật
         * @param: {enum} action: hành động sau khi cập nhật
         * Author: AnhDV 19/09/2022
         */
        async updateEmployee() {
            let self = this;
            const response = await self.$api.employee.updateEmployee(self.employee); // gọi api update nhân viên
            if (response.status == Enum.MISA_CODE.SUCCESS) {
                self.$emit("updateEmployee", self.employee); // emit giá trị employee vừa cập nhật
                return Promise.resolve(true);
            }
        },
        /**
        * @description: Hàm này dùng để thêm mới nhân viên và emit giá trị employee vừa thêm mới
        * @param: {enum} action: hành động sau khi thêm mới
        * Author: AnhDV 19/09/2022
        */
        async insertEmployee() {
            let self = this;
            const response = await self.$api.employee.insertEmployee(self.employee);
            if (response.status == Enum.MISA_CODE.CREATED) {
                self.employee.employeeID = response.data; // gán giá trị employeeID vừa thêm mới
                self.$emit("insertEmployee", self.employee); // emit giá trị employee vừa thêm mới
                return Promise.resolve(true);
            }
        },
        /**
         * @description: Hàm này dùng để reset form về giá trị mặc định
         * @param: {boolean} getNewEmployeeCode: có lấy mã nhân viên mới hay không
         * Author: AnhDV 22/09/2022
         */
        async resetForm(getNewEmployeeCode = true) {
            try { // reset lại form
                let self = this;
                if (!getNewEmployeeCode) return;
                self.attemptSubmit = false; // reset lại trạng thái submit
                const response = await self.$api.employee.getNewEmployeeCode(); // lấy mã nhân viên mới
                if (response.status == Enum.MISA_CODE.SUCCESS) {
                    self.employee = { // gán giá trị mặc định cho employee
                        employeeCode: response.data,
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
         * @param {boolean} getNewEmployeeCode: có lấy mã nhân viên mới hay không ( phục vụ chức năng nhân bản)
         * Author: AnhDV 22/09/2022
         */
        async getEmployeeById(getNewEmployeeCode = false) {
            try {
                let self = this;
                const response = await self.$api.employee.getEmployeeById(self.getEmployeeId);
                if (response.status == Enum.MISA_CODE.SUCCESS) {
                    self.employee = response.data;
                    if (getNewEmployeeCode) {
                        const res = await self.$api.employee.getNewEmployeeCode(); // lấy mã nhân viên mới
                        if (res.status == Enum.MISA_CODE.SUCCESS) {
                            self.employee.employeeCode = res.data;
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Hàm này dùng để xử lý sự kiện cất
         * @param: {string} action: hành động sau khi cất
         * Author: AnhDV 19/09/2022
         */
        async saveHandler(action) {
            let self = this;
            try {
                self.attemptSubmit = true; // set trạng thái submit
                const validateResult = await self.$nextTick(async () => { // đợi cho khi các ô input validate xong thì mới tìm class error
                    const errorClass = self.$el.querySelectorAll(".error");
                    if (errorClass.length > 0) { // nếu có lỗi thì focus vào phần tử đầu tiên
                        let count = 1;
                        let htmlMessage = Array.from(errorClass).map((item) => {
                            return `${count++}. ${item.getAttribute("data-error")}`;
                        }).join('<br/>');
                        await self.$refs.popup.show({
                            message: htmlMessage,
                            icon: Enum.ICON.ERROR,
                            hideButton: 'true',
                        }).then(() => {
                            self.inputFocus(true);
                        });
                        return false;
                    } else {
                        return true;
                    }
                });
                if (validateResult) {
                    Object.keys(self.employee).forEach((key) => {
                        // xóa các trường là null hoặc ""
                        if (self.employee[key] == null || self.employee[key] === "") {
                            delete self.employee[key];
                        }
                    });
                    let result = true;
                    switch (self.formMode) {
                        case Enum.FORM_MODE.ADD: // nếu action form là add thì thực hiện insert
                            result = await self.insertEmployee();
                            break;
                        case Enum.FORM_MODE.EDIT: // nếu action form là edit thì thực hiện update
                            result = await self.updateEmployee();
                            break;
                        case Enum.FORM_MODE.DUPLICATE: // nếu action form là duplicate thì thực hiện duplicate 
                            result = await self.insertEmployee();
                            break;
                    }
                    if (result) { // nếu insert thành công thì xử lý action form
                        switch (action) {
                            case Enum.ACTION.SAVE_AND_CLOSE: // nếu nhấn cất
                                self.closeFormHandle(true);
                                break;
                            case Enum.ACTION.SAVE_AND_ADD: // nếu nhấn cất và thêm
                                self.formMode = Enum.FORM_MODE.NULL;
                                self.formMode = Enum.FORM_MODE.ADD;
                                break;
                            default:
                                break;
                        }
                    }
                }
            } catch (error) {
                if (error.response) {
                    let { status, data } = error.response;
                    if (status == Enum.MISA_CODE.VALIDATE) {
                        let htmlMessage = Object.values(data.Data).map((item) => {
                            return `${item}`;
                        });
                        await self.$refs.popup.showError(htmlMessage);
                    }
                } else {
                    self.$refs.popup.showError(self.$t("notice_message.unknown_error"));
                }
            }
        },
        /**
        * @description: Hàm này dùng để focus vào trường input đầu tiên hoặc là trường lỗi đầu tiên
        * @param: {boolean} isFocusError: có focus vào trường lỗi đầu tiên hay không
        * Author: AnhDV 02/10/2022
        */
        inputFocus(isFocusError = false) {
            try {
                let self = this;
                if (isFocusError) {
                    const errorClass = self.$el.querySelector(".error");
                    if (errorClass) {
                        if (errorClass.tagName === "INPUT") {
                            errorClass.focus();
                        }
                        if (errorClass.tagName === "DIV") {
                            errorClass.querySelector("input").focus();
                        }
                    }
                } else {
                    const focusFirst = self.$el.querySelector(".focus").querySelector("input");
                    if (focusFirst) {
                        focusFirst.focus();
                    }
                }
            } catch (error) {
                // console.log(error);
            }
        }
    },
    beforeUnmount() {
        this.formMode = Enum.FORM_MODE.NULL // reset lại formMode
        this.attemptSubmit = false; // reset lại attemptSubmit
        this.$emit("update:modelValue", false); // reset lại modelValue
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
        min-width: 400px;
    }
}
</style>
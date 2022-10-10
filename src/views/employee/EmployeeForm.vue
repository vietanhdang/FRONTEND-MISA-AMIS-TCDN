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
                                <div class="form-group col l-5 md-5 c-5 focus">
                                    <v-input label="Mã" v-model="employee.employeeCode" :required="true" errorLabel="Mã"
                                        :isSubmit="attemptSubmit" :validateCheck="true">
                                    </v-input>
                                </div>
                                <div class="form-group col l-7 md-7 c-7">
                                    <v-input label=" Tên" v-model="employee.employeeName" :required="true"
                                        :isSubmit="attemptSubmit" :validateCheck="true" ref="employeeName"
                                        errorLabel="Tên">
                                    </v-input>
                                </div>
                                <div class="form-group col l-12 md-12 c-12">
                                    <v-combobox position="bottom" propKey="departmentID" v-model="employee.departmentID"
                                        propValue="departmentName" label="Đơn vị" errorLabel="Đơn vị"
                                        v-model:textInput="employee.departmentName" :isSubmit="attemptSubmit"
                                        propApi="https://localhost:44365/api/v2/departments" :required="true">
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
                                    <v-date-picker label="Ngày sinh" v-model="employee.dateOfBirth"
                                        :isLessThanToday="true" errorLabel="Ngày sinh" :validateCheck="true">
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
                                    <v-input label="Số CMND" v-model="employee.identityNumber"
                                        tooltipText="Số chứng minh nhân dân" tooltipPosition="right">
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
                            <v-input label="ĐT di động" v-model="employee.phoneNumber" :isPhoneNumber="true"
                                errorLabel="Điện thoại di động" :validateCheck="true" tooltipText="Điện thoại di động"
                                tooltipPosition="right"></v-input>
                        </div>
                        <div class="form-group col l-3 md-3 c-12">
                            <v-input label="ĐT cố định" v-model="employee.telephoneNumber"
                                tooltipText="Điện thoại cố định" tooltipPosition="right"> </v-input>
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
                <v-button buttonType="secondary" @click="closeFormHandle" className="v-button__button-no-bg border"
                    text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_CLOSE)" buttonType="secondary"
                    :tooltip="Enum.NOTICE_MESSAGE.SAVE_AND_CLOSE">
                    Cất
                </v-button>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_ADD)" :tooltip="Enum.NOTICE_MESSAGE.SAVE_AND_ADD">
                    Cất và thêm
                </v-button>
                <div style="max-width: 0; max-height: 0; overflow: hidden;">
                    <input @focus="inputFocus()" />
                </div>
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
            attemptSubmit: true, // biến kiểm tra đã submit form chưa
            Enum: Enum, // dùng để gọi Enum trong template 
            isChaged: false, // dùng để check xem có thay đổi dữ liệu hay không
            departmentList: [], // danh sách phòng ban
        };
    },
    computed: {
        ...mapGetters(["getEmployeeId"]),
        /**
         * @description: Get và set trạng thái của form từ store
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
                    this.$store.dispatch('setMode', Enum.FORM_MODE.NULL);
                }
            },
            deep: true
        },
        /**
         * @description: Nhận các mode từ bên ngoài và xử lý các nghiệp vụ tương ứng
         * Author: AnhDV 04/10/2022
         */
        formMode: {
            handler: async function (newVal) {
                const self = this;
                switch (newVal) {
                    case Enum.FORM_MODE.ADD:
                        self.title = "Thêm mới";
                        await self.resetForm();
                        break;
                    case Enum.FORM_MODE.EDIT:
                        self.title = "Cập nhật";
                        await self.getEmployeeById();
                        self.isChaged = false;
                        break;
                    case Enum.FORM_MODE.DUPLICATE:
                        self.title = "Nhân bản";
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
         * @description: Nhận các action như cất và đóng hoặc cất và thêm mới từ bên ngoài và xử lý theo nghiêp vụ tương ứng
         * Author: AnhDV 04/10/2022
         */
        action: {
            handler: async function (newVal) {
                const self = this;
                switch (newVal) {
                    case Enum.ACTION.CLOSE:
                        self.closeFormHandle();
                        break;
                    case Enum.ACTION.SAVE_AND_CLOSE:
                        self.saveHandler(newVal);
                        break;
                    case Enum.ACTION.SAVE_AND_ADD:
                        self.saveHandler(newVal);
                        break;
                    default:
                        break;
                }
                self.inputFocus();
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
                        message: Enum.ALERT_MESSAGE.DATA_CHANGED,
                        icon: Enum.ICON.INFO,
                        okButton: Enum.CONFIRM.YES,
                        cancelButton: Enum.CONFIRM.NO,
                        closeButton: Enum.CONFIRM.CANCEL,
                    }); // hiển thị popup cảnh báo
                    switch (confirm) {
                        case Enum.CONFIRM.YES:
                            self.saveHandler(Enum.FORM_MODE.SAVE_AND_CLOSE);
                            break;
                        case Enum.CONFIRM.NO:
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
        async updateEmployee(action) {
            let self = this;
            const response = await self.$api.employee.updateEmployee(self.employee); // gọi api update nhân viên
            if (response.data) {
                self.$emit("updateEmployee", self.employee); // emit giá trị employee vừa cập nhật
                switch (action) {
                    case Enum.ACTION.SAVE_AND_CLOSE:
                        self.closeFormHandle(true);
                        break;
                    case Enum.ACTION.SAVE_AND_ADD:
                        self.formMode = Enum.FORM_MODE.NULL;
                        self.formMode = Enum.FORM_MODE.ADD;
                        break;
                    default:
                        break;
                }
            }
        },
        /**
        * @description: Hàm này dùng để thêm mới nhân viên và emit giá trị employee vừa thêm mới
        * @param: {enum} action: hành động sau khi thêm mới
        * Author: AnhDV 19/09/2022
        */
        async insertEmployee(action) {
            let self = this;
            const response = await self.$api.employee.insertEmployee(self.employee);
            if (response.data) {
                self.employee.employeeID = response.data; // gán giá trị employeeID vừa thêm mới
                self.$emit("insertEmployee", self.employee); // emit giá trị employee vừa thêm mới
                switch (action) { // xử lý theo action
                    case Enum.ACTION.SAVE_AND_CLOSE:
                        self.closeFormHandle(true);
                        break;
                    case Enum.ACTION.SAVE_AND_ADD:
                        self.formMode = Enum.FORM_MODE.NULL;
                        self.formMode = Enum.FORM_MODE.ADD;
                        break;
                    default:
                        break;
                }
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
                const employeeCode = await self.$api.employee.getNewEmployeeCode(); // lấy mã nhân viên mới
                if (employeeCode.data) { // nếu có mã nhân viên mới thì gán vào
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
         * @param {boolean} newEmployeeCode: có lấy mã nhân viên mới hay không ( phục vụ chức năng nhân bản)
         * Author: AnhDV 22/09/2022
         */
        async getEmployeeById(newEmployeeCode = false) {
            try {
                let self = this;
                const response = await self.$api.employee.getEmployeeById(self.getEmployeeId);
                if (response.data) {
                    self.employee = response.data;
                    if (newEmployeeCode) {
                        const employeeCode = await self.$api.employee.getNewEmployeeCode(); // lấy mã nhân viên mới
                        if (employeeCode.data) { // nếu có mã nhân viên mới thì gán vào
                            self.employee.employeeCode = employeeCode.data;
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
                        // xóa các trường không cần thiết
                        if (self.employee[key] == null || self.employee[key] === "") {
                            delete self.employee[key];
                        }
                    });
                    switch (self.formMode) {
                        case Enum.FORM_MODE.ADD:
                            await self.insertEmployee(action);
                            break;
                        case Enum.FORM_MODE.EDIT:
                            await self.updateEmployee(action);
                            break;
                        case Enum.FORM_MODE.DUPLICATE:
                            await self.insertEmployee(action);
                            break;
                    }
                }
            } catch (error) {
                if (error.response) {
                    let data = error.response.data.Data;
                    // lấy ra toàn bộ key và value của data
                    let htmlMessage = Object.values(data).map((item) => {
                        return `${item.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;").replace(/'/g, "&#039;")}`;
                    }).join('<br/>');
                    switch (error.response.status) {
                        case Enum.MISA_CODE.VALIDATE:
                            await self.$refs.popup.showError(htmlMessage);
                            break;
                    }
                } else {
                    self.$refs.popup.showError(Enum.NOTICE_MESSAGE.UNKNOWN_ERROR);
                }

            }
        },
        // /**
        // * @description: Hàm này dùng để focus vào trường input đầu tiên hoặc là trường lỗi đầu tiên
        // * @param: {boolean} isFocusError: có focus vào trường lỗi đầu tiên hay không
        // * Author: AnhDV 02/10/2022
        // */
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
    beforeUnmount() { // hàm này chạy trước khi component bị hủy
        this.formMode = Enum.FORM_MODE.NULL
        this.attemptSubmit = false;
        this.$emit("update:modelValue", false);
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
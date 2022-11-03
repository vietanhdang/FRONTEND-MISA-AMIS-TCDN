<template>
    <div>
        <!-- Khu vực hiển thị dialog form thêm hoặc sửa Kho -->
        <v-dialog :isShow="modelValue" @close="closeFormHandle(false)" width="600px"
            @keydown.ctrl.s.exact="saveHandler(Enum.ACTION.SAVE_AND_CLOSE)"
            @keydown.ctrl.shift.s.exact="saveHandler(Enum.ACTION.SAVE_AND_ADD)"
            @keydown.esc.exact="closeFormHandle(false)">
            <template #title>
                <div class="content-header__title">
                    Thêm Nhóm vật tư, hàng hóa, dịch vụ
                </div>
            </template>
            <template #body>
                <div class="grid">
                    <div class="row sm-gutter">
                        <div class="form-group col l-4 md-4 c-4">
                            <v-input label="Mã" :required="true" v-model="inventoryGroupObj.inventoryGroupCode"
                                errorLabel="Mã" ref="inventoryGroupCode"
                                @validate="setValid('inventoryGroupCode', $event)" :focus="true">
                            </v-input>
                        </div>
                        <div class="form-group col l-8 md-8 c-8">
                            <v-input label="Tên" :required="true" v-model="inventoryGroupObj.inventoryGroupName"
                                errorLabel="Tên" ref="inventoryGroupName"
                                @validate="setValid('inventoryGroupName', $event)">
                            </v-input>
                        </div>
                        <div class="form-group col l-12 md-12 c-12">
                            <v-combobox propKey="inventoryGroupID" v-model="inventoryGroupObj.inventoryGroupParentID"
                                propValue="inventoryGroupName" label="Thuộc"
                                propApi="https://localhost:44365/api/v2/inventorygroups"
                                :columns="[{ key: 'inventoryGroupCode', title: 'Mã nhóm', width: '120px' }, { key: 'inventoryGroupName', title: 'Tên nhóm', width: '250px' }]">
                            </v-combobox>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer__left>
                <v-button buttonType="secondary" @click="closeFormHandle(true)"
                    className="v-button__button-no-bg border">
                    {{ $t('action_form.cancel') }}
                </v-button>
                <div style="max-width: 0; max-height: 0; overflow: hidden;">
                    <input @focus="inputFocus()" />
                </div>
            </template>
            <template #footer__right>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_CLOSE)" buttonType="secondary"
                    :tooltip="$t('action_form.save') + Enum.KEY_DEFINE.CTRL_S">
                    {{ $t('action_form.save') }}
                </v-button>
                <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_ADD)"
                    :tooltip="$t('action_form.save_and_add') + Enum.KEY_DEFINE.CTRL_SHIFT_S">
                    {{ $t('action_form.save_and_add') }}
                </v-button>
            </template>
        </v-dialog>
        <!-- Khu vực hiển thị các popup cảnh báo -->
        <v-popup ref="popup" :tabIndex="0"></v-popup>
    </div>
</template>
<script>
import Enum from "@/utils/enum";
import api from "@/api/index";
export default {
    name: 'inventoryGroupForm',
    props: {
        modelValue: { // Dialog form hiển thị
            type: Boolean,
            default: false
        },
        entityId: { // Id đơn vị tính
            type: String,
            default: null
        },
    },
    data() {
        return {
            inventoryGroupObj: { // Đối tượng đơn vị tính
                inventoryGroupCode: '',
                inventoryGroupName: '',
                inventoryGroupParentID: null,
                status: 1
            },
            oldinventoryGroupObj: {},
            valids: {}, // Lưu trạng thái validate của các input
            refs: [ // Danh sách các ref của các input để validate
                'inventoryGroupCode',
                'inventoryGroupName',
            ],
            Enum, // Enum
        }
    },
    computed: {
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
    watch: {
        modelValue: {
            handler(isShowForm) {
                const self = this;
                if (isShowForm) {
                    if (self.formMode == Enum.FORM_MODE.ADD) {
                        self.oldinventoryGroupObj = JSON.parse(JSON.stringify(self.inventoryGroupObj));
                    } else if (self.formMode == Enum.FORM_MODE.EDIT) {
                        self.getDetail();
                    } else if (self.formMode == Enum.FORM_MODE.DUPLICATE) {
                        self.getDetail();
                        self.formMode = Enum.FORM_MODE.ADD;
                    }
                } else {
                    self.formMode = Enum.FORM_MODE.NULL;
                }
            },
            deep: true
        },
    },
    methods: {
        /**
         * @description: hàm lấy chi tiết thông tin bản ghi và hiển thị lên form
         * @param: {any} 
         * Author: AnhDV 29/10/2022
         */
        getDetail() {
            const self = this;
            try {
                api.inventoryGroup.getById(self.entityId, (res) => {
                    self.inventoryGroupObj = res.data;
                    self.oldinventoryGroupObj = JSON.parse(JSON.stringify(res.data));
                }, (err) => {
                    self.$refs.popup.show(err.message, 'error');
                });
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Kiểm tra dữ liệu có thay đổi hay không
         * @param: {any} 
         * Author: AnhDV 26/10/2022
         */
        isChanged() {
            return JSON.stringify(this.inventoryGroupObj) !== JSON.stringify(this.oldinventoryGroupObj);
        },
        /**
         * @description: Hàm xử lý sự kiện đóng form 
         * @param {boolean} foceClose: có bắt buộc đóng form hay không
         * Author: AnhDV 22/09/2022
         */
        closeFormHandle(forceClose = false) {
            const self = this;
            try {
                if (forceClose || !self.isChanged()) {
                    self.onHandleDialogState(false);
                    return;
                }
                if (self.isChanged()) {
                    self.$refs.popup.show({
                        message: self.$t("notice_message.confirm_data_close"),
                        icon: Enum.ICON.INFO,
                        okButton: self.$t("confirm_popup.yes"),
                        cancelButton: self.$t("confirm_popup.no"),
                        closeButton: self.$t("confirm_popup.cancel"),
                    }).then((confirm) => {
                        switch (confirm) {
                            case self.$t("confirm_popup.yes"):
                                self.saveHandler(Enum.ACTION.SAVE_AND_CLOSE);
                                break;
                            case self.$t("confirm_popup.no"):
                                self.onHandleDialogState(false);
                                break;
                            default:
                                break;
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
        * @description: Hàm này dùng để xem các field có hợp lệ hay không
        * @param: {any} 
        * Author: AnhDV 26/10/2022
        */
        setValid(fieldName, valid) {
            if (valid.error) {
                this.valids[fieldName] = valid;
            } else {
                delete this.valids[fieldName];
            }
        },
        /**
         * @description: Hàm này dùng để reset form
         * @param: {any} 
         * Author: AnhDV 26/10/2022
         */
        resetForm() {
            this.inventoryGroupObj = {
                inventoryGroupCode: '',
                inventoryGroupName: '',
                inventoryGroupParentID: null,
                status: 1
            };
            this.valids = {}; this.inputFocus();
        },
        /**
         * @description: Hàm này dùng để set trạng thái đóng mở của dialog
         * @param: {any} 
         * Author: AnhDV 26/10/2022
         */
        onHandleDialogState(isOpen = false) {
            this.$emit('update:modelValue', isOpen)
            if (!isOpen) {
                // reset lại form
                this.resetForm();
            }
        },
        /**
        * @description: Hàm này thực hiện lưu và update đơn vị tính
        * Author: AnhDV 26/10/2022
        */
        saveHandler(action) {
            const self = this;
            self.refs.forEach(ref => {
                self.$refs[ref].handleInputFocusOut();
                // focus out để validate
            });
            if (Object.keys(self.valids).length > 0) {
                self.$refs.popup.show({
                    message: Object.values(self.valids)[0].errorMess,
                    icon: Enum.ICON.ERROR,
                    hideButton: 'true',
                }).then(() => {
                    self.$refs[Object.keys(self.valids)[0]].handleInputFocus();
                });
                return;
            }
            switch (action) {
                case Enum.ACTION.SAVE_AND_CLOSE:
                    console.log('save and close');
                    self.insertData(false);
                    break;
                case Enum.ACTION.SAVE_AND_ADD:
                    console.log('save and add');
                    self.insertData(true);
                    break;
                default:
                    break;
            }
        },
        /**
         * @description: Hàm này dùng để insert dữ liệu vào database
         * Author: AnhDV 26/10/2022
         */
        async insertData(isReset = false) {
            const self = this;
            let result = false;
            if (self.formMode === Enum.FORM_MODE.ADD) {
                await api.inventoryGroup.save(self.inventoryGroupObj, (res) => {
                    self.inventoryGroupObj.inventoryGroupID = res.data;
                    console.log(res);
                    result = true;
                });
            } else if (self.formMode === Enum.FORM_MODE.EDIT) {
                await api.inventoryGroup.update(self.inventoryGroupObj, self.entityId, (res) => {
                    console.log(res);
                    result = true;
                });
            }
            if (result) {
                self.$emit('newUnit', self.inventoryGroupObj);
                if (isReset) {
                    self.resetForm();
                } else {
                    self.onHandleDialogState(false);
                }
            }
        },
        /**
         * @description: Hàm này sẽ input focus vào input đầu tiên
         * @param: {any} 
         * Author: AnhDV 26/10/2022
         */
        inputFocus() {
            this.$refs.inventoryGroupCode.handleInputFocus();
        }
    },
}
</script>
<style>
.v-line {
    margin-top: 16px;
}
</style>
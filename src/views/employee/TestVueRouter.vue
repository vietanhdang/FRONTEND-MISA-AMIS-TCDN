<template>
    <div class="grid">
        <div class="row no-gutters">
            <div class="col c-2 m-2 l-2">
                <v-button text="Show dialog danger" @click="showDialogDanger = true;showDialoginfo = true;">
                </v-button>
            </div>
            <div class="col c-2 m-2 l-2">
                <v-button text="Show dialog info" @click="showDialoginfo = true"></v-button>
            </div>
            <div class="col c-2 m-2 l-2">
                <v-button text="Show dialog add" @click="showDialogAdd = true"></v-button>
            </div>
            <div class="col c-2 m-2 l-2">
                <v-button text="Show Toast" @click="showToast"></v-button>
            </div>
        </div>
        <v-dialog v-model="showDialogDanger" :header="false" icon="danger">
            <template #body>
                Bạn có thực sự muốn xóa Nhân viên "00655" không?
            </template>
            <template #footer__left>
                <v-button @click="showDialogDanger = false" className="v-button__button-no-bg border" text="Không">
                </v-button>
            </template>
            <template #footer__right>
                <!-- <v-button @click="showDialog = false" className="v-button__button-no-bg border" text="Không"></v-button> -->
                <v-button text="Có"></v-button>
            </template>
        </v-dialog>
        <v-dialog v-model="showDialoginfo" :header="false" icon="info">
            <template #title>
                Dialog title
            </template>
            <template #body>
                Dữ liệu đã được thay đổi, bạn có muốn cất không?
            </template>
            <template #footer__left>
                <v-button @click="showDialoginfo = false;" className="v-button__button-no-bg border" text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button @click="showDialog = false" className="v-button__button-no-bg border" text="Không"></v-button>
                <v-button text="Có"></v-button>
            </template>
        </v-dialog>
        <v-dialog v-model="showDialogAdd" :header="true" icon="info" dialogType="form">
            <template #title>
                <div class="row e-header">
                    <div class="e-header__title col">
                        Thông tin nhân viên
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là khách hàng" :checked="false"></v-input>
                    </div>
                    <div class="col">
                        <v-input type="checkbox" label_custom="Là nhà cung cấp" :checked="false"></v-input>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="grid wide v-max-900">
                    <div class="row">
                        <div class="col l-6 m-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 m-5 c-5">
                                    <v-input label="Mã" placeholder="Nhập mã nhân viên" :required="true">
                                    </v-input>
                                </div>
                                <div class="form-group col l-7 m-7 c-7">
                                    <v-input label="Tên" :required="true" placeholder="Nhập tên nhân viên">
                                    </v-input>
                                </div>
                                <div class="form-group col l-12 m-12 c-12">
                                    <v-combobox :data="department" position="bottom" placeholder="Chọn đơn vị"
                                        label="Đơn vị" />
                                </div>
                                <div class="form-group col l-12 m-12 c-12">
                                    <v-input label="Chức danh" placeholder="Nhập chức danh">
                                    </v-input>
                                </div>
                            </div>
                        </div>
                        <div class="col l-6 m-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 m-5 c-12">
                                    <v-input label="Ngày sinh" type="date"> </v-input>
                                </div>
                                <div class="form-group col l-7 m-7 c-12">
                                    <label class="label form-control">Giới tính</label>
                                    <div class="row sm-gutter e-body__gender">
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nam" name="gender" value="0">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Nữ" name="gender" value="1">
                                            </v-input>
                                        </div>
                                        <div class="col">
                                            <v-input type="radio" label_custom="Khác" name="gender" value="2">
                                            </v-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col l-7 m-7 c-12">
                                    <v-input label="Số CMND" placeholder="Nhập số CMND"> </v-input>
                                </div>
                                <div class="form-group col l-5 m-5 c-12">
                                    <v-input label="Ngày cấp" type="date"> </v-input>
                                </div>
                                <div class="form-group col l-12 m-12 c-12">
                                    <v-input label="Nơi cấp" placeholder="Nhập nơi cấp"> </v-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-12 m-12 c-12">
                            <v-input label="Địa chỉ" placeholder="Nhập địa chỉ"> </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="ĐT di động" placeholder="Nhập số điện thoại di động"></v-input>
                        </div>
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="ĐT cố định" placeholder="Nhập số điện thoại cố định"> </v-input>
                        </div>
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="Email" placeholder="Nhập email"> </v-input>
                        </div>
                    </div>
                    <div class="row sm-gutter">
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="Tài khoản ngân hàng" placeholder="Nhập tài khoản ngân hàng"> </v-input>
                        </div>
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="Tên ngân hàng" placeholder="Nhập tên ngân hàng"> </v-input>
                        </div>
                        <div class="form-group col l-3 m-3 c-12">
                            <v-input label="Chi nhánh" placeholder="Nhập chi nhánh"> </v-input>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer__left>
                <v-button @click="showDialogAdd = false;" className="v-button__button-no-bg border" text="Hủy">
                </v-button>
            </template>
            <template #footer__right>
                <v-button className="v-button__button-no-bg border" text="Cất"></v-button>
                <v-button text="Cất và thêm"></v-button>
            </template>
        </v-dialog>
        <v-toast ref="toast" :maxMessage="10" :order="true"></v-toast>
        <div class="table-scroll">
            <v-table :columns="this.columns" :data="this.employeeList" :options="options">
            </v-table>
        </div>
    </div>
</template>
<script>
import VTable from '../../components/VTable.vue';

export default {
    components: { VTable },
    data() {
        return {
            showDialogDanger: false,
            showDialoginfo: false,
            showDialogAdd: false,
            options: [
                { key: 10, value: '10 bản ghi trên 1 trang' },
                { key: 20, value: '20 bản ghi trên 1 trang' },
                { key: 30, value: '30 bản ghi trên 1 trang' },
                { key: 50, value: '50 bản ghi trên 1 trang' },
                { key: 100, value: '100 bản ghi trên 1 trang' },
            ],
        };
    },
    methods: {
        showToast() {
            this.$root.$toast.info(`Message`, { timeout: 5000 });
        }
    },
    created() {
        this.employeeList = require('../../data/generate.json') || [];
        this.columns = [
            {
                title: '',
                key: 'employeeId',
                fixed: true,
                checkbox: true,
            },
            {
                title: 'Mã nhân viên',
                key: 'employeeCode',
            },
            {
                title: 'Tên nhân viên',
                key: 'employeeName',
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
                title: 'Số CMND',
                key: 'identityNumber',
            },
            {
                title: 'Chức danh',
                key: 'position',
            },
            {
                title: 'Tên đơn vị',
                key: 'department',
            },
            {
                title: 'Số tài khoản',
                key: 'bankAccount',
            },
            {
                title: 'Tên ngân hàng',
                key: 'bankName',
            },
            {
                title: 'Chi nhánh TK ngân hàng',
                key: 'bankAddress',
            },
            {
                title: 'Chức năng',
                key: 'action',
                fixed: true,
                type: 'action',
            },
        ];
    },
}
</script>

<style lang="scss" scoped>
.table-scroll {
    background-color: #e9ebee;
    overflow: auto;
    max-height: calc(100vh - 228px);
    position: relative;
}

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
        height: 36px;
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
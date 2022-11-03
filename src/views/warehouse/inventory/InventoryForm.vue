<template>
    <div class="inventory-container__form">
        <!-- Khu vực hiển thị dialog form thêm hoặc sửa đơn vị tính -->
        <!-- <v-dialog :isShow="isShowService" @close="onHandleCloseDialog" position="right" width="800px">
            <template #title>
                <div class="content-header__title">
                    Chọn tính chất hàng hóa dịch vụ
                </div>
            </template>
            <template #body>
                <div class="divide-line"></div>
                <div class="inventory-information">
                    <ul class="inventory-information__list">
                        <li class="inventory-information__item"
                            @click="onHandleShowForm('hanghoa', 'ms-icon ms-icon-inventory-item-category', 'Hàng hóa')">
                            <div class="inventory-information__item--icon">
                                <div class="ms-85 ms-icon ms-icon-inventory-item-category"></div>
                            </div>
                            <div class="inventory-information__item--content">
                                <label>Hàng hóa</label>
                                <p>Sản phẩm bạn mua và bán lại cho khách hàng</p>
                            </div>
                        </li>
                        <li class="inventory-information__item"
                            @click="onHandleShowForm('dichvu', 'ms-icon ms-icon-construct-item-category', 'Dịch vụ')">
                            <div class="inventory-information__item--icon">
                                <div class="ms-85 ms-icon ms-icon-construct-item-category"></div>
                            </div>
                            <div class="inventory-information__item--content">
                                <label>Dịch vụ</label>
                                <p>Đơn vị tính cho dịch vụ</p>
                            </div>
                        </li>
                        <li class="inventory-information__item"
                            @click="onHandleShowForm('nguyenvatlieu', 'ms-icon ms-icon-mataerial-item-category', 'Nguyên vật liệu')">
                            <div class="inventory-information__item--icon">
                                <div class="ms-85 ms-icon ms-icon-mataerial-item-category"></div>
                            </div>
                            <div class="inventory-information__item--content">
                                <label>Nguyên vật liệu</label>
                                <p>Đơn vị tính cho nguyên vật liệu</p>
                            </div>
                        </li>
                        <li class="inventory-information__item"
                            @click="onHandleShowForm('thanhpham', 'ms-icon ms-icon-clothes-item-category', 'Thành phẩm')">
                            <div class="inventory-information__item--icon">
                                <div class="ms-85 ms-icon ms-icon-clothes-item-category"></div>
                            </div>
                            <div class="inventory-information__item--content">
                                <label>Thành phẩm</label>
                                <p>Đơn vị tính cho thành phẩm</p>
                            </div>
                        </li>
                        <li class="inventory-information__item"
                            @click="onHandleShowForm('congcudungcu', 'ms-icon ms-icon-tool-item-category', 'Công cụ dụng cụ')">
                            <div class="inventory-information__item--icon">
                                <div class="ms-85 ms-icon ms-icon-tool-item-category"></div>
                            </div>
                            <div class="inventory-information__item--content">
                                <label>Công cụ dụng cụ</label>
                                <p>Đơn vị tính cho công cụ dụng cụ</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
        </v-dialog> -->
        <v-dialog :isShow="isShowForm" @close="onHandleCloseDialog" position="right" width="850px" :isResize="true">
            <template #title>
                <div class="content-header__title font-size-16">
                    Chọn tính chất hàng hóa dịch vụ
                </div>
                <div class="main-header d-flex">
                    <div class="main-icon">
                        <div class="ms-50 ms-icon ms-icon-inventory-item-category-detail"></div>
                    </div>
                    <div class="sub-title">
                        Hàng hóa
                    </div>
                    <div class="change-attribute" @click="onHandleShowForm('changeAttribute')">
                        Thay đổi tính chất
                    </div>
                </div>
            </template>
            <template #body>
                <div class="grid inventory-form__body v-form__label-small scrollable">
                    <div class="divide-line ml-b-3"></div>
                    <div class="inventory-form__basic">
                        <div class="row sm-gutter">
                            <div class="form-group col l-8 md-8">
                                <div class="row sm-gutter">
                                    <div class="form-group col l-12 md-12 focus">
                                        <v-input label="Tên" :required="true" errorLabel="Tên" ref="inventoryItemName"
                                            v-model="inventoryItem.inventoryItemName" :focus="true">
                                        </v-input>
                                    </div>
                                    <div class="form-group col l-3 md-3">
                                        <v-input label="Mã" :required="true" errorLabel="Mã" ref="inventoryItemCode"
                                            v-model="inventoryItem.inventoryItemCode">
                                        </v-input>
                                    </div>
                                    <div class="form-group col l-9 md-9">
                                        <v-combobox position="bottom" propKey="inventoryGroupID"
                                            propValue="inventoryGroupCode" label="Nhóm VTHH"
                                            propTooltip="inventoryGroupName" tooltipText="Nhóm vật tư hàng hóa"
                                            tooltipPosition="right" mode="multiple"
                                            v-model="inventoryItem.inventoryGroupID"
                                            propApi="https://localhost:44365/api/v2/inventorygroups" :add="true"
                                            :columns="[{ key: 'inventoryGroupCode', title: 'Mã nhóm vật tư, hàng hóa, dịch vụ', width: '250px' }, { key: 'inventoryGroupName', title: 'Tên nhóm vật tư, hàng hóa, dịch vụ', width: '250px' }]">
                                        </v-combobox>
                                    </div>
                                    <div class="form-group col l-3 md-3">
                                        <v-combobox position="bottom" propKey="unitID" propValue="unitName"
                                            label="Đơn vị tính chính" propApi="https://localhost:44365/api/v2/units"
                                            :add="true">
                                        </v-combobox>
                                    </div>
                                    <div class="form-group col l-4 md-4">
                                        <v-combobox position="bottom" propKey="key" propValue="value"
                                            tooltipText="Trạng thái tra cứu giảm thuế theo nghị quyết 43/2022/QH15"
                                            tooltipPosition="right" :selectBox="true"
                                            :data="[{ key: '1', value: 'Chưa xác định' }, { key: '2', value: 'Không giảm thuế' }, { key: '3', value: 'Có giảm thuế' }]"
                                            label="Giảm thuế theo NQ43">
                                        </v-combobox>
                                    </div>
                                    <div class="form-group col l-4 md-4 align-self-end">
                                        <v-tooltip content="Tra cứu mặt hàng giảm thuế theo nghị quyết 43" :top="25"
                                            position="center">
                                            <div class="inventory-tax__search">
                                                <div class="ms-16 ms-icon-v2 ms-icon-search-tax"></div>
                                                <div>Tra cứu giảm thuế</div>
                                            </div>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col l-4 md-4">
                                <div class="inventory-form__upload">
                                    <div class="inventory-form__upload-image">
                                        <div class="ms-64 ms-icon-v2 ms-icon-preview-image"></div>
                                    </div>
                                    <div class="inventory-form__upload-action">
                                        <v-tooltip content="Sửa">
                                            <div class="ms-24 ms-icon-v2 ms-icon-edit-upload-file"></div>
                                        </v-tooltip>
                                        <div class="separate-line-upload"></div>
                                        <v-tooltip content="Tải xuống">
                                            <div class="ms-24 ms-icon-v2 ms-icon-download-upload-file"></div>
                                        </v-tooltip>
                                        <div class="separate-line-upload"></div>
                                        <v-tooltip content="Xóa">
                                            <div class="ms-24 ms-icon-v2 ms-icon-delete-upload-file"></div>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="divide-line ml-y-3"></div>
                        <div class="row sm-gutter">
                            <div class="form-group col l-2 md-2">
                                <v-combobox position="bottom" propKey="value" propValue="value"
                                    label="Thời hạn bảo hành" :additionValue="true"
                                    v-model="inventoryItem.guarantyPeriod"
                                    :data="[{ value: '1 tháng' }, { value: '2 tháng' }, { value: '3 tháng' }, { value: '4 tháng' }, { value: '9 tháng' }, { value: '1 năm' }, { value: '2 năm' }, { value: '3 năm' }, { value: '4 năm' }, { value: '9 năm' }, { value: '12 năm' }]">
                                </v-combobox>
                            </div>
                            <div class="form-group col l-3 md-3">

                                <v-input label="Số lượng tồn tối thiểu" type="number">
                                </v-input>
                            </div>
                            <div class="form-group col l-7 md-7">
                                <v-input label="Nguồn gốc">
                                </v-input>
                            </div>
                            <div class="form-group col l-12 md-12">
                                <v-input label="Mô tả" type="textarea">
                                </v-input>
                            </div>
                            <div class="form-group col l-12 md-12">
                                <v-input label="Diễn giải khi mua">
                                </v-input>
                            </div>
                            <div class="form-group col l-12 md-12">
                                <v-input label="Diễn giải khi bán">
                                </v-input>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col l-12 md-12">
                        <a-collapse v-model:activeKey="activeKey" @change="changeActivekey" accordion>
                            <template #expandIcon="{ isActive }">
                                <div class="ms-16 ms-icon-v2"
                                    :class="isActive ? 'ms-icon-arrow-bottom-black' : 'ms-icon-arrow-right-black'">
                                </div>
                            </template>
                            <a-collapse-panel key="1" header="Thông tin ngầm định">
                                <div class="row m-l-0">
                                    <div class="form-group col l-3 md-3">
                                        <v-combobox position="bottom" propKey="stockID" propValue="stockCode"
                                            label="Kho ngầm định" tooltipText="Nhóm vật tư hàng hóa"
                                            tooltipPosition="right" propApi="https://localhost:44365/api/v2/stocks"
                                            :add="true" className="form-group"
                                            :columns="[{ key: 'stockCode', title: 'Mã kho', width: '150px' }, { key: 'stockName', title: 'Tên kho', width: '200px' }]">
                                        </v-combobox>
                                        <v-input label="Tài khoản kho" className="form-group">
                                        </v-input>
                                        <v-input label="TK doanh thu" tooltipText="Tài khoản doanh thu"
                                            className="form-group">
                                        </v-input>
                                        <v-input label="TK chiết khấu" tooltipText="Tài khoản chiết khấu"
                                            className="form-group">
                                        </v-input>
                                    </div>
                                    <div class="form-group col l-3 md-3">
                                        <v-input label="Tài khoản giảm giá" tooltipText="Tài khoản giảm giá"
                                            className="form-group">
                                        </v-input>
                                        <v-input label="Tài khoản trả lại" tooltipText="Tài khoản trả lại"
                                            className="form-group">
                                        </v-input>
                                        <v-input label="TK chi phí" tooltipText="Tài khoản chi phí"
                                            className="form-group">
                                        </v-input>
                                        <v-input label="Tỷ lệ CKMH(%)" tooltipText="Tỷ lệ chiết khấu mua hàng"
                                            className="form-group" type="number">
                                        </v-input>
                                    </div>
                                    <div class="form-group col l-3 md-3">
                                        <v-input label="Đơn giá mua cố định" className="form-group">
                                        </v-input>
                                        <v-input label="Đơn giá mua gần nhất" className="form-group"></v-input>
                                        <v-input label="Đơn giá bán" className="form-group"></v-input>
                                    </div>
                                    <div class="form-group col l-3 md-3">
                                        <v-input label="Kho ngầm định" className="form-group">
                                        </v-input>
                                        <v-input label="Tài khoản kho" className="form-group">
                                        </v-input>
                                        <v-input label="TK doanh thu" className="form-group">
                                        </v-input>
                                        <v-input label="TK chiết khấu" className="form-group">
                                        </v-input>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="Chiết khấu bán hàng">
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="Đơn vị chuyển đổi">
                            </a-collapse-panel>
                            <a-collapse-panel key="4" header="Công thức tính số lượng">
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                    <div class="divide-line ml-b-3"></div>
                </div>
            </template>
            <template #footer__left>
                <v-button buttonType="secondary" @click="onHandleCloseDialog" className="v-button__button-no-bg border">
                    {{ $t('action_form.cancel') }}
                </v-button>
                <div style="max-width: 0; max-height: 0; overflow: hidden;">
                    <input @focus="inputFocus()" />
                </div>
            </template>
            <template #footer__right>
                <v-tooltip :content="$t('action_form.save') + Enum.KEY_DEFINE.CTRL_S" :equalWidth="true">
                    <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_CLOSE)" buttonType="secondary">
                        {{ $t('action_form.save') }}
                    </v-button>
                </v-tooltip>
                <v-tooltip :content="$t('action_form.save_and_add') + Enum.KEY_DEFINE.CTRL_SHIFT_S" :equalWidth="true">
                    <v-button @click="saveHandler(Enum.ACTION.SAVE_AND_ADD)">
                        {{ $t('action_form.save_and_add') }}
                    </v-button>
                </v-tooltip>
            </template>
        </v-dialog>
    </div>

</template>

<script>
import { Collapse as ACollapse, CollapsePanel as ACollapsePanel } from 'ant-design-vue'
import '@/assets/scss/base/collapse.scss'
import Enum from "@/utils/enum";
export default {
    name: 'UnitForm',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ACollapse,
        ACollapsePanel
    },
    computed: {
        isShowForm: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        Enum() {
            return Enum
        }
    },
    data() {
        return {
            activeKey: [],
            inventoryItem: {
                inventoryItemCode: '',
                inventoryItemName: '',
                guarantyPeriod: '',
                inventoryGroupID: ['0eb0136b-ee41-463f-8e8f-9b4f29b7a037'],
            }


        }
    },
    methods: {
        changeActivekey(key) {
            this.activeKey = key
        },
        onHandleCloseDialog() {
            this.isShowForm = false
        },
        inputFocus() {
            this.$refs.inventoryName.handleInputFocus()
        },
    },
    unmounted() {
        this.onHandleCloseDialog()
    }
}
</script>

<style lang="scss" scoped>
.main-header {
    margin-top: 8px;
    align-items: center;
}

.main-icon {
    .ms-icon {
        width: 50px !important;
        height: 50px !important;
    }
}

.sub-title {
    padding: 0 8px 0 14px;
    font-size: 18px;
}

.change-attribute {
    color: #308ccd;
    transition: all .1s ease-in;

    &:hover {
        padding-bottom: 7px;
        transition: all .1s ease-in;
        cursor: pointer;
    }
}

.v-dialog__header {
    padding-bottom: 32px;
}

.v-line {
    margin-top: 16px;
}

.divide-line {
    height: 1px;
    width: 100%;
    background: rgb(212, 215, 220);
    margin: 0;
    padding: 0;
}

.separate-line-upload {
    height: 14px;
    width: 1px;
    background: #d4d7dc;
    margin: 0 10px;
}

.inventory {
    &-form__body {
        padding: 0 20px;
    }

    &-information {}

    &-information__list {}

    &-tax__search {
        display: flex;
        align-items: center;
        color: #308ccd;
        cursor: pointer;
    }

    &-form__basic {
        margin-bottom: 14px;
    }

    &-form__upload {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        padding-top: 22px;
    }

    &-form__upload-image {
        border: 1px solid #e0e0e0;
        min-height: 120px;
        min-width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &-form__upload-action {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &-information__item {
        cursor: pointer;
        padding: 16px 16px 20px 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(212, 215, 220);
        box-sizing: border-box;

        &:hover {
            background: rgb(245, 245, 245);
        }

    }

    &-information__item--icon {}

    &-information__item--content {
        padding-left: 16px;
        font-size: 13px;


        label {
            font-weight: 700;
            cursor: pointer;

        }

        p {
            margin-top: 8px;
        }
    }


}
</style>
<template>
    <div class="unit-container">
        <div class="content-header">
            <div class="content-header__info">
                <div class="content-header__title">Kho</div>
                <v-dropdown className="primary rounded ms-l-3" icon="ms-16 ms-icon ms-icon-arrow-down-white"
                    @onClick="showStockForm" :items="[{ key: 'import', value: 'Nhập từ excel' }]" :hasButton="true">
                    Thêm
                </v-dropdown>
            </div>
            <div class="content-header__breadcumb">
                <div class="ms-16 ms-icon ms-icon-chevron-left"></div>
                <router-link to="/quan-ly-kho">Tất cả danh mục</router-link>
            </div>
        </div>
        <div class="unit-body">
            <div class="unit-toolbar">
                <div class="unit-toolbar__left d-flex align-item-center">
                    <v-input placeholder="Tìm kiếm theo đơn vị tính" icon="ms-16 ms-icon ms-icon-search"
                        v-model="keyword" :outline="true" :styleProps="['width: 240px', 'font-style: italic']"
                        className="v-input__with-icon" :focus="true" />
                    <div class="filter-condition" v-if="dataFilter.length > 0">
                        <div class="filter-condition__item" v-for="(item, index) in dataFilter" :key="index">
                            {{ item.title }} {{ item.selectedOption ? '' : item.conditionName }} {{ item.selectedOption
                                    ?
                                    `"${item.selectedOption}"` :
                                    item.value ? `"${item.value}"` : ''
                            }}
                            <div class="filter-condition__delete ms-16 ms-icon ms-icon-close-small"
                                @click="deleteFilterCondition(index)"></div>
                        </div>
                        <div class="filter-condition__remove" @click="deleteFilterCondition(-1)">Xóa điều kiện lọc</div>
                    </div>
                </div>
                <div class="unit-toolbar__right">
                    <div :tooltip="$t('action.reload_data')" class="ms-24 ms-icon ms-icon-reload ms-r-2 ml-l-2"
                        @click="reloadData">
                    </div>
                    <div :tooltip="$t('action.export_excel')" class="ms-24 ms-icon ms-icon-excel ms-x-2"></div>
                </div>
            </div>
            <div class="unit-table">
                <v-table :columns="columns" :data="stockResult.data" :actions="tableAction" :tablePadding="false"
                    @dataFilter="filterData" @action="handleSelectAction">
                </v-table>
            </div>
            <div class="unit-pagination">
                <!-- Phân trang -->
                <v-pagination v-model:pageSize="objectFilter.pageSize" v-model:pageNumber="objectFilter.pageNumber"
                    v-model:totalRecord="stockResult.totalRecord">
                </v-pagination>
            </div>
        </div>
        <StockForm v-model="isShowStockForm" :entityId="entityId" @newUnit="updateFrontEnd" />
        <v-popup ref="popup"></v-popup>
        <v-toast ref="toast" :showProgress="true" :maxMessage="10" :timeout="3000"></v-toast>
    </div>
</template>
<script>
import _ from 'lodash'
import StockForm from './StockForm.vue'
import Enum from "@/utils/enum";
import api from '@/api';
export default {
    name: 'UnitPage',
    components: {
        StockForm
    },
    data() {
        return {
            keyword: '', // Từ khóa tìm kiếm
            objectFilter: { // Đối tượng lọc
                pageNumber: 1,
                pageSize: 20,
                keyword: "",
                filter: []
            },
            stockResult: {}, // Kết quả trả về từ api
            isShowStockForm: false, // Hiển thị form
            entityId: null, // Id của đối tượng,
            dataFilter: [], // Dữ liệu lọc
        }
    },
    computed: {
        tableAction() {
            return [
                {
                    'key': Enum.ACTION.DUPLICATE,
                    'value': this.$t('action.duplicate')
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
        },
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
        /**
         * @description: Xử lý khi keyword thay đổi
         * @param: {any}
         * Author: AnhDV 24/10/2022
         */
        keyword: _.debounce(function (newVal) {
            this.objectFilter.keyword = newVal;
        }, 500),

        /**
         * @description: Xử lý khi objectFilter thay đổi
         * @param: {any}
         * Author: AnhDV 24/10/2022
         */
        objectFilter: {
            handler: function () {
                this.getStockList();
            },
            deep: true
        },
        /**
         * @description: Theo giõi action key có sẵn
         * @param: {any} 
         * Author: AnhDV 29/10/2022
         */
        '$store.getters.getActionKey': {
            handler(actionKey) {
                if (Enum.ACTION.ADD === actionKey && !this.isShowStockForm) {
                    this.showStockForm(Enum.ACTION.ADD)
                }
            },
            deep: true
        }
    },
    methods: {
        /**
         * @description: Hiển thị form đơn vị tính
         * Author: AnhDV 24/10/2022
         */
        showStockForm(formMode) {
            this.formMode = formMode ? formMode : Enum.FORM_MODE.ADD;
            this.isShowStockForm = true
        },
        /**
         * @description: Hàm này dùng để bắt sự kiện filter dữ liệu
         * @param: {any} 
         * Author: AnhDV 27/10/2022
         */
        filterData(dataFilter) {
            let data = [];
            if (dataFilter.length > 0) {
                dataFilter.forEach(item => {
                    let obj = {
                        fieldName: item.key,
                        value: item.value,
                        filterCondition: item.condition
                    }
                    data.push(obj);
                });
            }
            this.objectFilter.pageNumber = 1;
            this.objectFilter.filter = data;
            this.dataFilter = dataFilter;
        },
        /**
         * @description: Hàm này dùng để xóa 1 hoặc nhiều điều kiện lọc
         * Author: AnhDV 28/10/2022
         */
        deleteFilterCondition(index) {
            if (index >= 0) {
                this.dataFilter.splice(index, 1);
            } else {
                this.dataFilter.splice(0, this.dataFilter.length);
            }
            this.filterData(this.dataFilter);
        },
        /**
         * @description: Hàm này dùng để nhận các action từ table và thực hiện các nghiệp vụ tương ứng
         * Author: AnhDV 27/10/2022
         */
        handleSelectAction(action, object) {
            const self = this;
            switch (action) {
                case Enum.ACTION.DELETE:
                    self.deteteStock(object);
                    break;
                case Enum.ACTION.EDIT:
                    self.entityId = object.stockID;
                    self.showStockForm(Enum.FORM_MODE.EDIT);
                    break;
                case Enum.ACTION.DUPLICATE:
                    self.entityId = object.stockID;
                    self.showStockForm(Enum.FORM_MODE.DUPLICATE);
                    break;
                case Enum.ACTION.INACTIVE:
                    break;
            }
        },
        /**
         * @description: Hàm này dùng cập nhật lại danh sách khi thêm mới hoặc sửa đổi bên front-end
         * Author: AnhDV 27/10/2022
         */
        updateFrontEnd(object) {
            const unitId = object.stockID;
            if (this.formMode === Enum.ACTION.EDIT) {
                const index = this.stockResult.data.findIndex(item => item.stockID === unitId);
                this.stockResult.data.splice(index, 1);
            }
            this.stockResult.data.unshift(object);
        },
        /**
         * @description: Xóa đơn vị tính bên font-end
         * @param: {any} 
         * Author: AnhDV 24/10/2022
         */
        async deteteStock(object) {
            const self = this;
            try {
                const confirm = await self.$refs.popup.show({
                    message: `Bạn có thực sự muốn xóa Kho <<b>${object.stockName}</b>> không?`,
                    icon: Enum.ICON.WARNING,
                    okButton: self.$t('confirm_popup.yes'),
                    closeButton: self.$t('confirm_popup.cancel'),
                });
                if (confirm == self.$t('confirm_popup.yes')) {
                    api.stock.deleteById(object.stockID, () => {
                        const index = self.stockResult.data.findIndex((item) => item.stockID === object.stockID);
                        if (index !== -1) {
                            self.stockResult.data.splice(index, 1);
                            self.stockResult.totalRecord -= 1; // Giảm tổng số bản ghi đi 1
                        }
                        self.$root.$toast.success(`Xóa Kho <<b>${object.stockName}</b>> thành công!`);
                    }, () => {
                        self.$root.$toast.error(`Xóa đơn vị tính <<b>${object.stockName}</b>> thất bại`);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Lấy danh sách đơn vị tính
         * @param: {any} 
         * Author: AnhDV 24/10/2022
         */
        getStockList(isReload = false) {
            const self = this;
            api.stock.getAllPaging(self.objectFilter.pageNumber, self.objectFilter.pageSize, {
                keyword: self.objectFilter.keyword,
                filter: JSON.stringify(self.objectFilter.filter)
            }, (res) => {
                self.stockResult = res.data;
                if (isReload) {
                    self.$root.$toast.success(self.$t('notice_message.reload_data_success'))
                }
            });
        },
        /**
         * @description: Reload data
         * Author: AnhDV 24/10/2022
         */
        reloadData() {
            const self = this;
            self.getStockList(true);
        }
    },
    created() {
        this.columns = [
            {
                title: "Mã kho",
                key: "stockCode",
                search: true,
                width: "150px",
                fixed: true,
                left: "150px",
                filterable: true,
            },
            {
                title: "Tên kho",
                key: 'stockName',
                width: "20%",
                filterable: true,
            },
            {
                title: "Địa chỉ",
                key: 'address',
                filterable: true,
            },
            {
                title: "Trạng thái",
                key: 'status',
                type: 'status',
                filterType: 'combobox',
                filterOptions: [
                    {
                        key: 1,
                        value: 'Đang sử dụng'
                    },
                    {
                        key: -1,
                        value: 'Ngừng sử dụng'
                    }
                ],
                width: "150px",
                filterable: true,
            },
            {
                title: "Chức năng",
                key: 'action',
                type: 'action',
                fixed: true,
                textAlign: 'center',
                width: "100px",

            },
        ] // Khởi tạo danh sách cộ
        this.Enum = Enum; // Khởi tạo Enum
        this.getStockList(); // Lấy danh sách đơn vị tính
    },
}
</script>

<style lang="scss" scoped>
.filter {
    &-condition {
        display: flex;
        align-items: center;
        line-height: 35px;
        margin-left: 10px;
    }

    &-condition__item {
        display: flex;
        color: #0075c0;
        white-space: nowrap;
        align-items: center;
        padding-right: 10px;
        position: relative;
    }

    &-condition__delete {
        margin-left: 4px;
    }

    &-condition__remove {
        color: #0075c0;
        display: inline-block;
        cursor: pointer;
    }
}

.unit-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.unit-body {
    padding: 16px;
    margin-top: 20px;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.unit-toolbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
}

.unit-table {
    height: 100%;
    display: flex;
}

.unit-toolbar__left {}

.unit-toolbar__right {
    display: flex;
    align-items: center;
}
</style>
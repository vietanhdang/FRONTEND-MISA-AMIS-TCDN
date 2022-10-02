<template>
    <div class="v-table">
        <v-loading :isLoaded="isLoaded"></v-loading>
        <table class="v-table__main" ref="table">
            <thead class="v-table__header">
                <tr class="v-table__header-row">
                    <!-- Tạo phần padding-left 20px -->
                    <th class="v-table__header-row-sticky" style="min-width: 20px"></th>
                    <!-- Render header dựa vào props columns bên component cha -->
                    <th v-for="(column, index) of columns" :key="index" class="v-table__header-cell"
                        :class="[{'v-table__header-row-sticky': column.fixed},`v-text__${column.textAlign ? column.textAlign : 'left'}`]"
                        :style="[`${column.width ? `min-width: ${column.width}px`:''}`]">
                        {{ column.title }}
                        <!-- Nếu như có type là checkbox mà title là null thì render checkbox -->
                        <v-input type="checkbox" @click="checkAll" :checked="false" inputClass="align-items-center"
                            className="no-animation" v-model="checkAllValue" v-if="column.checkbox && !column.title">
                        </v-input>
                    </th>
                    <!-- Tạo phần padding-right 30px -->
                    <th class="v-table__header-row-sticky" style="min-width: 30px"></th>
                </tr>
            </thead>
            <tbody class="v-table__body">
                <!-- Render body dựa vào key -->
                <tr v-for="(row, index1) of data.data" :key="index1" class="v-table__body-row" :ref="`tr-${index1}`">
                    <td class="v-table__body-row-sticky" style="min-width: 20px"></td>
                    <td v-for="(column, index) of columns" :key="index" class="v-table__body-cell"
                        :class="[`v-text__${column.textAlign ? column.textAlign : 'left'}`, {'v-table__body-row-sticky': column.fixed}]"
                        :ref="`${column.type === 'action' ? `td-action-${index1}` : ''}`"
                        :style="[`${column.width ? `min-width: ${column.width}px`:''}`]"
                        @dblclick="column.fixed ? '' : onHandleEdit(row,index1)">
                        <!-- Khởi tạo skeleton loading -->
                        <a-skeleton active :loading="!isLoaded" :paragraph="false" :title="true">
                            <!-- Nếu như type là checkbox thì render checkbox -->
                            <v-input type="checkbox" :value="{'index':index1,'value':row[column.key]}"
                                v-if="column.checkbox && !column.title" v-model="listSelected"
                                inputClass="align-items-center"></v-input>
                            <!-- Nếu như type là checkbox và có title thì render checkbox disabled -->
                            <v-input type="checkbox" v-else-if="column.checkbox && column.title" :disabled="true"
                                v-model="row[column.key]" inputClass="align-items-center">
                            </v-input>
                            <!-- Nếu như type là date thì render date format theo format của column -->
                            <template v-else-if="column.type === 'date'">
                                {{row[column.key] ?formatDate(row[column.key]) : ''}}
                            </template>
                            <!-- Nếu như type là gender thì render giới tính -->
                            <template v-else-if="column.type === 'gender'">
                                {{convertGender(row[column.key])}}
                            </template>
                            <!-- Nếu như type là action thì render action -->
                            <template v-else-if="column.type === 'action'">
                                <v-menu :propKey="row" @v-delete="onHandleDelete"
                                    :isUp="data.data.length == index1 + 1 || data.data.length == index1 + 2">
                                </v-menu>
                            </template>
                            <!-- Nếu như không có type thì render giá trị của key -->
                            <template v-else>
                                {{row[column.key]}}
                            </template>
                        </a-skeleton>
                    </td>
                    <td class="v-table__body-row-sticky" style="min-width: 30px"></td>
                </tr>
            </tbody>
            <tfoot class="v-table__footer" v-if="vPagination.totalRecord !== 0">
                <tr class="v-table__footer-row">
                    <td class="v-table__footer-cell" colspan="100%">
                        <div class="v-pagination__container">
                            <div class="v-pagination__left">
                                Tổng số: <span class="font-weight-700 m-x-1"> {{ vPagination.totalRecord }} </span> bản
                                ghi
                            </div>
                            <div class="v-pagination__right">
                                <div class="v-pagination__right-record">
                                    <!-- <VSelect :data="options" position="top" propKey="key" propValue="value"
                                        v-model="vPagination.pageSize" @change="vPagination.pageNumber = 1" /> -->
                                    <v-combobox position="top" propKey="key" v-model="vPagination.pageSize"
                                        propValue="value" :data="options" :selectBox="true">
                                    </v-combobox>
                                </div>
                                <div class="v-pagination__right-page">
                                    <a-pagination v-model:current="vPagination.pageNumber"
                                        :total="vPagination.totalRecord" :showSizeChanger="false"
                                        v-model:pageSize="vPagination.pageSize" :itemRender="itemRender" size="small"
                                        :showLessItems="true">
                                    </a-pagination>
                                </div>
                            </div>
                        </div>
                    </td>

                </tr>
            </tfoot>
        </table>
        <!-- Nếu như tổng số bản ghi trả về là 0 thì sẽ hiển thị không có dữ liệu -->
        <div class="v-table__not-found" v-if="vPagination.totalRecord === 0">
            <div class="v-table__not-found-icon">
                <img :src="require('@/assets/img/bg_no_data.svg')" alt="">
            </div>
            <div class="v-table__not-found-text">
                Không có dữ liệu
            </div>
        </div>
    </div>
</template>
<script>

import { formatDate, convertGender } from '@/utils/format';
import { Pagination } from 'ant-design-vue';
import Skeleton from 'ant-design-vue/es/skeleton';
import 'ant-design-vue/dist/antd.css';
export default {
    name: "VTable",
    components: {
        aPagination: Pagination,
        aSkeleton: Skeleton,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        dataState: {
            type: Boolean,
        },
        columns: {
            type: Array,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        pagination: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            tableWidth: 0, // biến này dùng để lưu độ rộng của table
            isLoaded: false, // biến này dùng để kiểm tra xem đã load dữ liệu chưa
            listSelected: [], // biến này dùng để lưu danh sách các dòng đã được chọn,
            vPagination: {},
            checkAllValue: false,
        };
    },
    methods: {
        /**
         * @description: Hàm này gọi dùng để format ngày tháng
         * Author: AnhDV 12/09/2022
         */
        formatDate,
        /**
         * @description: Hàm này gọi dùng để format giới tính
         * Author: AnhDV 12/09/2022
         */
        convertGender,
        /**
         * @description: Hàm này gọi đùng để chọn tất cả các dòng
         * Author: AnhDV 19/09/2022
         */
        checkAll() {
            const self = this;
            const key = self.columns[0].key;
            self.listSelected = self.data.data.map((item, index) => {
                return {
                    index,
                    value: item[key],
                };
            });
        },
        /**
         * @description: Hàm này gọi dùng để xóa dữ liệu
         * @param {Object} row dữ liệu cần xóa
         * Author: AnhDV 12/09/2022
         */
        onHandleDelete(row) {
            this.$emit('action', 'delete', row); // emit sự kiện action với tham số là delete và row lên component cha
        },
        /**
         * @description: Hàm này gọi dùng để sửa dữ liệu
         * @param {Object} row dữ liệu cần sửa
         * Author: AnhDV 12/09/2022
         */
        onHandleEdit(row, index) {
            this.listSelected = []; // reset danh sách các dòng đã được chọn
            this.listSelected.push({ 'index': index, 'value': row }); // thêm dòng được chọn vào danh sách
            this.$emit('action', 'edit', row); // gọi hàm action của component cha
        },

        /**
         * @description: Hàm này dùng để set dữ liệu cho bảng
         * Author: AnhDV 23/09/2022
         */
        setData() {
            const self = this;
            setTimeout(() => { // set timeout để skeleton hiển thị
                self.isLoaded = true;
            }, 1000);
            // set dữ liệu phân trang
            self.vPagination = {
                ...self.pagination,
                totalRecord: self.data.totalCount,
                pageSizes: self.pagination.pageSize,
            }
        },
    },
    watch: {
        /**
         * @description: Hàm này dùng để lắng nghe xem dữ liệu load xong chưa và set dữ liệu cho bảng
         * Author: AnhDV 25/09/2022
         */
        dataState: {
            handler: function (val) {
                if (val) { // nếu dữ liệu đã load xong
                    this.setData();
                } else { // nếu dữ liệu chưa load xong
                    this.isLoaded = false;
                }
            },
            deep: true
        },
        /**
         * @description: Theo dõi sự thay đổi của selectedRow để thay đổi background của dòng được chọn
         * @param {newVal} dữ liệu mới
         * @param {oldVal} dữ liệu cũ
         * Author: AnhDV 16/09/2022
         */
        listSelected(newVal, oldVal) {
            if (this.data.data.length === newVal.length) { // nếu số lượng dòng được chọn bằng số lượng dòng trong bảng thì checkAllValue = true
                this.checkAllValue = true;
            } else { // ngược lại thì checkAllValue = false
                this.checkAllValue = false;
            }
            oldVal.forEach((row) => { // reset background của các dòng cũ
                let tr = this.$refs[`tr-${row['index']}`][0]; // lấy ra thẻ tr có ref là tr
                tr.classList.remove('v-table__body-row-focus') // xóa class v-table__body-row-focus
            });
            newVal.forEach((row) => { // set background cho các dòng mới
                let tr = this.$refs[`tr-${row['index']}`][0]; // lấy ra thẻ tr có ref là tr
                tr.classList.add('v-table__body-row-focus') // thêm class v-table__body-row-focus
            });
        },
        /**
         * @description: nếu click vào checkbox thì thêm hoặc xóa dòng được chọn vào danh sách
         * @param {newVal} trạng thái mới của checkbox được chọn
         * Author: AnhDV 16/09/2022
         */
        checkAllValue(newVal) {
            if (newVal) {
                this.checkAll();
            } else {
                if (this.listSelected.length === this.data.data.length) { // nếu số lượng dòng được chọn bằng số lượng dòng trong bảng thì xóa hết
                    this.listSelected = [];
                }
            }
        },
        /**
         * @description: Theo dõi sự thay đổi của phân trang nếu thay đổi thì gọi hàm load data
         * Author: AnhDV 01/10/2022
         */
        vPagination: {
            handler: function (newVal) {
                if (this.isLoaded) {
                    this.$emit("update:pagination", newVal)
                }
            },
            deep: true,
        },
    },
    computed: {
        /**
         * @description: hàm này dùng để render các thẻ html trong pagination
         * Author: AnhDV 25/09/2022
         */
        itemRender() {
            return (val) => {
                let { page, type, originalElement } = val;
                if (type === 'prev') {
                    return <a> Trước</a>;
                }
                if (type === 'next') {
                    return <a> Sau</a>;
                }
                if (type === 'page') {
                    return <a>{page}</a>;
                }
                if (type === 'jump-prev') {
                    return <a>...</a>;
                }
                if (type === 'jump-next') {
                    return <a>...</a>;
                }
                return originalElement;
            };
        },
    },
    created() {
        this.setData(); // gọi hàm set dữ liệu ngay khi component được tạo
    },
};
</script>

<style scoped lang="scss">
.v {
    &-table {
        position: relative;
        flex: 1;
        background-color: $white;
        box-sizing: border-box;
        overflow: auto;


        &__not-found {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: fixed;
            left: 50%;
            top: 25%;
        }

        &__not-found-icon {
            margin: 50px 50px 30px;
        }

        &__not-found-text {
            margin-top: 10px;
        }


        &__main {
            width: 100%;
            border-spacing: 0;
            border-collapse: separate;
            white-space: nowrap;
            border: unset;
            flex: 1;
            box-sizing: border-box;
            position: absolute;
            width: max-content;
        }

        &__footer {
            position: sticky;
            bottom: 0;
            background-color: $white;
            z-index: 4;
        }

        &__header {
            top: 0;
            z-index: 4;
            background-color: $white;
            position: sticky;

            &-row {
                height: 34px;
            }

            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: $white;
                z-index: 4 !important;
                left: 0;
                right: 0;
            }

            &-cell {
                text-transform: uppercase;
                border-right: 1px solid $bg-table-line;
                border-bottom: 1px solid $bg-table-line;
                min-height: 34px;
                height: 34px;
                position: -webkit-sticky;
                position: relative;
                background-color: $bg-table-header ;
                top: 0;
                font-family: "MISA Fonts Bold";
                vertical-align: middle;
                font-size: 12px;
                align-items: center;
                padding: 0 10px;

                &:nth-last-child(2) {
                    border-right: unset;
                    border-left: 1px solid $bg-table-line;
                    right: 30px;
                    position: sticky;
                }

                &:nth-last-child(3) {
                    border-right: unset;

                }

                &:nth-child(2) {
                    z-index: 3 !important;
                    left: 20px;
                    position: sticky;
                }
            }
        }

        &__body {

            &-row {
                height: 44px;
                background-color: $white;

                &:hover {
                    .v-table__body-cell {
                        &:not(:nth-child(1)) {
                            background-color: $bg-table-body-hover !important;
                        }
                    }
                }

                &-focus {
                    .v-table__body-cell {
                        &:not(:nth-child(1)) {
                            background-color: $bg-table-body-focus !important;
                        }
                    }
                }

            }

            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: inherit;
                z-index: 1;
                left: 0;
                right: 0;
                box-sizing: border-box;
            }

            &-cell {
                height: 44px;
                // padding: 0 16px 0 16px;
                padding: 0 10px;
                border-bottom: 1px solid $bg-table-line;
                border-right: 1px dotted $bg-table-line;
                background-color: inherit;
                white-space: pre-wrap;

                &:nth-last-child(2) {
                    box-sizing: border-box;
                    border-right: unset;
                    border-left: 1px dotted $bg-table-line;
                    right: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }

                &:nth-last-child(3) {
                    border-right: unset;
                }

                &:nth-child(2) {
                    left: 20px;
                }

                &:nth-last-child(2):has(.v-menu__content--show) {
                    z-index: 2;
                }
            }

            &-action {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: inherit;
                height: 100%;
                width: 100%;
            }
        }
    }

    &-text {
        &__left {
            text-align: left !important;
        }

        &__right {
            text-align: right !important;
        }

        &__center {
            text-align: center !important;

        }
    }
}

.v {
    &-pagination {
        position: sticky;
        z-index: 3;
        background-color: $white;
        display: flex;
    }

    &-pagination__container {
        width: 100% !important;
        display: flex;
        padding: 18px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    &-pagination__left {
        position: sticky;
        left: 20px;
        white-space: nowrap;
        min-width: 10px;
        display: flex;
        min-height: 32px;
        align-items: center;
    }

    &-pagination__right {
        position: sticky;
        right: 60px;
        display: flex;
        align-items: center;

        &-record {
            padding: 0 16px;
        }


    }
}


::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>
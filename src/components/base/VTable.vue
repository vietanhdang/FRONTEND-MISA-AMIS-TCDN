<template>

    <div class="v-table__content">
        <div class="v-table__main">
            <table class="v-table" ref="table">
                <thead class="v-table__header">
                    <tr class="v-table__header-row">
                        <th class="v-table__header-row-sticky" style="min-width: 20px"></th>
                        <th v-for="(column, index) of columns" :key="index" class="v-table__header-cell"
                            :class="[{'v-table__header-row-sticky': column.fixed},`v-text__${column.textAlign ? column.textAlign : 'left'}`]"
                            :style="[`${column.width ? `min-width: ${column.width}px`:''}`]">
                            {{ column.title }}
                            <v-input type="checkbox" @click="checkAll" :checked="false" inputClass="align-items-center"
                                v-if="column.checkbox && !column.title">
                            </v-input>
                        </th>
                        <th class="v-table__header-row-sticky" style="min-width: 30px"></th>
                    </tr>
                </thead>

                <tbody class="v-table__body">
                    <tr v-if="vPagination.totalRecord === 0">
                        <td class="v-table__body-row-sticky" style="min-width: 20px"></td>
                        <td class="v-table__body-cell" colspan="100%">Không tìm thấy nhân viên nào</td>
                    </tr>
                    <tr v-for="(row, index1) of data.data" :key="index1" class="v-table__body-row"
                        :ref="`tr-${index1}`">
                        <td class="v-table__body-row-sticky" style="min-width: 20px"></td>
                        <td v-for="(column, index) of columns" :key="index" class="v-table__body-cell"
                            :class="[`v-text__${column.textAlign ? column.textAlign : 'left'}`, {'v-table__body-row-sticky': column.fixed}]"
                            :ref="`${column.type === 'action' ? `td-action-${index1}` : ''}`"
                            :style="[`${column.width ? `min-width: ${column.width}px`:''}`]"
                            @dblclick="column.fixed ? '' : onHandleEdit(row,index1)">
                            <a-skeleton active :loading="!isLoaded" :paragraph="false" :title="true">
                                <v-input type="checkbox" :value="{'index':index1,'value':row[column.key]}"
                                    v-if="column.checkbox && !column.title" v-model="listSelected"
                                    inputClass="align-items-center"></v-input>
                                <v-input type="checkbox" v-else-if="column.checkbox && column.title" :disabled="true"
                                    v-model="row[column.key]" inputClass="align-items-center">
                                </v-input>
                                <template v-else-if="column.type === 'date'">
                                    {{row[column.key] ?formatDate(row[column.key]) : ''}}
                                </template>
                                <template v-else-if="column.type === 'gender'">
                                    {{convertGender(row[column.key])}}
                                </template>
                                <template v-else-if="column.type === 'action'">
                                    <div class="v-table__body-action">
                                        <v-button @click="onHandleEdit(row,index1)"
                                            :styleProps="['color:#0075c0','background:transparent','padding:4px',]">
                                            Sửa
                                        </v-button>
                                        <v-button
                                            :styleProps="['color:#000','background:transparent','padding:4px','position: relative']"
                                            @click="showAction(index1)" @blur="hideAction(index1)">
                                            <div class="dropdown">
                                                <div class="ms-16 ms-icon ms-icon-arrow-down"></div>
                                                <div class="dropdown-menu" :ref="`dropdown-menu-${index1}`"
                                                    style="display: none;">
                                                    <div class="dropdown-item">
                                                        Nhân bản
                                                    </div>
                                                    <div class="dropdown-item" @click="onHandleDelete(row)">
                                                        Xóa
                                                    </div>
                                                    <div class="dropdown-item">
                                                        Ngưng sử dụng
                                                    </div>
                                                </div>
                                            </div>
                                        </v-button>
                                    </div>
                                </template>
                                <template v-else>
                                    {{row[column.key]}}
                                </template>
                            </a-skeleton>
                        </td>
                        <td class="v-table__body-row-sticky" style="min-width: 30px"></td>
                    </tr>
                </tbody>
            </table>
            <!-- v-if="vPagination.totalRecord != 0" Nếu muốn ẩn thanh pagination khi không thấy bản ghi nào phù hợp -->
            <div class="v-pagination" :style="{width: `${tableWidth - 4}px`}">
                <div class="v-pagination__container">
                    <div class="v-pagination__left">
                        Tổng số: <span class="font-weight-700 m-x-1"> {{ vPagination.totalRecord }} </span> bản ghi
                    </div>
                    <div class="v-pagination__right">
                        <div class="v-pagination__right-record">
                            <VSelect :data="options" position="top" propKey="key" propValue="value"
                                v-model="vPagination.pageSize" @change="vPagination.pageNumber = 1" />
                        </div>
                        <div class="v-pagination__right-page">
                            <a-pagination v-model:current="vPagination.pageNumber" :total="vPagination.totalRecord"
                                :showSizeChanger="false" v-model:pageSize="vPagination.pageSize"
                                :itemRender="itemRender" size="small" :showLessItems="true">
                            </a-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import { formatDate, convertGender, removeVietnameseTones } from '@/utils/format';
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
         * @description: Hàm này gọi dùng để hiển thị các action
         * @param {Number} index là index của row
         * Author: AnhDV 12/09/2022
         */
        showAction(index) {
            let combo = this.$refs[`dropdown-menu-${index}`][0]; // lấy ra thẻ div có ref là dropdown-menu
            let td = this.$refs[`td-action-${index}`][0]; // lấy ra thẻ div có ref là td-action
            combo.style.zIndex = 2;  // set z-index cho thẻ div
            td.style.setProperty('z-index', 4, 'important'); // set z-index cho thẻ div
            combo.style.display = 'block'; // hiển thị thẻ div
        },
        /**
         * @description: Hàm này gọi dùng để ẩn các action
         * @param {Number} index là index của row
         * Author: AnhDV 12/09/2022
         */
        hideAction(index) {
            let combo = this.$refs[`dropdown-menu-${index}`][0]; // lấy ra thẻ div có ref là dropdown-menu
            let td = this.$refs[`td-action-${index}`][0]; // lấy ra thẻ div có ref là td-action
            combo.style.zIndex = -1; // set z-index cho thẻ div
            td.style.zIndex = 1; // set z-index cho thẻ div
            this.$refs[`dropdown-menu-${index}`][0].style.display = 'none'; // ẩn thẻ div
        },
        /**
         * @description: Hàm này gọi đùng để chọn tất cả các dòng
         * Author: AnhDV 19/09/2022
         */
        checkAll() {
            // const self = this;
            // this.filterData.forEach((row, index) => {
            //     self.listSelected = []; // reset danh sách các dòng đã được chọn
            //     self.listSelected.push({ 'index': index, 'value': row.employeeID }); // thêm vào danh sách các dòng đã được chọn
            // });
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
            setTimeout(() => {
                self.isLoaded = true;
            }, 1000);
            self.vPagination = {
                ...self.pagination,
                totalRecord: self.data.totalCount,
                pageSizes: self.pagination.pageSize,
            }
        },
    },
    watch: {
        /**
         * @description: Theo dõi sự thay đổi của input search để filter dữ liệu
         * Author: AnhDV 14/09/2022
         */
        keyword() {
            // let self = this;
        },
        dataState: {
            handler: function (val) {
                if (val) {
                    this.setData();
                } else {
                    this.isLoaded = false;
                }
            },
            deep: true
        },
        /**
         * @description: Theo dõi sự thay đổi của selectedRow để thay đổi background của dòng được chọn
         * Author: AnhDV 16/09/2022
         */
        listSelected(newVal, oldVal) {
            oldVal.forEach((row) => {
                let tr = this.$refs[`tr-${row['index']}`][0]; // lấy ra thẻ tr có ref là tr
                tr.classList.remove('v-table__body-row-focus') // xóa class v-table__body-row-focus
            });
            newVal.forEach((row) => {
                let tr = this.$refs[`tr-${row['index']}`][0]; // lấy ra thẻ tr có ref là tr
                tr.classList.add('v-table__body-row-focus') // thêm class v-table__body-row-focus
            });
        },
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
    mounted() {
        this.tableWidth = this.$refs.table.offsetWidth; // lấy ra chiều rộng của table

    },
};
</script>

<style scoped lang="scss">
.table-scroll {}



.v {
    &-table {
        width: 100%;
        border-spacing: 0;
        border-collapse: separate;
        white-space: nowrap;
        border: unset;
        border-spacing: 0;

        &__content {
            position: relative;
            background-color: #fff;
            width: 100%;
        }

        &__main {
            overflow: auto;
            max-height: calc(100vh - 198px);
            min-height: calc(100vh - 198px);
        }

        &__header {
            &-row {
                height: 34px;
            }

            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: #fff;
                z-index: 4 !important;
                left: 0;
                right: 0;

            }

            &-cell {
                text-transform: uppercase;
                border-right: 1px solid #c7c7c7;
                border-bottom: 1px solid #c7c7c7;
                min-height: 34px;
                height: 34px;
                position: -webkit-sticky;
                position: sticky;
                z-index: 2;
                top: 0;
                font-family: "MISA Fonts Bold";
                background-color: #e5e8ec;
                vertical-align: middle;
                font-size: 12px;
                align-items: center;
                padding: 0 10px;
                // padding: 0 16px 0 16px;


                &:nth-last-child(2) {
                    border-right: unset;
                    border-left: 1px solid #c7c7c7;
                    right: 30px;
                }

                &:nth-last-child(3) {
                    border-right: unset;
                }

                &:nth-child(2) {
                    z-index: 3 !important;
                    left: 20px;
                }


            }
        }

        &__body {
            display: contents;
            position: relative;

            &-row {
                height: 44px;
                background-color: #fff;

                &:hover {
                    background-color: #f2f9ff !important;
                }

                &-focus {
                    background-color: #e5f3ff !important;
                }

            }




            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: inherit;
                z-index: 3 !important;
                left: 0;
                right: 0;
            }

            &-cell {
                height: 44px;
                // padding: 0 16px 0 16px;
                padding: 0 10px;
                border-bottom: 1px solid #c7c7c7;
                border-right: 1px dotted #c7c7c7;
                background-color: inherit;
                white-space: pre-wrap;

                &:nth-last-child(2) {
                    border-right: unset;
                    border-left: 1px dotted #c7c7c7;
                    right: 30px;
                }

                &:nth-last-child(3) {
                    border-right: unset;
                }

                &:nth-child(2) {
                    z-index: 2 !important;
                    left: 20px;
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
        bottom: 0;
        z-index: 3;
        background-color: #fff;
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
            // display: flex;
            // align-items: center;
            // min-height: 32px;
            padding: 0 16px;
        }


    }
}

.dropdown {
    position: relative;
    font-family: 'Misa Fonts Regular';


    &-menu {
        position: absolute;
        top: 25%;
        text-align: left;
        width: auto;
        right: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        background: #fff;
        padding: 2px 1px;
        border-radius: 2px;
        border: 1px solid #babec5;
        transform: translateY(20%);
        font-weight: 400;
        animation: 0.2s ease-out 0s 1 slideInFromTop;
    }

    @keyframes slideInFromTop {
        0% {
            transform: translateY(10%);
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    &-item {
        padding: 5px 10px;
        transition: all .2s ease;


        a {
            color: #000;
        }

        &:hover {
            background-color: #e5e5e5;
            color: $bg-green-hover;
            transition: all 0.2s ease;
        }


    }
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
</style>
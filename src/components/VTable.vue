<template>
    <div class="v-table__content">
        <div class="v-table__toolbar">
            <div class="v-table__toolbar-left">
                <slot name="toolbar-left"></slot>
            </div>
            <div class="v-table__toolbar-right">
                <slot name="toolbar-right"></slot>
                <v-input placeholder="Tìm theo mã, tên nhân viên" icon="icon-search" v-model="keyword" :outline="true"
                    :styleProps="['width: 240px','font-style: italic']" className="v-input__with-icon m-fxr-10" />
                <v-tooltip content="Tải lại dữ liệu" position="bottom" :fixed="true">
                    <div class="ms-24 ms-icon ms-icon-reload ms-x-1" @click="reloadData"></div>
                </v-tooltip>
                <v-tooltip content="Xuất ra excel" position="bottom" :fixed="true">
                    <div class="ms-24 ms-icon ms-icon-excel ms-x-1"></div>
                </v-tooltip>
            </div>
        </div>
        <div class="table-scroll">
            <div id="preloader" style="display: block;" v-show="!isLoaded">
                <div class="logo">
                    <img src="@/assets/img/Logo_Module_TiengViet_White.66947422.svg" style="width: 200px;" />
                </div>
            </div>
            <table class="v-table" ref="table">
                <thead class="v-table__header">
                    <tr class="v-table__header-row">
                        <th v-for="(column, index) of columns" :key="index" class="v-table__header-cell"
                            :class="[{'v-table__header-row-sticky': column.fixed},`v-text__${column.textAlign ? column.textAlign : 'left'}`]"
                            :style="[`${column.width ? `min-width: ${column.width}px`:''}`]">
                            {{ column.title }}
                            <v-input type="checkbox" @click="checkAll" :checked="false" v-if="column.checkbox">
                            </v-input>
                        </th>
                    </tr>
                </thead>
                <tbody class="v-table__body">
                    <!-- <tr v-if="totalPage===0">
                        <td class="v-table__body-cell" colspan="100%">Không tìm thấy nhân viên nào</td>
                    </tr> -->
                    <tr v-for="(row, index1) of filterData" :key="index1" class="v-table__body-row"
                        :ref="`tr-${index1}`">
                        <td v-for="(column, index) of columns" :key="index" class="v-table__body-cell"
                            :class="[`v-text__${column.textAlign ? column.textAlign : 'left'}`, {'v-table__body-row-sticky': column.fixed}]"
                            :ref="`${column.type === 'action' ? `td-action-${index1}` : ''}`"
                            :style="[`${column.width ? `min-width: ${column.width}px`:''}`]"
                            @dblclick="column.fixed ? '' : onHandleEdit(row,index1)">
                            <v-input type="checkbox" :value="{'index':index1,'value':row[column.key]}"
                                v-if="column.checkbox" v-model="listSelected"></v-input>
                            <template v-else-if="column.type === 'date'">
                                {{row[column.key] ?formatDate(row[column.key]) : ''}}
                            </template>
                            <template v-else-if="column.type === 'gender'">
                                {{convertGender(row[column.key])}}
                            </template>
                            <template v-else-if="column.type === 'action'">
                                <div class="v-table__body-action">
                                    <v-button @click="onHandleEdit(row,index1)" fontSize="13px" fontWeight="600"
                                        :styleProps="['color:#0075c0','background:transparent','padding:4px',]">
                                        Sửa
                                    </v-button>
                                    <div class="dropdown">
                                        <v-button :styleProps="['color:#000','background:transparent','padding:4px']"
                                            @click="showAction(index1)" @blur="hideAction(index1)">
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
                                        </v-button>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                {{row[column.key]}}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="totalPage != 0" class="v-pagination" :style="{width: `${tableWidth}px`}">
                <div class="v-pagination__container">
                    <div class="v-pagination__left font-weight-bold">
                        Hiển thị:
                        <span v-if="totalRecord < pageSize">
                            {{(pageIndex-1)*pageSize+1}} - {{totalRecord}} / {{totalRecord}} kết quả
                        </span>
                        <span v-else>
                            {{(pageIndex-1)*pageSize+1}} - {{pageIndex*pageSize}} / {{totalRecord}} kết quả
                        </span>
                        <!-- Tổng số:   <span class="font-weight-bold m-x-1"> {{ totalRecord }} </span> bản ghi -->
                    </div>
                    <div class="v-pagination__right">
                        <div class="v-pagination__right-record">
                            <VSelect :data="options" position="top" propKey="key" propValue="value"
                                v-model="pageSize" />
                        </div>
                        <div class="v-pagination__right-page">
                            <div @click="prevPage" class="page-item">
                                Trước
                            </div>
                            <div class="page_items">
                                <div class="page-item" v-for="(page, index) of pages" :key="index"
                                    @click="changePage(page)" :class="{ 'page-item--active': page === pageIndex }">
                                    {{ page }}
                                </div>
                                <!-- <div class="page-item page-item--active">1</div>
                                <div class="page-item ">2</div>
                                <div class="page-item">...</div>
                                <div class="page-item">4</div>
                                <div class="page-item">5</div> -->
                            </div>
                            <div @click="nextPage" class="page-item">
                                Sau
                            </div>
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
export default {
    name: "VTable",
    props: {
        data: {
            type: Object,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isShow: false, // biến này dùng để hiển thị hoặc ẩn các action
            tableWidth: 0, // biến này dùng để lưu độ rộng của table
            keyword: "", // biến này dùng để lưu từ khóa tìm kiếm
            filterData: [], // biến này dùng để lưu dữ liệu sau khi filter
            pageSize: 10, // biến này dùng để lưu số bản ghi trên 1 trang
            pageIndex: 1, // biến này dùng để lưu trang hiện tại
            totalPage: 0, // biến này dùng để lưu tổng số trang
            totalRecord: 0, // biến này dùng để lưu tổng số bản ghi
            tempMessage: "", // biến này dùng để lưu message trước khi hiển thị dialog
            isLoaded: false, // biến này dùng để kiểm tra xem đã load dữ liệu chưa
            lastIndexOf: 0, // biến này dùng để lưu vị trí cuối cùng của dòng đã được chọn,
            listSelected: [], // biến này dùng để lưu danh sách các dòng đã được chọn,
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
            combo.style.zIndex = 9;  // set z-index cho thẻ div
            td.style.zIndex = 11; // set z-index cho thẻ div
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
            this.$emit('action', 'delete', row); // gọi hàm action của component cha
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
         * @description: Hàm này gọi dùng để sang trang sau
         * Author: AnhDV 14/09/2022
         */
        nextPage() {
            this.pageIndex = this.pageIndex < this.totalPage ? this.pageIndex + 1 : this.totalPage;
            this.paging();
        },
        /**
         * @description: Hàm này gọi dùng để sang trang trước
         * Author: AnhDV 14/09/2022
         */
        prevPage() {
            this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1;
            this.paging();
        },
        /**
         * @description: Hàm này gọi dùng để chuyển trang
         * @param {Number} page trang cần chuyển đến
         * Author: AnhDV 14/09/2022
         */
        changePage(page) {
            this.pageIndex = page;
            this.paging();
        },
        /**
         * @description: Hàm này gọi dùng để phân trang
         * Author: AnhDV 14/09/2022
         */
        paging() {
            // this.totalRecord = this.data.totalCount;
            // this.filterData = this.data.data;
            // this.filterData = this.data.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex);
            // this.totalPage = Math.ceil(this.totalRecord / this.pageSize);
        },
        /**
         * @description: Hàm này dùng để reload lại dữ liệu
         * Author: AnhDV 14/09/2022
         */
        reloadData() {
            this.keyword = "";
            this.paging();
        },
    },
    mounted() {
        this.tableWidth = this.$refs.table.offsetWidth; // lấy ra chiều rộng của table
        // console.log(this.filterData);
        // setTimeout(() => {
        //     this.isLoaded = true;
        // }, 2000);
    },
    watch: {
        /**
         * @description: Theo dõi sự thay đổi của input search để filter dữ liệu
         * @return: {Array} filterData
         * Author: AnhDV 14/09/2022
         */
        keyword() {
            // let self = this;
            // self.filterData = this.data.filter((option) =>
            //     self.columns.some((column) => { // duyệt qua các cột
            //         if (column['search']) { // nếu cột có thuộc tính search = true thì thực hiện filter
            //             return removeVietnameseTones(option[column.key])
            //                 .toLowerCase()
            //                 .includes(removeVietnameseTones(this.keyword).toLowerCase())
            //         }
            //     })
            // );
        },
        /**
         * @description: Theo dõi sự thay đổi của dữ liệu để tính toán phân trang
         * Author: AnhDV 14/09/2022
         */
        pageSize() {
            this.pageIndex = 1; // reset lại pageIndex
            this.paging();  // gọi hàm phân trang
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
        }

    },
    computed: {
        /**
         * @description: Hàm này dùng để tính toán phân trang
         * Author: AnhDV 14/09/2022
         */
        pages() {
            let currentPage = this.pageIndex;
            let totalPage = this.totalPage;

            let delta = 2;
            let remain = delta * 2;
            let range = [currentPage];

            for (let i = 1; i <= delta; i++) {
                if (currentPage + i <= totalPage) {
                    range.push(currentPage + i);
                    remain--;
                }
                if (currentPage - i > 0) {
                    range.unshift(currentPage - i);
                    remain--;
                }
            }

            if (remain > 0) {
                if (range[0] == 1) {
                    for (let i = 1; i <= remain; i++) {
                        if (range[range.length - 1] + 1 <= this.totalPage) {
                            range.push(range[range.length - 1] + 1);
                        }
                    }
                } else {
                    for (let i = 1; i <= remain; i++) {
                        if (range[0] - 1 > 1) {
                            range.unshift(range[0] - 1);
                        }
                    }
                }
            }
            return range;
        }
    },
    updated() {
        this.filterData = this.data.data.data;
        this.totalPage = this.data.data.TotalCount;
        this.isLoaded = this.data.isLoaded;
    }
};
</script>

<style scoped lang="scss">
#preloader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 99999;
    text-align: center;
}

.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: preloader-anim linear 2s infinite;
}

.logo img {
    width: 100%;
}

@keyframes preloader-anim {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.v {
    &-table__content {
        padding: 0 16px;
        background-color: #fff;
    }

    &-table__toolbar {
        display: flex;
        justify-content: space-between;

        padding: 16px 0 16px 0;
    }

    &-table__toolbar-left {
        display: flex;
        align-items: center;
    }

    &-table__toolbar-right {
        display: flex;
        align-items: center;
    }
}

.table-scroll {
    overflow: auto;
    max-height: calc(100vh - 174px);
    min-height: calc(100vh - 174px);
    position: relative;
    background-color: #fff;
}

.v {
    &-table {
        width: 100%;
        // border-collapse: collapse;
        border-spacing: 0;
        border-collapse: separate;
        white-space: nowrap;
        border: unset;
        border-spacing: 0;

        &__header {
            &-row {
                height: 34px;
            }

            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: #fff;
                z-index: 12 !important;
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
                z-index: 10;
                top: 0;
                background-color: #e5e8ec;
                vertical-align: middle;
                font-size: 12px;
                align-items: center;
                padding: 0 10px;
                // padding: 0 16px 0 16px;


                &:last-child {
                    border-right: unset;
                    border-left: 1px solid #c7c7c7;
                }

                &:nth-last-child(2) {
                    border-right: unset;
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
                z-index: 10;
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

                &:last-child {
                    border-right: unset;
                    border-left: 1px dotted #c7c7c7;
                }

                &:nth-last-child(2) {
                    border-right: unset;
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
        width: 100%;
        height: 50px;
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        z-index: 10;
        background-color: #fff;
        display: flex;
    }

    &-pagination__container {
        display: flex;
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
        right: 20px;
        display: flex;
        align-items: center;

        &-record {
            // display: flex;
            // align-items: center;
            // min-height: 32px;
            padding: 0 16px;
        }

        &-page {
            display: flex;
            align-items: center;
            min-height: 32px;

            .page_items {
                display: flex;
                align-items: center;
            }

            .page-item {
                padding: 0 0.5rem !important;
                cursor: pointer;

                &--active {
                    border: 1px solid #e0e0e0;
                    font-weight: 700;
                }
            }
        }
    }
}

.dropdown {
    position: relative;

    &-menu {
        position: absolute;
        top: 25%;
        height: auto;
        text-align: left;
        width: auto;
        right: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        background-color: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 4px;
        transform: translateY(20%);
        font-weight: 400;
    }

    &-item {
        padding: 6px 10px;

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
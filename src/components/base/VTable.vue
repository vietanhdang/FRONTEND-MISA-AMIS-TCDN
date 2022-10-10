<template>
    <div class="v-table__content">
        <v-loading :isLoaded="isLoaded"></v-loading>
        <div class="v-table">
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
                                className="no-animation" v-model="checkAllValue"
                                v-if="column.checkbox && !column.title">
                            </v-input>
                        </th>
                        <!-- Tạo phần padding-right 30px -->
                        <th class="v-table__header-row-sticky" style="min-width: 30px"></th>
                    </tr>
                </thead>
                <tbody class="v-table__body">
                    <!-- Render body dựa vào key -->
                    <tr v-for="(row, indexList) of data.data" :key="indexList" class="v-table__body-row" tabindex="-1">
                        <td class="v-table__body-row-sticky" style="min-width: 20px"></td>
                        <td v-for="(column, index) of columns" :key="index" class="v-table__body-cell"
                            :class="[`v-text__${column.textAlign ? column.textAlign : 'left'}`, {'v-table__body-row-sticky': column.fixed}]"
                            :style="[`${column.width ? `min-width: ${column.width}px`:''}`]"
                            @dblclick="column.fixed ? '' : onHandleEdit(row)">
                            <!-- Khởi tạo skeleton loading -->
                            <a-skeleton active :loading="!isLoaded" :paragraph="false" :title="true">
                                <!-- Nếu như type là checkbox thì render checkbox -->
                                <v-input type="checkbox" :value="row[column.key]"
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
                                    <v-menu :propKey="row" @onSelect="onSelect" :items="actions"
                                        :isUp="data.data.length == indexList + 1 || data.data.length == indexList + 2">
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
                <tfoot class="v-table__footer" v-if="data.totalRecord !== 0">
                    <tr class="v-table__footer-row">
                        <td class="v-table__footer-cell" colspan="100%">
                            <div class="v-pagination__container">
                                <div class="v-pagination__left">
                                    Tổng số: <span class="font-weight-700 m-x-1"> {{ data.totalRecord }} </span>
                                    bản
                                    ghi
                                </div>
                                <div class="v-pagination__right">
                                    <div class="v-pagination__right-record">
                                        <v-combobox position="top" propKey="key" v-model="vPagination.pageSize"
                                            propValue="value" :data="options" :selectBox="true">
                                        </v-combobox>
                                    </div>
                                    <div class="v-pagination__right-page">
                                        <a-pagination v-model:current="vPagination.pageNumber" :total="data.totalRecord"
                                            :showSizeChanger="false" v-model:pageSize="vPagination.pageSize"
                                            :itemRender="itemRender" size="small" :showLessItems="true">
                                        </a-pagination>
                                    </div>
                                </div>
                            </div>
                        </td>

                    </tr>
                </tfoot>
            </table>
            <!-- Nếu như tổng số bản ghi trả về là 0 thì sẽ hiển thị không có dữ liệu -->
            <a-skeleton active :loading="!isLoaded" :paragraph="false" :title="true" v-if="data.totalRecord === 0">
                <div class="v-table__not-found">
                    <div class="v-table__not-found-icon">
                        <img :src="require('@/assets/img/bg_no_data.svg')" alt="">
                    </div>
                    <div class="v-table__not-found-text">
                        Không có dữ liệu
                    </div>
                </div>
            </a-skeleton>
        </div>
    </div>
</template>
<script>

import { formatDate, convertGender } from '@/utils/format';
import { Pagination } from 'ant-design-vue';
import Skeleton from 'ant-design-vue/es/skeleton';
import 'ant-design-vue/dist/antd.css';
import Enum from '@/utils/enum';
export default {
    name: "VTable",
    components: {
        aPagination: Pagination,
        aSkeleton: Skeleton,
    },
    props: {
        actions: { // các action được thực hiện trên row
            type: Array,
            required: false,
        },
        data: { // dữ liệu trả về từ api
            type: Object,
            required: true,
        },
        columns: { // các cột của table
            type: Array,
            required: true,
        },
        options: { // các option của combobox
            type: Array,
            required: true,
        },
        pagination: { // các option của pagination
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            isLoaded: false, // biến này dùng để kiểm tra xem đã load dữ liệu chưa
            vPagination: {}, // biến này dùng để lưu trữ thông tin phân trang
            checkAllValue: false, // biến này dùng để lưu trữ giá trị của checkbox check all
        };
    },
    computed: {
        /**
         * @description: Hàm này dùng để render các thẻ html trong pagination
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
        /**
         * @description: Get và set các giá trị key của các dòng được chọn trong store
         * Author: AnhDV 08/10/2022
         */
        listSelected: {
            get() {
                return this.$store.getters.getListEmployeeSelected;
            },
            set(val) {
                return this.$store.commit('setEmployeeSelected', val);
            }
        },
    },
    watch: {
        /**
         * @description: Theo dõi sự thay đổi của selectedRow để thay đổi background của dòng được chọn
         * @param {newVal} dữ liệu mới
         * @param {oldVal} dữ liệu cũ
         * Author: AnhDV 16/09/2022
         */
        listSelected(newVal) {
            try {
                if (this.data.data.length === newVal.length) { // nếu số lượng dòng được chọn bằng số lượng dòng trong bảng thì checkAllValue = true
                    this.checkAllValue = true;
                } else { // ngược lại thì checkAllValue = false
                    this.checkAllValue = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: nếu click vào checkbox thì thêm hoặc xóa dòng được chọn vào danh sách
         * @param {newVal} trạng thái mới của checkbox được chọn
         * Author: AnhDV 16/09/2022
         */
        checkAllValue(newVal) {
            try {
                if (newVal) {
                    this.checkAll();
                } else {
                    if (this.listSelected.length === this.data.data.length) { // nếu số lượng dòng được chọn bằng số lượng dòng trong bảng thì xóa hết
                        this.listSelected = [];
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @description: Theo dõi sự thay đổi của phân trang thay đổi pageSize hoặc currentPage thì emit lên component cha
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
        /**
         * @description: Theo dõi sự thay đổi của data để thay đổi trạng thái của loading
         * Author: AnhDV 06/10/2022
         */
        data: {
            handler: function () {
                this.setData();
            },
            deep: true,
        }
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
            self.listSelected = self.data.data.map((item) => item[key]);
        },
        /**
         * @description: Hàm này gọi dùng để truyền các action sau khi chọn của row
         * trong table lên component cha
         * @param {action} các action của row 
         * Author: AnhDV 12/09/2022
         */
        onSelect(action) {
            this.$emit('action', action.key, action.value); // emit sự kiện action với tham số là delete và row lên component cha
        },
        /**
         * @description: Hàm này gọi dùng để sửa dữ liệu
         * @param {Object} row dữ liệu cần sửa
         * Author: AnhDV 12/09/2022
         */
        onHandleEdit(row) {
            this.$emit('action', Enum.ACTION.EDIT, row); // gọi hàm action của component cha
        },

        /**
         * @description: Hàm này dùng để set dữ liệu phân trang cho bảng và trạng thái loading
         * Author: AnhDV 23/09/2022
         */
        setData() {
            const self = this;
            self.isLoaded = false;
            setTimeout(() => { // set timeout để skeleton hiển thị
                self.isLoaded = true;
            }, 200);
            // set dữ liệu phân trang
            self.vPagination = {
                ...self.pagination,
            }
        },
    },
    created() {
        this.setData(); // gọi hàm set dữ liệu ngay khi component được tạo
    },
};
</script>
<style  lang="scss" scoped>
@import "@/assets/scss/base/table.scss";
</style>
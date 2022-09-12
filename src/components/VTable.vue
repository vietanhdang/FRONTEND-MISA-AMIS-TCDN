<template>
    <div>
        <table class="v-table" ref="table">
            <thead class="v-table__header">
                <tr class="v-table__header-row">
                    <th v-for="(column, index) of columns" :key="index" class="v-table__header-cell"
                        :class="[{'v-table__header-row-sticky': column.fixed},`v-text__${column.textAlign ? column.textAlign : 'left'}`]"
                        :style="[`${column.width ? `min-width: ${column.width}px`:''}`]">
                        {{ column.title }}
                        <v-input type="checkbox" :id="'check-all'" :checked="false" v-if="column.checkbox"></v-input>
                    </th>
                </tr>
            </thead>
            <tbody class="v-table__body">
                <tr v-for="(row, index1) of data" :key="index1" class="v-table__body-row">
                    <td v-for="(column, index) of columns" :key="index" class="v-table__body-cell"
                        :class="[`v-text__${column.textAlign ? column.textAlign : 'left'}`, {'v-table__body-row-sticky': column.fixed}]"
                        :ref="`${column.type === 'action' ? `td-action-${index1}` : ''}`">
                        <v-input type="checkbox" :id="row[column.key]" v-if="column.checkbox"></v-input>
                        <template v-else-if="column.type === 'date'">
                            {{formatDate(row[column.key])}}
                        </template>
                        <template v-else-if="column.type === 'gender'">
                            {{convertGender(row[column.key])}}
                        </template>
                        <template v-else-if="column.type === 'action'">
                            <div class="v-table__body-action">
                                <v-button @click="onHandleEdit(row[column.key])" fontSize="13px" fontWeight="600"
                                    :styleProps="['color:#0075c0','background:#fff','padding:4px']">
                                    Sửa
                                </v-button>
                                <div class="dropdown">

                                    <v-button :styleProps="['color:#000','background:#fff','padding:6px']"
                                        @click="showAction(index1)" @blur="hideAction(index1)">
                                        <div class="icon-arrow-down"></div>
                                        <div class="dropdown-menu" :ref="`dropdown-menu-${index1}`"
                                            style="display: none;">
                                            <div class="dropdown-item">
                                                <a>Nhân bản</a>
                                            </div>
                                            <div class="dropdown-item">
                                                <a @click="onHandleDelete(row)">Xóa</a>
                                            </div>
                                            <div class="dropdown-item">
                                                <a>Ngưng sử dụng</a>
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
        <div class="v-pagination" :style="{width: `${tableWidth}px`}">
            <div class="v-pagination__container">
                <div class="v-pagination__left">
                    Tổng số: <span></span> bản ghi
                </div>
                <div class="v-pagination__right">
                    <div class="v-pagination__right-record">
                        <VSelect :data="options" position="top" propKey="key" propValue="value" />
                    </div>
                    <div class="v-pagination__right-page">
                        <div @click="prevPage">
                            Trước
                        </div>
                        <div class="page_items">
                            <!-- <div class="page-item" v-for="(page, index) of pages" :key="index" @click="changePage(page)"
                                :class="{ 'page-item--active': page === pageIndex }">
                                {{ page }}
                            </div> -->
                            <div class="page-item">1</div>
                            <div class="page-item page-item--active">2</div>
                            <div class="page-item">...</div>
                            <div class="page-item">4</div>
                            <div class="page-item">5</div>
                        </div>
                        <div @click="nextPage">
                            Sau
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate, convertGender } from '@/utils/format';
export default {
    name: "VTable",
    props: {
        data: {
            type: Array,
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
            td.style.zIndex = 3; // set z-index cho thẻ div
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
         * @description: Hàm này gọi dùng để xóa dữ liệu
         * @param {Object} row dữ liệu cần xóa
         * Author: AnhDV 12/09/2022
         */
        onHandleDelete(row) {
            this.$emit('delete', row); // emit sự kiện delete lên component cha
        },
    },
    data() {
        return {
            isShow: false,
            tableWidth: 0,
        };
    },
    mounted() {
        this.tableWidth = this.$refs.table.offsetWidth; // lấy ra chiều rộng của table
    },

};
</script>

<style scoped lang="scss">
.v {
    &-pagination {
        width: 100%;
        height: 50px;
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        z-index: 2;
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

        span {
            font-weight: bold;
        }
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
                min-height: 32px;
            }

            div {
                margin: 0 5px;
                cursor: pointer;
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

        &:hover {
            background-color: #e5e5e5;
            color: $bg-green-hover;
            transition: all 0.2s ease;
        }

    }
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
                height: 48px;
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
                z-index: 4;
                top: 0;
                background-color: #e5e8ec;
                vertical-align: middle;
                padding: 0 16px 0 16px;

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
            background-color: #fff;

            &-row {
                height: 48px;
            }

            &-row-sticky {
                position: sticky;
                top: 0;
                background-color: #fff;
                z-index: 2;
                left: 0;
                right: 0;
            }

            &-cell {
                height: 44px;
                padding: 0 16px 0 16px;
                border-bottom: 1px solid #c7c7c7;
                border-right: 1px dotted #c7c7c7;
                background-color: #fff;
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
</style>
<template>
    <div class="employee__content">
        <div id="preloader" style="display: none;">
            <div class="logo">
                <img src="../../assets/loading.svg" alt="">
            </div>
        </div>
        {{keyword}}
        <input type="date" v-model="keyword" class="form-control" />
        <div class="content__header">
            <div class="content__header--title">Nhân viên</div>
            <v-button :text="'Thêm mới nhân viên'" type="button'" @click="formState = true"></v-button>
        </div>
        <div class="content__main">
            <div class="content__table">
                <div class="content__toolbar">
                    <div class="content__toolbar-filter">
                        <v-input placeholder="Tìm theo mã, tên nhân viên" icon="icon-search" v-model="keyword"
                            :styleProps="['width: 240px','font-style: italic']" className="v-input__with-icon" />
                    </div>
                    <v-tooltip content="Lấy lại dữ liệu" position="bottom">
                        <div class="content__toolbar-action">
                            <div class="reload-icon">
                            </div>
                        </div>
                    </v-tooltip>
                </div>
                <div class="data-table grid" style="display:flex;">
                    <table class="table">
                        <thead class="table__header">
                            <tr>
                                <th class="title-center sticky sticky-left" style="width: 50px;">
                                    <v-input type="checkbox" :id="'check-all'" :checked="false"></v-input>
                                </th>
                                <th class="title-left" style="width: 100px;">Mã Nhân viên</th>
                                <th class="title-left">Tên Nhân Viên
                                </th>
                                <th class="title-left">Giới tính
                                </th>
                                <th class="title-left">Ngày sinh
                                </th>
                                <th class="title-left">Số Cmnd</th>
                                <th class="title-left">Chức Danh
                                </th>
                                <th class="title-left">Tên đơn vị
                                </th>
                                <th class="title-left">Số tài khoản
                                </th>
                                <th class="title-left">Tên ngân hàng
                                </th>
                                <th class="title-left">Chi nhánh tk
                                    ngân hàng </th>
                                <th class="title-left sticky sticky-right">Chức năng </th>
                            </tr>
                        </thead>
                        <tbody id="employeeList">
                            <tr class="" v-for="(employee, index) of employeeList" :key="index">
                                <td class="title-center sticky sticky-left">
                                    <v-input type="checkbox" :id="employee.employeeCode" :checked="false"></v-input>
                                </td>
                                <td class="title-left">{{ employee.employeeCode }}</td>
                                <td class="title-left">{{ employee.employeeName }}</td>
                                <td class="title-left">{{ formatGender(employee.gender) }}</td>
                                <td class="title-center">{{ formatDateOfBirth(employee.dateOfBirth) }}</td>
                                <td class="title-left">{{ employee.identityNumber }}</td>
                                <td class="title-left">
                                    {{ employee.position }}
                                </td>
                                <td class="title-left"> {{ employee.department }}</td>
                                <td class="title-left">{{ employee.bankAccount }}</td>
                                <td class="title-left">{{ employee.bankName }}</td>
                                <td class="title-left">{{ employee.bankAddress }}</td>
                                <td class="title-left title-action sticky sticky-right" :ref="`td-action-${index}`">
                                    <div class="btn-combo dropdown">
                                        <button class="btn" @click="editEmployee(employee)">Sửa</button>
                                        <button class="btn-combo-action" @click="showAction(employee, index)"
                                            @blur="hideAction(employee, index)">
                                            <div class="dropdown-menu" :ref="`dropdown-menu-${index}`"
                                                style="display: none;">
                                                <div class="dropdown-item">
                                                    <a>Nhân bản</a>
                                                </div>
                                                <div class="dropdown-item">
                                                    <a @click="deleteEmployee(employee)">Xóa</a>
                                                </div>
                                                <div class="dropdown-item">
                                                    <a>Ngưng sử dụng</a>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="v-pagination">
                    <div class="v-pagination__container">
                        <div class="v-pagination__container--left">
                            <div class="v-pagination__container--left--item">
                                <div class="v-pagination__container--left--item--text">
                                    Tổng số: <span>{{ totalRecord }}</span> bản ghi
                                </div>
                            </div>
                        </div>
                        <div class="v-pagination__container--right">
                            <div class="v-pagination__container--right--item">
                                <VSelect :data="options" :position="'top'" v-model="pageSize" propKey="key"
                                    propValue="value" />
                            </div>
                            <div class="v-pagination__container--right--item">
                                <div class="v-pagination__container--right--item--text page-item" @click="prevPage">
                                    Trước
                                </div>
                                <div class="v-pagination__container--right--item--text page-index">
                                    <!-- <div class="page-item">{{ pageIndex }}</div> -->
                                    <div class="page-item" v-for="(page, index) of pages" :key="index"
                                        @click="changePage(page)" :class="{ 'page-item--active': page === pageIndex }">
                                        {{ page }}
                                    </div>
                                    <!-- <div class="page-item">2</div>
                                    <div class="page-item page-item--active">3</div>
                                    <div class="page-item">...</div>
                                    <div class="page-item">10</div> -->
                                </div>
                                <div class="v-pagination__container--right--item--text page-item" @click="nextPage">
                                    Sau
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal add employee -->
        <div class="dialog" v-if="formState">
            <form class="dialog__modal grid wide dialog__modal__form form" method="post" id="employeeForm"
                formnovalidate>
                <div class="dialog__header">
                    <div class="dialog__header--title row">
                        <div class="col">
                            <div class="title-popup">
                                Thông tin nhân viên
                            </div>
                        </div>
                        <div class="col">
                            <v-input type="checkbox" label_custom="Là khách hàng" :checked="false"></v-input>
                        </div>
                        <div class="col">
                            <v-input type="checkbox" label_custom="Là nhà cung cấp" :checked="false"></v-input>
                        </div>
                    </div>
                    <div class="dialog__header__action">
                        <div class="dialog__header__help"></div>
                        <div class="dialog__header__close btn-action" @click="formState = false">
                        </div>
                    </div>
                </div>
                <div class="dialog__body dialog__body__form">
                    <div class="row">
                        <div class="col l-6 m-6 c-12">
                            <div class="row sm-gutter">
                                <div class="form-group col l-5 m-5 c-5">
                                    <v-input label="Mã" placeholder="Nhập mã nhân viên" :required="true"
                                        v-model="keyword">
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
                                    <div class="row sm-gutter gender-radio">
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
                <div class="body-line"></div>
                <div class="dialog__footer">
                    <div class="dialog__footer__left">
                        <v-button text="Hủy" className="v-button__button-no-bg border" @click="formState = false">
                        </v-button>
                    </div>
                    <div class="dialog__footer__right">
                        <v-button text="Cất" className="v-button__button-no-bg border"></v-button>
                        <v-button text="Cất và thêm mới" className="btn-success"></v-button>
                    </div>
                </div>
            </form>
        </div>
        <v-toast ref="toast" :showProgress="true"></v-toast>
    </div>

</template>

<script>
export default {
    data() {
        return {
            employeeList: [],
            options: [
                { key: 10, value: '10 bản ghi trên 1 trang' },
                { key: 20, value: '20 bản ghi trên 1 trang' },
                { key: 30, value: '30 bản ghi trên 1 trang' },
                { key: 50, value: '50 bản ghi trên 1 trang' },
                { key: 100, value: '100 bản ghi trên 1 trang' },
                { key: 200, value: '200 bản ghi trên 1 trang' },
                { key: 500, value: '500 bản ghi trên 1 trang' },
                { key: 1000, value: '1000 bản ghi trên 1 trang' },
                { key: 2000, value: '2000 bản ghi trên 1 trang' },
                { key: 5000, value: '5000 bản ghi trên 1 trang' },
                { key: 10000, value: '10000 bản ghi trên 1 trang' },
            ],
            department: [
                { key: 1, value: 'Phòng kế toán' },
                { key: 2, value: 'Phòng nhân sự' },
                { key: 3, value: 'Phòng kinh doanh' },
                { key: 4, value: 'Phòng kỹ thuật' },
                { key: 5, value: 'Phòng hành chính' },
                { key: 6, value: 'Phòng kế hoạch' },
                { key: 7, value: 'Phòng quản trị' },
            ],
            pageSize: 10,
            pageIndex: 1,
            totalPage: 0,
            totalRecord: 0,
            keyword: 'Thêm mới nhân viên',
            formState: false,
        };
    },
    watch: {
        pageSize() {
            this.pageIndex = 1;
            this.paging();
        },
    },
    computed: {
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
    methods: {
        formatDateOfBirth(date) {
            const dateOfBirth = new Date(date);
            let day = dateOfBirth.getDate();
            day = day < 10 ? `0${day}` : day;
            let month = dateOfBirth.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;
            const year = dateOfBirth.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatGender(gender) {
            switch (gender) {
                case 0:
                    return 'Nam';
                case 1:
                    return 'Nữ';
                default:
                    return 'Khác';
            }
        },
        paging() {
            this.employeeList = require('../../data/generate.json') || [];
            this.totalRecord = this.employeeList.length;
            this.employeeList = this.employeeList.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex);
            this.totalPage = Math.ceil(this.totalRecord / this.pageSize);
        },
        nextPage() {
            this.pageIndex = this.pageIndex < this.totalPage ? this.pageIndex + 1 : this.totalPage;
            this.paging();
        },
        prevPage() {
            this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1;
            this.paging();
        },
        changePage(page) {
            this.pageIndex = page;
            this.paging();
        },
        showAction(option, index) {
            let combo = this.$refs[`dropdown-menu-${index}`][0];
            let td = this.$refs[`td-action-${index}`][0];
            combo.style.zIndex = 1;
            td.style.zIndex = 2;
            combo.style.display = 'block';
        },
        hideAction(option, index) {
            let combo = this.$refs[`dropdown-menu-${index}`][0];
            let td = this.$refs[`td-action-${index}`][0];
            combo.style.zIndex = -1;
            td.style.zIndex = 1;
            this.$refs[`dropdown-menu-${index}`][0].style.display = 'none';
        },
        editEmployee(option) {
            console.log(option);
            this.formState = true;
        },
    },
    created() {
        this.option = [
            { key: 10, value: '10 bản ghi trên 1 trang' },
            { key: 20, value: '20 bản ghi trên 1 trang' },
            { key: 30, value: '30 bản ghi trên 1 trang' },
            { key: 50, value: '50 bản ghi trên 1 trang' },
            { key: 100, value: '100 bản ghi trên 1 trang' },
        ];
        this.paging();
    },
    mounted() {
        // var color = ['success', 'error', 'warning', 'info'];
        // var title = ['Thêm nhân viên thành công', 'Thêm nhân viên thất bại', 'Nhân viên này đã tồn tại', 'Nhân viên này không tồn tại'];
        // setInterval(() => {
        //     var index = Math.floor(Math.random() * 4);
        //     this.$toast.addMessage(`${title[index]}`, color[index], {
        //         timeout: 3000,
        //     });
        // }, 1000);
        console.log(this.$refs.toast);
    },
}
</script>

<style lang="scss" scoped>
.gender-radio {
    height: 36px;
    align-items: center;
}

.title-action {
    position: relative;
}

.data-table {
    background-color: #e9ebee;
    overflow: auto;
    max-height: calc(100vh - 228px);

    .table {
        width: 100%;
        // table-layout: fixed;
        // border-collapse: collapse;
        border-spacing: 0;
        border-collapse: separate;
        white-space: nowrap;
        border: unset;
        border-spacing: 0;

        .table__header {
            position: sticky;
            top: 0;
            z-index: 11;

            // white-space: nowrap;
            th {
                min-height: 34px;
                height: 34px;
                text-transform: uppercase;
                background-color: $bg-table-header;
            }
        }

        tr {
            height: 48px;
            background-color: #fff;

            th,
            td {
                padding: 0 16px 0 16px;
                border-right: 1px solid #c7c7c7;
                border-bottom: 1px solid #c7c7c7;
                word-wrap: break-word;
                overflow-wrap: break-word;

                &:last-child {
                    border-right: unset;
                }
            }

        }

        .sticky {
            position: sticky;
            right: 0;
            left: 0;
            background-color: inherit;

            &-left {
                left: 0;
            }

            &-right {
                right: 0;
                border-left: 1px solid #c7c7c7;
            }
        }


        .btn {
            color: $text-blue;
            background-color: transparent;
            padding-right: 0;
            border-radius: 0;
            font-weight: 600;
            min-width: 0px;
            border: none;
            cursor: pointer;

            &::after {
                content: "";
                border-left: 1px solid $text-blue;
                margin-left: 8px;
            }

            &:hover {
                color: $text-blue-light;
            }

            &:active {
                color: #0062cc;
            }

            &-combo {
                display: flex;
                align-items: center;
                z-index: 10;
            }

            &-combo-action {
                background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -893px -360px;
                width: 24px;
                height: 16px;
                margin: 0 12px 0px 8px;
                cursor: pointer;
                outline: none;
                border: none;

                &:focus {
                    border: 1px solid #0062cc;
                }
            }
        }

        .dropdown {
            position: relative;

            &-menu {
                position: absolute;
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

        .title-left {
            text-align: left;
        }

        .title-center {
            text-align: center;
        }

        .title-right {
            text-align: right;
        }

        .currency {
            text-align: right;
        }
    }

}

.v {
    &-pagination {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-pagination__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    &-pagination__container--left {
        flex-shrink: 0;
    }

    &-pagination__container--left--item {}

    &-pagination__container--left--item--text {
        span {
            font-weight: bold;
        }
    }

    &-pagination__container--right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }

    &-pagination__container--right--item {
        margin: 0 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-pagination__container--right--item--text {}

}

.page {
    &-index {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    &-item {
        padding: 0 0.5rem !important;
        cursor: pointer;
    }

    &-item--active {
        border: 1px solid #e0e0e0;
        font-weight: 700;
    }
}
</style>
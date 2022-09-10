<template>
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
                    <VSelect :options="options" :position="position" v-model="pageSize" />
                </div>
                <div class="v-pagination__container--right--item">
                    <div class="v-pagination__container--right--item--text">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VSelect from '../base/VSelect.vue'
export default {
    name: "VPagination",
    components: {
        VSelect
    },
    data() {
        return {
            pageSize: 10,
        }
    },
    props: {
        options: {
            type: Array,
            default: () => [
                { key: 10, value: '10 bản ghi trên 1 trang' },
                { key: 20, value: '20 bản ghi trên 1 trang' },
                { key: 30, value: '30 bản ghi trên 1 trang' },
                { key: 50, value: '50 bản ghi trên 1 trang' },
                { key: 100, value: '100 bản ghi trên 1 trang' },
            ],
        },
        position: {
            type: String,
            default: 'top'
        },
        totalRecord: {
            type: Number,
            default: 0
        },
        totalPage: {
            type: Number,
            default: 0
        },
    },
}
</script>

<style scoped lang="scss">
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

    &-pagination__container--left {}

    &-pagination__container--left--item {}

    &-pagination__container--left--item--text {
        span {
            font-weight: bold;
        }
    }

    &-pagination__container--right {}

    &-pagination__container--right--item {}

    &-pagination__container--right--item--text {}
}
</style>
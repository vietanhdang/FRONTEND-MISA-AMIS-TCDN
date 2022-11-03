<template>
    <div class="filter-condition" v-if="modelValue.length > 0">
        <div class="filter-condition__item" v-for="(item, index) in modelValue" :key="index">
            {{ item.title }} {{ item.selectedOption ? '' : item.conditionName }} {{ item.selectedOption
                    ?
                    `"${item.selectedOption}"` :
                    item.value ? `"${item.value}"` : ''
            }}
            <div class="filter-condition__delete ms-16 ms-icon ms-icon-close-small"
                @click="deleteFilterCondition(index)"></div>
        </div>
        <div class="filter-condition__remove" @click="filterData([])">Xóa điều kiện lọc</div>
    </div>
</template>

<script>
export default {
    name: 'VFilterToolbar',
    props: {
        modelValue: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        /**
         * @description: Hàm này dùng để xóa 1 hoặc nhiều điều kiện lọc
         * Author: AnhDV 28/10/2022
         */
        deleteFilterCondition(index) {
            // clone dataFilter
            let dataFilter = [...this.modelValue];
            // xóa điều kiện lọc
            dataFilter.splice(index, 1);
            // gọi hàm filterData để lọc dữ liệu
            this.filterData(dataFilter);
        },
        /**
         * @description: Hàm này dùng để xóa tất cả điều kiện lọc
         * Author: AnhDV 28/10/2022
         */
        filterData(dataFilter) {
            this.$emit('update:modelValue', dataFilter);
        }
    }
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
</style>
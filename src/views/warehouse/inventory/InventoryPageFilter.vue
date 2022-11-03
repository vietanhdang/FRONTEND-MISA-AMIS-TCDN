<template>
    <div v-if="filterPopup.isShow" class="v-table__condition" ref="condition"
        :style="[{ top: `${filterPopupTemp.top}px` }, { left: `${filterPopupTemp.left}px` }]"
        @keydown.enter="applyFilter">
        <div class="v-table__filter">
            <div class="v-table__column-filter">
                <div class="row sm-gutter">
                    <div class="form-group col l-6 md-6 focus">
                        <v-input label="Tính chất" :focus="true">
                        </v-input>
                    </div>
                    <div class="form-group col l-6 md-6 focus">
                        <v-input label="Nhóm">
                        </v-input>
                    </div>
                    <div class="form-group col l-6 md-6 focus">
                        <v-combobox position="bottom" propKey="key" propValue="value" :selectBox="true"
                            :data="[{ key: '-1', value: 'Tất cả' }, { key: '1', value: 'Còn tồn' }, { key: '2', value: 'Sắp hết hàng' }, { key: '3', value: 'Hết hàng' }]"
                            label="Tình trạng tồn kho">
                        </v-combobox>
                    </div>
                    <div class="form-group col l-6 md-6 focus">
                        <v-combobox position="bottom" propKey="key" propValue="value" :selectBox="true"
                            :data="[{ key: '-1', value: 'Tất cả' }, { key: '1', value: 'Đang sử dụng' }, { key: '0', value: 'Ngừng sử dụng' }]"
                            label="Trạng thái">
                        </v-combobox>
                    </div>
                </div>
            </div>
            <div class="v-table__action-filter d-flex justify-content-between m-t-3">
                <v-button buttonType="secondary">Bỏ lọc</v-button>
                <v-button>Lọc</v-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VTableFilter',
    props: {
        filterPopup: {
            type: Object,
            default: () => {
                return {
                    isShow: false,
                    left: 0,
                    top: 0,
                    filterOptions: [],
                };
            }
        }
    },
    data() {
        return {
            filterPopupTemp: {},
        };
    },
    watch: {
        'filterPopup.isShow': function (val) {
            if (val) {
                this.filterPopupTemp = JSON.parse(JSON.stringify(this.filterPopup));
                // tính lại vị trí của popup
                this.$nextTick(() => {
                    this.filterPopupTemp.left = this.$refs.condition.offsetLeft - this.$refs.condition.offsetWidth;
                });
            }
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.v {
    &-table__condition {
        position: absolute;
        padding: 16px 20px 20px;
        border: 1px solid #babec5;
        z-index: 10003;
        background: #fff;
        min-width: 533px;
        max-width: 533px;
        width: fit-content;
        font-weight: 400;
        font-size: 13px;
        border-radius: 2px;
        box-shadow: 3px 3px 6px #ddd;

    }

    &-table__lock {
        display: flex;
        align-items: center;
        padding-bottom: 14px;
        border-bottom: 1px solid #ebedf0;

    }

    &-table__filter {}

    &-table__column-filter {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-table__input-filter {}

    &-table__action-filter {}
}
</style>
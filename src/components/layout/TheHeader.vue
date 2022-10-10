<template>
    <div class="header">
        <div class="d-flex align-items-center">
            <div class="ms-24 ms-icon ms-icon-three-stripes ml-x-2" @click="toggleSidebar" v-if="!collapsed"></div>
            <v-dropdown icon="ms-16 ms-icon ms-icon-chevron-big-down" className="pl-l-1"
                :items="[{'key': '','value': 'CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC'}]">
                <span tooltip="CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC">CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI
                    - DỊCH VỤ QUI PHÚC</span>
            </v-dropdown>


        </div>
        <div class="d-flex align-items-center">
            <v-tooltip content="Thông báo">
                <div class="ms-24 ms-icon ms-icon-bell"></div>
            </v-tooltip>
            <div class="header__user d-flex align-items-center p-x-3 ml-r-3">

                <v-dropdown icon="ms-16 ms-icon ms-icon-chevron-big-down" className="pl-l-1" :items="languages"
                    propKey="language" propValue="title" @onSelect="changeLocale">
                    {{ $t('common.select_lang') }}
                    <template #item="item">
                        <flag :iso="item.option.flag" v-bind:squared=false />
                        {{ item.option.title }}
                    </template>
                </v-dropdown>

                <div class="ms-32 ms-icon ms-round ms-icon-small-user ms-l-2"></div>
                <div class="m-2 font-weight-600 font-size-13 cursor-pointer">Đặng Việt Anh</div>
                <div class="ms-14 ms-icon ms-icon-chevron-down"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            languages: [
                { flag: 'us', language: 'en', title: 'English' },
                { flag: 'vn', language: 'vi', title: 'Tiếng Việt' }
            ]
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },
        changeLocale(language) {
            this.$i18n.locale = language
        }
    },
}
</script>

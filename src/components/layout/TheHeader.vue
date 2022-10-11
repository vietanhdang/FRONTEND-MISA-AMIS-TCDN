<template>
    <div class="header">
        <div class="d-flex align-items-center">
            <div class="ms-24 ms-icon ms-icon-three-stripes ml-x-2" @click="toggleSidebar" v-if="!collapsed"
                :tooltip="$t('sidebar.menu_action.collapse')" position="right">
            </div>
            <v-dropdown icon="ms-16 ms-icon ms-icon-chevron-big-down" className="pl-l-1" :backgroundActive="false"
                :items="[{'key': '','value': 'CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC'}]">
                <span tooltip="CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC">CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI
                    - DỊCH VỤ QUI PHÚC</span>
            </v-dropdown>
        </div>
        <div class="d-flex align-items-center">
            <v-dropdown icon="ms-16 ms-icon ms-icon-chevron-big-down" className="pl-l-1" :items="languages"
                propKey="language" propValue="title" @onSelect="changeLocale" :value="currentLanguage">
                {{ $t('common.select_lang') }}
                <template #item="item">
                    <span class="font-weight-500">
                        <flag :iso="item.option.flag" v-bind:squared=false /> {{ item.option.title }}
                    </span>
                </template>
            </v-dropdown>
            <v-tooltip content="Thông báo">
                <div class="ms-24 ms-icon ms-icon-bell"></div>
            </v-tooltip>
            <div class="header__user d-flex align-items-center p-x-3 ml-r-3">
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
        collapsed: { // Sidebar có collapsed hay không
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            languages: [
                { flag: 'vn', language: 'vi', title: 'Tiếng Việt' },
                { flag: 'us', language: 'en', title: 'English' }
            ] // Danh sách các ngôn ngữ,

        }
    },
    computed: {
        // Lấy ngôn ngữ hiện tại
        currentLanguage() {
            return this.$i18n.locale;
        }
    },
    methods: {
        /**
         * @description: Hàm này dùng để đóng mở sidebar 
         * Author: AnhDV 11/10/2022
         */
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },
        /**
         * @description: Hàm này dùng để thay đổi ngôn ngữ
         * Author: AnhDV 11/10/2022
         */
        changeLocale(language) {
            // lưu ngôn ngữ vào localstorage
            localStorage.setItem('amis-language', language)
            // thay đổi ngôn ngữ
            this.$i18n.locale = language;
        }
    },
}
</script>

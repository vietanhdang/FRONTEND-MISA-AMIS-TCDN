<template>
    <div @keydown="quickKeyHandle" tabindex="-1">
        <slot name="default"></slot>
        <v-dialog :isShow="isShow" @close="isShow = false" :line="false">
            <template #title>
                <div class="max-content">
                    <h1> {{$t('quick_key_info.title')}}</h1>
                </div>
            </template>
            <template #body>
                <table class="v-table">
                    <thead>
                        <tr>
                            <th>{{$t('quick_key_info.quick_key')}}</th>
                            <th>{{$t('quick_key_info.function')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listKey" :key="item.key">
                            <td><b>{{ item.key }}</b></td>
                            <td>{{ item.value }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </v-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import Enum from '@/utils/enum';
import VDialog from './VDialog.vue';
export default {
    components: { VDialog },
    name: 'VQuickKey',
    computed: {
        action: {
            get() {
                return this.$store.getters.getActionKey;
            },
            set(value) {
                this.$store.commit('setActionKey', value);
            }
        },
        listKey() {
            return [
                { key: this.$t('quick_key.save'), value: this.$t('quick_key_info.save') },
                { key: this.$t('quick_key.save_and_add'), value: this.$t('quick_key_info.save_and_add') },
                { key: this.$t('quick_key.add'), value: this.$t('quick_key_info.add') },
                { key: this.$t('quick_key.close'), value: this.$t('quick_key_info.close') },
                { key: this.$t('quick_key.delete'), value: this.$t('quick_key_info.delete') },
                { key: this.$t('quick_key.reload'), value: this.$t('quick_key_info.reload') },
                { key: this.$t('quick_key.export_excel'), value: this.$t('quick_key_info.export_excel') },
                { key: this.$t('quick_key.change_language'), value: this.$t('quick_key_info.change_language') },
                { key: this.$t('quick_key.show_keyboard_shortcut'), value: this.$t('quick_key_info.show_keyboard_shortcut') },
            ];
        }
    },
    data() {
        return {
            isShow: false, // hiển thị các phím tắt hiện có hay không
        }
    },
    methods: {
        /**
         * @description: Hàm này dùng để lowercase các phím tắt 
         * @param {String} key
         * Author: AnhDV 11/10/2022
         */
        lowerCaseKey(key) {
            return key.toLowerCase();
        },
        /**
         * @description: Hàm này dùng để xử lý các phím tắt từ bàn phím và gán vào action  
         * @param: {Object} event 
         * Author: AnhDV 11/10/2022
         */
        quickKeyHandle(e) {
            const self = this;
            let isUse = false;
            switch (e.key) {
                case Enum.KEY_NAME.s:
                    if (e.ctrlKey) { // Ctrl + S => Cất và đóng
                        e.preventDefault();
                        self.action = Enum.ACTION.SAVE_AND_CLOSE;
                        isUse = true;
                    }
                    break;
                case Enum.KEY_NAME.S:
                    if (e.ctrlKey && e.shiftKey) { // Ctrl + Shift + S => Cất và thêm mới
                        e.preventDefault();
                        self.action = Enum.ACTION.SAVE_AND_ADD;
                        isUse = true;
                    }
                    break;
                case self.lowerCaseKey(Enum.KEY_NAME.E):
                    if (e.ctrlKey && e.altKey) { // Ctrl + Alt + E => Xuất excel
                        e.preventDefault();
                        self.action = Enum.ACTION.EXPORT;
                        isUse = true;
                    }
                    break;
                case self.lowerCaseKey(Enum.KEY_NAME.A):
                    if (e.ctrlKey && e.altKey) { // Ctrl + Alt + A => Thêm mới
                        e.preventDefault();
                        self.action = Enum.ACTION.ADD;
                    }
                    break;
                case Enum.KEY_NAME.Esc: // Esc => Đóng
                    e.preventDefault();
                    self.action = Enum.ACTION.CLOSE;
                    if (self.isShow) {
                        self.isShow = false;
                    }
                    break;
                case Enum.KEY_NAME.Delete: // Delete => Xóa
                    e.preventDefault();
                    self.action = Enum.ACTION.DELETE;
                    isUse = true;
                    break;
                case self.lowerCaseKey(Enum.KEY_NAME.R):
                    if (e.ctrlKey) {    // Ctrl + R => Tải lại table
                        e.preventDefault();
                        self.action = Enum.ACTION.RELOAD;
                        isUse = true;
                    }
                    break;
                case self.lowerCaseKey(Enum.KEY_NAME.L):
                    if (e.ctrlKey && e.altKey) { // Ctrl + Alt + l => Switch language giữa tiếng việt và tiếng anh
                        e.preventDefault();
                        const oldLang = self.$i18n.locale;
                        self.$i18n.locale = oldLang === Enum.LANGUAGE.VI ? Enum.LANGUAGE.EN : Enum.LANGUAGE.VI;
                        // Lưu lại ngôn ngữ đã chọn vào localStorage
                        localStorage.setItem('amis-language', self.$i18n.locale);
                        isUse = true;
                    }
                    break;
                case self.lowerCaseKey(Enum.KEY_NAME.F1): // F1 => Hiển thị các phím tắt hiện có
                    if (e.ctrlKey) {
                        e.preventDefault();
                        self.isShow = true;
                        isUse = true;
                    }
                default:
                    break;
            }
            if (isUse) {
                self.$nextTick(() => {
                    self.action = null;
                    isUse = false;
                });
            }
        },

    },
}
</script>

<style scoped lang="scss">
div {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
}

.max-content {
    width: 500px;
}

.v-table {
    width: 100%;
    border-collapse: border-collapse;
    border-spacing: 0;
    border: 1px solid #ddd;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

}
</style>
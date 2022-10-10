<template>
    <div @keydown="quickKeyHandle" tabindex="-1">
        <slot name="default"></slot>
    </div>
</template>

<script>
/* eslint-disable */
import Enum from '@/utils/enum';
export default {
    name: 'VQuickKey',
    computed: {
        action: {
            get() {
                return this.$store.getters.getActionKey;
            },
            set(value) {
                this.$store.commit('setActionKey', value);
            }
        }
    },
    methods: {
        quickKeyHandle(e) {
            const self = this;
            switch (e.key) {
                case 's':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        self.action = Enum.ACTION.SAVE_AND_CLOSE;
                    }
                    break;
                case 'S':
                    if (e.ctrlKey && e.shiftKey) {
                        e.preventDefault();
                        self.action = Enum.ACTION.SAVE_AND_ADD;
                    }
                    break;
                case 'a':
                    if (e.ctrlKey && e.altKey) {
                        e.preventDefault();
                        self.action = Enum.ACTION.ADD;
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    self.action = Enum.ACTION.CLOSE;
                    break;
                case 'Delete':
                    e.preventDefault();
                    self.action = Enum.ACTION.DELETE;
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
div {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
}
</style>
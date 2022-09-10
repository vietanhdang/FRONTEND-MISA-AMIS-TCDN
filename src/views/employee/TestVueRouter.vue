<template>
    <div class="row">
        <div class="col-12">
            <v-button text="Show dialog" @click="showDialog = true"></v-button>
        </div>
        <v-dialog v-model="showDialog">
            <template #title>
                Dialog title
            </template>
            <template #body>
                Mô tả
            </template>
            <template #footer__right>
                <v-button @click="close" className="v-button__button-no-bg border" text="Không"></v-button>
                <v-button @click="close" text="Có"></v-button>
            </template>
        </v-dialog>
        <v-toast ref="toast" :maxMessage="10" :order="false"></v-toast>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDialog: false,
            count: 0
        };
    },
    mounted() {
        this.$root.$toast.success(`${this.count}`);
    },
}
</script>

<style>

</style>
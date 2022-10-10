<template>
  <div class="main">

    <div class="menu-container">
      <TheSidebar :collapsed="collapsed" @toggleSidebar="toggleSidebar" />
    </div>
    <div class="content-area">
      <TheHeader @toggleSidebar="toggleSidebar" :collapsed="collapsed" />
      <div class="content">
        <v-quick-key>
          <template #default>
            <router-view />
          </template>
        </v-quick-key>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    /**
     * Đóng mở sidebar
     * Author: AnhDV 10/09/2022
     */
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    }
  }
}
</script>

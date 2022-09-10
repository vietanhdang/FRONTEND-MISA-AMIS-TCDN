<template>
  <div id="app">
    <TheHeader @toggleSidebar="toggleSidebar" :collapsed="collapsed" />
    <div class="main">
      <TheSidebar :collapsed="collapsed" />
      <div class="content" :class="{ 'content--collapsed': collapsed }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import EmployeeList from './components/content/EmployeeList.vue'
import TheHeader from '@/layout/header/TheHeader.vue'
import TheSidebar from '@/layout/sidebar/TheSidebar.vue'
export default {
  name: "App",
  components: {
    TheHeader,
    TheSidebar,
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    /**
     * Đóng mở sidebar
     * Author: AnhDV 10/09/2022
     */
    toggleSidebar() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style lang="scss">
@font-face {
  font-family: "MISA Fonts Regular";
  src: url("@/assets/fonts/notosans-regular.2cb88a13.woff2");
}

@font-face {
  font-family: "MISA Fonts Bold";
  src: url("@/assets/fonts/notosans-bold.3ede5aff.woff2")
}

$Misa-font-regular: "MISA Fonts Regular";
$Misa-font-bold: "MISA Fonts Bold";

* {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-size: 13px;
  box-sizing: border-box;
  font-family: $Misa-font-regular;
  font-weight: 400;
}

.main {
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
}
</style>

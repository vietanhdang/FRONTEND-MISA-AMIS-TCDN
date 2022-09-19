<template>
  <div class="main">
    <div class="menu-container">
      <TheSidebar :collapsed="collapsed" @toggleSidebar="toggleSidebar" />
    </div>
    <div class="content-area">
      <TheHeader @toggleSidebar="toggleSidebar" :collapsed="collapsed" />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
  <!-- <div class="main">
      <div class="content" :class="{ 'content--collapsed': collapsed }">
      </div>
    </div> -->

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
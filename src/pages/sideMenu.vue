<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSessionStorage } from '../utils/util'
import { Location } from '@element-plus/icons-vue'
import routerObj from '../router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const route = useRoute()
const active = computed(() => store.state.tabmenu.activeTab)

const activeVal = computed({
  get: () => {
    if ( active.value ) {
      return active.value
    } else {
      return route.path
    }
  },
})

let menuList = computed(() => store.state.menu.menu_list).value
// onMounted(() => {
//   try {
//     menuList.value = store.state.menu.menu_list
//   } catch (e) {console.log(e)}
// })
const handleOpen = (item) => {
  // console.log('open==>', item)
}
const handleClose = (item) => {
  // console.log('close==>', item)

}
const handleSelect = (item) => {
  // console.log('select==>', item)

}
const menuItemClick = (item) => {
  router.push(item.index)
}
</script>
<template>
  <div class="side_menu">
    <router-link class="logo" to="/home">LOGO</router-link>
    <el-menu class="el-menu-vertical-demo"
        :default-active="activeVal"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home/welcome" @click="menuItemClick">
          <template #title>
            <el-icon><location /></el-icon>
            <span>首页</span>
          </template>
        </el-menu-item>
        <template v-for="menu in menuList" :index="menu.path" :key="menu.path">
          <el-sub-menu v-if="menu.children?.length" :index="menu.path">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{menu.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item in menu.children" :index="item.path" :key="item.path"
                @click="menuItemClick">{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item :index="menu.path" v-else @click="menuItemClick">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{menu.name}}</span>
            </template>
          </el-menu-item>
        </template>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
.side_menu {
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}
.logo {
  line-height: 40px;
  text-align: center;
}
</style>
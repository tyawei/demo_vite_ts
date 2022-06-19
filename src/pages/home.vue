<script setup>
import { reactive, computed, onMounted, onBeforeMount } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import store from '../store'
import SideMenu from './sideMenu.vue'

const route = useRoute()
const router = useRouter()

const tabbars = computed(() => store.state.tabmenu.tabmenu_list)
const editTabsValue = (computed(() => store.state.tabmenu.activeTab)).value
const tabClick = tab => {
  console.log('tab=>', {...tab}, JSON.parse(JSON.stringify(tabbars.value)))
  router.push({ name: tab.paneName })
}

onBeforeRouteUpdate(to => {
  store.dispatch('tabmenu/changeRouteHandler', to)
})
onBeforeMount(() => {
  console.log('mounted', JSON.parse(JSON.stringify(route)))
  store.dispatch('tabmenu/changeRouteHandler', route)
})

</script>
<template>
  <div class="layout">
    <side-menu></side-menu>
    <div class="cnt_box">
      <div class="content_header">
        <div class="head_bar">bar</div>
        <div class="head_handler">
          <el-tabs
            v-model="editTabsValue"
            type="card"
            class="demo-tabs"
            closable
            @tab-click="tabClick"
          >
            <el-tab-pane
              v-for="item in tabbars"
              :key="item.path"
              :label="item.name"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  display: flex;
}
.cnt_box {
  flex: 1;
  .content_header {
    padding: 10px;
    height: 60px;
    box-shadow: 0 5px 5px rgb(240, 240, 240);
  }
  .head_bar {
    height: 30px;
  }
  .head_handler {
    height: 30px;
  }
  .content {
    margin-top: 25px;
    padding: 10px;
    box-shadow: 0 -5px 5px rgb(240, 240, 240);
  }
}
</style>
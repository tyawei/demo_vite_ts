const defaultTab = {
  name: '首页',
  path: '/home/welcome',
}
export default {
  namespaced: true,
  state: {
    tabmenu_list: [defaultTab],
    activeTab: defaultTab.path,
  },
  mutations: {
    addTab: (state, tabmenu) => {
      state.tabmenu_list.push(tabmenu)
    },
    setTab: (state, tabmenu_list) => {
      state.tabmenu_list = tabmenu_list
    },
    setActiveTab: (state, active) => {
      state.activeTab = active.path
    }
  },
  actions: {
    changeRouteHandler: ({ commit, state }, route) => {
      let list = state.tabmenu_list
      let existFlag = false
      for ( let i = 0; i<list.length; i++ ) {
        if ( list[i].path === route.path ) {
          // 说明导航新路由存在路由历史
          existFlag = true 
          commit('setActiveTab', route)
          break
        }
      }
      if ( !existFlag ) {
        commit('addTab', route)
        commit('setActiveTab', route)
        return false
      } 

      

    }
  }
}

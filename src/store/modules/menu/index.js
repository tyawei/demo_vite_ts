export default {
  namespaced: true,
  state: {
    menu_list: [],
  },
  // getters: {
  //   dictionary(state) {
  //     return state.map
  //   }
  // },
  mutations: {
    setMenu: (state, menu_list) => {
      state.menu_list = menu_list
    }
  },
  actions: {
    setMenu: ({ commit }, menu_list) => {
      commit('setMenu', menu_list)
    },
  }
}

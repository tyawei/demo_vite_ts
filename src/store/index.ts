import { createStore } from 'vuex'
import menu from './modules/menu'
import tabmenu from './modules/tabmenu'

// import path from 'path-browserify'
// const requireModules = import.meta.globEager('./modules/*/index.js')
// const modules = {}
// console.log('requireModules', { ...requireModules })
// Object.keys(requireModules).forEach(filePath => {
//   const modular = requireModules[filePath]
//   let name = path.join('./', filePath)
//   name = name.split('/')[1]
//   modules[name] = {
//     namespaced: true,
//     ...modular.default
//   }
// })
// console.log('modules', { ...modules })

const store = createStore({
  modules: {
    menu, 
    tabmenu,
  },
})

export default store

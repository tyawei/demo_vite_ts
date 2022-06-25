import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getSessionStorage, setSessionStorage } from '../utils/util'
import { http_getmenu } from '../api/menu'
import { ISonMenu, IMenuListRes } from '../api/i_http'
import store from '../store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login.vue'),
  },
];

const homeRoute: RouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: () => import('../pages/home.vue'),
  redirect: '/home/welcome',
  children: [
    {
      path: '/home/welcome',
      name: 'welcome',
      component: () => import('../pages/welcome.vue'),
    }
  ],
}

const router = createRouter({
  history: createWebHistory(),  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes: routes.concat(homeRoute),
});

let asyncRouteFlag = false

function addRoutes(menuList: Array<ISonMenu> = [], saveList: Array<ISonMenu> = []) {
  let childrenList: Array<ISonMenu> = []
  menuList.forEach((menu: ISonMenu, ind: number) => {
    const { children, name, path } = menu
    let route: any = {}
    if ( children && children.length ) {
      childrenList = childrenList.concat(children)
    } 
    route = { 
      name, 
      path,
      component: children && children.length? undefined : () => import(`../pages${path}/index.vue`),
    }
    saveList.push(route)
  })
  if ( childrenList.length ) {
    addRoutes(childrenList, saveList)
  } else {
    // 避免右侧页面是一个单独整个页面（缺少左侧菜单，此刻二级菜单下的页面和home同级了，自然不应该这样，如下注释代码）
    homeRoute.children = homeRoute.children && homeRoute.children.concat(saveList)
    // saveList.length && saveList.forEach(save => {
    //   router.addRoute(save)
    // })
    router.addRoute(homeRoute)
    console.log('router.getRoutes', router.getRoutes())
  }
}

router.beforeEach(async (to, from, next) => {
  if (getSessionStorage('token')) {
    if (!asyncRouteFlag) {
      const data: IMenuListRes = await http_getmenu('/get_menu', {}).catch(e=>{console.log(e)})
      // console.log('data==>', data)
      let menu_list: ISonMenu[] = []
      if ( data ) {
        menu_list = data.data.menu_list
      }

      // let menu_list = data.menu_list

      console.log('接口menuList==>', menu_list)
      // 菜单数据不需要响应，完全可以用本地缓存
      // setSessionStorage('menu_list', JSON.stringify(menu_list))
      store.dispatch('menu/setMenu', menu_list)
      addRoutes(menu_list || [], [])
      asyncRouteFlag = true
      next({ ...to, replace: true })     //路由进行重定向放行
    } else {
      next()
    }
    // next()
  } else { 
    // 如果去的是登录页
    if (to.path === '/login') {
      // 直接放行
      next();
    } else {
      // 如果去的是其他页,跳转到登录页
      // alert('请登录以后再操作！')
      // 跳转到登录页
      return next({ 'path': '/login' })
    }
  }
})

export default router
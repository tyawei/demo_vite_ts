export default [
  {
    url: '/login',
    method: 'post',
    timeout: 5000,
    response: (data) => {
      return {
        code: 0, 
        data: {
          token: 111,
        },
        msg: 'success',
      }
    }
  },
  {
    url: '/get_menu',
    method: 'get',
    timeout: 5000,
    response: (data) => {
      return {
        code: 0, 
        data: {
          menu_list: [
            {
              id: 1,
              name: '用户管理',
              path: '/user',
              children: [
                {
                  id: 11,
                  pid: 1,
                  name: '管理员',
                  path: '/user/admins',
                }
              ],
          },
           {
              id: 2,
              name: '系统管理',
              path: '/system',
              children: [
                {
                  id: 22,
                  pid: 2, 
                  name: '菜单管理',
                  path: '/system/menu',
                }
              ],
           },
           {
              id: 3,
              name: '数据管理',
              path: '/data',
            }
            // {
            //   id: '1',
            //   name: '菜单1',
            //   path: 'menu1',
            //   children: [
            //     {
            //       id: '1_1',
            //       name: '菜单1_1',
            //       path: 'menu1_1',
            //     },
            //     {
            //       id: '1_2',
            //       name: '菜单1_2',
            //       path: 'menu1_2',
            //     },
            //   ]
            // },
            // {
            //   id: '2',
            //   name: '菜单2',
            //   path: 'welcome',
            //   children: []
            // },
          ]
        },
        msg: 'success',
      }
    }
  },
]
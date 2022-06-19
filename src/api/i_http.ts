interface IMenu {
  pid?: number,
  id: number,
  name: string,
  path: string,
}

export interface ISonMenu extends IMenu {
  children?: IMenu
}

interface IResponse {
  code: number,
  msg: string,
}

export interface IMenuListRes extends IResponse {
  data: {
    menu_list: Array<ISonMenu>
  }
}

export interface ILoginRes extends IResponse {
  data: {
    token?: string | number
  }
}

export interface ILogin {
  username: string,
  password: string,
}
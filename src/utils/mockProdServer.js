import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
// import MockMethod2 from "../../mocks/login"; // mock接口定义的地址
// import MockMethod from "../../mocks/user/index";
// export const mockModules = [...MockMethod, ...MockMethod2]
// import loginModule from '../mock/login.js'
export const mockModules = []
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
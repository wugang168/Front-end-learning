import { HashRouter,  HistoryRouter} from "./baseRouter.js";
const routerList = [
  {
    path: "/",
    component: "我是首页路径",
  },
  {
    path: "/login",
    component: "我是登录页面",
  },
  {
    path: "/profile",
    component: "个人中心页面",
  },
  {
    path: "*",
    component: "404没有找到对应的页面",
  },
];
const renderDOM = document.getElementById("main");
// let routerObj = new HashRouter(routerList, renderDOM);
let routerObj = new HistoryRouter(routerList, renderDOM);

let navBtn = document.getElementsByClassName('nav-item-s');
for (const navDom of navBtn) {
  navDom.onclick = function(event) {
    console.log("触发了点击事件", event,this);
    const path = this.getAttribute('data-page');
    routerObj.push(path);
    // routerObj.replace(path);
  }
}

export class BaseRouter{

  constructor(list, renderDOM) {
    this.list = list;
    this.renderDOM = renderDOM;
  }

  render(state) {
    let ele = this.list.find(item => item.path === state);
    ele = ele ? ele : this.list.find(item => item.path === '*');
    this.renderDOM.innerText = ele.component
  }
}

export class HashRouter extends BaseRouter {

  constructor(list, renderDOM){
    super(list, renderDOM);
    this.loadPage();
    window.addEventListener("hashchange", (e) => {
      console.log("监听到了变化了", e);
      this.loadPage();
    },false)
  }

  // 重新渲染页面
  loadPage() {
    this.render(this.currentPath());
  }

  currentPath() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }

  // push新的页面
  push(path) {
    window.location.hash = path;
  }

  // 替换页面
  replace(path) {
    window.location.replace(this.getUrl(path));
  }

  // 前进或者后退
  go(n) {
    window.history.go(n)
  }

  getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf("#");
    const base = i >= 0 ? href.slice(0, i) : href;
    return base + '#' + path;
  }
}

export class HistoryRouter extends BaseRouter {

  constructor(list, renderDOM) {
    super(list, renderDOM);
    this.loadPage();
    window.addEventListener('popstate', ()=>{
      console.log("监听到了")
      this.loadPage();
    })
  }

  // 重新渲染页面
  loadPage() {
    this.render(this.currentPath());
  }

  currentPath() {
    const pathname = window.location.pathname;
    return pathname ? pathname : '/';
  }

  push(path) {
    history.pushState(null, null, path)
    this.loadPage();
  }

  // 替换页面
  replace(path) {
    history.replaceState(null, null, path)
    this.loadPage();
  }

  go(n) {
    window.history.go(n)
  }
}
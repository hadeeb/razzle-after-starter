import asyncComponent from "@jaredpalmer/after/asyncComponent";

const routes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "Home" */ "./Home")
    })
  },
  {
    name: "About",
    path: "/about",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName:"About" */ "./About")
    })
  }
];

export { routes };

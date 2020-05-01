import { asyncComponent } from "@jaredpalmer/after";

const routes = [
  {
    path: "/",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName: "Home" */ "./Home"),
      chunkName: "Home",
    }),
  },
  {
    path: "/about",
    exact: true,
    component: asyncComponent({
      loader: () => import(/* webpackChunkName:"About" */ "./About"),
      chunkName: "About",
    }),
  },
];

export { routes };

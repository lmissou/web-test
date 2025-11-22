import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

const views = import.meta.glob(['/src/views/**/*.vue', '!/src/views/**/components/**/*.vue', '!/src/views/**/codes/**', '!/src/views/**/*code.vue'], {
  eager: true,
});

Object.keys(views).forEach((key) => {
  const { default: component, meta } = views[key] as any;
  const matchs = key.match(/\/src\/views\/(?<path>.*)(index)?.vue/);
  let { path } = matchs?.groups ?? {};
  if (!path) {
    path = '';
  }
  if (path.endsWith('/index')) {
    path = path.substring(0, path.length - 6);
  }
  const routePath = `/${path}`;
  routes.push({
    path: routePath,
    name: path.replace(/\//g, '-'),
    component,
    meta: meta ?? {},
  });
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

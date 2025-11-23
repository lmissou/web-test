import { createHashRouter, RouterProvider, type RouteObject } from 'react-router';

export type RouteObjectWithMeta = RouteObject & {
  meta?: {
    [key: string]: any;
  };
};

const routes: RouteObjectWithMeta[] = [
  {
    path: '/',
    element: <div>Home</div>,
  },
];

const views = import.meta.glob(['/src/views/**/*.tsx', '!/src/views/**/components/**/*', '!/src/views/**/codes/**/*'], {
  eager: true,
});

Object.keys(views).forEach((key) => {
  const { default: component, meta } = views[key] as any;
  const matchs = key.match(/\/src\/views\/(?<path>.*)(index)?.tsx/);
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
    id: path.replace(/\//g, '-'),
    Component: component,
    meta: meta ?? {},
  });
});

const router = createHashRouter(routes);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

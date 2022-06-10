import { lazy, LazyExoticComponent } from "react";
import { NoLazy } from "../01-lazyload/pages/NoLazy";
// import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

type JSXComponent = () => JSX.Element;

interface Route {
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
  path: string;
  to: string;
}

const LazyLayout = lazy(() => import("../01-lazyload/layout/LazyLayout"));
// const lazy1 = lazy(() => import("../01-lazyload/pages/payload"));
// const lazy2 = lazy(() => import("../01-lazyload/pages/LazyPage2"));
// const lazy3 = lazy(() => import("../01-lazyload/pages/LazyPage3"));

export const routes: Route[] = [
    {
        path: '/lazyload/*',
        to: '/lazyload/',
        Component: LazyLayout,
        name: 'LazyLayout - Dash'
    },
    {
        to: '/no-lazy',
        path: 'no-lazy',
        Component: NoLazy,
        name: 'No Lazy'
    },

];

import { lazy, LazyExoticComponent } from "react";
// import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

type JSXComponent = () => JSX.Element;

interface Route {
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
  path: string;
  to: string;
}

const lazy1 = lazy(() => import("../01-lazyload/pages/payload"));
const lazy2 = lazy(() => import("../01-lazyload/pages/LazyPage2"));
const lazy3 = lazy(() => import("../01-lazyload/pages/LazyPage3"));

export const routes: Route[] = [
  {
    to: "/lazy1",
    path: "lazy1",
    Component: lazy1,
    name: "Lazy Page 1",
  },
  {
    to: "/lazy2",
    path: "lazy2",
    Component: lazy2,
    name: "Lazy Page 2",
  },
  {
    to: "/lazy3",
    path: "lazy3",
    Component: lazy3,
    name: "Lazy Page 3",
  },
];

import { BrowserRouter } from "react-router-dom";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./routes";
import logo from "../logo.svg";
import { Suspense } from "react";

export const Navigation = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <BrowserRouter>
        <div className="main-layout">
          <nav>
            <img src={logo} alt="logo" />
            <ul>
              {routes.map((route, index) => (
                <li key={route.path}>
                  <NavLink to={route.to}>{route.name}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.to}
                element={<route.Component />}
              />
            ))}
            <Route
              path="/*"
              element={<Navigate to={routes[0].path} replace />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};

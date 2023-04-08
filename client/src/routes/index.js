import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../Layout";

const Login = lazy(() => import("../pages/Login"));
const Chats = lazy(() => import("../pages/Chats"));

export default function Router() {
  let route = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/chats", element: <Chats /> },
      ],
    },
  ]);

  return route;
}

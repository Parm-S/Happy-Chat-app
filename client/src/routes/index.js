import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../Layout";

const Home = lazy(() => import("../pages/Home"));
const Chats = lazy(() => import("../pages/Chats"));

export default function Router() {
  let route = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/chats", element: <Chats /> },
      ],
    },
  ]);

  return route;
}

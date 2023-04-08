import { useRoutes } from "react-router-dom";
import Layout from "../Layout";
import Login from "../pages/Login";
import Chats from "../pages/Chats";

export default function Router() {
  let route = useRoutes([
    { path: "/", element: <Login /> },
    {
      element: <Layout />,
      children: [{ path: "/chats", element: <Chats /> }],
    },
  ]);

  return route;
}

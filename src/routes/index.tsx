import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
// import Services from "@/pages/Services";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //   path: "/services",
      //   Component: Services,
      // },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
  {
    Component: withAuth(
      DashboardLayout,
      (role.superAdmin || role.admin) as TRole
    ),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/analytics"} />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: Register,
  },
]);

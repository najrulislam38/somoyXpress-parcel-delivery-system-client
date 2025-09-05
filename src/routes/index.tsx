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
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import ErrorPage from "@/pages/ErrorPage";
import Unauthorized from "@/pages/Unauthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
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
    Component: withAuth(DashboardLayout, [
      role.superAdmin,
      role.admin,
    ] as TRole[]),
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
    Component: withAuth(DashboardLayout, [
      role.sender,
      role.superAdmin,
      role.admin,
    ] as TRole[]),
    path: "/sender",
    children: [
      {
        index: true,
        element: <Navigate to={"/sender/analytics"} />,
      },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  // receiver
  {
    Component: withAuth(DashboardLayout, [
      role.receiver,
      role.superAdmin,
      role.admin,
    ] as TRole[]),
    path: "/receiver",
    children: [
      {
        index: true,
        element: <Navigate to={"/receiver/profile"} />,
      },
      ...generateRoutes(receiverSidebarItems),
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
    Component: Unauthorized,
  },
]);

import App from "@/App";
import About from "@/pages/About";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Services from "@/pages/Services";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Home,
      },
    ],
  },
]);

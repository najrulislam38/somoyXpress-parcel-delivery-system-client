import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Tracking",
    items: [
      {
        title: "Parcel",
        url: "/receiver/parcel",
        component: Analytics,
      },
    ],
  },
];

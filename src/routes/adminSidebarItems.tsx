import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import AllParcel from "@/pages/Parcel/AllParcel";
import AllUsers from "@/pages/admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("./../pages/admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "All User",
        url: "/admin/all-users",
        component: () => <AllUsers loading={false} />,
      },
      {
        title: "All Parcel",
        url: "/admin/all-parcel",
        component: () => <AllParcel />,
      },
      {
        url: "/admin/parcel/:id",
        component: () => <ParcelDetails />,
      },
    ],
  },
];

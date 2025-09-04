import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import AllParcel from "@/pages/Parcel/AllParcel";
import { ParcelTracker } from "@/pages/Receiver/ParcelTracking";
import { Profile } from "@/pages/Receiver/Profile";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Tracking",
    items: [
      {
        title: "My Profile",
        url: "/receiver/profile",
        component: Profile,
      },

      {
        title: "Parcel",
        url: "/receiver/all-parcel",
        component: AllParcel,
      },
      {
        title: "Parcel Tracker",
        url: "/receiver/tracker",
        component: ParcelTracker,
      },
      {
        url: "/receiver/parcel/:id",
        component: () => <ParcelDetails />,
        hidden: true,
      },
    ],
  },
];

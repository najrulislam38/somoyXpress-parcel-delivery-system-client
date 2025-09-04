import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import IncomingParcel from "@/pages/Receiver/IncomingParcel";
import { ParcelTracker } from "@/pages/Receiver/ParcelTracking";
import { Profile } from "@/pages/Receiver/Profile";
import { UserRole, type ISidebarItem } from "@/types";
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
        title: "All Parcel",
        url: "/receiver/parcels",
        component: IncomingParcel,
        role: [UserRole.RECEIVER],
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

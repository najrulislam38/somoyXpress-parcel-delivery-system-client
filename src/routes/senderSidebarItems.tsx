import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import AllParcel from "@/pages/Parcel/AllParcel";
import CreateParcel from "@/pages/Parcel/CreateParcel";
import { Profile } from "@/pages/Receiver/Profile";

import { UserRole, type ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender Dashboard",
    items: [
      {
        title: "My Profile",
        url: "/sender/profile",
        component: Profile,
        role: [UserRole.MERCHANT],
      },
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: CreateParcel,
      },
      {
        title: "My All Parcel",
        url: "/sender/all-parcel",
        component: AllParcel,
        role: [UserRole.MERCHANT],
      },
      {
        url: "/sender/parcel/:id",
        component: ParcelDetails,
        hidden: true,
      },
    ],
  },
];

import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import AllParcel from "@/pages/Parcel/AllParcel";
import CreateParcel from "@/pages/Parcel/CreateParcel";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Sender Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/sender/analytics",
        component: SenderAnalytics,
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
      },
      {
        url: "/sender/parcel/:id",
        component: ParcelDetails,
        hidden: true,
      },
    ],
  },
];

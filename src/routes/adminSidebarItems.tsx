import ParcelDetails from "@/components/modules/Parcel/ParcelDetails";
import AllParcel from "@/pages/Parcel/AllParcel";
import CreateParcel from "@/pages/Parcel/CreateParcel";
import { ParcelTracker } from "@/pages/Receiver/ParcelTracking";
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
        title: "Create Parcel",
        url: "/admin/create-parcel",
        component: CreateParcel,
      },
      {
        url: "/admin/parcel/:id",
        component: () => <ParcelDetails />,
        hidden: true,
      },
      {
        title: "Parcel Tracker",
        url: "/admin/tracker",
        component: ParcelTracker,
      },
    ],
  },
];

// export const adminRoutes = [
//   { path: "/admin/analytics", element: <Analytics /> },
//   { path: "/admin/all-users", element: <AllUsers loading={false} /> },
//   { path: "/admin/all-parcel", element: <AllParcel /> },
//   { path: "/admin/parcel/:id", element: <ParcelDetails /> }, // hidden (not in sidebar)
// ];

// export const adminRoutes = [
//   ...adminSidebarItems.flatMap((section) => section.items),
//   { url: "/admin/parcel/:id", component: () => <ParcelDetails /> }, // hidden route
// ];

import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (UserRole: TRole) => {
  switch (UserRole) {
    case role.superAdmin:
      return [
        ...adminSidebarItems,
        // ...senderSidebarItems,
        // ...receiverSidebarItems,
      ];
    case role.admin:
      return [
        ...adminSidebarItems,
        // ...senderSidebarItems,
        // ...receiverSidebarItems,
      ];
    case role.sender:
      return [...senderSidebarItems];
    case role.receiver:
      return [...receiverSidebarItems];
    default:
      return [];
  }
};

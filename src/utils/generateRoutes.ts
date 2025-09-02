import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebar: ISidebarItem[]) => {
  return sidebar.flatMap((section) =>
    section.items
      // .filter((item) => !item.hidden)
      .map((route) => ({
        path: route.url,
        Component: route.component,
      }))
  );
};

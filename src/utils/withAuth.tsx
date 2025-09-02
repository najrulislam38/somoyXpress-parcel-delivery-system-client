import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole: TRole[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const userRole = data?.data?.role;

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    // if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
    //   return <Navigate to={"/unauthorized"} />;
    // }

    if (
      !isLoading &&
      requiredRole.length > 0 &&
      !requiredRole.includes(userRole)
    ) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};

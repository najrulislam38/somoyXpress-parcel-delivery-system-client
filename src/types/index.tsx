import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IAuthProvider {
  provider: "google" | "credentials" | "on_hand";
  providerId: string;
}

export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MERCHANT: "SENDER",
  RECEIVER: "RECEIVER",
} as const;

export interface IUser {
  name: string;
  email: string;
  age?: number;
  gender?: "Male" | "Female" | "Others";
  password?: string;
  role: UserRole;
  phone: string;
  address?: string;
  isBlocked?: boolean;
  auths: IAuthProvider[];
  picture?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
}

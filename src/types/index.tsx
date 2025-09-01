import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface ISidebarItem {
  title: string;
  items: {
    title?: string;
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
  _id?: string;
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

// export enum ParcelStatus {
//   REQUESTED = "REQUESTED",
//   APPROVED = "APPROVED",
//   DISPATCH = "DISPATCH",
//   IN_TRANSIT = "IN_TRANSIT",
//   DELIVERED = "DELIVERED",
//   CANCELLED = "CANCELLED",
//   RETURNED = "RETURNED",
// }

export type ParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCH"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type DeliveryType = {
  Normal_Delivery: "Normal Delivery";
  Hub_Delivery: "Hub Delivery";
};

export interface IStatusLog {
  status: ParcelStatus;
  location: string;
  timestamp: Date;
  updatedBy?: string;
  note?: string;
}

export interface IParcel {
  _id?: string;
  trackingId: string;
  sender: string;
  receiver: string;
  pickupAddress: string;
  deliveryAddress: string;
  weight: number;
  amountCollect: number;
  deliveryFee: number;
  description?: string;
  currentStatus: ParcelStatus;
  deliveryTypes: DeliveryType;
  statusLogs: IStatusLog[];
  isBlocked: boolean;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
}

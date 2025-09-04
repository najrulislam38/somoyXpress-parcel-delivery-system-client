/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCancelParcelMutation,
  useDeleteParcelMutation,
  useGetParcelDetailsQuery,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcel/parcel.api";
import { ArrowLeft, Package, User, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { CancelParcel } from "./CancelParcel";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { UserRole } from "@/types";
import UpdateStatus from "../Admin/UpdateStatus";
import { DeleteParcel } from "./DeleteParcel";
import { ConfirmParcel } from "./ConfirmParcel";

export default function ParcelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cancelParcel] = useCancelParcelMutation();
  const [deleteParcel] = useDeleteParcelMutation();
  const [confirmParcel] = useDeleteParcelMutation();
  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const { data: user } = useUserInfoQuery(undefined);

  const { data, isLoading, isError } = useGetParcelDetailsQuery(id as string);
  const parcel = data?.data;

  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Parcel Cancelling");
    try {
      const res = await cancelParcel(id);

      if (res?.data?.success) {
        toast.success("Parcel Cancelled successfully", { id: toastId });
      } else {
        toast.error("Parcel Cancelled fail", { id: toastId });
      }
    } catch (error: any) {
      toast.error(`Parcel Cancelled  Failed ${error.message}`, { id: toastId });
    }
  };

  const handleConfirmParcel = async (id: string) => {
    const toastId = toast.loading("Parcel Cancelling");
    try {
      const res = await confirmParcel(id);

      if (res?.data?.success) {
        toast.success("Parcel Received successfully", { id: toastId });
      } else {
        toast.error("Parcel Received fail", { id: toastId });
      }
    } catch (error: any) {
      toast.error(`Parcel Received  Failed ${error.message}`, { id: toastId });
    }
  };

  const handleDeleteParcel = async (id: string) => {
    const toastId = toast.loading("Parcel Deleting");
    try {
      const res = await deleteParcel(id);

      if (res?.data?.success) {
        toast.success("Parcel Deleted successfully", { id: toastId });
        navigate(-1);
      } else {
        toast.error("Parcel Deleted fail", { id: toastId });
      }
    } catch (error: any) {
      toast.error(`Parcel Deleted  Failed ${error.message}`, { id: toastId });
    }
  };

  const handleStatusChange = async (data: any) => {
    if (!id) return;
    const { newStatus, note, location } = data;

    const toastId = toast.loading("Updating status...");

    const parcelUpdateStatusInfo = {
      status: newStatus,
      location,
      note,
    };

    try {
      const res = await updateParcelStatus({
        id,
        statusInfo: parcelUpdateStatusInfo,
      }).unwrap();

      toast.success(`Status updated to ${res.data.currentStatus}`, {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(`Failed to update status: ${error.message}`, { id: toastId });
    }
  };

  if (isLoading) {
    return <Skeleton height={200} />;
  }

  if (isError || !parcel) {
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load parcel details!
      </p>
    );
  }

  if (isLoading)
    return (
      <div className="p-6 max-w-3xl mx-auto">
        {/* Back button skeleton */}
        <div className="mb-6">
          <Skeleton width={120} height={20} />
        </div>

        {/* Card skeleton */}
        <div className="border border-gray-200 rounded-2xl shadow-sm bg-white p-6 space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton width={180} height={24} />
            <Skeleton width={100} height={24} borderRadius={50} />
          </div>

          {/* Info Grid skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton width={120} height={20} />
              <Skeleton count={3} height={18} />
            </div>
            <div className="space-y-3">
              <Skeleton width={120} height={20} />
              <Skeleton count={3} height={18} />
            </div>
          </div>

          {/* Parcel Info skeleton */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <Skeleton width={120} height={20} />
            <Skeleton count={3} height={18} />
          </div>
        </div>
      </div>
    );

  if (isError || !parcel)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load parcel details!
      </p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeft size={18} />
        Back to Parcels
      </button>

      {/* Card */}
      <div className="border border-gray-200 rounded-2xl shadow-sm bg-accent p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="text-primary" /> {parcel.trackingId}
          </h2>
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              parcel.currentStatus === "DELIVERED"
                ? "bg-green-100 text-green-700"
                : parcel.currentStatus === "IN_TRANSIT"
                ? "bg-indigo-100 text-indigo-700"
                : parcel.currentStatus === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {parcel.currentStatus}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 ">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={18} /> Sender Info
            </h3>
            <p>
              <span className="font-medium">Name:</span> {parcel.sender?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {parcel.sender?.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {parcel.pickupAddress}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={18} /> Receiver Info
            </h3>
            <p>
              <span className="font-medium">Name:</span> {parcel.receiver?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {parcel.receiver?.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {parcel.deliveryAddress}
            </p>
          </div>
        </div>

        {/* Parcel Info */}
        <div className="border-t border-foreground  pt-6 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Truck size={18} /> Parcel Info
          </h3>
          <p>
            <span className="font-medium">Weight:</span> {parcel.weight} kg
          </p>
          <p>
            <span className="font-medium">Amount Collect:</span> ৳{" "}
            {parcel.amountCollect}
          </p>
          <p>
            <span className="font-medium">Delivery Fee:</span> ৳{" "}
            {parcel.deliveryFee}
          </p>
          <p>
            <span className="font-medium">Expected Delivery:</span>{" "}
            {parcel.expectedDeliveryDate
              ? new Date(parcel.expectedDeliveryDate).toLocaleDateString()
              : "After " + new Date().getDate() + " Days"}
          </p>
          {parcel?.description && (
            <p>
              <span className="font-medium">Description: </span>{" "}
              {parcel.description}
            </p>
          )}
        </div>
        <div className="my-10 flex justify-evenly items-center ">
          <div>
            {user?.data?.role !== UserRole.RECEIVER &&
              parcel?.currentStatus !== "CANCELLED" &&
              parcel?.currentStatus !== "DELIVERED" &&
              parcel?.currentStatus !== "IN_TRANSIT" &&
              parcel?.currentStatus !== "RETURNED" &&
              parcel?.currentStatus !== "DISPATCH" && (
                <CancelParcel
                  onConfirm={() => parcel._id && handleCancel(parcel._id)}
                >
                  <Button className="bg-chart-3 text-background hover:bg-chart-2 duration-300 transition ">
                    Cancel Parcel
                  </Button>
                </CancelParcel>
              )}
          </div>
          <div>
            {user?.data?.role !== UserRole.RECEIVER &&
              parcel?.currentStatus !== "DISPATCH" &&
              parcel?.currentStatus !== "IN_TRANSIT" &&
              parcel?.currentStatus !== "RETURNED" &&
              parcel?.currentStatus !== "DELIVERED" && (
                <DeleteParcel
                  onConfirm={() => parcel._id && handleDeleteParcel(parcel._id)}
                >
                  <Button
                    variant={"destructive"}
                    className="duration-300 transition "
                  >
                    Delete Parcel
                  </Button>
                </DeleteParcel>
              )}
          </div>
          <div>
            {user?.data.role === UserRole.SUPER_ADMIN ||
            user?.data?.role === UserRole.ADMIN ? (
              <UpdateStatus
                currentStatus={parcel?.currentStatus}
                handleStatusChange={handleStatusChange}
              />
            ) : (
              ""
            )}
          </div>

          {/* Confirm Parcel for Receiver */}
          <div>
            {user?.data?.role === UserRole.RECEIVER &&
              parcel?.currentStatus !== "DELIVERED" && (
                <ConfirmParcel
                  onConfirm={() =>
                    parcel._id && handleConfirmParcel(parcel._id)
                  }
                >
                  <Button
                    variant={"destructive"}
                    className="duration-300 transition "
                  >
                    Confirm Parcel
                  </Button>
                </ConfirmParcel>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

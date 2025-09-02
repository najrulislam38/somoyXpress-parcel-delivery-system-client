import { useGetParcelDetailsQuery } from "@/redux/features/parcel/parcel.api";
import { ArrowLeft, Package, User, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ParcelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetParcelDetailsQuery(id as string);
  const parcel = data?.data;

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
            <span className="font-medium">Amount Collect:</span> $
            {parcel.amountCollect}
          </p>
          <p>
            <span className="font-medium">Expected Delivery:</span>{" "}
            {parcel.expectedDeliveryDate
              ? new Date(parcel.expectedDeliveryDate).toLocaleDateString()
              : "After " + new Date().getDate() + " Days"}
          </p>
        </div>
      </div>
    </div>
  );
}

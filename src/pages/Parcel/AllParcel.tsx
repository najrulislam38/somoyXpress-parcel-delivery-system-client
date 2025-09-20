/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import { UserRole, type IParcel, type ParcelStatus } from "@/types";
import { useState } from "react";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllParcel() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const { data: user } = useUserInfoQuery(undefined);
  const { data, isLoading, isError } = useGetAllParcelQuery({
    page: currentPage,
    limit,
    currentStatus: status,
  });
  const parcels = data?.data || [];

  const [filterStatus, setFilterStatus] = useState<ParcelStatus | "ALL">("ALL");

  const totalPage = data?.meta?.totalPage || 1;

  const filteredParcels =
    filterStatus === "ALL"
      ? parcels
      : parcels.filter((p: any) => p.currentStatus === filterStatus);

  const statusColors: Record<ParcelStatus, string> = {
    REQUESTED: "bg-yellow-100 text-yellow-800",
    IN_TRANSIT: "bg-indigo-100 text-indigo-800",
    APPROVED: "bg-blue-100 text-blue-800",
    DISPATCH: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    RETURNED: "bg-red-100 text-red-800",
  };

  if (isError) {
    return <p className="text-center mt-10">Failed to load parcels!</p>;
  }

  return (
    <div>
      <div className="mb-6 gap-4">
        {/* <h2 className="text-2xl font-bold">
              Total Parcels:{" "}
              <span className="text-primary">
                {isLoading ? <Skeleton width={30} /> : parcels.length}
              </span>
            </h2> */}

        <div className="flex items-center gap-2">
          <label className="font-medium">Filter by Status:</label>
          <select
            className="border border-gray-300 dark:bg-accent dark:text-white rounded-md px-3 py-1"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as ParcelStatus | "ALL");
              setStatus(e.target.value === "ALL" ? undefined : e.target.value);
              setCurrentPage(1);
            }}
            disabled={isLoading}
          >
            <option value="ALL">All</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!isLoading && parcels?.length < 1 ? (
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-center">
            No Parcel available
          </h1>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl shadow-sm p-5 bg-white"
                  >
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <Skeleton width={120} height={20} />
                      <Skeleton width={80} height={20} borderRadius={12} />
                    </div>
                    <div className="space-y-2">
                      <Skeleton height={15} />
                      <Skeleton height={15} />
                      <Skeleton height={15} />
                      <Skeleton height={15} />
                      <Skeleton height={15} />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <Skeleton width={60} height={15} />
                      <Skeleton width={80} height={32} />
                    </div>
                  </div>
                ))
              : filteredParcels?.map((parcel: Partial<IParcel>) => (
                  <div
                    key={parcel.trackingId}
                    className="border border-accent-foreground rounded-lg shadow-sm p-5 bg-accent hover:shadow-lg transition"
                  >
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {parcel.trackingId}
                      </h3>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          parcel.currentStatus
                            ? statusColors[parcel.currentStatus]
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {parcel.currentStatus}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-foreground space-y-1">
                      <p>
                        <span className="font-medium">Sender:</span>{" "}
                        {typeof parcel?.sender === "object" &&
                        parcel?.sender !== null &&
                        "name" in parcel.sender
                          ? (parcel.sender as { name?: string }).name || "NA"
                          : typeof parcel?.sender === "string"
                          ? parcel.sender
                          : "NA"}
                      </p>
                      <p>
                        <span className="font-medium">Receiver:</span>{" "}
                        {typeof parcel?.receiver === "object" &&
                        parcel?.receiver !== null &&
                        "name" in parcel.receiver
                          ? (parcel.receiver as { name?: string }).name || "NA"
                          : typeof parcel?.receiver === "string"
                          ? parcel.receiver
                          : "NA"}
                      </p>
                      <p>
                        <span className="font-medium">Pickup:</span>{" "}
                        {parcel.pickupAddress}
                      </p>
                      <p>
                        <span className="font-medium">Delivery:</span>{" "}
                        {parcel.deliveryAddress}
                      </p>
                      <p>
                        <span className="font-medium">Weight:</span>{" "}
                        {parcel.weight} kg
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span> $
                        {parcel.amountCollect}
                      </p>
                      {parcel.expectedDeliveryDate && (
                        <p>
                          <span className="font-medium">
                            Expected Delivery:
                          </span>{" "}
                          {new Date(
                            parcel.expectedDeliveryDate
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span
                        className={`text-xs font-semibold ${
                          parcel.isBlocked ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {parcel.isBlocked ? "Blocked" : "Active"}
                      </span>
                      <Link
                        to={
                          user?.data?.role === UserRole.MERCHANT
                            ? `/sender/parcel/${parcel._id}`
                            : user?.data?.role === UserRole.RECEIVER
                            ? `/receiver/parcel/${parcel._id}`
                            : `/admin/parcel/${parcel._id}`
                        }
                      >
                        <Button disabled={!parcel._id}>View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
      {totalPage > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

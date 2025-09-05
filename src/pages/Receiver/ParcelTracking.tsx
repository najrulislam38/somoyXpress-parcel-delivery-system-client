import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetParcelTrackingQuery } from "@/redux/features/parcel/parcel.api";
import type { ParcelStatus } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  trackingId: z.string().min(3, "Tracking ID is required"),
});

const steps: { key: ParcelStatus; label: string; icon: React.ReactNode }[] = [
  {
    key: "REQUESTED",
    label: "Requested",
    icon: <Package className="w-5 h-5" />,
  },
  {
    key: "APPROVED",
    label: "Approved",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  { key: "DISPATCH", label: "Dispatched", icon: <Truck className="w-5 h-5" /> },
  {
    key: "IN_TRANSIT",
    label: "In Transit",
    icon: <Truck className="w-5 h-5 animate-bounce" />,
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    key: "CANCELLED",
    label: "Cancelled",
    icon: <XCircle className="w-5 h-5" />,
  },
  {
    key: "RETURNED",
    label: "Returned",
    icon: <RotateCcw className="w-5 h-5" />,
  },
];

export function ParcelTracker() {
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { trackingId: "" },
  });

  const {
    data: parcel,
    isFetching,
    isLoading,
    isError,
  } = useGetParcelTrackingQuery(trackingId!, {
    skip: !trackingId,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTrackingId(values.trackingId);
  }

  return (
    <div className="w-full container mx-auto p-4 space-y-6">
      {/* Search Form */}
      <Card className="rounded-2xl w-full max-w-2xl mx-auto shadow-lg border bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Track Your Parcel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="trackingId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Enter Tracking ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isFetching}>
                {isFetching ? "Tracking..." : "Track"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Loader Skeleton */}
      {isLoading && (
        <Card className="rounded-2xl shadow-xl border p-6 space-y-4">
          <Skeleton className="h-6 w-1/3 mx-auto" />
          <Skeleton className="h-4 w-1/4 mx-auto" />
          <div className="space-y-6 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Error */}
      {isError && (
        <Card className="rounded-2xl shadow-md border">
          <CardContent className="p-4 my-12 text-center ">
            <h3 className="text-lg font-medium">❌ No Result found.</h3>
            <p className="text-muted-foreground mt-3">
              We can’t find any results based on your search.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tracking Timeline */}
      {!isError && parcel && (
        <Card className="rounded-2xl shadow-xl border bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Parcel Status</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tracking ID: {parcel?.data?.trackingId}
            </p>
            {parcel?.data?.expectedDate && (
              <p className="text-xs text-muted-foreground">
                Expected Delivery: {parcel?.data?.expectedDate}
              </p>
            )}
          </CardHeader>

          <CardContent className="mt-6">
            <div className="relative flex gap-6 flex-wrap space-y-6">
              {steps.map((step, idx) => {
                const isActive = step.key === parcel?.data?.currentStatus;
                const isCompleted =
                  steps.findIndex(
                    (s) => s.key === parcel?.data?.currentStatus
                  ) > idx;

                return (
                  <div key={step.key} className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-md transition-all",
                        isCompleted &&
                          "bg-green-500 border-green-500 text-white",
                        isActive &&
                          "bg-blue-600 border-blue-600 text-white animate-pulse",
                        !isCompleted &&
                          !isActive &&
                          "bg-gray-200 border-gray-300 text-gray-500"
                      )}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-medium",
                          isCompleted && "text-green-600",
                          isActive && "text-blue-600",
                          !isCompleted && !isActive && "text-gray-500"
                        )}
                      >
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="text-xs text-muted-foreground">
                          Your parcel is currently{" "}
                          <span className="font-semibold">{step.label}</span>.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Connector line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-300 dark:bg-gray-700 -z-10" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

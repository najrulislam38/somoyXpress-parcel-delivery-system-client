/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";

const COLORS = ["#4f46e5", "#16a34a", "#f97316", "#dc2626", "#0ea5e9"];

export default function Analytics() {
  const { data, isLoading } = useGetAllParcelQuery(undefined);
  const parcels = useMemo(() => data?.data ?? [], [data]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = parcels.length;
    const delivered = parcels.filter(
      (p: IParcel) => p.currentStatus === "DELIVERED"
    ).length;
    const inTransit = parcels.filter(
      (p: IParcel) => p.currentStatus === "IN_TRANSIT"
    ).length;
    const cancelled = parcels.filter(
      (p: IParcel) => p.currentStatus === "CANCELLED"
    ).length;
    const returned = parcels.filter(
      (p: IParcel) => p.currentStatus === "RETURNED"
    ).length;

    return { total, delivered, inTransit, cancelled, returned };
  }, [parcels]);

  // Revenue grouping
  const monthlyRevenue = useMemo(() => {
    if (!parcels.length) return [];

    const map: Record<string, number> = {};
    parcels.forEach((p: any) => {
      if (!p.createdAt) return;
      const date = new Date(p.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      const revenue = p.deliveryFee ?? 0;
      map[month] = (map[month] || 0) + revenue;
    });

    const monthsOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthsOrder
      .filter((m) => map[m])
      .map((m) => ({
        month: m,
        revenue: map[m],
      }));
  }, [parcels]);

  // Pie chart data
  const parcelDistribution = [
    { name: "Delivered", value: stats.delivered },
    { name: "In Transit", value: stats.inTransit },
    { name: "Cancelled", value: stats.cancelled },
    { name: "Returned", value: stats.returned },
  ];

  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ChartSkeleton = () => (
    <Card className="shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <StatsSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-2">
            <Package className="text-indigo-600" />
            <CardTitle>Total Parcels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-2">
            <CheckCircle2 className="text-green-600" />
            <CardTitle>Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.delivered}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-2">
            <Truck className="text-orange-600" />
            <CardTitle>In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.inTransit}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <CardTitle>Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.cancelled}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center gap-2">
            <RefreshCcw className="text-blue-600" />
            <CardTitle>Returned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.returned}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Parcel Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={parcelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {parcelDistribution.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

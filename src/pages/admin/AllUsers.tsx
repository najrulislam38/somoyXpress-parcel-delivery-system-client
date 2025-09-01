import { DeleteConfirmation } from "@/components/Deleteconfirmation";
import { UpdateUserInfo } from "@/components/modules/Admin/UpdateUserModel";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PostProps {
  loading: boolean;
}

export default function AllUsers({ loading }: PostProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  const { data, isLoading } = useAllUsersQuery({
    page: currentPage,
    limit,
    role: roleFilter,
  });

  const totalPage = data?.meta?.totalPage || 1;

  const [deleteUser] = useDeleteUserMutation();

  const handleConfirm = async (id: string) => {
    const toastId = toast.loading("User Deleting");
    try {
      const res = await deleteUser({ id: id });

      if (res?.data?.success) {
        console.log(res);
        toast.success("User Deleted successfully", { id: toastId });
      } else {
        toast.error("Users Deleted Failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center flex-wrap mb-6">
          <h3 className="text-xl font-semibold">All Users</h3>

          {/* filter section */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold">Filter by Role:</h3>
            <div>
              <Select
                onValueChange={(val) => {
                  setRoleFilter(val === "ALL" ? undefined : val);
                  setCurrentPage(1);
                }}
                value={roleFilter ?? "ALL"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="SENDER">SENDER</SelectItem>
                  <SelectItem value="RECEIVER">RECEIVER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {data?.data?.length < 1 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-center">
              {" "}
              There are don't have any user
            </h2>
          </div>
        ) : (
          <div className="border border-muted rounded-md">
            {loading ? (
              <Skeleton />
            ) : (
              <Table className="text-center">
                <TableHeader>
                  {" "}
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <TableRow>
                      <TableHead className="text-center">SL No.</TableHead>
                      <TableHead className="text-center">Name</TableHead>
                      <TableHead className="text-center">Email</TableHead>
                      <TableHead className="text-center">Role</TableHead>
                      <TableHead className="text-center">Phone</TableHead>
                      <TableHead className="text-center">Address</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  )}
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item: Partial<IUser>, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {(currentPage - 1) * limit + (index + 1)}
                      </TableCell>
                      <TableCell>
                        {loading ? <Skeleton /> : item.name}
                      </TableCell>
                      <TableCell>
                        {loading ? <Skeleton /> : item.email}
                      </TableCell>
                      <TableCell>
                        {loading ? <Skeleton /> : item.role}
                      </TableCell>
                      <TableCell>
                        {loading ? <Skeleton /> : item.phone}
                      </TableCell>
                      <TableCell>
                        {item.address ? (
                          item.address
                        ) : (
                          <span className="text-chart-3">Unavailable</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className=" flex items-center justify-center gap-3 ">
                          <UpdateUserInfo userId={item?._id as string} />

                          {item?.isDeleted ? (
                            <span>Deleted</span>
                          ) : (
                            <DeleteConfirmation
                              onConfirm={() =>
                                item._id && handleConfirm(item._id)
                              }
                            >
                              <Button className="bg-accent hover:bg-chart-3 duration-300 transition ">
                                <Trash2 className="text-red-700 cursor-pointer " />
                              </Button>
                            </DeleteConfirmation>
                          )}
                        </div>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
    </>
  );
}

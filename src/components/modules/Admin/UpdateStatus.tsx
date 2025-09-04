/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  isValidStatusTransition,
  ParcelStatus,
} from "@/utils/statusChangerValidation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface StatusChangerProps {
  currentStatus: ParcelStatus;
  handleStatusChange: (newStatus: ParcelStatus) => void;
}

export default function UpdateStatus({
  currentStatus,
  handleStatusChange,
}: StatusChangerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<ParcelStatus>(currentStatus);

  //   // ✅ collect all statuses
  const allStatuses: ParcelStatus[] = Object.values(ParcelStatus);

  //   // ✅ filter valid transitions
  const validNextStatuses = allStatuses.filter((s) =>
    isValidStatusTransition(currentStatus, s)
  );

  const form = useForm({
    defaultValues: {
      newStatus: status,
      location: undefined,
      note: undefined,
    },
  });

  const onSubmit = (data: any) => {
    // console.log(data);

    const { newStatus } = data;

    setStatus(newStatus);
    handleStatusChange(data);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-chart-2 text-background hover:bg-chart-3 duration-300 transition"
          >
            {/* <Edit className="text-chart-3 cursor-pointer " /> */}
            Update Status
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Parcel Status Update
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form id="status-update" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-8 space-y-5">
                <FormField
                  control={form.control}
                  name="newStatus"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || status}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={currentStatus} disabled>
                              {" "}
                              {currentStatus}
                            </SelectItem>
                            {validNextStatuses.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Location"
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* note */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Hove Any Query? Enter here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {form.formState.isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"; // <-- make sure this exports your const + type
// import {
//   isValidStatusTransition,
//   ParcelStatus,
// } from "@/utils/statusChangerValidation";

// interface StatusSelectorProps {
//   currentStatus: ParcelStatus;
//   onStatusChange: (newStatus: ParcelStatus) => void;
// }

// export function ParcelStatusSelector({
//   currentStatus,
//   onStatusChange,
// }: StatusSelectorProps) {
//   const [status, setStatus] = useState<ParcelStatus>(currentStatus);

//   // ✅ collect all statuses
//   const allStatuses: ParcelStatus[] = Object.values(ParcelStatus);

//   // ✅ filter valid transitions
//   const validNextStatuses = allStatuses.filter((s) =>
//     isValidStatusTransition(currentStatus, s)
//   );

//   const handleChange = (value: string) => {
//     const newStatus = value as ParcelStatus;
//     setStatus(newStatus);
//     onStatusChange(newStatus);
//   };

//   return (
//     <div className="w-[220px]">
//       <Select value={status} onValueChange={handleChange}>
//         <SelectTrigger>
//           <SelectValue placeholder="Select status" />
//         </SelectTrigger>
//         <SelectContent>
//           {/* show current status but disabled */}
//           <SelectItem value={currentStatus} disabled>
//             {currentStatus}
//           </SelectItem>
//           {validNextStatuses.map((s) => (
//             <SelectItem key={s} value={s}>
//               {s}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

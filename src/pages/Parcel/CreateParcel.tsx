/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import { UserRole, type IParcel } from "@/types";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { format, formatISO } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
const deliveryTypeOptions = [
  { value: "Normal Delivery", label: "Normal Delivery" },
  { value: "Hub Delivery", label: "Hub Delivery" },
];

// Zod schema
const createParcelZodSchema = z.object({
  receiver: z.string().min(3, "Receiver identifier is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  weight: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((n) => !Number.isNaN(n) && n > 0, {
      message: "Weight must be a positive number",
    }),
  amountCollect: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((n) => !Number.isNaN(n) && n >= 0, {
      message: "Amount must be a non-negative number",
    }),

  description: z.string().max(1000).optional(),

  deliveryType: z.enum(["Normal Delivery", "Hub Delivery"]),
  expectedDeliveryDate: z.date({ message: "End date is required" }),
  actualDeliveryDate: z.date({ message: "End date is required" }),
});

export default function CreateParcel() {
  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const { data: receiverRoleData } = useGetAllUsersQuery({
    role: UserRole.RECEIVER,
  });

  const roleOptions = receiverRoleData?.data?.map(
    (item: { _id: string; name: string; address: string }) => ({
      label: item.name,
      value: item._id,
      address: item?.address,
    })
  );

  const form = useForm<z.input<typeof createParcelZodSchema>>({
    resolver: zodResolver(createParcelZodSchema),
    defaultValues: {
      receiver: "",
      pickupAddress: "",
      deliveryAddress: "",
      weight: 0,
      amountCollect: 0,
      description: "",
      deliveryType: "Normal Delivery",
      expectedDeliveryDate: undefined,
    },
  });

  const onSubmit = async (values: z.input<typeof createParcelZodSchema>) => {
    const toastId = toast.loading("Parcel Creating");

    const parcelInfo: Partial<IParcel> = {
      receiver: values?.receiver,
      deliveryTypes: values.deliveryType as "Normal Delivery" | "Hub Delivery",
      pickupAddress: values?.pickupAddress,
      deliveryAddress: values?.deliveryAddress,
      amountCollect: Number(values?.amountCollect),
      weight: Number(values?.weight),
      expectedDeliveryDate: values?.expectedDeliveryDate
        ? formatISO(values.expectedDeliveryDate)
        : undefined,
      actualDeliveryDate: values?.actualDeliveryDate
        ? formatISO(values.actualDeliveryDate)
        : undefined,
      description: values?.description,
    };

    try {
      const res = await createParcel(parcelInfo).unwrap();

      if (res?.success) {
        toast.success("Parcel Created successfully", { id: toastId });
        form.reset();
      } else {
        toast.error("Parcel Created Failed", { id: toastId });
      }
    } catch (err: any) {
      console.error("Failed to create parcel:", err);
      toast.error(`Failed to create parcel  #${err.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Parcel</h1>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 grid-cols-1 md:grid-cols-2"
          >
            {/* Receiver */}
            <FormField
              control={form.control}
              name="receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Receiver Name<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions?.map(
                          (item: { value: string; label: string }) => (
                            <SelectItem key={item.value} value={item.value}>
                              {`${item.label} & Id: ${item.value}`}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Type */}
            <FormField
              control={form.control}
              name="deliveryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Delivery Type<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pickup Address */}
            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pickup Address<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Pickup address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Address */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Delivery Address<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Delivery address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Weight (kg)<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min={0}
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Collect */}
            <FormField
              control={form.control}
              name="amountCollect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount Collect<span className="text-primary">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expected Delivery Date */}
            <FormField
              control={form.control}
              name="expectedDeliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Expected Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* actualDeliveryDate */}
            <FormField
              control={form.control}
              name="actualDeliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Actual Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (full width) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Note / Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Extra notes (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons (span full width) */}
            <div className="md:col-span-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => form.reset()}
                className={cn("border")}
              >
                Reset
              </Button>

              <Button type="submit">
                {isLoading ? "Creating..." : "Create Parcel"}
                {/* Create Parcel */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

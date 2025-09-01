import Loader from "@/components/Loader";
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
} from "@/components/ui/select";
import {
  useSingleUserInfoQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { Edit } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "Enter a valid Bangladeshi number (e.g. 01XXXXXXXXX or +8801XXXXXXXXX)"
    )
    .optional()
    .or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  age: z.string().optional().or(z.literal("")),
  gender: z.enum(["Male", "Female", "Others"]).optional(),
  isBlocked: z.enum(["true", "false"]),
  picture: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isVerified: z.enum(["true", "false"]),
});

export function UpdateUserInfo({ userId }: { userId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const { data: user, isLoading, isError } = useSingleUserInfoQuery(userId);

  const form = useForm<z.infer<typeof userZodSchema>>({
    resolver: zodResolver(userZodSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      gender: undefined,
      isBlocked: "false",
      picture: "",
      isVerified: "false",
    },
  });

  useEffect(() => {
    if (user?.data) {
      form.reset({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user?.data?.phone || "",
        address: user?.data?.address || "",
        age: user?.data?.age || "",
        gender: user?.data?.gender || "",
        isBlocked: user?.data?.isBlocked || "",
        picture: user?.data?.picture || "",
        isVerified: user?.data?.isVerified || "",
      });
    }
  }, [user, form, isModalOpen]);

  // Debug: log form errors
  //   useEffect(() => {
  //     if (Object.keys(form.formState.errors).length > 0) {
  //       console.log("Form validation errors:", form.formState.errors);
  //     }
  //   }, [form.formState.errors]);

  const onSubmit = async (data: z.infer<typeof userZodSchema>) => {
    const toastId = toast.loading("Users data updating");
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      address: data.address || undefined,
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || undefined,
      picture: data.picture || undefined,
      isVerified: data.isVerified === "true",
      isBlocked: data.isBlocked === "true",
    };

    try {
      // Your API call here
      // const res = await updateUser(userId, userInfo);

      const res = await updateUserInfo({ id: userId, userInfo });

      if (res?.data?.success) {
        console.log(res);
        toast.success("Users Data Updated", { id: toastId });
        setIsModalOpen(false);
        form.reset();
      } else {
        toast.error("Users Data Failed", { id: toastId });
      }

      //   setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed", { id: toastId });
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load user data</p>;
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-chart-2 duration-300 transition "
        >
          <Edit className="text-chart-3 cursor-pointer " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center">Update User Data</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="update-user-info" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className=" md:flex gap-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} readOnly />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" md:flex gap-10">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" md:flex gap-10">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value || ""}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={
                            field.value !== undefined ? String(field.value) : ""
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SENDER">SENDER</SelectItem>
                              <SelectItem value="RECEIVER">RECEIVER</SelectItem>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
              </div>
              <div className=" md:flex gap-10">
                <FormField
                  control={form.control}
                  name="isVerified"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Verified</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={
                            field.value !== undefined ? String(field.value) : ""
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"false"}>Unverified</SelectItem>
                            <SelectItem value="true">Verified</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isBlocked"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Blocked</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={
                            field.value !== undefined ? String(field.value) : ""
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select block or unblock" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"false"}>Unblocked</SelectItem>
                            <SelectItem value="true">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
  );
}

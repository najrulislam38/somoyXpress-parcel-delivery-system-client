/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lock, Mail, MapPin, Phone, User } from "lucide-react";
import type React from "react";
import { z } from "zod";
import icon from "./../../../assets/icons/web-icon.png";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/Password";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { UserRole } from "@/types";

const registerSchema = z
  .object({
    name: z.string().min(3, { error: "Name is to short" }).max(50).trim(),
    email: z.email(),
    phone: z
      .string()
      .trim()
      // strip spaces/dashes/parentheses etc. but keep leading +
      .transform((v) => v.replace(/[^\d+]/g, ""))
      .refine((v) => /^(?:\+?8801|01)[3-9]\d{8}$/.test(v), {
        message:
          "Invalid Bangladeshi mobile number. Use 01XXXXXXXXX or +8801XXXXXXXXX.",
      }),
    address: z.string({ error: "Address must be submit" }),
    password: z
      .string()
      .min(8, { error: "Password must have 8 characters" })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must have 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    // console.log(data);
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      role: UserRole.MERCHANT,
    };

    try {
      const result = await register(userInfo).unwrap();
      // console.log(result);
      if (result.success) {
        toast.success("Login successful.");
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error);
      if (error.data.message === "Password didn't matched") {
        toast.error("Invalid Password");
      }

      if (error.data.message === "User is not verified") {
        toast.error("Your account is not verify");
      }
    }
  };
  return (
    <div
      className={cn(" max-w-[400px] mx-auto flex flex-col gap-6", className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-16 bg-chart-2 rounded-full p-3">
          <img src={icon} alt="" className="w-full" loading="lazy" />
        </div>
        <h1 className="text-2xl font-bold">Merchant Registration </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${className} space-y-5`}
            {...props}
          >
            <div className="relative">
              <User className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        type="text"
                        className="pl-9 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="pl-9"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <Phone className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone no"
                        type="text"
                        className="pl-9"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        type="text"
                        className="pl-9"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <Lock className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} className="pl-9" />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your secret password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <Lock className="absolute text-sidebar-accent-foreground left-1.5 bottom-1.5 opacity-75" />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password {...field} className="pl-9" />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your secret confirm password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Link
                to={""}
                className="text-xs font-medium text-muted-foreground hover:underline cursor-pointer "
              >
                Forget Password
              </Link>
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Log In
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="underline font-semibold text-primary underline-offset-4"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

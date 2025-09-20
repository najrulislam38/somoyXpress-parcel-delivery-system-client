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
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { UserRole } from "@/types";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

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
  const { pathname } = useLocation();
  const { data: user } = useUserInfoQuery(undefined);

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
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      role:
        pathname === "/register/agent" ? UserRole.RECEIVER : UserRole.MERCHANT,
    };

    console.log(userInfo);

    try {
      const result = await register(userInfo).unwrap();

      if (result.success) {
        toast.success("Register successfully.");
        if (pathname === "/register/agent") {
          navigate("/login/agent");
        } else {
          navigate("/login");
        }
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

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      className={cn(" max-w-[400px] mx-auto flex flex-col gap-6", className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-16 bg-chart-2 rounded-full p-3">
          <img src={icon} alt="" className="w-full" loading="lazy" />
        </div>
        <h1 className="text-2xl font-bold">
          {pathname === "/register"
            ? "Merchant Registration "
            : "Agent Registration"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information to create your{" "}
          {pathname === "/register" ? "Merchant" : "Agent"} account
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
      {pathname === "/register/agent" ? (
        <div className="text-center text-sm">
          Already have an Agent account?{" "}
          <Link
            to={"/login/agent"}
            className="hover:underline font-semibold text-primary underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <div className="text-center text-sm">
          Already have a Merchant account?{" "}
          <Link
            to={"/login"}
            className="underline font-semibold text-primary underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      )}
      <div className="text-center mt-5">
        {pathname !== "/register/agent" ? (
          <Link to={"/register/agent"}>
            <Button className=" bg-chart-2 hover:bg-chart-3 transition duration-300">
              Be A Agent
            </Button>
          </Link>
        ) : (
          <Link to={"/register"}>
            <Button className=" bg-chart-2 hover:bg-chart-3 transition duration-300">
              Be a Merchant
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

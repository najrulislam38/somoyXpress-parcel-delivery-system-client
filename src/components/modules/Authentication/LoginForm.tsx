/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Password from "@/components/ui/Password";

import icon from "./../../../assets/icons/web-icon.png";
import { Lock, Mail } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Password must have 8 characters." }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);

    try {
      const result = await login(userInfo).unwrap();
      // console.log(result);
      if (result.success) {
        toast.success("Login successful.");
        navigate("/");
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
      className={cn(
        " max-w-[500px] mx-auto flex flex-col gap-6 mt-10 md:mt-20",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-16 bg-chart-2 rounded-full p-3">
          <img src={icon} alt="" className="w-full" loading="lazy" />
        </div>
        <h1 className="text-2xl font-bold mt-4">Merchant Login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
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
                      This is your public display name.
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
                      This is your public display name.
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
        Don&apos;t have an account?{" "}
        <Link
          to={"/register"}
          className="underline underline-offset-4 text-primary"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

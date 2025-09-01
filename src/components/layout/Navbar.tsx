import UserMenu from "@/components/ui/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggler } from "./ModeToggler";
import { Link } from "react-router";
import Logo from "../ui/logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import React from "react";
import { role } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  // { href: "/services", label: "Services", role: "PUBLIC" },
  { href: "/contact-us", label: "Contact Us", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "dashboard", role: role.admin },
  { href: "/admin", label: "dashboard", role: role.superAdmin },
  { href: "/sender", label: "dashboard", role: role.sender },
  { href: "/user", label: "dashboard", role: role.receiver },
];

export default function Navbar() {
  const { data: user } = useUserInfoQuery(undefined);

  return (
    <header className=" w-full bg-background fixed top-0 border-b px-4 z-10 md:px-6">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <React.Fragment key={index}>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === user?.data?.role && (
                          <NavigationMenuItem key={index}>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </React.Fragment>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <a href="/" className="text-primary hover:text-primary/90">
                <Logo />
              </a>
              {/* Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      {link.role === "PUBLIC" && (
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                      {link.role === user?.data?.role && (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </React.Fragment>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <ModeToggler />
            {user?.data?.email ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Info menu */}
                  {/* <InfoMenu /> */}
                  {/* Notification */}
                  {/* <NotificationMenu /> */}
                </div>
                {/* User menu */}
                <UserMenu user={user} />
              </div>
            ) : (
              <div>
                <Button className="cursor-pointer">
                  <Link to={"/login"}>Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import banner from "../../../assets/images/banner-image.png";
import { LogIn } from "lucide-react";
import { Link } from "react-router";
import "./HeroSection.css";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function HeroSection() {
  const { data } = useUserInfoQuery(undefined);
  return (
    <div className="bg-accent  min-h-screen">
      <div className="container mx-auto ">
        <div className=" w-full  lg:flex items-center  justify-between gap-10 px-6">
          <div className="w-full h-screen flex flex-col justify-center  lg:w-2/5 ">
            <div className=" ">
              <h1 className="text-4xl md:text-5xl font-bold [text-shadow:1px_1px_1px_rgba(0,0,0,0.5)] leading-snug ">
                We{" "}
                <mark className="bg-transparent text-primary italic">
                  Deliver
                </mark>
                <br />
                Parcel on Time with no Hassle
              </h1>
              <p className="py-6 md:py-10 text-foreground ">
                “From your doorstep to anywhere in Bangladesh — safe, on time,
                every time.”
              </p>
              {data?.data?.email ? (
                <div>
                  <Button className="merchant uppercase py-5  group relative w-fit">
                    <Link to={"/"}>Explore Parcel</Link>
                  </Button>
                </div>
              ) : (
                <div className=" flex flex-col gap-5">
                  <Button className="merchant uppercase py-6 pl-2 group relative pr-12 w-fit">
                    <Link to={"/login"}>
                      Become a Merchant
                      <LogIn className="transition-all  top-4 right-7 duration-500 absolute  group-hover:right-5" />
                    </Link>
                  </Button>

                  <Button className="bg-accent-foreground uppercase py-6 pl-2  hover:bg-accent-foreground/90 transition-all group pr-5 dark:text-black  w-fit">
                    <Link to={"/login"} className="flex gap-1">
                      <span>Earn With Us</span>
                      <LogIn className="transition-all duration-500 group-hover:ml-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full p-5 hidden lg:block lg:w-3/5">
            <div className="w-full h-full rounded z-5 bg-[#1E93AB]"></div>
            <img
              src={banner}
              alt="Hero Image"
              className="
                banner-image
                "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

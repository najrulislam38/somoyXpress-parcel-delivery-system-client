import { Button } from "@/components/ui/button";
import banner from "../../../assets/images/banner-image.png";
import { LogIn } from "lucide-react";
import { Link } from "react-router";
import "./HeroSection.css";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { easeInOut, motion } from "motion/react";

export default function HeroSection() {
  const { data } = useUserInfoQuery(undefined);

  // Variants for staggered animations
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeInOut },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeInOut },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: easeInOut } },
  };

  return (
    <div className="bg-destructive min-h-screen">
      <div className="container mx-auto">
        <div className="w-full lg:flex items-center justify-between gap-10 px-6">
          {/* Left Section */}
          <motion.div
            className="w-full h-screen flex flex-col justify-center lg:w-2/5"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold [text-shadow:1px_1px_1px_rgba(0,0,0,0.5)] leading-snug"
            >
              We{" "}
              <mark className="bg-transparent text-primary italic">
                Deliver
              </mark>
              <br />
              Parcel on Time with no Hassle
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="py-6 md:py-10 text-foreground"
            >
              “From your doorstep to anywhere in Bangladesh — safe, on time,
              every time.”
            </motion.p>

            {data?.data?.email ? (
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button className="merchant uppercase py-5 group relative w-fit">
                  <Link to={"/"}>Explore Parcel</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col gap-5"
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button className="merchant uppercase py-6 pl-2 group relative pr-12 w-fit">
                    <Link to={"/login"}>
                      Become a Merchant
                      <LogIn className="transition-all top-4 right-7 duration-500 absolute group-hover:right-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button className="bg-accent-foreground uppercase py-6 pl-2 hover:bg-accent-foreground/90 transition-all group pr-5 dark:text-black w-fit">
                    <Link to={"/login"} className="flex gap-1">
                      <span>Earn With Us</span>
                      <LogIn className="transition-all duration-500 group-hover:ml-3" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Section - Banner */}
          <motion.div
            className="w-full p-5 hidden lg:block lg:w-3/5"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full h-full rounded z-5 bg-[#1E93AB]"></div>
            <motion.img
              src={banner}
              alt="Hero Image"
              className="banner-image"
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

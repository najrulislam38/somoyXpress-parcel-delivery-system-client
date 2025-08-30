import FAQSection from "@/components/modules/Home/FAQSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import OurServices from "@/components/modules/Home/OurServices";
import Stay from "@/components/modules/Home/Stay";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className=" hidden lg:block lg:relative">
        <Stay />
      </div>
      <OurServices />
      <FAQSection />
    </div>
  );
}

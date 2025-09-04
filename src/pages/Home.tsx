import BusinessPartners from "@/components/modules/Home/BusinessPartners";
import FAQSection from "@/components/modules/Home/FAQSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import OurServices from "@/components/modules/Home/OurServices";
import Stay from "@/components/modules/Home/Stay";
import { ParcelTracker } from "./Receiver/ParcelTracking";
import Header from "@/hooks/Header";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className=" hidden lg:block lg:relative">
        <Stay />
      </div>
      <OurServices />
      <div className="py-20">
        <Header title="Shipment Tracking" />
        <ParcelTracker />
      </div>
      <BusinessPartners />
      <FAQSection />
    </div>
  );
}

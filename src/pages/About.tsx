import AboutSection from "@/components/modules/About/AboutSection";
import WhyChooseUs from "@/components/modules/About/WhyChooseUs";
import PageHeading from "@/hooks/PageHeading";

export default function About() {
  return (
    <div>
      <PageHeading title="Grow With SomoyXpress" />
      <AboutSection />
      <WhyChooseUs />
    </div>
  );
}

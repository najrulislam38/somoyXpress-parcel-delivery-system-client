import ContactForm from "@/components/modules/Contact/ContactForm";
import ContactMap from "@/components/modules/Contact/ContactMap";
import GetInTech from "@/components/modules/Contact/GetInTech";
import PageHeading from "@/hooks/PageHeading";

export default function ContactUs() {
  return (
    <div>
      <PageHeading title="Contact Us " />
      <GetInTech />
      <ContactForm />
      <ContactMap />
    </div>
  );
}

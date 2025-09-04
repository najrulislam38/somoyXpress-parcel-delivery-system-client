import Heading from "@/hooks/Header";
import partner1 from "./../../../assets/partners/Nagad.png";
import partner2 from "./../../../assets/partners/East_West_University_Logo.jpg";
import partner3 from "./../../../assets/partners/Livingtex-scaled.jpg";
import partner4 from "./../../../assets/partners/Bata.png";
import partner5 from "./../../../assets/partners/rokomari.png";
import partner6 from "./../../../assets/partners/sm_halal_food.png";
import partner7 from "./../../../assets/partners/sm_ghor.png";
import partner8 from "./../../../assets/partners/lotto.png";
import partner9 from "./../../../assets/partners/Bata.png";
import partner10 from "./../../../assets/partners/Shajgoj-LOGO.png";

export default function BusinessPartners() {
  return (
    <div className="max-w-6xl mx-auto py-10 lg:py-20 px-6">
      <Heading title="Powering growth for amazing businesses" />

      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner9} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner1} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner2} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner3} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner4} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner5} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner6} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner10} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner7} alt="Business Partner" />
        </div>
        <div className="max-w-[200px] dark:bg-accent h-[200px] flex justify-center items-center p-10 border">
          <img src={partner8} alt="Business Partner" />
        </div>
      </div>
    </div>
  );
}

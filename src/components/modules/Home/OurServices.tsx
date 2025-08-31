import Title from "@/hooks/Header";
import service1 from "./../../../assets/icons/service-1.svg";
import service2 from "./../../../assets/icons/service-2.svg";
import service3 from "./../../../assets/icons/service-3.svg";
import service4 from "./../../../assets/icons/service-4.svg";

export default function OurServices() {
  return (
    <div className="container mx-auto my-20  lg:mt-50 px-6">
      <Title title={"Our Services"} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-10">
        <div className="flex flex-col items-center gap-5">
          <div className="w-full h-[300px] flex items-center justify-center bg-accent p-5 border  shadow-xs group  rounded-lg">
            <img
              src={service1}
              alt=""
              className=" group-hover:scale-105 transaction duration-500"
            />
          </div>
          <h3 className="text-lg  md:text-xl font-medium">
            E-commerce Delivery
          </h3>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-full h-[300px] flex items-center justify-center bg-accent p-5 border  shadow-xs group  rounded-lg">
            <img
              src={service2}
              alt=""
              className=" group-hover:scale-105 transaction duration-500"
            />
          </div>
          <h3 className="text-lg  md:text-xl font-medium">Pick and Drop</h3>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-fit h-[300px] flex items-center justify-center bg-accent p-5 border  shadow-xs group  rounded-lg">
            <img
              src={service3}
              alt=""
              className=" w-8/10 group-hover:scale-105 transaction duration-500"
            />
          </div>
          <h3 className="text-lg  md:text-xl font-medium">Packing</h3>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="w-fit h-[300px] flex items-center justify-center bg-accent p-5 border  shadow-xs group  rounded-lg">
            <img
              src={service4}
              alt=""
              className="  group-hover:scale-105 transaction duration-500"
            />
          </div>
          <h3 className="text-lg  md:text-xl font-medium">Warehousing</h3>
        </div>
      </div>
    </div>
  );
}

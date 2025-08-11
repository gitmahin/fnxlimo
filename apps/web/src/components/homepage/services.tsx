import Image from "next/image";

export const Services = () => {
  return (
    <div className="w-full mt-24 px-5" id="services">
      <div className="default_layout_width ">
        <h2 className="text-read-56 font-semibold text-center our_fleet_heading">Our Services</h2>
        <p className="text-center text-read-18 text-zinc-400">We invite you to try our service and we presonally <br /> guarantee you that you will be completely satisfied<br /> </p>
        <div className="grid grid-cols-2 gap-5 mt-10 services-grid">
    {
        Array.from({length: 4}).map((item, i) => {
            return <div key={i} className="flex justify-center items-start gap-5 p-1 rounded-lg border border-zinc-800 service-box">
                <Image src={""} className="object-cover object-center shrink-0 w-[300px] h-[200px] border rounded-md service-img" alt="service-image" />
                <div className="w-full py-5 service-box-content">
                    <h3 className="text-read-18 font-medium">Airport Transfers</h3>
                    <p className="three_line_ellipsis text-read-14 text-zinc-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel impedit, corporis nobis molestias ad aut consequuntur ducimus distinctio rem consequatur consectetur. Repudiandae dignissimos explicabo voluptates magnam facilis adipisci accusamus omnis!</p>

                </div>
            </div>
        })
    }
        </div>
      </div>
    </div>
  );
};

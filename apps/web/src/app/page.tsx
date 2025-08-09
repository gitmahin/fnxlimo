import { Header } from "@/components/core";
import { Button } from "@radix-ui/themes";
import React from "react";

const Homepage = () => {
  return (
    <>
      <Header />

      <div className="w-full h-fit pt-[64px] pb-[100px]">
        <div className="default_layout_width ">
          <h1 className="text-[60px] font-semibold leading-16 mt-12">
            Experience First-Class Travel, <br /> Every Time
          </h1>
          <div className="flex justify-between items-end">
            <p className="text-read-18 font-medium text-zinc-300 shrink-0 mt-5">
              We offer professional car rental & limousis services <br /> in our
              range of high -end vehicles
            </p>
            <Button radius="large" size={"3"}>
              Book Now
            </Button>
          </div>
        </div>

        <div className="w-full border-t border-b border-zinc-800 mt-10 h-[600px]">
          <div className="w-full h-[calc(100%-250px)]">
            <video
              src="/hero_video.mp4"
              className="w-full h-full z-20 object-center object-cover blur-[3px]"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="w-full h-[250px] border-t border-zinc-800 shrink-0 bg-zinc-900 flex justify-between items-start">
            <div className=" w-full flex justify-end items-center">
              <div className="max-w-[1000px] w-full py-5 pr-5">
                <h4 className="text-[35px] font-semibold">Why Choose Us?</h4>
                <div className="flex justify-start items-center gap-5 mt-6">
                  <div>
                    <h5 className="text-read-16 font-medium">Easy Online Booking</h5>
                    <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nemo dolorem facere quia ipsam non voluptatibus error consectetur qui explicabo, totam voluptate repudiandae quasi possimus. Necessitatibus ratione dignissimos placeat provident.</p>
                  </div>
                  <div>
                    <h5 className="text-read-16 font-medium">Professinal Drivers</h5>
                    <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nemo dolorem facere quia ipsam non voluptatibus error consectetur qui explicabo, totam voluptate repudiandae quasi possimus. Necessitatibus ratione dignissimos placeat provident.</p>
                  </div>

                  <div>
                    <h5 className="text-read-16 font-medium">Varaity of cars brands</h5>
                    <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nemo dolorem facere quia ipsam non voluptatibus error consectetur qui explicabo, totam voluptate repudiandae quasi possimus. Necessitatibus ratione dignissimos placeat provident.</p>
                  </div>

                  <div>
                    <h5 className="text-read-16 font-medium mt-2">Online</h5>
                    <p className="text-read-12 text-zinc-400 two_line_ellipsis  mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nemo dolorem facere quia ipsam non voluptatibus error consectetur qui explicabo, totam voluptate repudiandae quasi possimus. Necessitatibus ratione dignissimos placeat provident.</p>
                  </div>

                </div>
              </div>

           
            </div>
            <div className="shrink-0 w-[400px] bg-purple-600 h-full p-5">
              <p className="font-medium">Trusted by over</p>
              <h4 className="text-[56px] font-semibold leading-16 text-zinc-50">
                100+
              </h4>
              <p className="mt-5">
                Satisfied clients who choose us for our unmatched luxury,
                comfort, and service excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

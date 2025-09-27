"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { reservationServiceStore } from "@/services/store";

export const HeroSection = () => {
  return (
    <div className="w-full h-fit pt-[64px]">
      <div className="w-full px-5">
        <div className="default_layout_width relative hero-texts">
          <h1 className="text-[60px] font-semibold leading-16 mt-12 hero-car-title">
            Experience First-Class Travel, <br /> Every Time
          </h1>
          <div className="w-[400px] h-[500px] top-0 right-0 absolute bg-gradient-to-r from-transparent to-zinc-950 z-[-1]"></div>
          <Image
            src={"/car_hero.png"}
            width={600}
            height={400}
            className="object-contain object-center w-fit h-[300px] absolute right-5 top-8 z-[-2] hero-car-image"
            alt="car"
          />

          <div className="flex justify-between items-end hero-texts-p">
            <p className="text-read-18 font-medium text-zinc-300  mt-5 max-w-[500px] w-full">
              We offer professional car rental & limousis services in our range
              of high -end vehicles
            </p> 
            <Button    
              radius="large"
              size={"3"}
              className="relative z-30"
              onClick={() => reservationServiceStore.setIspopup(true)}
            >
              Get A Quote
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-b border-zinc-800 mt-28 h-[600px] video-section-hero relative">
        <div className="max-w-[500px] h-[50px] bg-purple-900 blur-2xl absolute top-[-20px] "></div>
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
        <div className="w-full h-[250px] border-t border-zinc-800 shrink-0 bg-zinc-900 flex justify-between items-start whch-wrapper">
          <div className=" w-full flex justify-end h-full items-center px-5">
            <div className="max-w-[1000px] w-full h-fit pr-5 wh-container">
              <h4 className="text-[35px] font-semibold">Why Choose Us?</h4>
              <div className="grid grid-cols-4 gap-5 mt-6 why-ch-us">
                <div>
                  <h5 className="text-read-16 font-medium">
                    Easy Online Booking
                  </h5>
                  <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nemo dolorem facere quia ipsam non voluptatibus error
                    consectetur qui explicabo, totam voluptate repudiandae quasi
                    possimus. Necessitatibus ratione dignissimos placeat
                    provident.
                  </p>
                </div>
                <div>
                  <h5 className="text-read-16 font-medium">
                    Professinal Drivers
                  </h5>
                  <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nemo dolorem facere quia ipsam non voluptatibus error
                    consectetur qui explicabo, totam voluptate repudiandae quasi
                    possimus. Necessitatibus ratione dignissimos placeat
                    provident.
                  </p>
                </div>

                <div>
                  <h5 className="text-read-16 font-medium">
                    Varaity of cars brands
                  </h5>
                  <p className="text-read-12 text-zinc-400 two_line_ellipsis mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nemo dolorem facere quia ipsam non voluptatibus error
                    consectetur qui explicabo, totam voluptate repudiandae quasi
                    possimus. Necessitatibus ratione dignissimos placeat
                    provident.
                  </p>
                </div>

                <div>
                  <h5 className="text-read-16 font-medium">Online</h5>
                  <p className="text-read-12 text-zinc-400 two_line_ellipsis  mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nemo dolorem facere quia ipsam non voluptatibus error
                    consectetur qui explicabo, totam voluptate repudiandae quasi
                    possimus. Necessitatibus ratione dignissimos placeat
                    provident.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 w-[400px] bg-purple-600 h-full p-5 stc-hero">
            <p className="font-medium">Trusted by over</p>
            <h4 className="text-[56px] font-semibold leading-16 text-zinc-50">
              100+
            </h4>
            <p className="mt-5">
              Satisfied clients who choose us for our unmatched luxury, comfort,
              and service excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

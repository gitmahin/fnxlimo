"use client";
import { Badge, Button } from "@radix-ui/themes";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperTypes } from "swiper/types";

type FleetCategoriesType = {
  label: string;
};
const FLEET_CATEGORIES: FleetCategoriesType[] = [
  {
    label: "All",
  },
  {
    label: "Luxury",
  },
  {
    label: "Business",
  },
  {
    label: "Crossover",
  },
];

export const Fleet = () => {
  const swiperRef = useRef<SwiperTypes | null>(null);
  return (
    <div className="w-full mt-24 px-5" id="fleet">
      <div className="default_layout_width">
        <h2 className="text-read-56 font-semibold text-center our_fleet_heading">Our Fleet</h2>
        <p className="text-center text-read-18 text-zinc-400">
          We invite you to try our service and we presonally <br /> guarantee
          you that you will be completely satisfied
          <br />{" "}
        </p>

        <div className="relative w-full my-10 nav-wrapper-fleet">
          <ul className="w-full flex justify-center items-center gap-2 ">
            {FLEET_CATEGORIES.map((item, i) => {
              return (
                <li
                  key={i}
                  className="font-medium cursor-pointer px-3 py-1 rounded-md hover:bg-zinc-800 hover:text-zinc-50 transition-colors text-zinc-300"
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex justify-end items-center gap-3 buttons-fleet">
            <Button
            onClick={() => {
                swiperRef.current?.slidePrev()
            }}
              color="gray"
              variant="surface"
              radius="full"
              className="!w-[40px] !h-[40px] !flex !justify-center !items-center !p-0"
            >
              <ChevronLeft />
            </Button>

            <Button
               onClick={() => {
                swiperRef.current?.slideNext()
            }}
              color="gray"
              variant="surface"
              radius="full"
              className="!w-[40px] !h-[40px] !flex !justify-center !items-center !p-0"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
 breakpoints={{
    1030: { // when window width is >= 1030px
      slidesPerView: 3,
    },

     765: { // when window width is >= 1030px
      slidesPerView: 2,
    },
  }}
  centeredSlidesBounds={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            
          >
            {Array.from({ length: 10 }).map((item, i) => {
              return (
                <SwiperSlide key={i} className="!h-fit">
                  <Image
                    src={""}
                    width={500}
                    height={400}
                    className=" h-[250px] rounded-lg outline-0 border-b bg-zinc-900 w-full"
                    alt="slider-image"
                  />
                  <div className="mt-2">
                    <h4 className="text-read-18 font-medium two_line_ellipsis">
                      Oddi Car For Go
                    </h4>
                    <div className="mt-2 flex justify-start items-center gap-3">
                      <Badge variant="soft" color="purple" size={"3"}>
                        <UsersRound size={16} />
                        <span>{3 * (i + 1)}</span>
                      </Badge>
                      <Badge variant="soft" color="purple" size={"3"}>
                        <BriefcaseBusiness size={16} />
                        <span>{2 * (i + 1)}</span>
                      </Badge>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

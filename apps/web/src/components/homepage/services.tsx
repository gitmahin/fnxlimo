"use client";
import { gql, useQuery } from "@apollo/client";

import Image from "next/image";
import { useEffect, useState } from "react";

const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories {
      count
      description
      name
      image {
        src
      }
    }
  }
`;

export const Services = () => {
  const { data, error, loading } = useQuery(GET_PRODUCT_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("mahin", data)
    setCategories(data?.productCategories);
  }, [data]);

  return (
    <div className="w-full mt-24 px-5" id="services">
      <div className="default_layout_width ">
        <h2 className="text-read-56 font-semibold text-center our_fleet_heading">
          Our Services
        </h2>
        <p className="text-center text-read-18 text-zinc-400">
          We invite you to try our service and we presonally <br /> guarantee
          you that you will be completely satisfied
          <br />{" "}
        </p>
        {loading && <div className="text-center mt-5">Loading...</div>}
        <div className="grid grid-cols-2 gap-5 mt-10 services-grid">
          {!loading &&
            categories?.map((item: any, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-center items-start gap-5 p-1 rounded-lg border border-zinc-800 service-box"
                >
              
                  <Image
                  src={item?.image?.src ?? null}
                  className="object-cover object-center shrink-0 w-[300px] h-[200px] border rounded-md service-img"
                  alt="service-image"
                  width={500}
                  height={300}
                  />
             
                  <div className="w-full py-5 service-box-content">
                    <h3 className="text-read-18 font-medium">{item.name}</h3>
                    <p className="three_line_ellipsis text-read-14 text-zinc-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                  
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

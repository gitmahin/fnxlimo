"use client"
import { ReservationPopUp } from "@/components";
import { Header } from "@/components/core";
import { Footer } from "@/components/core/footer";
import { Fleet, HeroSection, Services } from "@/components/homepage";
import { gql, useQuery } from "@apollo/client";

import React, { useEffect } from "react";


const Homepage = () => {


  return (
    <>
      <Header />

      <HeroSection />
      <Services />
      <Fleet/>
      <Footer/>
    </>
  );
};

export default Homepage;

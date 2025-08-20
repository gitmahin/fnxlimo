
import { Header } from "@/components/core";
import { Footer } from "@/components/core/footer";
import { Fleet, HeroSection, Services } from "@/components/homepage";

import React from "react";


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

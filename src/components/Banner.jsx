import React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import ban from "../assets/banner.jpeg";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <Box
      className="bg-cover bg-center !h-[280px] md:!h-[400px] flex flex-col items-center justify-center text-white text-center mx-1 mt-10 md:mt-16"
      style={{ backgroundImage: `url(${ban})` }}
       data-aos="zoom-in" data-aos-delay="500"
    >
      {/* Title */}
      <Typography className="!text-xl md:!text-6xl !font-bold">BLOG</Typography>

      {/* Subtitle */}
      <Typography
        className="!text-sm md:!text-lg bg-white text-black px-4 py-1 rounded-md !font-semibold"
        style={{ letterSpacing: "0.2em" }}
      >
        CREATE YOUR SPACE
      </Typography>
    </Box>
  );
};

export default Banner;

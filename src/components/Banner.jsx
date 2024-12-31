import React from 'react';
import { Box, Typography } from '@mui/material';
import ban from '../assets/banner.jpeg';

const Banner = () => {
  return (
    <Box
      className="bg-cover bg-center !h-[280px] md:!h-[400px] flex flex-col items-center justify-center text-white text-center mx-1 mt-10 md:mt-16"
      style={{ backgroundImage: `url(${ban})` }}
    >
      {/* Title */}
      <Typography
        className="!text-xl md:!text-6xl !font-bold"
        
      >
        BLOG
      </Typography>

      {/* Subtitle */}
      <Typography
        className="!text-sm md:!text-lg bg-white text-black px-4 py-1 rounded-md !font-medium"
        
      >
        Make Your First BLOG
      </Typography>
    </Box>
  );
};

export default Banner;

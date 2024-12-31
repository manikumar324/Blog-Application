import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  const url = "https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg";

  return (
    <Box
      className="bg-cover bg-center !h-[89vh] md:!h-[89vh] flex flex-col items-center justify-center text-white px-5 md:mx-20 md:mt-16 mt-14"
      style={{ backgroundImage: `url(${url})` }}
    >
      <Typography  
        className="!font-bold !text-[30px] md:!text-[36px] !mb-5 "
      >
        About Our Blog
      </Typography>
      <Typography 
        className="text-[14px] md:!text-[20px] leading-relaxed max-w-2xl"
      >
        Welcome to our blog platform! Here, we aim to connect people through stories, 
        ideas, and knowledge. Whether you are a writer or a reader, this platform is 
        designed to provide an enriching and user-friendly experience. Dive in and 
        explore the diverse range of blogs tailored for everyone.
      </Typography>
    </Box>
  );
};

export default About;

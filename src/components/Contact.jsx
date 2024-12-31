import React from "react";
import { Box, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import con from "../assets/contact.jpeg"; // Local contact image
import { Link } from "react-router-dom";

const Contact = () => {
  const url =
    "https://img.freepik.com/premium-photo/contact-us-hand-man-holding-mobile-smartphone-with-mail-phone-email-chat-icon-cutomer-support-concept-blue-wide-banner_256259-3866.jpg";

  return (
    <Box>
      {/* For small devices (xs and sm): Show contact image */}
      <Box
        className="bg-cover bg-center !h-[50vh] md:!hidden flex items-center justify-start text-white text-center mx-2 mt-10 md:mt-16 md:mx-20"
        style={{ backgroundImage: `url(${con})` }} // Use the local contact image
      ></Box>
      <Box className=" space-y-5 md:hidden bg-gray-700 mx-2 w-auto flex flex-col justify-center items-center py-8">
        <Typography className="!text-[20px] text-white md:!text-[35px]">
          You can reach out to us :-)
        </Typography>
        <Box className="flex justify-evenly !text-[#878787] space-x-3">
          <Link to="https://www.linkedin.com/in/mani-kumar-nakka-541b99253/">
            <LinkedInIcon className="hover:animate-spin !text-[25px] md:!text-[32px]" />
          </Link>
          <Link to="https://github.com/manikumar324">
            <GitHubIcon className="hover:animate-pulse !text-[25px] md:!text-[32px]" />
          </Link>
          <Link to="">
            <InstagramIcon className="hover:animate-spin !text-[25px] md:!text-[32px]" />
          </Link>
          <a href="mailto:manikumar@gmail.com?subject=Hello&body=I%20wanted%20to%20connect%20with%20you">
            <MailOutlineIcon className="hover:animate-pulse !text-[25px] md:!text-[32px]" />
          </a>

          <Link to="">
            <FacebookIcon className="hover:animate-spin !text-[25px] md:!text-[32px]" />
          </Link>
        </Box>
        <Box className="flex flex-col items-center md:hidden w-full pt-5 space-y-1">
          <hr className="w-full border-gray-300" />
          <p className="text-white text-sm">
            &copy; BlogSite @2025.All Rights Reserved.
          </p>
          <hr className="w-full border-gray-300" />
        </Box>
      </Box>

      {/* For medium and larger devices (md and above): Show URL image */}
      <Box
        className="hidden md:flex flex-col bg-cover bg-center !h-[89vh] items-start justify-between text-white text-center mx-2 mt-10 md:mt-16 md:mx-20"
        style={{ backgroundImage: `url(${url})` }} // Use the URL image
      >
        <Box className="ml-10 space-y-5 md:pt-44">
          <Typography className="!text-[15px] md:!text-[35px]">
            You can reach out to us :-)
          </Typography>
          <Box className="flex justify-evenly !text-[#878787] cursor-pointer">
            <Link to="https://www.linkedin.com/in/mani-kumar-nakka-541b99253/"><LinkedInIcon className="hover:animate-spin !text-[20px] md:!text-[32px]" /></Link>
            <Link to="https://github.com/manikumar324"><GitHubIcon className="hover:animate-bounce !text-[20px] md:!text-[32px]" /></Link>
            <InstagramIcon className="hover:animate-spin !text-[20px] md:!text-[32px]" />
            <a href="mailto:manikumar@gmail.com?subject=Hello&body=I%20wanted%20to%20connect%20with%20you">
              <MailOutlineIcon className="hover:animate-pulse !text-[25px] md:!text-[32px]" />
            </a>

            <FacebookIcon className="hover:animate-spin !text-[20px] md:!text-[32px]" />
          </Box>
        </Box>
        <Box className="flex flex-col items-center my-1 w-full mt-20 space-y-1 text-center">
          <hr className="w-full border-gray-300 !text-white" />
          <p className=" text-sm !text-white">
            &copy; BlogSite @2025.All Rights Reserved.
          </p>
          <hr className="w-full border-gray-300" />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;

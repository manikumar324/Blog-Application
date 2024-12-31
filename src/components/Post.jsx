import React, { useContext, useEffect} from "react";
import { Typography } from "@mui/material";
import { UserContext } from "./context/UserContext";

//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Post = ({ post }) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const { title, description, picture, category, name } = post;
  const { user } = useContext(UserContext);

  const url = picture
    ? picture
    : "https://vectorified.com/images/default-image-icon-19.png";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <div className="flex flex-col items-center justify-start h-[300px] space-y-1 w-full border border-gray-300 rounded-lg shadow-md"
    data-aos="fade-down" data-aos-delay="500">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src={url}
          alt="Post"
          className="h-[160px] w-[300px] object-cover rounded-tr-lg rounded-tl-lg"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col px-5 items-center pt-2 text-[#878787]">
        <Typography className="!text-[12px]">
          {category ? category : "All"}
        </Typography>
        <Typography className="!text-[18px]">
          {addEllipsis(title, 20)}
        </Typography>
        <Typography className="!text-[12px] italic !font-semibold">
          {name}
        </Typography>
        <Typography className="!text-[14px]">
          {addEllipsis(description, 20)}
        </Typography>
      </div>
    </div>
  );
};

export default Post;

import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { UserContext } from "./context/UserContext";

const Post = ({ post }) => {
  const { title, description, picture, category, name } = post;
  const { user } = useContext(UserContext);

  const url = picture
    ? picture
    : "https://vectorified.com/images/default-image-icon-19.png";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <div className="flex flex-col items-center justify-start h-[300px] space-y-1 w-full border border-gray-300 rounded-lg shadow-md">
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

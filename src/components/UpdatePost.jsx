import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  name: "",
  email: "",
  category: "",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { Email } = location.state || {};
  // console.log("Backend Mail:-",Email)
  const { user } = useContext(UserContext);
  const { id } = useParams();

  // Default image for preview
  const defaultImage =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getUpdatedPostData = async () => {
      try {
        const response = await axios.get(`https://blog-server-fucr.onrender.com/post/${id}`);
        if (response) {
          setPost(response.data);
          console.log("Post data fetched Successfully", response.data);
        }
      } catch (error) {
        console.log("Error while fetching the Post Data".error);
      }
    };
    getUpdatedPostData();
  }, [id]);

  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          const response = await axios.post(
            "https://blog-server-fucr.onrender.com/upload",
            data
          );
          console.log(response.data);
          // Update the post with the uploaded image URL
          //   const imageUrl = `http://localhost:5000/uploads/${response.data.filename}`;
          setPost((prevPost) => ({ ...prevPost, picture: response.data.url }));
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      category: location.search?.split("=")[1] || "",
      email: user.email,
      name: user.name,
    }));
  }, [location.search, Email]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://blog-server-fucr.onrender.com/update/${id}`,
        post
      );
      if (response.status === 200) {
        console.log("Post Updated successfully:", response.data);
        const { updatedAt } = response.data.postUpdate;
        console.log("Updated Time :-", updatedAt);
        navigate(`/details/${id}`); // Redirect to the home page after successful creation
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error Updating post:",
          error.response.data.message || error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error Updating post:", error.message);
      }
    }
  };

  const handleCancel = async () => {
    navigate(`/details/${id}`);
  };

  return (
    <Box className="mx-2 md:my-18 md:mx-20 mt-14">
      <img
        src={post.picture || defaultImage} // Dynamically display uploaded image
        alt="Post"
        className="w-[100%] h-[250px] md:h-[400px] object-cover"
      />

      <FormControl className="!mt-2 !flex !flex-row !items-center">
        <label htmlFor="fileInput">
          <Tooltip title="img-add" arrow>
            <AddCircleIcon className="!text-[25px] md:!text-[30px] text-gray-500 cursor-pointer" />
          </Tooltip>
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputBase
          placeholder="Title"
          className="flex-1 mx-[10px] md:mx-[25px] !text-[20px] md:!text-[25px] placeholder:text-sm md:placeholder:text-lg"
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
      </FormControl>
      <TextareaAutosize
        minRows={3}
        placeholder="Tell About Your Story...."
        className="w-[100%] mt-3 !h-[100px] outline-none bg-[#EEF0F3] p-2 rounded-lg"
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      />
      <Box className="flex justify-end space-x-4 my-1">
        <Button
          className="!bg-red-600 !text-white"
          onClick={handleCancel} // Add an onClick handler if needed
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePost;

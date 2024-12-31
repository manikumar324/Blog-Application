import React, { useState, useContext, useEffect} from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "./context/UserContext";
import axios from "axios";

//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Utility function to generate colors based on a string
const generateColor = (input) => {
  if (!input || typeof input !== "string") {
    return { bg: "#E0E0E0", text: "#000000" }; // Default colors for invalid input
  }

  const hash = input
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const colors = [
    { bg: "#F0F4C3", text: "#827717" }, // Light Olive & Dark Olive
    { bg: "#E1F5FE", text: "#0277BD" }, // Sky Blue & Deep Blue
    { bg: "#FBE9E7", text: "#D84315" }, // Peach & Burnt Orange
    { bg: "#E8EAF6", text: "#303F9F" }, // Soft Lavender & Indigo
    { bg: "#FCE4EC", text: "#C2185B" }, // Light Pink & Deep Rose
    { bg: "#F3E5F5", text: "#7B1FA2" }, // Lavender & Purple
    { bg: "#E3F2FD", text: "#1565C0" }, // Light Blue & Navy Blue
    { bg: "#E8F5E9", text: "#2E7D32" }, // Mint Green & Forest Green
    { bg: "#FFF8E1", text: "#FF8F00" }, // Pale Yellow & Amber
    { bg: "#FFEBEE", text: "#D32F2F" }, // Blush Pink & Crimson
  ];

  return colors[hash % colors.length];
};

const Comment = ({ comment, setToggle }) => {

  useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration (in ms)
        easing: 'ease-in-out', // Easing function
        once: true, // Whether animation should happen only once
        mirror: false, // Whether elements should animate out while scrolling past them
      });
    }, []);
    
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false); // State to control the modal
  const [updatedComment, setUpdatedComment] = useState(comment?.comments || ""); // Safeguard for comments

  const handleOpen = () => setOpen(true); // Open the modal
  const handleClose = () => setOpen(false); // Close the modal

  const updateComment = async () => {
    try {
      const response = await axios.put(
        `https://blog-server-fucr.onrender.com/comment/update/${comment._id}`,
        { comments: updatedComment }
      );
      if (response.status === 200) {
        setToggle((prev) => !prev);
        console.log("Comment Updated Successfully");
      }
    } catch (error) {
      console.log("Error while updating the comment", error);
    } finally {
      handleClose(); // Close the modal after update
    }
  };

  const removeComment = async () => {
    try {
      const response = await axios.delete(
        `https://blog-server-fucr.onrender.com/comment/delete/${comment._id}`
      );
      if (response.status === 200) {
        setToggle((prev) => !prev);
        console.log("Comment Deleted Successfully");
      }
    } catch (error) {
      console.log("Error while deleting the comment", error);
    }
  };

  const { bg, text } = generateColor(comment?.name || ""); // Safeguard for name

  return (
    <Box
      className="mt-[30px] p-[10px] rounded-lg"
      style={{ backgroundColor: bg }}
      data-aos="flip-up" data-aos-delay="100"
    >
    <Box className="flex justify-between">
    <Typography
        className="!h-[20px] !w-[20px] !text-[12px] md:!text-[16px] !font-semibold md:!h-[30px] md:!w-[30px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: text, color: bg }}
      >
        {comment?.name?.[0]?.toUpperCase() || "?"} {/* Safeguard for initials */}
      </Typography>
      <Box className="italic">
          {!comment?.updatedAt ||
          new Date(comment.updatedAt).getTime() ===
            new Date(comment.createdAt).getTime() ? (
            <Typography
              className="!text-[10px] md:!text-[14px]"
              style={{ color: text }}
            >
              Published:{" "}
              <span>
                {new Date(comment?.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </Typography>
          ) : (
            <Typography
              className="!text-[10px] md:!text-[14px]"
              style={{ color: text }}
            >
              Updated:{" "}
              <span>
                {new Date(comment?.updatedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </Typography>
          )}
        </Box>
    </Box>
      <Box className="flex items-center">
        <Typography
          className="!font-semibold !text-[12px] md:!text-[18px] !mr-[20px]"
          style={{ color: text }}
        >
          {comment?.name || "Unknown User"} {/* Fallback for name */}
        </Typography>
        
        {comment?.name === user?.name && (
          <div className="ml-auto">
            <Tooltip title="Edit">
              <EditIcon
                onClick={handleOpen}
                data-aos="flip-right" data-aos-delay="1000"
                className="!text-[25px] md:!text-[30px] m-[5px] p-[4px] bg-white !shadow-xl rounded-full text-gray-600 cursor-pointer"
              />
            </Tooltip>
          </div>
        )}
      </Box>
      <Box className="flex justify-between">
        <Typography style={{ color: text }} className="!text-[16px] md:!text-[20px] bg-[#EEF0F3] w-[100%] !p-2">
          {comment?.comments || "No Comment"}
        </Typography>
        {comment?.name === user?.name && (
          <div className="ml-auto">
            <Tooltip title="Delete" onClick={removeComment}>
              <DeleteIcon className="!text-[25px] md:!text-[30px] m-[5px] p-[4px]  rounded-full shadow-lg bg-white text-red-600 cursor-pointer" 
              data-aos="flip-left" data-aos-delay="1000"/>
            </Tooltip>
          </div>
        )}
      </Box>

      {/* Modal for Editing Comment */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Edit your comment"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            variant="outlined"
            className="hover:bg-red-600 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={updateComment}
            color="primary"
            variant="outlined"
            className="hover:bg-blue-600 hover:text-white"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Comment;

import React, { useEffect, useState, useContext } from "react";
import { Box, Button, TextareaAutosize } from "@mui/material";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import Comment from './Comment';

const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

const Comments = ({ post }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-server-fucr.onrender.com/comments/${post._id}`
        );
        if (response.status === 200) {
          // Sort comments to display the latest one on top
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setComments(sortedComments);
        }
      } catch (error) {
        console.error("Error while fetching comments:", error);
      }
    };
    getComments();
  }, [post, toggle]);

  const handleComments = (e) => {
    setComment({
      ...comment,
      name: user.name, // This comes from the UserContext populated from the backend
      postId: post._id,
      comments: e.target.value,
      date: new Date(),
    });
  };

  const addComment = async () => {
    if (!comment.comments.trim()) return; // Prevent empty comments
    try {
      const response = await axios.post(
        "https://blog-server-fucr.onrender.com/comment/new",
        comment
      );
      if (response.status === 200) {
        setComments((prevComments) => [response.data, ...prevComments]); // Add the new comment to the top
        setComment(initialValues); // Reset the comment input
      }
      setToggle((prev) => !prev); // Trigger re-render
    } catch (error) {
      console.error("Error while adding the comment:", error);
    }
  };

  const url = "https://static.thenounproject.com/png/12017-200.png";

  return (
    <Box>
      {/* Input for Adding Comments */}
      <div className="flex mt-[20px]">
        <img
          src={url}
          alt="person"
          className="w-[30px] h-[30px] md:!h-[50px] md:!w-[50px]"
          data-aos="flip-left" data-aos-delay="500"
        />
        <TextareaAutosize
          minRows={3}
          placeholder="What's your thoughts?"
          className="outline-none mx-[10px] !h-[100px] w-[100%] placeholder:text-sm md:placeholder:text-lg bg-[#EEF0F3] p-2 rounded-lg"
          value={comment.comments}
          onChange={handleComments}
        />

        <Button
          variant="contained"
          size="medium"
          className="!h-[40px] !mt-auto "
          onClick={addComment}
        >
          Post
        </Button>
      </div>

      {/* Display Comments */}
      <Box>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </Box>
    </Box>
  );
};

export default Comments;

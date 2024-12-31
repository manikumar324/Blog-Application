import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";
import Post from "../components/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    // Fetch posts based on category
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://blog-server-fucr.onrender.com/posts", {
          params: { category },
        });
        setPosts(response.data || []);
        console.log("Posts Data:-", response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] w-[100%]">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: "#878787",
          fontSize: "25px",
          width: "80vw",
          height: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <Box
          style={{
            color: "#878787",
            fontSize: "25px",
            width: "80vw",
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Posts Available
        </Box>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-5 grid-cols-1 m-5">
          {posts.map((post) => (
            <Link key={post._id} to={`/details/${post._id}`}>
              <Post post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;

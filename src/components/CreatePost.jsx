import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputBase, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const initialPost = {
  title: '',
  description: '',
  picture: '',
  name:"",
  email: '',
  category: '',
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { Email } = location.state || {};
  // console.log("Backend Mail:-",Email)
   const { user } = useContext(UserContext)

  // Default image for preview
  const defaultImage =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    if (file) {
      const uploadImage = async () => {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);
        try {
          const response = await axios.post('http://localhost:5000/upload', data);
          console.log(response.data)
          // Update the post with the uploaded image URL
        //   const imageUrl = `http://localhost:5000/uploads/${response.data.filename}`;
          setPost((prevPost) => ({ ...prevPost, picture: response.data.url }));
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      category: location.search?.split('=')[1] || '',
      email: user.email,
      name:user.name,
    }));
  }, [location.search, Email]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create', post);
      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        navigate('/home'); // Redirect to the home page after successful creation
      }
    } catch (error) {
      if (error.response) {
        console.error('Error creating post:', error.response.data.message || error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error creating post:', error.message);
      }
    }
  };

  return (
    <Box className="mx-2 md:my-18 md:mx-20 mt-14">
      <img
        src={post.picture || defaultImage} // Dynamically display uploaded image
        alt="Uploaded Preview"
        className="w-[100%] h-[300px] md:h-[400px] object-cover"
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
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputBase
          placeholder="Title"
          className="flex-1 mx-[10px] md:mx-[25px] !text-[20px] md:!text-[25px] placeholder:text-sm md:placeholder:text-lg"
          onChange={handleChange}
          name="title"
        />
        <Button variant="contained" onClick={handlePublish}>
          Publish
        </Button>
      </FormControl>
      <TextareaAutosize
        minRows={3}
        placeholder="Tell About Your Story...."
        className="w-[100%] mt-3 !h-[100px] outline-none bg-[#EEF0F3] p-2 rounded-lg"
        onChange={handleChange}
        name="description"
      />
    </Box>
  );
};

export default CreatePost;

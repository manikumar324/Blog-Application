import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
// import { useLocation } from 'react-router-dom';

//components
import Comments from './Comments';

const DetailView = () => {

    const { id } = useParams();

    const [post, setPost] = useState({});

    const { user } = useContext(UserContext)

    console.log("Backend UserName:-",user.name)

    const navigate = useNavigate();

    // const location = useLocation();
    // const { Name } = location.state || {};
    // console.log("Backend UserName :-", Name)

    // const storedUser = JSON.parse(localStorage.getItem("blogUser"));
    // const name = storedUser ? storedUser.name : "Guest";
    // console.log("LocalStorage UserName :-", name)

    useEffect(()=>{
        const getData = async () =>{
           try{
            const response = await axios.get(`http://localhost:5000/post/${id}`)
            if(response){
                setPost(response.data);
                console.log("Post data fetched Successfully",response.data)
            }
           }
           catch(error){
            console.log("Error while fetching the Post Data".error)
           }
        }
        getData()
    },[id])

    const handleDelete = async ()=>{
        try{
            const response = await axios.delete(`http://localhost:5000/delete/${id}`)
            if(response.status === 200){
                console.log("Post Deleted Successfully")
                navigate("/home")
            }
        }
        catch(error){
            console.log("Error While Deleting the Post")
        }
    }

    const {title, description, picture, createdAt, updatedAt, name} = post;
    const url =picture ? picture :"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

   

return (
  <Box className="md:my-[60px] md:mx-[100px] my-10 mx-2">
    <img src={url} alt="blog-post" className="w-full mt-[60px] !h-[280px] md:!h-[400px] object-cover" />
    {user.name === name && (
      <Box className="float-right">
        <Tooltip title="Edit" arrow>
          <Link to={`/update/${post._id}`}>
            <EditIcon className="!text-[25px] md:!text-[30px] m-[5px] p-[2px] border border-solid border-[#878787] rounded-md text-blue-600" />
          </Link>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <DeleteIcon
            className="!text-[25px] md:!text-[30px] m-[5px] p-[2px] border border-solid border-[#878787] cursor-pointer rounded-md text-red-600"
            onClick={handleDelete}
          />
        </Tooltip>
      </Box>
    )}

    <Typography className="!text-[25px] !my-5 !ml-5 md:!text-[30px] !font-semibold text-center md:!mt-10 md:!ml-5">
      {title}
    </Typography>

    <Box className="text-[#878787] md:flex md:my-[10px] md:justify-between">
      <Typography>
        Author : <span className="font-semibold break-words">{name}</span>
      </Typography>
      <Box className="flex flex-col">
  {/* Display Published On only if the post has not been updated */}
  {!updatedAt || new Date(updatedAt).getTime() === new Date(createdAt).getTime() ? (
    <Typography>
      Published On : {" "}
      <span className="font-semibold">
        {new Date(createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    </Typography>
  ) : (
    /* Display Updated On if the post has been updated */
    <Typography>
      Updated On : {" "}
      <span className="font-semibold">
        {new Date(updatedAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
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

    <Typography className="!text-[#878787]">
      Description : <span className="font-semibold break-words">{description}</span>
    </Typography>
    <Comments post={post}/>
  </Box>
  
);

}


export default DetailView;
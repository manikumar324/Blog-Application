import React, { useState, useEffect, useContext } from "react";
import blog from "../../assets/blog.png";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookie from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import { useUser } from "../context/UserContext"; // Import the UserContext

//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = ( ) => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  // const { updateUser } = useUser(); // Access the updateUser function
  const { setUser } = useContext(UserContext)
  const [account, setAccount] = useState("login");
  const [signupValues, setSignupValues] = useState(signupInitialValues);
  const [loginValues, setLoginValues] = useState(loginInitialValues);
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();
 

  useEffect(() => {
    // Redirect to home page if user is already logged in
    const userToken = Cookie.get("userToken");
    if (userToken) {
      navigate("/");
    }
  }, [navigate]);

  const toggleAccount = () => {
    setAccount(account === "login" ? "signup" : "login");
    setSignupValues(signupInitialValues); // Reset form values on toggle
    setLoginValues(loginInitialValues);
  };

  const onInputChange = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupValues.name || !signupValues.email || !signupValues.password) {
      toast.error("All Fields Required");
      return;
    }
    setLoading(true); // Show loader
    try {
      const response = await axios.post("https://blog-server-fucr.onrender.com/signup", {
        name: signupValues.name,
        email: signupValues.email,
        password: signupValues.password,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        localStorage.setItem(
          "blogUser",
          JSON.stringify({ name: signupValues.name, email: signupValues.email })
        );
        // const userData = { Name: response.data.userName };
        // updateUser(userData); // Update UserContext
        // console.log("newUser :-",userData)
        console.log("blogUserDetails:-",localStorage.getItem("blogUser"));
        toggleAccount();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email Already Exists");
        } else if (error.response.status === 500) {
          toast.error("Internal Server Error. Please try again later.");
        }
      } else if (error.request) {
        toast.error("Network Error. Please check your connection.");
        console.error("Network error:", error.request);
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginValues.email || !loginValues.password) {
      toast.error("All Fields Required");
      return;
    }
    setLoading(true); // Show loader
    try {
      const response = await axios.post("https://blog-server-fucr.onrender.com/login", {
        email: loginValues.email,
        password: loginValues.password,
      });

      if (response.status === 200) {
        Cookie.set("userToken", response.data.token);
        toast.success("Login Successfully");
        localStorage.setItem("userDetails",JSON.stringify({email:loginValues.email}))
        const emailData = response.data.userMail;
        const backendName = response.data.userName; // Name from backend
        console.log("backendName:-",backendName)
        console.log("Registerred Mail :- ",emailData)
        setUser({name:backendName, email:emailData})
        setTimeout(() => {
          navigate("/home", {state : { Email : emailData }}); // Redirect to home page
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User Not Found");
        } else if (error.response.status === 403) {
          toast.error("Password does not match");
        }
      } else {
        console.error("Error during login:", error.response?.data || error.message);
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <Box className="w-[320px] mt-24 md:w-[400px] m-auto shadow-xl md:mt-20"
    data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
      <Toaster />
      <img src={blog} alt="login" className="w-[100px] m-auto pt-[50px]" />
      {account === "login" ? (
        <form onSubmit={onLoginSubmit}>
          <div className="flex flex-col px-[35px] py-[25px] space-y-4">
            <TextField
              id="email-input"
              name="email"
              label="Enter Email"
              variant="outlined"
              onChange={onValueChange}
              value={loginValues.email}
            />
            <TextField
              id="password-input"
              name="password"
              label="Enter Password"
              variant="outlined"
              type="password"
              onChange={onValueChange}
              value={loginValues.password}
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={loading} // Disable when loading
              className="!bg-orange-500 !text-white !h-[40px] !rounded-md hover:!bg-blue-500"
            >
              {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Login"}
            </Button>
            <Typography className="text-center text-gray-400">OR</Typography>
            <Button
              className="text-blue-600 hover:underline h-[40px]"
              style={{ boxShadow: "0px 2px 4px 1px rgba(0 0 0/ 20%)" }}
              onClick={toggleAccount}
            >
              Create an Account
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSignupSubmit}>
          <div className="flex flex-col px-[35px] py-[25px] space-y-4">
            <TextField
              id="name-input"
              name="name"
              label="Enter Name"
              variant="standard"
              onChange={onInputChange}
              value={signupValues.name}
            />
            <TextField
              id="mail-input"
              name="email"
              label="Enter Email"
              variant="standard"
              onChange={onInputChange}
              value={signupValues.email}
            />
            <TextField
              id="pass-input"
              name="password"
              label="Enter Password"
              variant="standard"
              type="password"
              onChange={onInputChange}
              value={signupValues.password}
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={loading} // Disable when loading
              className="!bg-orange-500 !text-white !h-[40px] !rounded-md hover:!bg-blue-500"
            >
              {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Sign Up"}
            </Button>
            <Typography className="text-center text-gray-400">OR</Typography>
            <Button
              className="text-blue-600 hover:underline h-[40px]"
              style={{ boxShadow: "0px 2px 4px 1px rgba(0 0 0/ 20%)" }}
              onClick={toggleAccount}
            >
              Already have an Account
            </Button>
          </div>
        </form>
      )}
    </Box>
  );
};

export default Login;

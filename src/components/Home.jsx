import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import { Grid } from '@mui/material';
import Posts from './Posts';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext); // Access setUser directly
  console.log("Name :-",user.name)

  //This 2 localstorages are used to get from the 2 different keys

  // const storedSignupEmail = JSON.parse(localStorage.getItem("blogUser"));
  // const SignupEmail = storedSignupEmail ? storedSignupEmail.email : "Guest";
  // console.log("SignupEmail:-",SignupEmail)

  // const storedLoginEmail = JSON.parse(localStorage.getItem("userDetails"));
  // const LoginEmail = storedSignupEmail ? storedSignupEmail.email : "Guest";
  // console.log("LoginEmail:-",LoginEmail)


  return (
    <div className='md:mt-10 mt-18'>
        <Banner />
        <Grid container spacing={2}>
            <Grid item lg={2} sm={2} xs={10}>
                <Categories />
            </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
                <Posts />
            </Grid>
        </Grid>
    </div>
  )
}

export default Home;
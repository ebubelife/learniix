"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import FAQs from '../../components/Faqs'
import Footer from '../../components/Footer';
import AppBar from '../../components/Appbar';


import { useState, useEffect, forwardRef, Fragment } from "react";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TransitionProps } from '@mui/material/transitions';




export default function Signin() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (

    <>
   {/*Pop to display options for getting started*/}


    <main className="items-center h-screen w-screen">

      <div className='md:block hidden'>
{/*main top header large screens*/}
      <Header />



      </div>

      <div className='md:hidden '>

        {/*main top header small screens*/}

      <AppBar />

      </div>
      

      


      <div className="md:h-2/3 h-[500px] w-screen  " style={{ backgroundImage: "url('/images/home/Untitled design (7).png')" }}>

{/*Hero */}
      

<div className='w-full md:h-2/3 h-[500px]  absolute z-10  grid md:grid-cols-2 grid-cols-1 md:py-2 py-8' style={{ backgroundColor:`rgba(0,0,0,0.8)`}}>

<div className='h-full w-full md:px-20 md:py-10 md:p-0 p-4'>
<h1 className='text-green-600 md:text-4xl text-xl font-bold md:text-left text-center'>Become A Vendor </h1>

<h1 className='text-white text-md md:text-left text-center font-smibold mt-4 '>Scale your business and sales. Launch your product and have our network of affiliates promote your products to millions of potential customers.</h1>
 
       {/*mobile version shows only on mobile */}
       <div className="md:mt-4 mt-8 flex  justify-center md:hidden ">
     <div className=' rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-md  py-2 '>Efficient Sales</div>

     </div>

 {/*large screen version shows only on large */}
     <div className="md:mt-4 mt-8 hidden md:block  ">
     <div className='h-10 rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-xl  py-1 '>Efficient Sales</div>

     </div>


       <h1 className='text-white md:text-md text-sm font-light mt-4 md:text-left text-center  '>Our affiliates across the globe are skilled enough to push your product to a huge audience and fire up your sales metrics. </h1>
      

      
      
       </div>

     
       

       <div>
       <img src="/images/home/360_F_299939547_CwlOeI0nQ0ZACCpGmDrz2ZmOqsTfcvBf-removebg-preview.png" className='hero-image h-full w-full'  alt="hero-image" />

       </div>

</div>

      </div>


{/* Login section/form*/}

<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">Login To Your <span className="text-green-500 font-semibold">LEARNIIX</span> Account</p>


  </div></div>


  <div className="w-screen justify-center flex ">

  <div className="md:w-1/3 w-full  text-center">

  <p className="text-green-500 text-md  font-semibold">Vendor Login</p>


  </div></div>


      <div className="w-screen justify-center flex md:mt-10 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-1/3 p-4 w-full rounded-xl shadow-xl'>

       <div className="block">

       <TextField
        fullWidth
        label="Email Or Phone Number"
        variant="outlined"
        margin="normal"
      //  {...register('email', { required: true })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* Icon for email (replace with your icon) */}
              ✉️
            </InputAdornment>
          ),
        }}

        style={{
          borderRadius: '12px', // Adjust the border-radius to make it curvier
          marginTop: '10px', // Optional: Adjust the top margin
        }}
        inputProps={{
          style: {
            fontSize: '12px', // Adjust the font size
            color: 'slategray', // Use the slate color for text
          },
        }}
      />
       </div>

      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type={showPassword ? 'text' : 'password'}
       // {...register('password', { required: true })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* Icon for password (replace with your icon) */}
              🔐
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePasswordVisibility}
                edge="end"
                size="large"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        

        style={{
          borderRadius: '20px', // Adjust the border-radius to make it curvier
          marginTop: '10px',
          // Optional: Adjust the top margin
        }}
        inputProps={{
          style: {
            fontSize: '12px', // Adjust the font size
            color: 'slategray', // Use the slate color for text
          },
        }}
      />

<button
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Submit
      </button>



        </div>


      </div>




<p className='text-center text-3xl text-grey_600 mt-10 font-semibold text-green-600'>
FAQs
 
</p>

<p className='text-center font-light text-sm text-grey_600'>
Common Questions People Ask About Us
 
</p>

<div className="lg:px-40 mt-6 px-6 sm:px-6">
<FAQs />

</div>

<div className="flex-grow">

</div>

<Footer />

          </main>

          </>
  )
}

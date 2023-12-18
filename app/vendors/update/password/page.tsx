"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '../../../components/Header'
import FAQs from '../../../components/Faqs'
import Footer from '../../../components/Footer';
import AppBar from '../../../components/Appbar';


import React, { useState, useEffect, forwardRef, Fragment, CSSProperties } from "react";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TransitionProps } from '@mui/material/transitions';

import { useRouter } from 'next/navigation';

import { Formik, useFormik } from 'formik';
import axios, { AxiosError, AxiosResponse } from "axios";
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie';
import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'




export default function Signin() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  let [color, setColor] = useState("#90EE90");

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  var errorMessage ="";
  const notifySuccess = () => toast.success("Your password has been successfully changed.");
  const notifyError = (message: any) => toast.error(message);
 
  

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirm_password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  });

   const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {


        var email = Cookies.get('email');
 

        setIsLoading(true);
     

     

       const formData = new FormData();

       formData.append('password', values.password);
       email = Cookies.get('email');

       if(email!=undefined){
        formData.append('email',email)
       }
       
       else{
        notifyError("An error occured. We could not verify your identity, please contact the Admin")
        return;

       }
          
      

      // alert(JSON.stringify(formData, null, 2));
      

      runAPI(formData );
    },
  });

  const runAPI= async (values: FormData) => {

 
   
    try {
      const res = await axios.post(
        `https://back.learniix.com/api/account/change_password`,
        values,
       
        {
         // withCredentials: true ,

         headers:{
          'Content-Type' :'multipart/form-data',
        

         
         },
         
         // params: {values}
        }
       
      );
     
      setIsLoading(false);
     
      console.log(res.data.message)

      notifySuccess();
    

      setTimeout(() => {
        router.push('/affiliates/dashboard')
      }, 3000);

    } catch (err ) {
     

      if (err instanceof Error) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const errorResponse = axiosError.response as AxiosResponse;
          if (errorResponse.data) {
            errorMessage = errorResponse.data.message;
          }
        }

        notifyError(errorMessage)

         console.log(errorMessage);
         
      }
      
    
      setIsLoading(false);
     
     
    }
    finally {
      setIsLoading(false);

    }
  };


  return (

    <>
 <Toaster/>


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
       <h1 className='text-green-600 md:text-4xl text-xl font-bold md:text-left text-center'>Affiliates Corner</h1>

       <h1 className='text-white text-md md:text-left text-center font-smibold mt-4 '>Join our prestigious network of affiliates, get trained and gain access to a market of useful products. Promote the products using different media and earn up to 50% in commissions. </h1>
       
       {/*mobile version shows only on mobile */}
     <div className="md:mt-4 mt-8 flex  justify-center md:hidden ">
     <div className=' rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-md  py-2 '>Great Commissions</div>

     </div>

 {/*large screen version shows only on large */}
     <div className="md:mt-4 mt-8 hidden md:block  ">
     <div className='h-10 rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-xl  py-1 '>Great Commissions</div>

     </div>


       <h1 className='text-white md:text-md text-sm font-light mt-4 md:text-left text-center  '>Acquire premium salesmanship skills from our well crafted sales course and earn profitably by selling useful products for high commissions. </h1>
      

      
      
       </div>

     
       

       <div>
       <img src="/images/home/360_F_299939547_CwlOeI0nQ0ZACCpGmDrz2ZmOqsTfcvBf-removebg-preview.png" className='hero-image h-full w-full'  alt="hero-image" />

       </div>

</div>

      </div>

{/* Login section/form*/}

<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl md:mt-0 mt-10">Change Your <span className="text-green-500 font-semibold">LEARNIIX</span> Password</p>


  </div></div>


  <div className="w-screen justify-center flex ">

  <div className="md:w-1/3 w-full  text-center">

  <p className="text-green-500 text-md  font-semibold">Enter A New Password Below</p>


  </div></div>





  <div className="w-screen justify-center flex md:mt-10 mt-6 mt-2 md:px-0 px-4 ">


  <form onSubmit={formik.handleSubmit} className='md:w-1/3 p-4 w-full rounded-xl shadow-xl'>


  <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
       
        variant="outlined"
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
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



<TextField
        fullWidth
        id="confirm_password"
        name="confirm_password"
        label="Confirm Password"
       
        variant="outlined"
        margin="normal"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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

     

      {
        isLoading==false?(<>
        <button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Change Password
      </button>
        
        </>):(<> <div className='w-full flex justify-center mt-6'>

<PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
</div></>)
      }


    



   

        </form>


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

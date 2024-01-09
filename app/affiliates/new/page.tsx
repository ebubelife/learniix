"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import FAQs from '../../components/Faqs'
import Footer from '../../components/Footer';
import AppBar from '../../components/Appbar';


import { useState, useEffect, forwardRef, Fragment, CSSProperties } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { PropagateLoader } from 'react-spinners'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Signin() {


  const [open, setOpen] = useState(false);
  const notifyFailure = (message:any) => toast.error(message);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  

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
  const notifySuccess = () => toast.success("Your Affiliate Account Has Been Created Successfully! Please wait while we redirect you to signin.");
  const notifyError = (message: any) => toast.error(message);
  const notifyCustomSuccess = (message: any) => toast.error(message);
  
  const removeTrailingSpaces = (value: string) => (typeof value === 'string' ? value.trimEnd() : value);




  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email')
      .transform(removeTrailingSpaces)
      .required('Email is required'),

      firstName: yup
      .string()
      //.email('Email')
      .transform(removeTrailingSpaces)
      .required('First name is required'),

      lastName: yup
      .string()
      //.email('Email')
      .transform(removeTrailingSpaces)
      .required('Last name is required'),


      phone: yup
      .string()
      //.email('Email')
      .transform(removeTrailingSpaces)
      .required('Phone number is required'),

      
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
   const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone:''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
   

      setIsLoading(true);
     

     

      const formData = new FormData();

      formData.append('email', values.email);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('password', values.password);
      formData.append('is_payed', 'true');
      formData.append('reg_type', 'AFFILIATE');
      formData.append('req_source', 'USER');
      formData.append('currency', 'NGN');


       Cookies.set('email', values.email);

      // alert(JSON.stringify(formData, null, 2));
      

      runAPI(formData );
    },
  });

  const runAPI = async (values: FormData) => {

     
   
    try {
      const res = await axios.post(
        `https://back.learniix.com/api/signup`,
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
      notifySuccess();
      console.log(res.data.message.toString())

      //wait for 2 seconds before redirecting

       
    

      setTimeout(() => {
        router.push( '../affiliates/signin');
      }, 3000);


      
    } catch (err) {
      
    
      if (err instanceof Error) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const errorResponse = axiosError.response as AxiosResponse;
          if (errorResponse.data) {
            errorMessage = errorResponse.data.message;
          }
        }

        notifyFailure(errorMessage)

         console.log(errorMessage);
      }
      
      setIsLoading(false);
      console.log(err);
    }
    finally {
      setIsLoading(false);

    }
  };

  

  return (

    <>
    <Toaster />
   {/*Pop to display options for getting started*/}
<Fragment>
     
     <Dialog
       open={open}
       TransitionComponent={Transition}
       keepMounted
       onClose={handleClose}
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle className="font-medium text-sm">{"Create An Account On Learniix"}</DialogTitle>
       <DialogContent>
        <div className="bg-black p-2 rounded-md text-white text-center shadow-xl hover:shadow-2xl cursor-pointer font-light">
          Become An Affiliate
        </div>

        <div className="bg-green-500 p-2 rounded-md text-white text-center mt-4 shadow-xl hover:shadow-2xl cursor-pointer font-light">
          Become A Vendor
        </div>
         
       </DialogContent>
      
     </Dialog>
   </Fragment>


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
       <h1 className='text-green-600 md:text-4xl text-xl font-bold md:text-left text-center'>Become An Affiliate</h1>

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


      <div className="w-screen justify-center flex md:mt-10 mt-[130px]">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">Create Your <span className="text-green-500 font-semibold">LEARNIIX</span> Affiliate Account</p>


  </div></div>

   <div className="w-screen justify-center flex md:mt-10 mt-6 mt-2 md:px-0 px-4 ">

      <form onSubmit={formik.handleSubmit} className='md:w-1/3 p-4 w-full rounded-xl shadow-xl'>


       <div className="block">

       <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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

       <div className="block">

<TextField
 fullWidth
 id="firstName"
 name="firstName"
 label="First Name"
 variant="outlined"
 margin="normal"
 value={formik.values.firstName}
   onChange={formik.handleChange}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
//  {...register('email', { required: true })}
 InputProps={{
   startAdornment: (
     <InputAdornment position="start">
       {/* Icon for email (replace with your icon) */}
     
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


<div className="block">

<TextField
 fullWidth
 id="lastName"
 name="lastName"
 label="Last Name"
 variant="outlined"
 margin="normal"
 value={formik.values.lastName}
   onChange={formik.handleChange}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
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

<div className="block">

<TextField
 fullWidth
 id="phone"
 name="phone"
 label="Phone"
 variant="outlined"
 margin="normal"
 value={formik.values.phone}
   onChange={formik.handleChange}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
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

      {
        isLoading==false?(<>
        <button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        FINISH REGISTRATION
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

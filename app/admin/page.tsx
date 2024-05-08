"use client"

import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { CSSProperties, useEffect, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { PropagateLoader } from 'react-spinners';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoginDialog from './login_dialog';


export default function Admin(){
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
      const notifySuccess = () => toast.success("Login successful");
      const notifyError = (message: any) => toast.error(message);
      const notifyCustomSuccess = (message: any) => toast.error(message);
      
      const removeTrailingSpaces = (value: string) => (typeof value === 'string' ? value.trimEnd() : value);
    
    
    
    
      const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      
    
       const validationSchema = yup.object({
        email: yup
          .string()
          .email('Enter a valid email')
          .transform(removeTrailingSpaces)
          .required('Email is required'),
        password: yup
          .string()
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
      });
       const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
       
    
          setIsLoading(true);
         
    
         
    
           const formData = new FormData();
    
           formData.append('email', values.email);
           formData.append('password', values.password);
    
          // alert(JSON.stringify(formData, null, 2));

          router.push("../admin/sales");
          
    
         
        },
      });
    
   
    return(
    
        <>
       <LoginDialog />
     <div className="w-screen h-screen  bg-white  ">
         <div className="w-screen h-20  flex justify-center shadow-2xl">
          
       
         

         <img src={"/images/logo.jpeg"} height={40} width={40} alt={"learniix-logo"} className="h-20 w-40"/>
      
           
         </div>

         <div className="w-screen  flex justify-center  lg:pt-20 pt-4 sm:pt-4">

            <div className="success-box p-4 text-center shadow-2xl  bg-white lg:w-1/3">

                <p className="text-xl font-semibold text-gold">Admin Login</p>
               
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
 Submit
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


         </div>
        </div>

   
     </>
    )
}
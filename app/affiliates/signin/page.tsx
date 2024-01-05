"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import FAQs from '../../components/Faqs'
import Footer from '../../components/Footer';
import AppBar from '../../components/Appbar';


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
      

      runAPI(formData );
    },
  });

  const runAPI = async (values: FormData) => {

    setIsLoading(true);



    try {
      const res = await axios.post(
        `https://back.learniix.com/api/login`,
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
     // notifySuccess();
      console.log(res.data.user_details.firstName)
      var user = {"user_id":res.data.user_details.id,"firstName":res.data.user_details.firstName, "total_sales_vendor_cash":res.data.user_details.total_vendor_sales_cash,"total_sales_vendor":res.data.user_details.total_vendor_sales, "bank":res.data.user_details.bank, "bank_account":res.data.user_details.bank_account_name, "bank_account_number":res.data.user_details.bank_account_number,
      "unpaid_earnings_vendor":res.data.user_details.unpaid_balance_vendor, "total_aff_sales_cash":res.data.user_details.total_aff_sales_cash,"total_aff_sales": res.data.user_details.total_aff_sales ,"unpaid_balance":res.data.user_details.unpaid_balance,
       "lastName":res.data.user_details.lastName, "isVendor":res.data.user_details.is_vendor, "id":res.data.user_details.id, "affiliate_id":res.data.user_details.affiliate_id, "logged_in":true,"auto_withdraw":res.data.user_details.withdrawal_settings,"naira_exchange_rate":res.data.naira_exchange_rate.value, "ghs_exchange_rate":res.data.ghs_exchange_rate.value, "convert_total_aff_sales_usd":res.data.convert_total_aff_sales_usd,
       "convert_balance_usd":res.data.convert_balance_usd
      };

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      Cookies.set('user_details', JSON.stringify( user),{ expires: expiryDate });

      if(res.data.user_details.is_payed=="true"&&res.data.user_details.email_verified==true&&res.data.user_details.is_vendor==false){

         notifySuccess();
         //wait for 3 seconds before redirecting
        setTimeout(() => {
          router.push('dashboard');


        }, 3000);



      }
      

      else if(res.data.user_details.is_vendor==true){

        notifyError("You're attempting to sign into a vendor account on the affiliate portal. Please visit the vendor login page");
     
     }

      else if(res.data.user_details.is_vendor==false && (res.data.user_details.is_payed=="false" || res.data.user_details.is_payed == null)){
        //user is an affiliate that hasn't paid reg fees

        notifyCustomSuccess("Your affiliate account has not been activated. Redirecting to activation page....");

         //wait for 3 seconds before redirecting
         setTimeout(() => {
        
                router.push('/new/affiliate/pay?user_id='+res.data.user_details.id);

                
         

        }, 3000);

      }
      else if(res.data.user_details.is_vendor==false && res.data.user_details.email_verified==false){

        //user is an affiliate that has not verified email

        notifyCustomSuccess("Your affiliate email has not been verified...");
        Cookies.set("email",res.data.user_details.email)

         //wait for 3 seconds before redirecting
         setTimeout(() => {
        
          router.push('verify');

         

        }, 3000);

      }

      
    
     

      
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

{/* Login section/form*/}

<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl md:mt-0 mt-10">Login To Your <span className="text-green-500 font-semibold">LEARNIIX</span> Account</p>


  </div></div>


  <div className="w-screen justify-center flex ">

  <div className="md:w-1/3 w-full  text-center">

  <p className="text-green-500 text-md  font-semibold">Affiliate Login</p>


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

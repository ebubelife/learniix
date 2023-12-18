"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import FAQs from '../components/Faqs'
import Footer from '../components/Footer';
import AppBar from '../components/Appbar';


import { useState, useEffect, forwardRef, Fragment } from "react";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TransitionProps } from '@mui/material/transitions';




export default function About() {

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
<h1 className='text-green-600 md:text-4xl text-xl font-bold md:text-left text-center'>LEARNIIX INC </h1>

<h1 className='text-white text-md md:text-left text-center font-smibold mt-4 '>Learniix is a digital marketplace where we help creators of digital products get more sales and connect with more customers via our platform and network of high performing affiliates.
</h1>
 
       {/*mobile version shows only on mobile */}
       <div className="md:mt-4 mt-8 flex  justify-center md:hidden ">
     <div className=' rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-md  py-2 '>Built To Grow</div>

     </div>

 {/*large screen version shows only on large */}
     <div className="md:mt-4 mt-8 hidden md:block  ">
     <div className='h-10 rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-xl  py-1 '>Built To Grow</div>

     </div>


       <h1 className='text-white md:text-md text-sm font-light mt-4 md:text-left text-center  '>With the goal of empowering individuals and businesses with unparalleled opportunities. Immerse yourself in a narrative that centers around your business growth.
 </h1>
      

      
      
       </div>

     
       

       <div>
       <img src="/images/home/360_F_299939547_CwlOeI0nQ0ZACCpGmDrz2ZmOqsTfcvBf-removebg-preview.png" className='hero-image h-full w-full'  alt="hero-image" />

       </div>

</div>

      </div>


{/* About*/}

<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">About  <span className="text-green-500 font-semibold">LEARNIIX</span></p>


  </div></div>



      <div className="w-screen justify-center flex md:mt-10 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-2/3 p-4 w-full rounded-xl shadow-xl'>

      
       <p className='mt-4 text-sm text-center text-zinc-800'>Learniix stands as a digital marketplace dedicated to assisting digital product creators in boosting their sales and expanding their customer base through our platform and a network of top-performing affiliates.
</p> 

<p className='mt-4 text-sm text-center text-zinc-800'>
Our mission revolves around empowering individuals and businesses with exceptional opportunities. Engage in a journey that revolves around fostering your business growth.

</p>

<p className='mt-4 text-sm text-center text-zinc-800'>
Our primary focus is delivering VALUE, a cornerstone of our expertise.
</p>

<p className='mt-4 text-sm text-center text-zinc-800'>We&apos;re consistently accessible to our affiliates, providing complimentary mentoring sessions integral to every action we take to elevate our affiliates&apos; sales and income.
</p>


        </div>


      </div>


{/* Our Journey*/}
      <div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">OUR  <span className="text-green-500 font-semibold">JOURNEY</span></p>


  </div></div>



      <div className="w-screen justify-center flex md:mt-2 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-2/3 p-4 w-full rounded-xl shadow-xl'>

      
       <p className='mt-4 text-sm text-center text-zinc-800'>We&apos;re excited to lift the curtain and give you an exclusive sneak peek into the fascinating journey that gave birth to our existence!

</p> 

<p className='mt-4 text-sm text-center text-zinc-800'>
Our founders who are driven by a shared uncommon passion for revolutionizing online opportunities, came together to create a platform where quality and value take center stage.

</p>

<p className='mt-4 text-sm text-center text-zinc-800'>
We believe in forging pathways that lead to not only profitability but also personal fulfillment and societal progress. 

</p>



        </div>


      </div>



{/* Our Mission*/}
<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">OUR  <span className="text-green-500 font-semibold">MISSION</span></p>


  </div></div>



      <div className="w-screen justify-center flex md:mt-2 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-2/3 p-4 w-full rounded-xl shadow-xl'>

      
       <p className='mt-4 text-sm text-center text-zinc-800'>To create an unparalleled enablement for individuals and businesses to thrive in sales opportunities.


</p> 




        </div>


      </div>


      {/* Our Vision*/}
<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">OUR  <span className="text-green-500 font-semibold">VISION</span></p>


  </div></div>



      <div className="w-screen justify-center flex md:mt-2 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-2/3 p-4 w-full rounded-xl shadow-xl'>

      
       <p className='mt-4 text-sm text-center text-zinc-800'>To foster an unmatched high entrepreneurial skills amongst the young Nigerians with the view of reducing the crime rate.



</p> 




        </div>


      </div>



       {/* Our Core Values*/}
<div className="w-screen justify-center flex md:mt-10 mt-20">

<div className="md:w-1/3 p-4 text-center">

  <p className="text-zinc-800 text-xl">OUR  <span className="text-green-500 font-semibold">CORE VALUES</span></p>


  </div></div>



      <div className="w-screen justify-center flex md:mt-2 mt-6 mt-2 md:px-0 px-4 ">

        <div className='md:w-2/3 p-4 w-full rounded-xl shadow-xl'>

      
       <p className='mt-4 text-sm text-center text-zinc-800'>Raise the entrepreneurial bars of the Young individuals high by opening uncharted pathways of sales opportunities.
       </p> 

       <p className='mt-4 text-sm text-center text-zinc-800'>
Create an enabling digital environment for direct and indirect national transformation through legitimate online sales.



</p> 




        </div>


      </div>


{/* FAQS */}



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

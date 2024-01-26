"use client"
import { Button } from '@mui/material';

import Cookies from 'js-cookie'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';


export default function Success(){

  

  


    return(
    
        <>
       
     <div className="w-screen h-screen  bg-white  ">
         <div className="w-screen h-20  flex justify-center shadow-2xl">
          
       
         
         <img src={"/images/home/learniix_logo.jpeg"} height={40} width={60} alt={"learniix-main-logo"} className="h-20 w-60"/>
            
           
         </div>

         <div className="w-screen  flex justify-center  lg:pt-20 pt-4 sm:pt-4">

            <div className="success-box p-4 text-center shadow-2xl  bg-white lg:w-1/3">

                <p className="text-xl font-semibold text-gold">Congratulations👍</p>

                <p className=" text-grey_600 mt-4">You&apos;ve successfully made the purchase for a one year vendor plan on Learniix </p>
<br></br>
             

                <Link href="../vendors/signin" className="bg-green-500 text-white hover:bg-white hover:text-zinc-500 mt-10 rounded-full text-sm p-3 shadow-xl">
               Login To your account
                </Link>    

           
               


            </div>


         </div>
        </div>

   
     </>
    )
}
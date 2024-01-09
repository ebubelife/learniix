import { Button } from '@mui/material';

import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';



export default function AdminLogin(){

   
    return(
    
        <>
       
     <div className="w-screen h-screen  bg-white  ">
         <div className="w-screen h-20  flex justify-center shadow-2xl">
          
       
         

         <img src={"/images/logo.jpeg"} height={40} width={40} alt={"learniix-logo"} className="h-20 w-40"/>
      
           
         </div>

         <div className="w-screen  flex justify-center  lg:pt-20 pt-4 sm:pt-4">

            <div className="success-box p-4 text-center shadow-2xl  bg-white lg:w-1/3">

                <p className="text-xl font-semibold text-gold">An Error Occured!!!</p>
               
                {
                
              <>
                <p className="text-grey_600 mt-4"> Either <b>affiliate code</b> or the  <b>product code</b> is missing in your link. Please try again or contact support </p>

<p className="text-grey_600 mt-4"> Go to <Link href={"https://learniix.com"}> learniix.com</Link>   for more information on how our affiliate system works. </p>

<div className="w-full mt-7 flex justify-center">
              <Link href={"https://learniix.com"} className="bg-green-500 text-white hover:bg-white hover:text-green-500 rounded-full text-sm p-3 shadow-xl">
             Back To Home
                </Link>

              </div>

              </>
             
                
                
                }


           
               


            </div>


         </div>
        </div>

   
     </>
    )
}
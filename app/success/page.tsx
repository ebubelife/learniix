"use client"
import { Button } from '@mui/material';

import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';


export default function Success(){

    var cookiesDetails = Cookies.get("course_details");
    var productName="";
    var productPrice =""
    var productTYPage =""
    var productID =""
    const router = useRouter(); 

    var productDetails = cookiesDetails !=undefined?JSON.parse(cookiesDetails) : undefined;

    productName = cookiesDetails!=undefined ? productDetails.product_name:" "
    productPrice = cookiesDetails!=undefined ? productDetails.product_price:" "
    productTYPage = cookiesDetails!=undefined ? productDetails.productTYPage:" "
    productID = cookiesDetails!=undefined ? productDetails.product_id:" ";

    useEffect(() => {
      //check if logged in
      
if( cookiesDetails == null ||  cookiesDetails == undefined){
 

  router.push('https://learniix.com');

}


}, []);

    return(
    
        <>
       
     <div className="w-screen h-screen  bg-white  ">
         <div className="w-screen h-20  flex justify-center shadow-2xl">
          
       
         

         <img src={"/images/logo.png"} height={40} width={40} alt={"course-image"} className="h-20 w-40"/>
      
           
         </div>

         <div className="w-screen  flex justify-center  lg:pt-20 pt-4 sm:pt-4">

            <div className="success-box p-4 text-center shadow-2xl  bg-white lg:w-1/3">

                <p className="text-xl font-semibold text-gold">Congratulations👍</p>
               
                {
                
                productID=="1"?(<> 
                <p className=" text-grey_600 mt-4">You&apos;ve successfully made the purchase for <span className='font-semibold'>{ productName}</span> at the price of <span className='font-semibold'>₦{ productPrice}</span>. You will receive an email confirming this order.<br></br> We have also sent you an email to complete your registration as an affiliate on <b>Learniix Ecosystem</b>. You will also be able to access the Learniix Income Blueprint through your dashboard. </p>
                </>):(<>
                  <p className=" text-grey_600 mt-4">You&apos;ve successfully made the purchase for <span className='font-semibold'>{ productName}</span> at the price of <span className='font-semibold'>₦{ productPrice}</span>. You will receive an email confirming this order. Please click the button below to access the product </p>

                
                </>)
                
                }

{
                
                productID=="1"?(<>

              

                {
                  /*

                  <div className="w-full mt-10 flex justify-center">
              <div className="bg-gold text-white hover:bg-white hover:text-grey_600 rounded-full text-sm p-3 shadow-xl">
               Check your email for further instructions
                </div>

              </div>
                  */
                }


                   
                 </>):(<>
                  <div className="w-full mt-10 flex justify-center">
              <Link href={productTYPage} className="bg-gold text-white hover:bg-white hover:text-grey_600 rounded-full text-sm p-3 shadow-xl">
                Complete Course Registration
                </Link>

              </div>
                 </>)

}
               

           
               


            </div>


         </div>
        </div>

   
     </>
    )
}
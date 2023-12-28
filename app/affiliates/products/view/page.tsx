"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import AffiliateDashboardHeader from '../../dashboard/header/page';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Cookies from 'js-cookie';


// Your main component
const ProductView = () => {
    const notifySuccess = () => toast.success("Affiliate Link Copied to Clipboard");

    function handleCopyClick(){
        notifySuccess();

    }

    var user_data = Cookies.get('user_details');
   
    var naira_exchange_rate = ""; var convert_balance_usd ="";
    
    
    var user_id =""; var affiliate_id = "";
   
    
    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;

        affiliate_id = (user as any).affiliate_id;
        naira_exchange_rate = (user as any).naira_exchange_rate;
        convert_balance_usd = (user as any).convert_balance_usd;
            
       
        
 
     }
  


  return (
    <div >
        <Toaster/>

      <AffiliateDashboardHeader title="Product - Google Ads Pro..." />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl p-4'>
                <p className='text-xl font-medium text-zinc-600'>Product Banner</p>


<div className=" mt-6 h-96 w-full bg-zinc-200 grid place-content-center rounded-md">


<p>Product Banner</p>

</div>
                
                
                
               

            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Product Information</p>


    <div className="block mt-6">

<p className='font-semibold text-green-500'>HOW TO RUN GOOGLE ADS THAT CONVERT</p>
</div>


<div className="block mt-6">

<p className='text-left text-sm '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>


<div className="block mt-6">

<p>Affiliate Sales Materials</p>

<p className='mt-4 text-green-500'>https://salesmaterialsgoogleads.com/affiliates/learniix</p>
</div>


<div className="block mt-6">

<p>Product Price</p>

<p className='mt-4 text-green-500'>$60</p>
</div>


<div className="block mt-6">

<p>Affiliate Commission</p>

<p className='mt-4 text-green-500'>50%</p>
</div>


<div className="block mt-6">

<p>Current Sales</p>

<p className='mt-4 text-green-500'>Over 1200 sales</p>
</div>


<CopyToClipboard text={"https://learniix.com/aff?aff_id="+affiliate_id +"&pid="+"1"}
          onCopy={() => handleCopyClick()}>
        <button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Copy Affiliate Link
      </button>
        </CopyToClipboard>



      <p className='text-sm font-italics mt-2 text-center'>Copy your affiliate link for this product and start selling!</p>


</div>


</div>
       </div>








</div>
       

     
    

    


      {
        /* <div className="preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

        */
      }
     
   
       
       </div>
 
  );
};

export default ProductView

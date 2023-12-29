"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import VendorDashboardHeader from '../../../header/page';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';


// Your main component
const ProductView = () => {
    const notifySuccess = () => toast.success("Affiliate Link Copied to Clipboard");
    const router = useRouter(); 
    
    const [products, setData] = useState([]); 
    const [isLoading, setLoading] = useState(true); 


    const [open, setOpen] = React.useState(false);

    function handleCopyClick(){
        notifySuccess();

    }

    var user_data = Cookies.get('user_details');
   
    var naira_exchange_rate = ""; var convert_balance_usd ="";
    
    
    var user_id =""; var affiliate_id = ""; var firstname= "";
   
    
    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;

        affiliate_id = (user as any).affiliate_id;
        firstname =(user as any).firstName;
            
       
        
 
     }



 
 

 
  

   
  


  return (
    <div >
        <Toaster/>

      <VendorDashboardHeader title="Integration" />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl p-4'>
                <p className='text-xl font-medium text-zinc-600'>Integration</p>


<div className=" mt-6 h-96 w-full bg-zinc-200 grid place-content-center rounded-md">


<p>Product Banner</p>

</div>
                
                
                
               

            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Product Information</p>


    <div className="block mt-6">

<p className='font-semibold text-green-500'>HOW TO CONNECT THIS PRODUCT TO LEARNIIX MARKETPLACE</p>
</div>


<div className="block mt-6">

<p className='text-left text-sm '>After creating your product on Learniix through your vendor account, the next step is to connect your sales page properly to the market place. 
This will make it super easy for our affiliates to recommed your products and also for the system to efficiently record every traffic and sale on your products through the links of our affiliates. To do so:</p>
</div>


<p className='text-left text-sm mt-2'><b>1.</b> Have a quality sales page ready. Our team will vet the sales pages submitted and shabby or poorly created pages will be rejected and products will not be approved.</p>

<p className='text-left text-sm mt-2'><b>2.</b> Ensure that all &apos;buy&apos;, &apos;purchase&apos;, &apos;buy now&apos; and/or any button that should allow the prospect buy your product is connected to your purchasing link. You can copy your unique purchasing link below.</p>







<CopyToClipboard text={"https://learniix.com/aff?aff_id="+affiliate_id +"&pid="+"1"}
          onCopy={() => handleCopyClick()}>
        <button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
       Copy Purchase Link
      </button>
        </CopyToClipboard>



      <p className='text-sm font-italics mt-2 text-center'>Copy your purchase link for this product and integrate to your sales page.</p>


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

"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';


import VendorDashboardHeader from '../header/page';
import Cookies from 'js-cookie'
import axios from 'axios';



// Your main component
const VendorDashboard = () => {
  var user_data = Cookies.get('user_details');
  var firstname =""; var isVendor =false;
  var total_vendor_sales_cash ="";
  var total_vendor_sales =""; var unpaid_balance_vendor ="";
  var unpaid_earnings_vendor = ""; var user_id = ""

  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState([]); 
  const [productsData, setProductsData] = useState([]); 

  if(user_data){
      var user = JSON.parse(user_data)

        
      firstname =(user as any).firstName;
      isVendor =(user as any).isVendor;
      user_id = (user as any).id;

      total_vendor_sales_cash = (user as any).total_sales_vendor_cash;

      total_vendor_sales = (user as any).total_sales_vendor;
      unpaid_earnings_vendor = (user as any).unpaid_earnings_vendor;

     
      

   }

   //get vendor affiliates

   useEffect(() => {
       
    // Make an HTTP GET request to the API endpoint using axios
    axios.get('https://back.learniix.com/api/view/affiliates/'+ user_id )
      .then((response: any) => {
          
           

          
           setData(response.data);
          
           setIsLoading(false)
           console.log(response.data);

           
      })
      .catch((error: any) => {
        // Handle errors if any
        console.error(error);
        setIsLoading(false)
      });
    }, [user_id ]);


 //get vendor products

 useEffect(() => {
   
    // Make an HTTP GET request to the API endpoint using axios
    axios.get('https://back.learniix.com/api/view/vendor_products/'+ user_id )
      .then((response: any) => {
          
           

          
           setProductsData(response.data);
          
           setIsLoading(false)
           console.log(response.data);

           
      })
      .catch((error: any) => {
        // Handle errors if any
        console.error(error);
        setIsLoading(false)
      });
    }, [user_id ]);


 
  


  return (
    <div >
      <VendorDashboardHeader title="Vendors Dashboard" />

      <div className="w-screen h-screen px-4 py-4">


      <p className="dashboard-salute text-grey_600 text-3xl mt-5">
                           Hello {firstname}, 
                        </p>

                        {total_vendor_sales_cash=="0.00" ? (
                            <>
                             <p className="dashboard-text text-green  mt-1">
                           Your affiliates have not made any sales yet...
                        </p>
                            </>

                        ):(<>
                        <p className="dashboard-text text-grey_600  mt-1">
                           Your affiliates are making new sales!
                        </p>
                        </>)}


       <div className="mt-6"></div>

<div className='w-screen  px-10'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>₦ {(parseInt(total_vendor_sales_cash).toLocaleString())}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{total_vendor_sales}</p>


</div>
</div>

<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Unpaid Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>₦ {(parseInt(unpaid_earnings_vendor)).toLocaleString()}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Number of Affiliates</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{data.length}</p>


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
       
       </div>
 
  );
};

export default VendorDashboard

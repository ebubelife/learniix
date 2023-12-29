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
    var productDetails = Cookies.get('product_details');
    var productName ="";
    var productDescription ="";
    var vendorFirstName ="";
    var vendorLastName="";
    var productPrice ="";
    var productCommission ="";
    var productID = ""; var productJVLink =""; var imagePath = "";
    var selected_currency = Cookies.get('selected_currency');
    var naira_exchange_rate = ""; var convert_balance_usd ="";
    
    
    var isVendor =false;var user_id =""; var affiliate_id = "";
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);
  
    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;

        affiliate_id = (user as any).affiliate_id;
        naira_exchange_rate = (user as any).naira_exchange_rate;
        convert_balance_usd = (user as any).convert_balance_usd;
            
       
        
 
     }

   
     if(productDetails){
        var details = JSON.parse(productDetails)
        productDescription = (details as any).productDescription;
        productName = (details as any).productName;
        vendorFirstName = (details as any).vendor_data1.original.firstName ;
        vendorLastName = (details as any).vendor_data1.original.lastName ;
        productPrice = (details as any).productPrice;
        productCommission = (details as any).productCommission;
        productJVLink = (details as any).productJVLink;
        productID = (details as any).id;
        imagePath = (details as any).image_path;
     }


     const convertPriceCurrency =(value:any)=>{

        if(selected_currency ){
  
          if(selected_currency = "USD"){
  
              var product_price_usd = parseInt(value) / parseInt(naira_exchange_rate);
  
  
              return "$ "+ (product_price_usd).toString();
  
  
            
          }
  
          else if(selected_currency = "NGN"){
  
           // var ngn_bal = (parseInt(convert_balance_usd) * parseInt(naira_exchange_rate));
  
            return "₦ "+value.toString();
  
  
          }
  
  
        }
  
        else{
  
          var product_price_usd = parseInt(value) / parseInt(naira_exchange_rate);
  
  
          return "$ "+ (product_price_usd).toString();
  
        }
  
      
       }
  
  
 
    



  return (
    <div >
        <Toaster/>

      <AffiliateDashboardHeader title={"Product Info"} />

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

<p className='font-semibold text-green-500'>{productName}</p>
</div>


<div className="block mt-6">

<p className='text-left text-sm '>{productDescription}</p>
</div>


<div className="block mt-6">

<p>Affiliate Sales Materials</p>

<p className='mt-4 text-green-500'>{productJVLink}</p>
</div>


<div className="block mt-6">

<p>Product Price</p>

<p className='mt-4 text-green-500'>{convertPriceCurrency(productPrice)}</p>
</div>


<div className="block mt-6">

<p>Affiliate Commission</p>

<p className='mt-4 text-green-500'>{productCommission}%</p>
</div>


{/*<div className="block mt-6">

<p>Current Sales</p>

<p className='mt-4 text-green-500'>Over 1200 sales</p>
</div>
*/
}

<CopyToClipboard text={"https://learniix.com/aff?aff_id="+affiliate_id +"&pid="+productID}
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

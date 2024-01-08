"use client"

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField'
import axios, { AxiosError, AxiosResponse } from 'axios';
import Image from 'next/image'
import { useRouter,useSearchParams } from 'next/navigation';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from '/styles/style.module.css';
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'

import FormData from 'form-data';
import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'

import PropTypes from 'prop-types';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Buy(){
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsLoading(false)
    setOpen(false);
  };
  ///const publicKey = "pk_test_54eddd6baf306492c5cbc6230c6b133435fe1d59"


  let [color, setColor] = useState("#90EE90");

  const [amount , setAmount] = useState(0)
  const [email, setEmail] = useState("")
  const [name, setName] = useState(" ")
  const [phone, setPhone] = useState(" ")



  const notifySuccess = () => toast.success("Transaction Successful!");
  var errorMessage =""
  const notifyFailure = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => toast.error(message);
  var cc;
  const [isLoading, setIsLoading] = React.useState(false);
  
    const [productName, setProductName] = React.useState();
    const [productImage, setProductImage] = React.useState();
    const [productVendor, setProductVendor] = React.useState();
    const [productCommission, setProductCommission] = React.useState();
    const [productPrice, setProductPrice] = React.useState("");
    const [ thankYouPage ,  setThankYouPage] = React.useState();
    const [ reference ,  setReference] = React.useState("");

    //Form details

    const [customerName, setcustomerName] = React.useState();
    const [customerPhone, setcustomerPhone] = React.useState();
    const [customerEmail, setcustomerEmail] = React.useState();

    const router = useRouter();
    const searchParams = useSearchParams();
   

    const productID  = searchParams.get('pid');
    const affiliateID  = searchParams.get('aff_id');

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    
   

    useEffect(() => {
      // Make an HTTP GET request to the API endpoint using axios
 axios.get(`https://back.learniix.com/api/view/product/${productID}`)
 .then((response: any) => {
     
      

   console.log(response);
   setProductName(response.data.productName);
   setProductImage(response.data.image);
   setProductVendor(response.data.vendor_id);
   setProductCommission(response.data.productCommission)
   setProductPrice(response.data.productPrice)
   setThankYouPage(response.data.ProductTYLink);

   if(affiliateID =="Fk9vMl" && productID == "1"){

    setAmount(15000)

    setProductPrice("15000");

   }else{

    setAmount((parseInt(response.data.productPrice)))

   // setProductPrice(response.data.productPrice);

   }

   
 
 })
 .catch(error => {
   // Handle errors if any
   console.error(error);
   setIsLoading(false)
 });

   }, [productID]);




 

   const submit = async(event: any) => {

    event.preventDefault();
    setIsLoading(true);

    //transaction reference code
    var referenceCode = Date.now().toString()
    setReference(referenceCode);

    var c_details = {'product_price':productPrice, 'product_name':productName, 'productTYPage': thankYouPage, 'product_id':productID }

    console.log(JSON.stringify(c_details ));

    Cookies.set("course_details",JSON.stringify(c_details ));

   /*  var v = [{'customer_name':customerName}, 
              {'customer_email':customerEmail},
               {'customer_phone':customerPhone},
               {'commission':productCommission},
               {'product_price':productPrice},
               {'vendor_id':productVendor},
               {'affiliate_id':affiliateID},
               {'product_id':productID}
              
              ]*/

          
           

      
            handleClickOpen()
        

            
 
  } 

  async function   runAPI(currency:any) {


    var formData = new FormData();

    // formData.append('affiliate_id',affiliateID)
    if(customerName!=null)
      formData.append('customer_name',customerName)
    if(customerEmail!=null)
      formData.append('customer_email',customerEmail)
    if(customerPhone!=null)
      formData.append('customer_phone',customerPhone)
    if(productCommission!=null)
      formData.append('commission',productCommission)
    if(productPrice!=null)
      formData.append('product_price',productPrice)
    if(productVendor!=null)
      formData.append('vendor_id',productVendor)

    if(affiliateID!=null)
      formData.append('affiliate_id',affiliateID.toString())

    if(productID!=null && productID!=undefined){
      formData.append('product_id',productID.toString())
    }

    if(reference!=null && reference!=undefined){
      formData.append('tx_id',reference)
    }

     if(currency!=null && currency!=undefined){
      formData.append('currency',currency)
    }


    try {
      const res = await axios.post(
        `https://back.zenithstake.com/api/sales/add`,
        formData,
       
        {
         // withCredentials: true ,

         headers:{
          'Content-Type' :'multipart/form-data',
        

         
         },
         
         // params: {values}
        }
       
      );
     
      setIsLoading(false);
      Cookies.set("payment_status","true");
      notifySuccess();

      setTimeout(() => {
        router.push("success")
      }, 3000);


    
     // console.log(res.data.message.toString())
     
    } catch (err) {
      
      if (err instanceof Error) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const errorResponse = axiosError.response as AxiosResponse;
          if (errorResponse.data) {
            errorMessage = errorResponse.data.message;
          }
        }

        notifyFailure(errorMessage)

       // alert("error  ")

         console.log(errorMessage);
      }
      
      setIsLoading(false);
      console.log(err);
    }
    finally {
      setIsLoading(false);

    }
  
  }

  function SquadPay() {

    const script = document.createElement('script');
    script.src = 'https://checkout.squadco.com/widget/squad.min.js';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      const squadInstance = new window.squad({
        onClose: () => console.log("Widget closed"),
        onLoad: () => console.log("Widget loaded successfully"),
        onSuccess: () => runAPI("NGN"),
        key: "pk_23f99ede02dca01abc34b3a629dfaaadd4f8501c",
        // Change key (test_pk_sample-public-key-1) to the key on your Squad Dashboard
        email: email,
        amount: (amount + 150) * 100,
       
        // Enter amount in Naira or Dollar (Base value Kobo/cent already multiplied by 100)
        currency_code: "NGN"
      });

      squadInstance.setup();
      squadInstance.open();
    };

   
}






  


    return (

        <>
           <Toaster />

           <div className="dialog">
           <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select A Payment Method</DialogTitle>
        <DialogContent>
          <DialogContentText className='text-sm'>
           Select a payment method below to finish the transaction <br></br>
           <p className="text-deepGold text-sm">Please NOTE that this sale is final and non-refundable</p>
          </DialogContentText>

          {/*
  
  <div className="paystack-button bg-white shadow-2xl   text-white hover:bg-white hover:text-grey_600 w-full py-2 rounded-xl mt-6 flex hover:shadow-xl">
        
        
          <img src="/images/Paystack.png" className="img-responsive h-8 w-20" alt="Paystack-zenithstake"/>
          <PaystackButton className="text-sm text-grey_600 hover:text-purple2 font-semibold ml-3" {...componentProps} />


          </div>*/
  
}

{
  /*<div className="paystack-button bg-white border-2 border-grey_300  text-white hover:bg-white hover:text-grey_600 w-full py-2 shadow-xl rounded-xl mt-6 flex">
          <img src="/images/ezgif.com-webp-to-png.png" className="img-responsive h-16 w-20" alt="Paystack-zenithstake"/>
          <button
          className='text-gold font-semibold ml-4'
        onClick={() => {

        //  SquadPay();
         
        }}
      >
        Pay with SquadCo
      </button>



          </div>*/

      }
        

        

          
           <div className="paystack-button bg-white border-2 border-grey_300  text-white hover:bg-white hover:text-grey_600 w-full py-2 shadow-xl rounded-xl mt-6 flex">
          <img src="https://learniix.com/images/SquadCo-By-GTCO-logo-png-transparent.png" className="img-responsive h-10 w-20" alt="Paystack-zenithstake"/>
          <button
          className='text-green-500 font-semibold ml-4 text-sm'
        onClick={() => {

            SquadPay();
         
        }}
      >
        Squad Co (NGN)
      </button>



          </div>

         
          
      
         

        


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='text-black'>Cancel</Button>
         
        </DialogActions>
      </Dialog>
           </div>


        <div className="w-screen  bg-white  ">
            <div className="w-screen h-20  flex justify-center shadow-2xl">
             
          
              <p className='text-black'>{cc}</p>

            <Image src={"/images/home/learniix_logo.jpeg"} height={40} width={40} alt={"learniix-main-logo"} className="h-20 w-40"/>
         

            </div>
        <div className="w-screen flex justify-center  px-3 sm:px-3 lg:py-10 lg:px-32 ">

           

            <div className="lg:border-l-grey_100 lg:border-l-2 py-10 lg:px-10 px-3 sm:px-3">
            <p className='font-semibold text-2xl text-gold text-center'>Buy This Product</p>
                    <p className='font text-sm text-grey_600 text-center'>Fill in your details below, make your payment for the product <br></br> - <b>{productName}</b></p>
             

                <form onSubmit={submit }>
                <div className='mt-6'>

<TextField
required
          className='mt-6'
       ///   onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          onChange={(e:any) =>{ setcustomerName(e.target.value),setName(e.target.value)}}
          id="outlined-multiline-static"
          label="Full Name"
         // onChange={(e:any) => setUserDataFirstName(e.target.value)}
         // value ={userDataFirstName}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#32CD32	',
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#cdcdcd',
              '&.Mui-focused': {
                color: 'black',
              },
            },
          }}
        
        />
        </div>



<p>Please ensure your email is correct</p>
        <div className='mt-6'>

<TextField
required
          className='mt-6'
          onChange={(e:any) => {setcustomerEmail(e.target.value),setEmail(e.target.value) }}
       ///   onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          type="email"
          id="outlined-multiline-static"
          label="Email Address"
         // onChange={(e:any) => setUserDataFirstName(e.target.value)}
         // value ={userDataFirstName}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#32CD32	',
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#cdcdcd',
              '&.Mui-focused': {
                color: 'black',
              },
            },
          }}
        
        />
        </div>

        <div className='mt-6'>

<TextField
required
          className='mt-6'
       ///   onChange={(e) => setProductDescription(e.target.value)}
       onChange={(e:any) => {setcustomerPhone(e.target.value), setPhone(e.target.value)}}
          fullWidth
          id="outlined-multiline-static"
          label="Phone Number"
         // onChange={(e:any) => setUserDataFirstName(e.target.value)}
         // value ={userDataFirstName}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#32CD32	',
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#cdcdcd',
              '&.Mui-focused': {
                color: 'black',
              },
            },
          }}
        
        />
        </div>



        <div className='mt-4'>
{!isLoading?(
         <>
         <input type="submit" className="paystack-button bg-green-500 text-white hover:bg-white hover:text-green-500 w-full py-2 shadow-xl rounded-xl hover:cursor-pointer" value="Complete Payment" />

       
         
         </>):
          (

            <div className='w-full flex justify-center'>
             <div className='w-full flex justify-center mt-6'>

<PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
</div>
             </div>
             
             )
}

</div>

                    </form>

                    
                </div>
                
        </div>

        </div>
      
        </>
    )

    
}



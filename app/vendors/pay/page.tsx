"use client"

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField'
import axios, { AxiosError, AxiosResponse } from 'axios';

import { useRouter,useSearchParams } from 'next/navigation';
import React, { CSSProperties, useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function Buy(){
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
   

  const vendorID  = searchParams.get('user_id');
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsLoading(false)
    setOpen(false);
  };
  ///const publicKey = "pk_test_54eddd6baf306492c5cbc6230c6b133435fe1d59"

  const notifySuccess = () => toast.success("Transaction Successful!");
  var errorMessage =""
  const notifyFailure = (message:string) => toast.error(message);

  const [isLoading, setIsLoading] = React.useState(false);
  
   const [amount , setAmount] = useState(10000)
   const [email, setEmail] = useState("vendorpayments@learniix.com")
   
  const [ reference ,  setReference] = React.useState(Date.now().toString());

   
      async function   saveTransaction(newUserID: string ) {

        var formData = new FormData();

          formData.append("user_id", newUserID)
          formData.append("tx_ref",reference)
          formData.append("tx_type", "VENDOR_REG")
          formData.append("amount", amount.toString())
          formData.append("status", "APPROVED")
      
      
          try {
            const res = await axios.post(
              `https://back.learniix.com/api/transaction/vendor/reg`,
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
            notifySuccess();
      
            setTimeout(() => {
              router.push("../vendors/success")
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
      
              alert("error  ")
      
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
        onSuccess: () => {saveTransaction(vendorID!.toString())},
        key: "pk_b8dd4911cc914a3cc35d08bfce1099ceb3aa34ad",
        //key: "sandbox_pk_6cf0272dfe344bddca7727d739e2f75121597ac7013c",
        // Change key (test_pk_sample-public-key-1) to the key on your Squad Dashboard
        email: email,
        amount: (amount + 150) * 100,
       
       
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
             
          
            

            <img src={"/images/home/learniix_logo.jpeg"} height={40} width={60} alt={"learniix-main-logo"} className="h-20 w-60"/>
         

            </div>
        <div className="w-screen flex justify-center  px-3 sm:px-3 lg:py-10 lg:px-32 ">

           

            <div className="lg:border-l-grey_100 lg:border-l-2 py-10 lg:px-10 px-3 sm:px-3">
            <p className='font-semibold text-2xl text-gold text-center'>Become A Vendor</p>
                    <p className='font text-sm text-grey_600 text-center'>Our vendor plans cost N10,000 yearly.
Select a payment method below complete your payment
for a yearly vendor plan.</p>
             

                    <button onClick={handleClickOpen}  className="paystack-button bg-green-500 text-white hover:bg-white hover:text-green-500 w-full py-2 shadow-xl rounded-xl hover:cursor-pointer"  >
                    Complete Payment</button>


                    
                </div>
                
        </div>

        </div>
      
        </>
    )

    
}


 
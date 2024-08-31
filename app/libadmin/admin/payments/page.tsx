"use client"
import Cookies from 'js-cookie';

import Image from 'next/image'
import Link from 'next/link';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from '/styles/style.module.css'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';



function convertDate(dateString: any){

    const date = new Date(dateString);
const formattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
return formattedDate;


}







export default function AdminPayments(){

    const [isLoading, setIsLoading] = useState(false);
    
    const [affiliatePaymentsData, setAffiliatePaymentsData] = useState([]); 
    const [vendorPaymentsData, setVendorPaymentsData] = useState([]); 
    const [paymentsData, setPaymentsDataData] = useState([]); 
    const [ affiliatesData,  setAffiliatesData] = useState([]); 
    const [ vendorsData,  setVendorsData] = useState([]); 
    const [ unpaid_cash_affiliates,    setTotalUnpaid_cash_affiliates] = useState("0.00"); 

    const [  unpaid_cash_vendor,     setTotalUnpaid_cash_vendor] = useState("0.00"); 
    const [  paystackBalance,        setPaystackBalance] = useState(""); 

    const [ unpaidAffiliatesData,  setUnpaidAffiliatesData] = useState(""); 
    const [ transfersData,  setTransfersData] = useState(""); 
    const [ payableAffData,  setPayableAffData] = useState([]); 
    

  

 
    
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    let [color, setColor] = useState("#90EE90");

     const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };


    const handleClickOpen1 = () => {
      setOpen1(true);
    };
    
    const handleClose1 = () => {

           //pull unpaid affiliates

           setIsLoading(true)
          // https://back.learniix.com/api/pay/affiliates

          axios.get('https://back.learniix.com/api/pay/affiliates' )
              .then((response: any) => {
                  
                   
    
                  
                  setTransfersData(response.data);

                 // alert(response.data.download_link)

                
                   setIsLoading(false)
                   console.log(response.data);

                   setOpen1(false);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
   
            // Make an HTTP GET request to the API endpoint using axios
           /* axios.get('https://back.learniix.com/api/view/payable_affiliates' )
              .then((response: any) => {
                  
                   
    
                  
                  setUnpaidAffiliatesData(response.data);

                 // alert(response.data.download_link)

                
                   setIsLoading(false)
                   console.log(response.data);

                   setOpen1(false);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
           */
      


    };

    const handleClickOpen2 = () => {
        setOpen2(true);
      };
      
      const handleCloseCancel1 = () => {
        setOpen1(false);
      };

       const handleCloseCancel2 = () => {
        setOpen2(false);
      };
      
      const handleClose2 = () => {

          //pull unpaid affiliates

          setIsLoading(true)
          // https://back.learniix.com/api/pay/affiliates

          axios.get('https://back.learniix.com/api/pay/vendors' )
              .then((response: any) => {
                  
                   
    
                  
                  setTransfersData(response.data);

                 // alert(response.data.download_link)

                
                   setIsLoading(false)
                   console.log(response.data);

                   setOpen2(false);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
   
            // Make an HTTP GET request to the API endpoint using axios
           /* axios.get('https://back.learniix.com/api/view/payable_affiliates' )
              .then((response: any) => {
                  
                   
    
                  
                  setUnpaidAffiliatesData(response.data);

                 // alert(response.data.download_link)

                
                   setIsLoading(false)
                   console.log(response.data);

                   setOpen1(false);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
           */
        
      };
  
   
      
            //pull sales
        useEffect(() => {
   
            // Make an HTTP GET request to the API endpoint using axios
            axios.get('https://back.learniix.com/api/transactions/view/affiliate_payments' )
              .then((response: any) => {
                  
                   
    
                  
                  setAffiliatePaymentsData(response.data);

                  setPaymentsDataData(response.data)
                
                   setIsLoading(false)
                   console.log(response.data);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, [ ]);

            //get payable affiliates
            useEffect(() => {
   
              // Make an HTTP GET request to the API endpoint using axios
              axios.get('https://back.learniix.com/api/view/payable_affiliates' )
                .then((response: any) => {
                    
                     
      
                    
                    setPayableAffData(response.data.unpaid_affiliates);
  
                   
                  
                     setIsLoading(false)
                     console.log(response.data.unpaid_affiliates);
      
                     
                })
                .catch((error: any) => {
                  // Handle errors if any
                  console.error(error);
                  setIsLoading(false)
                });
              }, [ ]);

            useEffect(() => {
   
                // Make an HTTP GET request to the API endpoint using axios
                axios.get('https://back.learniix.com/api/view/affiliates' )
                  .then((response: any) => {
                      
                       
        
                      
                      setAffiliatesData(response.data);

                      var affiliates = response.data;

                      var total_unpaid_cash_affiliates = 0;

                      for(let i=0; i<affiliates.length; i++){

                        var pending_earning_affiliate = parseInt(affiliates[i].unpaid_balance);

                        total_unpaid_cash_affiliates += pending_earning_affiliate;

                      }

                      setTotalUnpaid_cash_affiliates(total_unpaid_cash_affiliates.toString())
                    
                       setIsLoading(false)
                       console.log(response.data);
        
                       
                  })
                  .catch((error: any) => {
                    // Handle errors if any
                    console.error(error);
                    setIsLoading(false)
                  });
                }, [ ]);
    

                useEffect(() => {
   
                    // Make an HTTP GET request to the API endpoint using axios
                    axios.get('https://back.learniix.com/api/view/vendors' )
                      .then((response: any) => {
                          
                           
            
                          
                          setVendorsData(response.data);
    
                          var vendors = response.data;
    
                          var total_unpaid_cash_vendors = 0;
    
                          for(let i=0; i<vendors.length; i++){
    
                            var pending_earning_vendors = parseInt(vendors[i].unpaid_balance_vendor);
    
                            total_unpaid_cash_vendors += pending_earning_vendors;
    
                          }
    
                          setTotalUnpaid_cash_vendor(total_unpaid_cash_vendors.toString())
                        
                           setIsLoading(false)
                           console.log(response.data);
            
                           
                      })
                      .catch((error: any) => {
                        // Handle errors if any
                        console.error(error);
                        setIsLoading(false)
                      });
                    }, [ ]);

                useEffect(() => {
                const fetchData = async () => {
                    try {
                    const response = await axios.get('https://api.paystack.co/balance', {
                        headers: {
                        Authorization: 'Bearer sk_live_9e99c504399b16cf066e5d5a3eb0edfeb2f7de06',
                        },
                    });

                    console.log(response.data);

                    setPaystackBalance(response.data.data[0].balance)
                    } catch (error) {
                    console.error(error);
                    } finally {
                    // Handle loading state if needed
                    }
                };

                fetchData();
                }, []);

        

    
    
     return(

          <>
         {
//<LoginDialog />
   } 
           <Toaster />
          <Dialog open={open1} onClose={handleCloseCancel1}>
        <DialogTitle className="text-center text-green">Pay All Affiliates?</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
           This will pay all affiliates with pending earning. Please ensure you have more than the total unpaid earnings as your balance. Click the button below to download the payment sheet csv file
            </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel1}>Cancel</Button>

          {
           isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
           <div className={styles['loader']}></div>
          </div></div></>):(<> <Button onClick={handleClose1}>Proceed</Button></>)

         }
        
        </DialogActions>
      </Dialog>
         

      <Dialog open={open2} onClose={handleCloseCancel2}>
        <DialogTitle className="text-center text-green">Pay All Vendors?</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
          This will pay all vendors with pending earning. Please ensure you have more than the total unpaid earnings as your balance. Click the button below to download the payment sheet csv file
            </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel2}>Cancel</Button>

         {
           isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
           <div className={styles['loader']}></div>
          </div></div></>):(<> <Button onClick={handleClose2}>Proceed</Button></>)

         }
         
        
        </DialogActions>
      </Dialog>
         
            <main className="dashboard bg-grey_100  w-screen flex ">
             
              

                
                <div className=" grow bg-grey_100 p-6">
                    <div className="top-bar-container w-full border-b-2 border-grey_100 shadow-xl py-4 px-6">
                        <p className="dashboard-title text-grey_600 text-xl hidden sm:hidden lg:block">
                           Admin Payments
                        </p>

                        <div className="lg:hidden sm:block block">
                       
                        </div>
                        

                    </div>
                   
                
                      

<div className="dashboard-analytics-info grid lg:grid-cols-3 lg:gap-1 mt-3 grid-cols-1 sm:grid-cols-1  ">

<div className="dashboard-card h-32 shadow-lg border-2 border-grey_100 bg-white mt-4 p-4  ">

    <p className='text-grey_600'  >Unpaid Affiliates</p>
    <div className="flex">
    
       <p  className='text-grey_600 text-xl font-light ml-2 mt-6'>₦ { (parseInt(unpaid_cash_affiliates)).toLocaleString()}</p>
    </div>

</div>

<div className="dashboard-card h-32 shadow-lg border-2 border-grey_100 bg-white mt-4 p-4 ">
<p className='text-grey_600'  >Unpaid Vendors</p>
    <div className="flex">
  
    <p  className='text-grey_600 text-2xl font-light ml-2 mt-6'>₦ { (parseInt(unpaid_cash_vendor)).toLocaleString()}</p>
    </div>

</div>














</div>



<div className="flex">
<button onClick={()=>handleClickOpen1()} className='text-white bg-green-500 mt-6 p-4 rounded-xl shadow-xl'>Pay Affiliates</button>
<button onClick={()=>handleClickOpen2()} className='text-white bg-black mt-6 p-4 rounded-xl shadow-xl ml-4'>Pay Vendors</button>

</div>

<br></br><br></br>

{/*

unpaidAffiliatesData !=""?(<><Link href={"https://back.learniix.com"+unpaidAffiliatesData?.download_link} className='mt-10 text-green'>

Download Unpaid Affiliates CSV file
</Link>
</>):(<></>)*/
}

{

transfersData !=""?(<><p className='mt-10 text-green'>

Transfers have been successfully sent!
</p>
</>):(<></>)
}


<p className='text-green text-xl mt-3'>Payment Transactions</p>


<div className="flex">
<p className='text-grey_600 text-xl mt-3 cursor-pointer hover:text-grey_300'>Affiliates  |  </p>



<p className='text-green text-xl mt-3 ml-2 cursor-pointer hover:text-grey_300'>   Vendors</p>
</div>



<div className="top-vendors-courses  w-full  mt-4 p-2 max-h-96 overflow-y-scroll ">

<div className='w-full mt-4 text-grey_600 lg:block hidden sm:hidden '>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3 text-green">
                    Full Name
                </th>
             
                 <th scope="col" className="px-6 py-3">
                   Acc Num
                </th>
                <th scope="col" className="px-6 py-3">
                    Bank
                </th>
                <th scope="col" className="px-6 py-3">
                    Balance
                </th>
              

               
            </tr>
        </thead>
        <tbody>
               

{payableAffData.length > 0  ? (
                          payableAffData.map((item: any, index: any) => (

                            

 <>

 

<tr className="bg-white border-b dark:bg-grey-600 dark:border-gray-700">
           

<th scope="row" className="px-2 py-4 font-medium text-purple2 whitespace-wrap  ">
                    {item.firstName} {item.lastName}
                </th>
                <td className="px-6 py-4 dark:text-grey_600">
                {item.bank_account_number}
                </td>
                <td className="px-6 py-4 dark:text-green cursor-pointer hover:font-bold">
                {item.bank_name} 
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                  
                    {item.unpaid_balance}
                </td>
              

                </tr>           

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">Payable Affiliates</p>
 </div>


</>)}

 

           
           
           
          
           </tbody>
       </table>
   </div>
   
   
   </div>
 

</div>



<div className="lg:hidden block sm:block">

  

    {paymentsData.length > 0  ? (
                           paymentsData.map((item: any, index: any) => (

                            

 <>

 

<div className="single-result w-full shadow-2xl bg-white p-2 mt-4">

<p className='mt-2'><span className='text-green'>Receiver: </span> <span className='text-grey_600'> {item.product_name} </span></p>

<p className='mt-2'>

<span className='text-green mt-2'>Amount: </span><span className='text-grey_600'>  ₦{
                 item.productPrice
                } </span>
</p>

<p className='mt-2'><span className='text-green mt-2'>Status</span> <span className='text-grey_600'>{item.affiliate_first_name} {item.affiliate_last_name} </span></p>

<p className='mt-2'><span className='text-green mt-2'>Date:</span> <span className='text-grey_600'> {convertDate(item.created_at)} </span></p>










</div>   

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">You have not made any payments yet!</p>
 </div>


</>)}

</div>

                       
                       
                    </div>

            </main>
          </>
     )


}


   
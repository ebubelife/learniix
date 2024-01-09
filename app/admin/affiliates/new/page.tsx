import Cookies from 'js-cookie';

import Image from 'next/image'
import Link from 'next/link';


import { useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { CurrencyBitcoin } from '@mui/icons-material';
import { Button, MenuItem, TextField } from '@mui/material';
import styles from '/styles/style.module.css';
import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile(){
    var user_data = Cookies.get('user_details');

    
    var isVendor =false;var user_id =""; var affiliate_id = "";
    
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);
    const notifySuccess = () => toast.success("Records updated");
    var errorMessage =""; var bank = "";
    var payment_reference_paystack =""
    const notifyFailure = (message:  any) => toast.error(message);
 
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [affiliateData, setDataAffiliates] = useState([]); 
    const [selectedAff, setSelectedAffiliates] = useState(); 
    const [selectedAffID, setSelectedAffiliateID] = useState(""); 

    const [selectedVendorID, setSelectedVendorID] = useState(""); 

    const [newAffiliatesSelectArray, setNewAffiliatesSelectArray] = useState([]); 

    const [productsData, setDataProducts] = useState([]); 
    const [selectedProduct, setSelectedProduct] = useState(""); 


    const [selectedProductID, setSelectedProductID] = useState(""); 

    const [customerDataEmail, setUserDataEmail] = useState(""); 
    const [customerDataFullName, setUserDataFirstName] = useState(""); 
   
    const [customerDataPhone, setUserDataPhone] = useState(""); 
    const [affiliateCommission, setAffiliateCommission] = useState(""); 
    const [vendorID, setVendorID] = useState(null); 

    const [productPrice, setProductPrice] = useState(""); 
  


    //loop through affiliates array and add each affiliate name and id into array for dropdown
    const affArray = affiliateData.map((affiliate) => ({
        value: affiliate?.affiliate_id,
        label: affiliate?.email,
      }));


         //loop through affiliates array and add each product name and id into array for dropdown
    const productArray = productsData.map((product) => ({
        value: {id:product?.id, productPrice:product?.productPrice, productCommission: product?.productCommission,  productName: product?.productName, vendorID:product?.vendor_id},
        label: product?.productName,
      }));

   


   

  

  
     if(user_data){
      var user = JSON.parse(user_data)

      user_id = user.id;

      user_id = user_id.toString()

      affiliate_id = (user as any).affiliate_id;

      bank = (user as any).bank;

      payment_reference_paystack = (user as any).payment_reference_paystack;

     

     
          
     
      

   }
   
    const submitPfofileDetails = async(event: any) => {

    

      event.preventDefault();
 

      var formData = new FormData();

     // formData.append('id',user_id)
      if(customerDataFullName!=null)
        formData.append('customer_name',customerDataFullName)

        if(customerDataEmail!=null)
        formData.append('customer_email',customerDataEmail)
    

      if(customerDataPhone!=null)
        formData.append('customer_phone',customerDataPhone)


      if(selectedVendorID!=null)
        formData.append('vendor_id',selectedVendorID.toString())


      if(selectedProduct!=null)
        formData.append('product_id',selectedProductID.toString())

      if(selectedAffID !=null){

        formData.append('affiliate_id',selectedAffID)
      }


      if(affiliateCommission !=null){

        formData.append('commission',affiliateCommission)
      }


      if(productPrice !=null){

        formData.append('product_price',productPrice.toString())

      }

      formData.append('currency',"NGN")
      


      formData.append('tx_id',generateRandomString(20))

     

     alert(JSON.stringify({"product price":productPrice,  "vendor_id":selectedVendorID,"product_id":selectedProductID, "affiliate_ID":selectedAffID, "tx_id":generateRandomString(20), "commission":affiliateCommission,"customer_name":customerDataFullName, "customer_email":customerDataEmail, "customer_phone":customerDataPhone}))




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
          notifySuccess();
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

             console.log(errorMessage);
          }
          
          setIsLoading(false);
          console.log(err);
        }
        finally {
          setIsLoading(false);

        }
      

      

    }    


   

     useEffect(() => {
        // Make an HTTP GET request to the API endpoint using axios|Get Affiliates
        axios.get('https://back.zenithstake.com/api/view/affiliates')
          .then((response: any) => {
              
               

             
               setDataAffiliates(response.data);
              // setIsLoading(false)

               
          })
          .catch((error: any) => {
            // Handle errors if any
            console.error(error);
            setIsLoading(false)
          });
        }, []);
        

        useEffect(() => {
            // Make an HTTP GET request to the API endpoint using axios| Get products
            axios.get('https://back.zenithstake.com/api/products/view/100')
              .then((response: any) => {
                  
                   
    
                 
                   setDataProducts(response.data);
                  // setIsLoading(false)
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, []);
            

            

    
     return(

          <>

          
           <Toaster />

            <main className="dashboard bg-grey_100  w-screen flex ">
           
                
                <div className=" grow bg-grey_100 p-6">
                    
                   
                   
                   

                  

                        <div className="dashboard-profile justify-center "> 

                     

                            <form className='lg:w-2/3 bg-white p-6 mt-6 shadow-xl rounded-lg w-full sm:w-full' onSubmit={submitPfofileDetails} >

                          
                            <p className='font-semibold text-2xl text-gold'>Add A New Sale Record</p>
           
                            <div className='mt-6'>

<TextField
required
          className='mt-6'
       ///   onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          id="outlined-multiline-static"
          label="Customer Name"
          onChange={(e:any) => setUserDataFirstName(e.target.value)}
          value ={customerDataFullName}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A569BD',
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#FCFCFC',
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
          onChange={(e:any) => setUserDataEmail(e.target.value)} 
          fullWidth
          id="outlined-multiline-static"
          label="Customer Email"
          
         value ={customerDataEmail}
      
         
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A569BD',
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
    aria-readonly
  className='mt-6'
///   onChange={(e) => setProductDescription(e.target.value)}
  fullWidth
  id="outlined-multiline-static"
  label="Customer Phone"
  onChange={(e:any) => setUserDataPhone(e.target.value)}
  value ={customerDataPhone}
  sx={{
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A569BD',
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

  
  


<div className='mt-6 '>


<Select className="text-grey_600"
  options={affArray}
  placeholder={"Select an affiliate"}
  value={selectedAff}
  onChange={handleSelectAffiliate}
  isSearchable={true}
/>



</div>

<div className='mt-6 '>

<Select className="text-grey_600"
  options={productArray}
  placeholder={"Select a product"}
  value={selectedProduct}
  onChange={handleSelectProduct}
  isSearchable={true}
/>

</div>



<div className='mt-4'>
{!isLoading?(
         <>
        <button  type="submit" className="bg-gold text-white hover:bg-white hover:text-grey_600 w-full py-2 shadow-xl rounded-xl">
        Add Record
        </button>
         </>):
          ( <div className={styles['loader']}></div>)
}

</div>



        

                            </form>

                      </div>
                    
                    </div>

            </main>
          </>
     )

     function handleSelectAffiliate(data:any) {
        setSelectedAffiliates(data);

       

        setSelectedAffiliateID(data.value)

        alert(selectedAffID)
       
       
      }

      function handleSelectProduct(data:any) {
        setSelectedProduct(data);

       

        let commission_percentage = parseInt(data.value.productCommission);
        let price = parseInt(data.value.productPrice);

       // let aff_commission = (commission_percentage/100) * price;

        setSelectedProductID(data.value.id)

        setAffiliateCommission(commission_percentage.toString())
       // alert(affiliateCommission)
        
        setSelectedVendorID(data.value.vendorID)

        alert(selectedVendorID)

       

        setProductPrice(price.toString())

      

        

      

      }

      function generateRandomString(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charactersLength);
          result += characters.charAt(randomIndex);
        }
      
        return result;
      }

    
}


   
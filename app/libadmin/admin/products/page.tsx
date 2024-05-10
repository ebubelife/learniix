"use client"

import Cookies from 'js-cookie';

import Image from 'next/image'
import Link from 'next/link';


import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '/styles/style.module.css'
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast'

import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'
import { Dialog, DialogTitle, DialogContent, DialogContentText, InputAdornment, DialogActions, Button } from '@mui/material';
import LoginDialog from '../../login_dialog';



export default function AdminProducts(){

    const [isLoading, setIsLoading] = useState(false);
    
    const [productsData, setProductsData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [inactiveProduct, setInactiveProducts] = useState("--");
    //const [ productID_to_Delete, setProductID_to_Delete] = useState("--");
    const notifySuccess = () => toast.success("Product approved successfully");
    const notifySuccess1 = () => toast.success("Product has been removed from marketplace");
   
    var errorMessage =""; 
   
    const notifyFailure = (message: string) => toast.error(message);
 
   
  
   
   

     //pull sales
        useEffect(() => {
   
            // Make an HTTP GET request to the API endpoint using axios
            axios.get('https://back.learniix.com/api/products/view/100' )
              .then((response: any) => {
                  
                   
    
                  
                setProductsData(response.data);

                
                
                   setIsLoading(false)
                   console.log(response.data);

                   var inactiveProductsNumber = 0;

                   for(let i = 0; i < response.data.length; i++){

                      if(response.data[i].approved == false){

                        inactiveProductsNumber++;

                      }
                   }

                   setInactiveProducts(inactiveProductsNumber.toString())
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, [ ]);

            const handleSearch = (event:any) => {
                const searchText = event.target.value;
                setSearchTerm(searchText);
            
                const filteredData = productsData.filter((item:any) =>
                  item.productName.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filteredData);
          
                setProductsData(filteredData);

                          
              // alert(JSON.stringify(searchResults))
              };

            

              const approveProduct = async(productID_to_Delete: any) => {
  
              

          
                  try {
                    const res = await axios.get(
                      `https://back.learniix.com/api/approve/product/`+productID_to_Delete,
                     
                     
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

                   window.location.reload();
                   
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

              const disableProduct = async(productID_to_Delete: any) => {
  
              

          
                try {
                  const res = await axios.get(
                    `https://back.learniix.com/api/disable/product/`+productID_to_Delete,
                   
                   
                    {
                     // withCredentials: true ,
        
                     headers:{
                      'Content-Type' :'multipart/form-data',
                    
        
                     
                     },
                     
                     // params: {values}
                    }
                   
                  );
                 
                  setIsLoading(false);
                  notifySuccess1();
                  window.location.reload();
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
          
    

    
    
     return(

          <>
       


          <Toaster />
         
         <main className="dashboard bg-grey_100  w-screen flex ">
             
         {
//<LoginDialog />
   } 
                
             <div className=" grow bg-grey_100 p-6">
                 <div className="top-bar-container w-full border-b-2 border-grey_100 shadow-xl py-4 px-6">
                     <p className="dashboard-title text-grey_600 text-xl hidden sm:hidden lg:block">
                        Admin Products
                     </p>

                     <div className="lg:hidden sm:block block">
                    
                     </div>
                     

                 </div>
                
                   
                
                      

<div className="dashboard-analytics-info grid lg:grid-cols-5 lg:gap-1 mt-3 grid-cols-2 sm:grid-cols-2 ">



<div className="dashboard-card h-32 shadow-lg border-2 border-grey_100 bg-white mt-4 p-4 ">
<p className='text-grey_600'  >All Products</p>
    <div className="flex">
     <p  className='text-grey_600 text-2xl font-light ml-2 mt-6'>{productsData.length}</p>
    </div>

</div>



<div className="dashboard-card h-32 shadow-lg border-2 border-grey_100 bg-white mt-4 p-4 ">
<p className='text-grey_600'  >Inactive Products</p>
    <div className="flex">
      <p  className='text-grey_600 text-2xl font-light ml-2 mt-6'>{inactiveProduct}</p>
    </div>

</div>










</div>

<p className='text-green text-xl mt-3'>All Products</p>

<div className='mt-4 flex'>
                        <TextField id="outlined-basic" type="text" label="Search Products" variant="outlined" onChange={handleSearch} />

                        <div className='bg-grey_300 text-grey_600 rounded-sm w-32 ml-1 grid place-content-center shadow-2xl'>Search</div>


                        </div>



<div className="top-vendors-courses  w-full  mt-4 p-2 max-h-96 overflow-y-scroll ">

<div className='w-full mt-4 text-grey_600 lg:block hidden sm:hidden '>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-green">
                    Name
                </th>
             
                 <th scope="col" className="px-6 py-3">
                    Desc.
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Comm.%
                </th>
               

                <th scope="col" className="px-6 py-3">
                   Approved
                </th>
                <th scope="col" className="px-6 py-3">
                   Actions
                </th>
            </tr>
        </thead>
        <tbody>
               

{productsData.length > 0  ? (
                           productsData.map((item: any, index: any) => (

                            

 <>

 

<tr className="bg-white border-b dark:bg-grey-600 dark:border-gray-700">
           

<th scope="row" className="px-6 py-4 font-medium text-zinc-500 w-40  ">
                    {item.productName}
                </th>
                <td className="px-6 py-4 dark:text-zinc-400 w-40">
                {
                  item.productDescription
                }
                </td>
                <td className="px-6 py-4 dark:text-green cursor-pointer hover:font-bold">
                ₦{item.productPrice} 
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                  
                    {item.productCommission}
                </td>
             
                <td  className="px-6 py-4 dark:text-grey_600">
                {
                       item.approved ==false?(<>False</>):(<>True</>)
                    }
                </td>  

                <td className="px-6 py-4 dark:text-grey_600 ">
              
               { item.approved==false?(<><button className="bg-grey_300 text-grey_600 p-2 rounded-xl shadow-xl ml-4" onClick={()=>approveProduct(item.id)}>Approve</button></>):
                (<><button className="bg-grey_300 text-grey_600 p-2 rounded-xl shadow-xl ml-4" onClick={()=>disableProduct(item.id)}>Disable</button></>)
}
      </td>  

                </tr>           

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">You have no products yet!</p>
 </div>


</>)}

 

           
           
           
          
           </tbody>
       </table>
   </div>
   
   
   </div>
 

</div>



<div className="lg:hidden block sm:block">

  

    {productsData.length > 0  ? (
                           productsData.map((item: any, index: any) => (

                            

 <>

 

<div className="single-result w-full shadow-2xl bg-white p-2 mt-4">

<p className='mt-2'><span className='text-green'>Product Name: </span> <span className='text-grey_600'>  {item.productName}</span></p>

<p className='mt-2'>

<span className='text-green mt-2'>Description: </span><span className='text-grey_600'>  {
                  item.productDescription
                } </span>
</p>

<p className='mt-2'><span className='text-green mt-2'>Price:</span> <span className='text-grey_600'> {item.productPrice}  </span></p>

<p className='mt-2'><span className='text-green mt-2'>Commission %:</span> <span className='text-grey_600'>   {item.productCommission}</span></p>


<p onClick={approveProduct}  className='mt-2'><span className='text-green mt-2'>Approved:</span> <span className='text-grey_600'>     {
                       item.approved ==false?(<>False</>):(<>True</>)
                    }</span></p>

<p className='mt-2'>   
              
              {
                item.approved==false?(<><button className="bg-grey_300 text-grey_600 p-2 rounded-xl shadow-xl ml-4" onClick={()=>approveProduct(item.id)}>Approve</button></>):
                (<><button className="bg-green text-white p-2 rounded-xl shadow-xl ml-4" onClick={()=>disableProduct(item.id)} >Disable</button></>)

              } 
            </p>

                     






</div>   

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">No products</p>
 </div>


</>)}

</div>

                       
                       
                    </div>

            </main>
          </>
     )


}


   
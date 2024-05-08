"use client"

import Cookies from 'js-cookie';

import Image from 'next/image'
import Link from 'next/link';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '/styles/style.module.css'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import LoginDialog from '../login_dialog';


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

function getAffiliateCommission(commission:any, price:any){

    var aff_commission = (commission/100) * price;

    return aff_commission;

}





export default function AdminAffiliates(){

    const [isLoading, setIsLoading] = useState(false);
    
    const [vendorsData, setVendorsData] = useState([]); 
    
    const [editEmail, setEditEmail] = useState(null); 
    const [editVendorEarnings, setEditVendorEarnings] = useState(null); 
    const [editVendorUnpaid,   setEditVendorUnpaid] = useState(null); 
    const [editVendorSales,    setEditVendorSales] = useState(null); 
    const [ selected_id,    setSelectedID] = useState(""); 
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const notifySuccess = () => toast.success("Account deleted successfully!");
    const notifySuccess1 = () => toast.success("Account updated successfully!");
    const notifyFailure = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => toast.error(message);
    var errorMessage ="";
    const [vendor_id_delete, setVendorIdDelete] = useState("");


    const handleClickOpen = (vendor_id: any) => {

      

      setVendorIdDelete(vendor_id)
    
      setOpen(true);


  };
    
   

     //pull sales
        useEffect(() => {
   
            // Make an HTTP GET request to the API endpoint using axios
            axios.get('https://back.learniix.com/api/view/vendors' )
              .then((response: any) => {
                  
                   
    
                  
                  setVendorsData(response.data);
                
                   setIsLoading(false)
                   console.log(response.data);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, [ ]);

            const handleClickOpen1 = (email: any,unpaid_balance_vendor:any,total_vendor_sales_cash:any, total_vendor_sales:any, selected_id:any) => {

      

                setEditEmail(email)
                setEditVendorUnpaid(unpaid_balance_vendor)
                setEditVendorEarnings(total_vendor_sales_cash)
                setEditVendorSales(total_vendor_sales)
                setSelectedID(selected_id)
               
             
               setOpen1(true);
         
         
           };

           const handleClose = () => {
            setOpen(false);
          };
      
          const handleClose1 = () => {
            setOpen1(false);
          };
      
          const deleteVendor = () =>{
              setIsLoading(true)
             
             
          
            
                 // Make an HTTP GET request to the API endpoint using axios
                 axios.get('https://back.learniix.com/api/account/remove/'+vendor_id_delete )
                   .then((response: any) => {
                      setIsLoading(false)
                       
                      notifySuccess();
      
                      handleClose();
                        
                   })
                   .catch((error: any) => {
                     // Handle errors if any
                     notifyFailure(error.message)
                     console.error(error);
                     setIsLoading(false)
                   });
                
         }

         const editProfileDetails = async(event: any) => {

    

            event.preventDefault();
       
      
            var formData = new FormData();
      
            formData.append('id',selected_id.toString())
          
            if(editEmail!=null)
              formData.append('email',editEmail)


            if(editVendorEarnings!=null)
              formData.append('total_vendor_sales_cash',editVendorEarnings)

            if(editVendorSales!=null)
              formData.append('total_vendor_sales',editVendorSales)

            if(editVendorUnpaid!=null)
              formData.append('unpaid_balance_vendor',editVendorUnpaid)
          
      
              try {
                const res = await axios.post(
                  `https://back.learniix.com/api/member/update_profile_admin_vendor`,
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
                notifySuccess1();
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
          <LoginDialog />
            <Toaster />

<Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center text-gold">Delete Vendor?</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
Do you really want to delete this vendor?   </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

         {
            isLoading == true?(<><div className='h-full w-full grid place-content-center'> <div>
            <div className={styles['loader']}></div>
           </div></div></>):(<> <Button onClick={deleteVendor}>Proceed</Button></>)
         } 
         
        
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle className="text-center text-gold">Edit Vendor Data</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
You are about to edit this vendor   </DialogContentText>

<br>
</br>

<form className=' bg-white p-6 shadow-xl rounded-lg ' onSubmit={editProfileDetails} >

                          


<div className='mt-6'>
<p className='text-gold mt-6'>Edit Email</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
id="outlined-multiline-static"
label=""
onChange={(e:any) => setEditEmail(e.target.value)}
value ={editEmail}
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

<p className='text-gold mt-6'>Edit Vendor Total Earnings</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditVendorEarnings(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editVendorEarnings}
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

<p className='text-gold mt-6'>Edit Vendor Sales</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditVendorSales(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editVendorSales}
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

<p className='text-gold mt-6'>Edit Unpaid Vendor Earnings</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditVendorUnpaid(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editVendorUnpaid}
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

</form>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>

         {
            isLoading == true?(<><div className='h-full w-full grid place-content-center'> <div>
            <div className={styles['loader']}></div>
           </div></div></>):(<> <Button onClick={editProfileDetails} >Update</Button></>)
         } 
         
        
        </DialogActions>
      </Dialog>
         
         
            <main className="dashboard bg-grey_100  w-screen flex ">
             

                
                  
             <div className=" grow bg-grey_100 p-6">
                 <div className="top-bar-container w-full border-b-2 border-grey_100 shadow-xl py-4 px-6">
                     <p className="dashboard-title text-grey_600 text-xl hidden sm:hidden lg:block">
                        Admin Vendors
                     </p>

                     <div className="lg:hidden sm:block block">
                    
                     </div>
                     

                 </div>
                
                   
                
                      

<div className="dashboard-analytics-info grid lg:grid-cols-5 lg:gap-1 mt-3 grid-cols-2 sm:grid-cols-2 ">



<div className="dashboard-card h-32 shadow-lg border-2 border-grey_100 bg-white mt-4 p-4 ">
<p className='text-grey_600'  >All Vendors</p>
    <div className="flex">
     <p  className='text-grey_600 text-2xl font-light ml-2 mt-6'>{vendorsData.length}</p>
    </div>

</div>














</div>

<p className='text-green text-xl mt-3'>All Vendors</p>



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
                    DateReg
                </th>
              
              
                <th scope="col" className="px-6 py-3">
                    Vendor.ID
                </th>

                <th scope="col" className="px-6 py-3">
                    Total Earnings
                </th>

                <th scope="col" className="px-6 py-3">
                    Unpaid Earnings
                </th>
                <th scope="col" className="px-6 py-3">
                   Products
                </th>
                  <th scope="col" className="px-6 py-3">
                 Actions
                </th>
            </tr>
        </thead>
        <tbody>
               

{vendorsData.length > 0  ? (
                           vendorsData.map((item: any, index: any) => (

                            

 <>

 

<tr className="bg-white border-b dark:bg-grey-600 dark:border-gray-700">
           

<th scope="row" className="px-6 py-4 font-medium text-purple2 w-40 ">
                    {item.firstName}  {item.lastName}
                </th>
                <td className="px-6 py-4 dark:text-grey_600">
                {
                convertDate(item.created_at)
                }
                </td>
             
              
                <td className="px-6 py-4 dark:text-grey_600">
                {
                      item.id
                    }
                </td> <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                      item.total_aff_sales_cash
                    }
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                       item.unpaid_balance
                    }
                </td>  

                <td className="px-6 py-4 dark:text-grey_600">
            <Link href={""} ><b className='text-gold'>Products</b></Link>
                </td>  

                <td className="px-6 py-4 dark:text-grey_600">
                <button className='p-3 rounded-xl bg-black text-white' onClick={()=>handleClickOpen(item.id)}>Delete</button>
                <button onClick={()=>handleClickOpen1(item.email, item?.unpaid_balance_vendor,item?.total_vendor_sales_cash, item?.total_vendor_sales, item?.id)} className='p-3 rounded-xl bg-yellow-500 text-white mt-4 ml-4' >Edit</button>


                </td>  

              

                </tr>           

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">No Vendors found!</p>
 </div>


</>)}

 

           
           
           
          
           </tbody>
       </table>
   </div>
   
   
   </div>
 

</div>



<div className="lg:hidden block sm:block">

  

    {vendorsData.length > 0  ? (
                           vendorsData.map((item: any, index: any) => (

                            

 <>

 

<div className="single-result w-full shadow-2xl bg-white p-2 mt-4">

<p className='mt-2'><span className='text-green'>Full Name: </span> <span className='text-grey_600'> {item.fullName} {item.lastName} </span></p>

<p className='mt-2'>

<span className='text-green mt-2'>Email: </span><span className='text-grey_600'>  {
                 item.email
                } </span>
</p>

<p className='mt-2'><span className='text-green mt-2'>Phone:</span> <span className='text-grey_600'>{item.phone} </span></p>

<p className='mt-2'><span className='text-green mt-2'>DateReg:</span> <span className='text-grey_600'> {convertDate(item.created_at)} </span></p>





<p className='mt-2'><span className='text-green mt-2'>Total Earnings:</span> <span className='text-grey_600'>     ₦{
                      item.total_aff_sales_cash
                    }</span></p>


<p className='mt-2'><span className='text-green mt-2'>Unpaid Balance:</span> <span className='text-grey_600'>     ₦{
                       item.unpaid_balance
                    }</span></p>

                    <p className='mt-2'><span className='text-green mt-2'>ACTIVE VENDOR:</span> <span className='text-purple2'>     {
                       item.is_payed=="true"?"YES":"NO"
                    }</span></p>

                   

{
  //<p className='mt-2'><span className='text-green mt-2'>Products:</span> <span className='text-grey_600'>   <Link href={""}><b className='text-gold'>Products</b></Link></span></p>
  }
<button onClick={()=>handleClickOpen(item?.id) } className='p-3 rounded-xl bg-black mt-4 text-white'>Delete</button>
{
(<button onClick={()=>handleClickOpen1(item.email, item?.unpaid_balance_vendor,item?.total_vendor_sales_cash, item?.total_vendor_sales, item?.id)} className='p-3 rounded-xl bg-yellow-600 text-white mt-4 ml-4' >Edit</button>)

}

</div>   

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
 <div className={styles['loader']}></div>
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">No affiliates yet!</p>
 </div>


</>)}

</div>

                       
                       
                    </div>

            </main>
          </>
     )


}


   
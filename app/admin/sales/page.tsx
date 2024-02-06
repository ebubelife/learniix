"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Slide, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AdminHeader from '../header/page';
import Cookies from 'js-cookie';
import axios from 'axios';
import { TransitionProps } from '@mui/material/transitions';
import { PropagateLoader } from 'react-spinners';
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

function getAffiliateCommission(commission:any, price:any){

  var aff_commission = (commission/100) * price;

  return aff_commission;

}

function getVendorCommission(commission:any, price:any){

  var aff_commission = (commission/100) * price;

  var zenith_commission = (10/100) * price;

  var vendor_commission = price - zenith_commission - aff_commission;

  return vendor_commission;

}




function getZenithstakeCommission(commission:any, price:any){

  var aff_commission = (commission/100) * price;

  var zenith_commission = (10/100) * price;

  var vendor_commission = price - zenith_commission - aff_commission;

  return zenith_commission;

}



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// Your main component
export default function AdminSales() {

  
  const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [prospectName, setProspectName] = React.useState([]);
    const [prospectEmail, setProspectEmail] = React.useState([]);


    const [salesData, setSalesData] = useState([]); 
    const [allTimeSales, setAllTimeSales] = useState("0");
    const [ adminSalesData, setAdminSalesData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [sale_id_delete, setSaleIdDelete] = useState("");
    const [inputText, setInputText] = useState('');

    let [color, setColor] = useState("#90EE90");

    const notifySuccess = () => toast.success("Sale deleted successfully!");
    const notifyFailure = (message: any) => toast.error(message);


    
    
    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };

    const handleClickOpenDelete = (sale_id: any) => {

    alert(sale_id)

      setSaleIdDelete(sale_id)
    
      setOpen(true);


  };
  


    const handleSearch = () => {
        const searchText = inputText;
        setSearchTerm(searchText);
    
        const filteredData = salesData.filter((item:any) =>
          item.affiliate_first_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredData);
    
        setSalesData(filteredData);
    
                  
      // alert(JSON.stringify(searchResults))
      };

      const handleSearchByProduct = (event:any) => {
        const searchText = event.target.value;
        setSearchTerm(searchText);
    
        const filteredData = salesData.filter((item:any) =>
          item.product_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredData);
    
        setSalesData(filteredData);
    
                  
      // alert(JSON.stringify(searchResults))
      };

      
    

   
    
   

     //pull sales
        useEffect(() => {
   
            // Make an HTTP GET request to the API endpoint using axios
            axios.get('https://back.learniix.com/api/sales/view' )
              .then((response: any) => {
                  
                   
    
                  
                  setSalesData(response.data);

               
                 
                
                  setAllTimeSales(allTimeSales.toString());

                 
                
                   setIsLoading(false)
                   console.log(response.data);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, [ ]);

             //pull sales
        useEffect(() => {
   
            // Make an HTTP GET request to the API endpoint using axios
            axios.get('https://back.learniix.com/api/admin_sales/view' )
              .then((response: any) => {
                 
                  
                  setAdminSalesData(response.data);

               
                   setIsLoading(false)
                   console.log(response.data);
    
                   
              })
              .catch((error: any) => {
                // Handle errors if any
                console.error(error);
                setIsLoading(false)
              });
            }, [ ]);
    

            const handleClickOpen = () => {
                setOpen(true);
              };
              
              const handleClose = () => {
                setOpen(false);
              };

              function showProspectInf(prospectName:any, prospectEmail:any){

   
                setProspectName(prospectName);
                setProspectEmail(prospectEmail);
               
                setOpen(true);
            
            }
 

            const deleteSale = () =>{
              setIsLoading(true)
             
             
          
            
                 // Make an HTTP GET request to the API endpoint using axios
                 axios.get('https://back.learniix.com/api/sale/remove/'+sale_id_delete )
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


  return (
    <div >
       <Toaster />
      <React.Fragment>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center text-gold">Delete Sale?</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
Do you really want to delete this sale? Please ensure to update the balances for vendor and affiliate and all affected parties after deletion   </DialogContentText>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

         {
            isLoading == true?(<><div className='h-full w-full grid place-content-center'> <div>
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
           </div></div></>):(<> <Button onClick={deleteSale}>Proceed</Button></>)
         } 
         
        
        </DialogActions>
      </Dialog>

     
     <Dialog
       open={open}
       TransitionComponent={Transition}
       keepMounted
       onClose={handleClose}
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle className="font-semibold text-md">{"Request Details"}</DialogTitle>
       <DialogContent>

       

       <p className='mt-4 font-medium text-sm'>Customer Name: {prospectName}</p>

       <p className='mt-4 font-medium text-sm'>Customer Email: {prospectEmail}</p>

     
    
        
       </DialogContent>
       <DialogActions>
         <p className='text-zinc-400 cursor-pointer mr-10 hover:mb-1' onClick={handleClose}>Close</p>
        
       </DialogActions>
     </Dialog>
   </React.Fragment>

      <AdminHeader title="Admin Sales" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>

<div className='w-screen  px-10'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>All time revenue</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'> ₦{(parseInt(adminSalesData?.total_earnings)).toLocaleString()}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{salesData.length}</p>


</div>
</div>

<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos;s Revenue</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>₦{(parseInt(adminSalesData?.total_earnings_today)).toLocaleString()} </p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos; Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{adminSalesData?.sales_today}</p>


</div>
</div>




</div>


       
       </div>


       <div className='w-screen  flex justify-center'>

<div className=' w-full mt-2  rounded-md mt-4 grid place-content-center'>

   

<p className='text-green text-xl mt-3'>All Sales</p>

<div className='w-screen justify-center flex'>

<div className='mt-4 flex'>
                        <TextField id="outlined-basic" type="text" label="Search By Affiliate" variant="outlined" onChange={(e) => setInputText(e.target.value)} />

                        <div onClick={handleSearch} className='bg-grey_300 text-grey_600 rounded-sm w-32 ml-1 grid place-content-center shadow-2xl cursor-pointer'>Search</div>


                        </div>

                     
{
  /*

   <div className='mt-4 flex'>
                        <TextField id="outlined-basic" type="text" label="Search By Product" variant="outlined"  />

                        <div className='bg-grey_300 text-grey_600 rounded-sm w-32 ml-1 grid place-content-center shadow-2xl' onClick={handleSearchByProduct}>Search</div>


                        </div>


  */
}
                       



</div>


<div className="top-vendors-courses  w-full  mt-4 p-2 max-h-96 overflow-y-scroll ">

<div className='w-full mt-4 text-grey_600 lg:block hidden sm:hidden '>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3 text-green">
                    Product
                </th>
             
                 <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Affiliate
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>

                <th scope="col" className="px-6 py-3">
                   Prospect
                </th>
                <th scope="col" className="px-6 py-3">
                    A.Comm
                </th>

                <th scope="col" className="px-6 py-3">
                    V.Comm
                </th>

                <th scope="col" className="px-6 py-3">
                    Z.Comm
                </th>

                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
               

{salesData.length > 0  ? (
                           salesData.map((item: any, index: any) => (

                            

 <>

 

<tr className={`bg-${getVendorCommission(parseInt(item.commission),  parseInt(item.product_price))==6000 ? 'grey-600' : 'white'} border-b dark:bg-grey-600 dark:border-gray-700`}>
           

<th scope="row" className="px-2 py-4 font-medium text-purple2 whitespace-wrap  ">
                    {item.product_name}
                </th>
                <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                 item.productPrice
                }
                </td>
                <td className="px-6 py-4 dark:text-green cursor-pointer hover:font-bold">
                {item.affiliate_first_name} {item.affiliate_last_name}
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                  
                    {convertDate(item.created_at)}
                </td>

                <td className="px-6 py-4 dark:text-grey_600">
                  
                <p onClick={()=>showProspectInf(item.customer_name, item.customer_email)} className='text-center cursor-pointer'>View</p>
              </td>
                <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                       getAffiliateCommission(parseInt(item.commission), parseInt(item.product_price))
                    }
                </td> <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                       getVendorCommission(parseInt(item.commission), parseInt(item.product_price))
                    }
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                ₦{
                        getZenithstakeCommission(parseInt(item.commission), parseInt(item.product_price))
                    }
                </td>  

                <td className="px-6 py-4 dark:text-grey_600">

                <button className='p-3 rounded-xl bg-black text-white' onClick={()=>handleClickOpenDelete(item.id)}>Delete</button>
  
</td>
                </tr>           

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
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
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">You have no sales yet!</p>
 </div>


</>)}

 

           
           
           
          
           </tbody>
       </table>
   </div>
   
   
   </div>
 

</div>



<div className="lg:hidden block sm:block">

  

    {salesData.length > 0  ? (
                           salesData.map((item: any, index: any) => (

                            

 <>

 

<div className="single-result w-full shadow-2xl bg-white p-2 mt-4">

<p className='mt-2'><span className='text-green'>Product Name: </span> <span className='text-grey_600'> {item.product_name} </span></p>

<p className='mt-2'>

<span className='text-green mt-2'>Price: </span><span className='text-grey_600'>  ₦{
                 item.productPrice
                } </span>
</p>

<p className='mt-2'><span className='text-green mt-2'>Affiliate:</span> <span className='text-grey_600'>{item.affiliate_first_name} {item.affiliate_last_name} </span></p>

<p className='mt-2'><span className='text-green mt-2'>Date:</span> <span className='text-grey_600'> {convertDate(item.created_at)} </span></p>


<p className='mt-2'><span className='text-green mt-2'>Aff.commision:</span> <span className='text-grey_600'>    ₦{
                       getAffiliateCommission(parseInt(item.commission), parseInt(item.product_price))
                    }</span></p>


<p className='mt-2'><span className='text-green mt-2'>vendor commision:</span> <span className='text-grey_600'>    ₦{
                       getVendorCommission(parseInt(item.commission), parseInt(item.product_price))
                    }</span></p>


<p className='mt-2'><span className='text-green mt-2'>Learniix commision:</span> <span className='text-grey_600'>    ₦{
                       getZenithstakeCommission(parseInt(item.commission), parseInt(item.product_price))
                    }</span></p>

<p className='mt-2'>
<button className='p-3 rounded-xl bg-black text-white' onClick={()=>handleClickOpenDelete(item.id)}>Delete</button>
  

</p>


</div>   

         

 </>
 
 ))
 ):isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
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
</div></div></>):(

<> 

<div className="grid place-content-center">
     <p className="text-gold">You have no sales yet!</p>
 </div>


</>)}

</div>

   

</div>


</div>
       

    
    </div>
       
       </div>
 
  );
};




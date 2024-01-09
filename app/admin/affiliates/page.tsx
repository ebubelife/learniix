"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Slide, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AdminHeader from '../header/page';
import Cookies from 'js-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TransitionProps } from '@mui/material/transitions';

import toast from 'react-hot-toast';
import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'


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


export default function AdminSales() {

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  let [color, setColor] = useState("#90EE90");


  const [isLoading, setIsLoading] = useState(false);
    
  const [affiliatesData, setAffiliatesData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [affiliate_id_delete, setAffiliateIdDelete] = useState("");
  const [noData, setNoData] = useState(false); 
  const [affiliate_id, setAffiliateId] = useState("");

  const [editEmail, setEditEmail] = useState(null); 
  const [editAffiliateEarnings, setEditAffiliateEarnings] = useState(null); 
  const [editAffiliateUnpaid,   setEditAffiliateUnpaid] = useState(null); 
  const [editAffiliateSales,    setEditAffiliateSales] = useState(null); 
  const [ selected_id,    setSelectedID] = useState(""); 

 
  

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const notifySuccess = () => toast.success("Account deleted successfully!");
  const notifySuccess1 = () => toast.success("Account updated successfully!");
  const notifySuccess2 = () => toast.success("Email approved successfully!");
  const notifyFailure = (message: any) => toast.error(message);
  var errorMessage ="";
 


  const handleClickOpen = (affiliate_id: any) => {

    

      setAffiliateIdDelete(affiliate_id)
    
      setOpen(true);


  };
  const handleClickOpen1 = (email: any,unpaid_balance:any,total_aff_sales_cash:any, total_aff_sales:any, selected_id:any) => {

    

     setEditEmail(email)
     setEditAffiliateUnpaid(unpaid_balance)
     setEditAffiliateEarnings(total_aff_sales_cash)
     setEditAffiliateSales(total_aff_sales)
     setSelectedID(selected_id)
    
  
    setOpen1(true);


};
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const deleteAffiliate = () =>{
      setIsLoading(true)
     
     
  
    
         // Make an HTTP GET request to the API endpoint using axios
         axios.get('https://back.learniix.com/api/account/remove/'+affiliate_id_delete )
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


 const approveAffiliateEmail = (user_id:any) =>{
  setIsLoading(true)
 
 


     // Make an HTTP GET request to the API endpoint using axios
     axios.get('https://back.learniix.com/api/update_email_verified/'+user_id )
       .then((response: any) => {
          setIsLoading(false)
           
          notifySuccess2();

         // handleClose();
            
       })
       .catch((error: any) => {
         // Handle errors if any
         notifyFailure(error.message)
         console.error(error);
         setIsLoading(false)
       });
    
}


       

 const handleSearch = (event: any) => {
  const searchText = event.target.value;
  setSearchTerm(searchText);

  const filteredData = affiliatesData.filter((item: any) =>
    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchText.toLowerCase())
  );
  setSearchResults(filteredData);

  setAffiliatesData(filteredData);
};


 

   //pull affiliates
      useEffect(() => {
        setIsLoading(true)
 
          // Make an HTTP GET request to the API endpoint using axios
          axios.get('https://back.learniix.com/api/view/affiliates' )
            .then((response: any) => {
                
                 
  
                
               

                 if(response.data.length > 0){
                   setAffiliatesData(response.data);
              
                 setIsLoading(false)
                 console.log(response.data);

                 }
                 else{

                  setNoData(true)
                 }
  
                 
            })
            .catch((error: any) => {
              // Handle errors if any
              console.error(error);
              setIsLoading(false)
            });
          }, [ ]);


          const editPfofileDetails = async(event: any) => {

  

            event.preventDefault();
       
      
            var formData = new FormData();
      
            formData.append('id',selected_id.toString())
          
            if(editEmail!=null)
              formData.append('email',editEmail)


            if(editAffiliateEarnings!=null)
              formData.append('total_aff_sales_cash',editAffiliateEarnings)

            if(editAffiliateSales!=null)
              formData.append('total_aff_sales',editAffiliateSales)

            if(editAffiliateUnpaid!=null)
              formData.append('unpaid_balance',editAffiliateUnpaid)
          
      
              try {
                const res = await axios.post(
                  `https://back.learniix.com/api/member/update_profile_admin`,
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
 



  return (

    <>

<Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center text-gold">Delete Affiliate?</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
Do you really want to delete this affiliate?   </DialogContentText>
       
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
           </div></div></>):(<> <Button onClick={deleteAffiliate}>Proceed</Button></>)
         } 
         
        
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle className="text-center text-gold">Edit Affiliate</DialogTitle>
        <DialogContent>
          <DialogContentText className={"text-center"}>
You are about to edit this affiliate   </DialogContentText>

<br>
</br>

<form className=' bg-white p-6 shadow-xl rounded-lg ' onSubmit={editPfofileDetails} >

                          


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

<p className='text-gold mt-6'>Edit Affiliate Total Earnings</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditAffiliateEarnings(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editAffiliateEarnings}
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

<p className='text-gold mt-6'>Edit Affiliate Sales</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditAffiliateSales(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editAffiliateSales}
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

<p className='text-gold mt-6'>Edit Unpaid Earnings</p>

<TextField
required
className='mt-2'
///   onChange={(e) => setProductDescription(e.target.value)}
fullWidth
onChange={(e:any) =>setEditAffiliateUnpaid(e.target.value)}
id="outlined-multiline-static"
label=""

value ={editAffiliateUnpaid}
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
           </div></div></>):(<> <Button onClick={editPfofileDetails} >Update</Button></>)
         } 
         
        
        </DialogActions>
      </Dialog>
    <div >
      <AdminHeader title="Admin Affiliates" />

      <div className="w-screen h-screen px-4 py-4">


      <p className='text-green text-xl mt-3'>All Affiliates</p>
<div className='mt-4 flex'>
                        <TextField id="outlined-basic" type="text" label="Search Affiliates" variant="outlined" onChange={handleSearch} />

                        <div className='bg-grey_300 text-grey_600 rounded-sm w-32 ml-1 grid place-content-center shadow-2xl'>Search</div>


                        </div>

                        <div className="mt-8">
                        <Link className='p-3 rounded-xl bg-green-500 text-white  shadow-2xl' href="new/affiliate" >Add New Affiliate</Link>


                        </div>

                     

<div className="top-vendors-courses  md:w-[98%]  mt-4 p-2 max-h-96   overflow-x-auto  ">

<div className='w-full mt-4 text-grey_600 lg:block hidden sm:hidden overflow-x-auto '>

<div className="relative  shadow-md sm:rounded-lg overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-green">
                    Name
                </th>
             
                 <th scope="col" className="px-6 py-3">
                    DateReg
                </th>
            
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Aff.ID
                </th>

                <th scope="col" className="px-6 py-3">
                    T. Earnings
                </th>

                <th scope="col" className="px-6 py-3">
                    Unpaid
                </th>

                <th scope="col" className="px-6 py-3">
                   Last Sale
                </th>

                <th scope="col" className="px-6 py-3">
                   Actions
                </th>
            </tr>
        </thead>
        <tbody>
               

{affiliatesData.length > 0  ? (
                           affiliatesData.map((item: any, index: any) => (

                            

 <>

 

<tr className="bg-white border-b dark:bg-grey-600 dark:border-gray-700">
           

<th scope="row" className="px-6 py-4 font-medium text-purple2   w-40 ">
                    {item.firstName}  {item.lastName}
                </th>
                <td className="px-6 py-4 dark:text-grey_600">
                {
                convertDate(item.created_at)
                }
                </td>
              
                <td className="px-6 py-4 dark:text-grey_600">
                  
                    {item.phone}
                </td>
                <td className="px-6 py-4 dark:text-grey_600">
                {
                      item.affiliate_id
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
                {
                       item.last_sale_time
                    }
                </td> 
                
                 

                <td className="px-6 py-4 dark:text-grey_600 ">
<div className="flex">

<button className='p-3 rounded-xl bg-black text-white' onClick={()=>handleClickOpen(item.id)}>Delete</button>
                               
                               <button onClick={()=>handleClickOpen1(item.email, item?.unpaid_balance,item?.total_aff_sales_cash, item?.total_aff_sales, item?.id)} className='p-3 rounded-xl bg-grey_600 text-white mt-4 ml-4' >Edit</button>
                               <button className='p-3 rounded-xl bg-green text-white' onClick={()=>handleClickOpen(item.id)}>Sales</button>
                      
                               
</div>


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
     <p className="text-gold">No affiliates found!</p>
 </div>


</>)}

 
      
          
           </tbody>
       </table>
   </div>
   
   
   </div>
 

</div>



<div className="lg:hidden block sm:block">

  

    {affiliatesData.length > 0  ? (
                           affiliatesData.map((item: any, index: any) => (

                            

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


<p className='mt-2'><span className='text-green mt-2'>Affiliate ID:</span> <span className='text-grey_600'>    {
                      item.affiliate_id
                    }</span></p>


<p className='mt-2'><span className='text-green mt-2'>Total Earnings:</span> <span className='text-grey_600'>     ₦{
                      item.total_aff_sales_cash
                    }</span></p>


<p className='mt-2'><span className='text-green mt-2'>Unpaid Balance:</span> <span className='text-grey_600'>     ₦{
                       item.unpaid_balance
                    }</span></p>

<p className='mt-2'><span className='text-green mt-2'>Last Sale At:</span> <span className='text-grey_600'>     {
                       item.last_sale_time
                    }</span></p>



<button className='p-3 rounded-xl bg-black text-white mt-4' onClick={()=>handleClickOpen(item.id)}>Delete</button>

<button className='p-3 rounded-xl bg-green text-white' onClick={()=>handleClickOpen(item.id)}>Sales</button>
 


{


item.email_verified == false&&(
  isLoading ?(<><div className='h-full w-full grid place-content-center'> <div>
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
 </div></div></>):(<><button onClick={()=>approveAffiliateEmail(item?.id) } className='p-3 rounded-xl bg-green text-white mt-4 ml-4' >Approve Email</button>
</>)

)

}

{
(<button onClick={()=>handleClickOpen1(item.email, item?.unpaid_balance,item?.total_aff_sales_cash, item?.total_aff_sales, item?.id)} className='p-3 rounded-xl bg-grey_600 text-white mt-4 ml-4' >Edit</button>)

}


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
{
  noData==true?(<>
  <div className="grid place-content-center">
     <p className="text-gold">No affiliates yet!</p>
 </div>
  </>):(<></>)
}



</>)}

</div>

      


      </div></div>
       </>
 
  );
};




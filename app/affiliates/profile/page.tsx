"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, InputAdornment, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AffiliateDashboardHeader from '../dashboard/header/page';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';




// Your main component
const AffiliateDashboard = () => {
  var user_data = Cookies.get('user_details');

    
  var isVendor =false;var user_id =""; var affiliate_id = "";
  
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const notifySuccess = () => toast.success("Your profile has been successfully updated! Your bank details approved!");
  var errorMessage =""; var bank = "";
  var payment_reference_paystack =""
  const notifyFailure = (message:string) => toast.error(message);

  const [isLoading, setIsLoading] = React.useState(false);
  
  const [banks, setData] = useState([]); 
  const [userDataEmail, setUserDataEmail] = useState(null); 
  const [userDataFirstName, setUserDataFirstName] = useState(null); 
  const [userDataLastName, setUserDataLastName] = useState(null); 
  const [userDataPhone, setUserDataPhone] = useState(null); 
  const [userDataAccName, setUserDataAccName] = useState(null); 
  const [userDataAccNum, setUserDataAccNum] = useState(null); 
  const [userDataBank, setUserDataBank] = useState(null); 
  const [userDataCurrency, setUserDataCurrency] = useState(null); 

  
  const [accountValidText, setAccountValidText] = useState("Your account has been successfully validated"); 


  
  const [selectedCurrencies, setSelectedCurrencies] = useState(""); // Initialize with an empty array

  const handleCurrencyChange = (selectedOptions: any) => {
    setSelectedCurrencies(selectedOptions);

    Cookies.set('selected_currency',selectedOptions);

    
  };

const currencies = [
 
  { code: 'NGN', currency: 'Naira' },
  { code: 'GHS', currency: 'Ghana Cedis' },
   { code: 'USD', currency: 'US DOLLARS' },
  // ... Other currency options
];


const [selectedCountries, setSelectedCountries] = useState([]); // Initialize with an empty array

const handleCountryChange = (selectedOptions: string | React.SetStateAction<never[]>) => {
  //setSelectedCountry(selectedOptions);
};

const countries = [
 
  { code: 'NGN', currency: 'Nigeria' },
  { code: 'GHS', currency: 'Ghana' },
  // ... Other currency options
];


  function setOnChangeForAccountNumber(e: any) {

    setUserDataAccNum(e.target.value) 
    setAccountValidText("Account has not been validated")

  }


  function setBank(bank_code:string){

      if(banks.length === 0){

     //   setUserDataBank(banks?.name)

      

      }

      else{
        for(let i = 0; i < banks.length; i++){

            if(banks[i]?.code == bank_code ){

                setUserDataBank( banks[i]?.bank);

               // alert("bank found")
               // alert((banks[i]?.bank))
            }

        }
      }


  }


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

    formData.append('id',user_id)
    if(userDataFirstName!=null)
      formData.append('firstName',userDataFirstName)
    if(userDataLastName!=null)
      formData.append('lastName',userDataLastName)
    if(userDataPhone!=null)
      formData.append('phone',userDataPhone)
    if(userDataAccName!=null)
      formData.append('bankAccountName',userDataAccName)
    if(userDataAccNum!=null)
      formData.append('bankAccountNumber',userDataAccNum)

    if(userDataBank !=null){

      formData.append('bank',userDataBank)
    }


      try {
        const res = await axios.post(
          `https://back.learniix.com/api/member/update`,
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
      // Make an HTTP GET request to the API endpoint using axios
      axios.get('https://back.learniix.com/api/banks/view/')
        .then((response: any) => {

        
            
             
             for(var i=0; i < response.data.length; i++){


             }

             console.log(banks);
             setData(response.data);
             setIsLoading(false)

             
        })
        .catch((error: any) => {
          // Handle errors if any
          console.error(error);
          setIsLoading(false)
        });
      }, []);
      

        useEffect(() => {
           // Make an HTTP GET request to the API endpoint using axios
      axios.get('https://back.learniix.com/api/view/user/'+user_id)
      .then((response: any) => {
          
           

        console.log(response);
           setUserDataEmail(response.data.email);
           setUserDataFirstName(response.data.firstName);
           setUserDataLastName(response.data.lastName);
           setUserDataPhone(response.data.phone);

           setUserDataAccName(response.data.bank_account_name);
           setUserDataAccNum(response.data.bank_account_number);
           setIsLoading(false)

          
           setUserDataBank(response.data.bank)
           setBank(response.data.bank)

           
      })
      .catch(error => {
        // Handle errors if any
        console.error(error);
        setIsLoading(false)
      });
    
        }, []);
      
  


  return (
    <div >
      <AffiliateDashboardHeader title="Affiliate Profile" />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl p-4'>
                <p className='text-xl font-medium text-zinc-600'>Your Personal Details</p>


                <div className="block mt-6">

<TextField
 fullWidth
 label="Email"
 variant="outlined"
 margin="normal"
//  {...register('email', { required: true })}
 InputProps={{
   startAdornment: (
     <InputAdornment position="start">
       {/* Icon for email (replace with your icon) */}
       ✉️
     </InputAdornment>
   ),
 }}

 style={{
   borderRadius: '12px', // Adjust the border-radius to make it curvier
   marginTop: '10px', // Optional: Adjust the top margin
 }}
 inputProps={{
   style: {
     fontSize: '12px', // Adjust the font size
     color: 'slategray', // Use the slate color for text
   },
 }}

 value ={userDataEmail}
/>
</div>


<div className="block mt-6">

<TextField
value ={userDataFirstName}
 fullWidth
 label="First Name"
 variant="outlined"
 margin="normal"
//  {...register('email', { required: true })}
 InputProps={{
   startAdornment: (
     <InputAdornment position="start">
       {/* Icon for email (replace with your icon) */}
       
     </InputAdornment>
   ),
 }}

 style={{
   borderRadius: '12px', // Adjust the border-radius to make it curvier
   marginTop: '10px', // Optional: Adjust the top margin
 }}
 inputProps={{
   style: {
     fontSize: '12px', // Adjust the font size
     color: 'slategray', // Use the slate color for text
   },
 }}
/>
</div>


<div className="block mt-6">

<TextField
value ={userDataLastName}
 fullWidth
 label="Last Name"
 variant="outlined"
 margin="normal"
//  {...register('email', { required: true })}
 InputProps={{
   startAdornment: (
     <InputAdornment position="start">
       {/* Icon for email (replace with your icon) */}
      
     </InputAdornment>
   ),
 }}

 style={{
   borderRadius: '12px', // Adjust the border-radius to make it curvier
   marginTop: '10px', // Optional: Adjust the top margin
 }}
 inputProps={{
   style: {
     fontSize: '12px', // Adjust the font size
     color: 'slategray', // Use the slate color for text
   },
 }}
/>
</div>
<button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Update Profile
      </button>

            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Your Bank Details</p>


    <div className="block mt-6">

<TextField
value ={userDataAccName}

fullWidth
label="Bank Account Name"
variant="outlined"
margin="normal"
//  {...register('email', { required: true })}
InputProps={{
startAdornment: (
<InputAdornment position="start">
{/* Icon for email (replace with your icon) */}
✉️
</InputAdornment>
),
}}

style={{
borderRadius: '12px', // Adjust the border-radius to make it curvier
marginTop: '10px', // Optional: Adjust the top margin
}}
inputProps={{
style: {
fontSize: '12px', // Adjust the font size
color: 'slategray', // Use the slate color for text
},
}}
/>
</div>


<div className="block mt-6">

<TextField
 value ={userDataAccNum}
fullWidth
label="Bank Account Number"
variant="outlined"
margin="normal"
//  {...register('email', { required: true })}
InputProps={{
startAdornment: (
<InputAdornment position="start">
{/* Icon for email (replace with your icon) */}

</InputAdornment>
),
}}

style={{
borderRadius: '12px', // Adjust the border-radius to make it curvier
marginTop: '10px', // Optional: Adjust the top margin
}}
inputProps={{
style: {
fontSize: '12px', // Adjust the font size
color: 'slategray', // Use the slate color for text
},
}}
/>
</div>





<div className="block mt-6">
    <p className='mb-2 text-zinc-600'>Select A Bank</p>

    <select id="mySelect" className='bg-white text-grey_600 p-3 border-2 border-grey_300 rounded-lg w-full' onChange={(e:any)=>setUserDataBank(e.target.value)}>

{ userDataCurrency=="GHS"?(

banks.map((option:any) => (

        
          option.country="GHS"&&(<>
          
          </>)
          
       
        ))):(banks.map((option:any) => (

        
          option.country="NGN"&&(<>
             <option key={option?.code} value={option.code}  selected={option.code === bank}>
            {option.bank}
          </option>
          </>)
          
       
        )))
        
        }

</select>
</div>


<button 
        type="submit"
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Submit Bank Details
      </button>


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

export default AffiliateDashboard

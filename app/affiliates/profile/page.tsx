"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, InputAdornment, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AffiliateDashboardHeader from '../dashboard/header/page';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'

import Autocomplete from '@mui/material/Autocomplete';



// Your main component
const AffiliateDashboard = () => {
  var user_data = Cookies.get('user_details');

    
  var isVendor =false;var user_id =""; var affiliate_id = ""; var unpaid_balance ="";
  
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
  const [userDataWithdrawAmount, setUserDataWithdrawAmount] = useState("0"); 

  
  
  
  const [accountValidText, setAccountValidText] = useState("Your account has been successfully validated"); 
  const [all_banks, setAllBanks] = useState([
   
  ]);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  let [color, setColor] = useState("#90EE90");

  
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

    unpaid_balance = (user as any).unpaid_balance;

   

   
        
   
    

 }
 
  const submitPfofileDetails = async(event: any) => {



    setIsLoading(true)
   
  

    event.preventDefault();


    if(parseInt(userDataWithdrawAmount) > parseInt(unpaid_balance)){

      toast.error("Please enter an amount that is less than or equal to your total wallet balance ")
      setIsLoading(false)
      return;
      
    }

    


    var formData = new FormData();

    formData.append('id',user_id)
    if(userDataFirstName!=null)
      formData.append('firstName',userDataFirstName)

    if(userDataWithdrawAmount!=null){

    
      formData.append('next_withdrawal_amount',userDataWithdrawAmount)

    }else{
      formData.append('next_withdrawal_amount',"0")
    }


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

        
            
             
          const apiOptions = response.data.map((item: { code: any; bank: any; }) => ({ value: item.code, label: item.bank }));
   
          setAllBanks(apiOptions)

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
       <Toaster/>
      <AffiliateDashboardHeader title="Vendors Profile" />

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
 disabled
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
disabled
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
disabled
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


            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Your Bank Details</p>


    <div className="block mt-6">

<TextField
value ={userDataAccName}
onChange={(e:any) => setUserDataAccName(e.target.value)}
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
 onChange={setOnChangeForAccountNumber}
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

    
 <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={all_banks}
      onChange={(event, selectedOption) => {
        if (selectedOption) {
          // Access the selected option and do something with it
          console.log('Selected Option:', selectedOption.value);
          setUserDataBank(selectedOption.value); // Assuming you want to set some state with the selected value
        } else {
          // Handle the case when no option is selected
          console.log('No option selected');
        }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Bank" />}
    />

  
</div>


<p className='mt-4 text-sm'> You can set a specific amount of cash you would want to withdraw from your total balance on the next payment date. Enter A specific amount below. </p>

<p className='mt-4 text-green-500'>Your current wallet balance is {unpaid_balance}</p>
<div className="block mt-6">

<TextField
 fullWidth
 label="Amount"
 variant="outlined"
 margin="normal"
 onChange={(e:any) => setUserDataWithdrawAmount(e.target.value)}
//  {...register('email', { required: true })}
 InputProps={{
   startAdornment: (
     <InputAdornment position="start">
       {/* Icon for email (replace with your icon) */}
       💰
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

 value ={userDataWithdrawAmount}
/>
</div>


      {
        isLoading==false?(<>
      <button 
        onClick={submitPfofileDetails}
        
        className="bg-green-500 hover:bg-white hover:text-green-500  text-white font-bold py-2 px-4 rounded-xl w-full shadow-xl mt-6 "
      >
        Update Withdrawal Details
      </button>

        
        </>):(<> <div className='w-full flex justify-center mt-6'>

<PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
</div></>)
      }


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

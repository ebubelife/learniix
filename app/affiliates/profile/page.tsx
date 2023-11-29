"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, InputAdornment, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AffiliateDashboardHeader from '../dashboard/header/page';




// Your main component
const AffiliateDashboard = () => {

  


  return (
    <div >
      <AffiliateDashboardHeader title="Affiliate Profile" />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className='h-screen'>

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
/>
</div>


<div className="block mt-6">

<TextField
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



        <div className='h-screen'>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Your Bank Details</p>


    <div className="block mt-6">

<TextField
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

<TextField
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


<div className="block mt-6">
    <p className='mb-2 text-zinc-600'>Select A Bank</p>

<select id="selectBank" className='bg-white text-grey_600 p-3 border-2 border-grey_300 rounded-lg w-full' >


          
          
<option  value="NGN" >
  UBA
 
</option>

<option  value="NGN" >
  First
 
</option>


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

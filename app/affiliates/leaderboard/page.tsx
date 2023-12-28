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
const Leaderboard = () => {

  


  return (
    <div >
      <AffiliateDashboardHeader title="LeaderBoard" />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl p-4'>
                <p className='text-xl font-medium text-zinc-600'>LIB Sales Challenge Ranking</p>

                <p className='text-md mt-4 font-medium text-zinc-600'>Time Left: <span className='text-green-500'>5 Days</span></p>


                <div className=" mt-6 h-96 w-full bg-zinc-200 grid place-content-center rounded-md">


<p>Challenge Banner</p>

</div>
       
            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600 mb-4'>Top 10 Sellers</p>


   <div className=' px-2 py-2 grid place-content-center w-full mt-4 h-20 border border-1 border-zinc-200 rounded-md'>

    <p>Affiliate 1 Full Name</p>

   </div>

   <div className=' px-2 py-2 grid place-content-center w-full mt-4 h-20 border border-1 border-zinc-200 rounded-md'>

    <p>Affiliate 2 Full Name</p>

   </div>
   <div className=' px-2 py-2 grid place-content-center w-full mt-4 h-20 border border-1 border-zinc-200 rounded-md'>

<p>Affiliate 3 Full Name</p>

</div>

<div className=' px-2 py-2 grid place-content-center w-full mt-4 h-20 border border-1 border-zinc-200 rounded-md'>

<p>Affiliate 4 Full Name</p>

</div>

<div className=' px-2 py-2 grid place-content-center w-full mt-4 h-20 border border-1 border-zinc-200 rounded-md'>

<p>Affiliate 5 Full Name</p>

</div>



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

export default Leaderboard

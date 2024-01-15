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




// Your main component
const Leaderboard = () => {

  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date('2024-02-14'); // Set the target date (year-month-day)

    const difference = targetDate.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    setTimeLeft({ days, hours });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div >
      <AffiliateDashboardHeader title="LeaderBoard" />

      <div className="w-screen h-screen  py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl '>
                <p className='text-xl font-medium text-zinc-600'>LIB Sales Challenge Ranking</p>

                <div className='w-screen  flex justify-center'>


  
<div className=' md:w-1/3 w-full mt-2 h-20 mt-4 rounded-md mt-4 grid place-content-center text-xl font-semibold text-green-500 shadow-md'>
<p className='text-sm text-black text-center'>TIME LEFT</p>
{timeLeft.days} days, {timeLeft.hours} hours

</div>




</div>



      <div className='w-screen  flex justify-center'>

{
 
<div className=' md:w-1/3 mt-2 h-96 rounded-md mt-4 flex justify-center'>

  <img src="/images/home/WhatsApp Image 2024-01-13 at 12.56.32 PM.jpeg" className='h-full w-full' alt="learniix promo banner" />

</div>

}


</div>



       
            </div>


        </div>



        <div className='hidden'>

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

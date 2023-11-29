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
const AffiliateWithdrawals = () => {

  


  return (
    <div >
      <AffiliateDashboardHeader title="Withdrawals History" />

      <div className="w-screen h-screen px-4 py-4 overflow-y flex justify-center">


      


       <div className="mt-6"></div>

     


      <div className='md:w-2/3 w-full'>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-grey_600 mt-6">
    <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-grey-600">
            <tr>
                <th scope="col" className="px-6 py-3  text-zinc-600">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
              
            </tr>
        </thead>   
        <tbody className='text-grey_600'>


       
            <tr  className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-grey-600 whitespace-nowrap  text-grey_600 ">
                 
                </th>
                <td className="px-6 py-4 text-gold">
                   
                </td>
               
            </tr>
          
     
 



</tbody>
   </table>
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

export default AffiliateWithdrawals
;
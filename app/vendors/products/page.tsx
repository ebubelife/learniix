"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import VendorDashboardHeader from '../header/page';




// Your main component
const Products = () => {
// Inside your component
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isMenuOpen, setMenuOpen] = useState(false);
   

    

  


  return (
    <div >
      <VendorDashboardHeader title="Products" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>





<p className='font-medium text-xl md:text-left text-center text-green-500'>Learniix Product Marketplace</p>



<div className="mt-6"></div>

<div className='w-screen  md:px-10 px-4'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0'>
<p className='text-sm font-semibold'>How To Run Google Ads That Convert</p>
<div className='flex w-full mt-4'>
<div>
<p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>


<p className='text-md font-semibold text-green-500 '>$500</p>
</div>
<Link href={"products/view?product=1"} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl'>SELL</Link>
</div>
<p className='font-medim text-md mt-2'>Commission:</p>

<p className='text-md font-semibold text-green-500 '>50%</p>



</div>


<div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0'>
<p className='text-sm font-semibold'>How To Run Google Ads That Convert</p>
<div className='flex w-full mt-4'>
<div>
<p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>


<p className='text-md font-semibold text-green-500 '>$500</p>
</div>
<Link href={"products/view?product=1"} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl'>SELL</Link>
</div>

<p className='font-medim text-md mt-2'>Commission:</p>

<p className='text-md font-semibold text-green-500 '>50%</p>



</div>

<div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0'>
<p className='text-sm font-semibold'>How To Run Google Ads That Convert</p>
<div className='flex w-full mt-4'>
<div>
<p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>


<p className='text-md font-semibold text-green-500 '>$500</p>
</div>
<Link href={"products/view?product=1"} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl'>SELL</Link>
</div>

<p className='font-medim text-md mt-2'>Commission:</p>

<p className='text-md font-semibold text-green-500 '>50%</p>



</div>


<div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0'>
<p className='text-sm font-semibold'>How To Run Google Ads That Convert</p>
<div className='flex w-full mt-4'>
<div>
<p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>


<p className='text-md font-semibold text-green-500 '>$500</p>
</div>
<Link href={"products/view?product=1"} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl'>SELL</Link>
</div>

<p className='font-medim text-md mt-2'>Commission:</p>

<p className='text-md font-semibold text-green-500 '>50%</p>



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
       
       </div>
 
  );
};

export default Products;

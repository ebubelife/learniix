"use client"

import Link from "next/link";


import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header() {


const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


    return (


        <>
{/*Pop to display options for getting started*/}
<React.Fragment>
     
     <Dialog
       open={open}
       TransitionComponent={Transition}
       keepMounted
       onClose={handleClose}
       aria-describedby="alert-dialog-slide-description"
     >
       <DialogTitle className="font-medium text-sm">{"Create An Account On Learniix"}</DialogTitle>
       <DialogContent>
        <div className="bg-black p-2 rounded-md text-white text-center shadow-xl hover:shadow-2xl cursor-pointer font-light">
          Become An Affiliate
        </div>

        <div className="bg-green-500 p-2 rounded-md text-white text-center mt-4 shadow-xl hover:shadow-2xl cursor-pointer font-light">
          Become A Vendor
        </div>
         
       </DialogContent>
      
     </Dialog>
   </React.Fragment>
      <div className=' w-screen bg-white shadow-md px-20 py-2 flex items-center justify-center '>


        
<p className="main-logo text-black font-bold text-2xl"><Link href={"/"}>LEARNIIX</Link></p>
<ul className="main-menu text-black flex space-x-6 justify-center ml-40 pt-2">
<li className="menu-item  text-sm cursor-pointer hover:text-zinc-600 "><Link href={"../../about"}>About Us</Link></li>
<li className="menu-item text-sm cursor-pointer hover:text-zinc-600 "><Link href={"../../focus"}>Our Focus</Link></li>
<li className="menu-item text-sm cursor-pointer hover:text-zinc-600 ">Contact</li>
<li className="menu-item text-sm cursor-pointer hover:text-zinc-600 bg-black text-white px-4 py-2 ml-2 shadow-xl rounded-md hover:ml-2 ">Login</li>

<li className="menu-item text-sm cursor-pointer hover:text-zinc-600 bg-green-400 p-2 ml-2 shadow-xl rounded-md hover:ml-2 " onClick={handleClickOpen}>Get Started</li>


</ul>




</div>


        </>

    )

}
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import FAQs from './components/Faqs'
import Footer from './components/Footer';
import AppBar from './components/Appbar';


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

export default function Home() {


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


    <main className="items-center h-screen w-screen">

      <div className='md:block hidden'>
{/*main top header large screens*/}
      <Header />



      </div>

      <div className='md:hidden '>

        {/*main top header small screens*/}

      <AppBar />

      </div>
      

      


      <div className="md:h-2/3 h-[500px] w-screen  " style={{ backgroundImage: "url('/images/home/Untitled design (7).png')" }}>

{/*Hero */}
      

<div className='w-full md:h-2/3 h-[500px]  absolute z-10  grid md:grid-cols-2 grid-cols-1 md:py-2 py-8' style={{ backgroundColor:`rgba(0,0,0,0.8)`}}>

<div className='h-full w-full md:px-20 md:py-10 md:p-0 p-4'>
       <h1 className='text-green-600 md:text-4xl text-xl font-bold md:text-left text-center'>Learn, Sell, Earn, Build</h1>

       <h1 className='text-white text-md md:text-left text-center font-smibold mt-4 '>Safeguard your future and hedge your finances against inflation by acquiring...</h1>
       
       {/*mobile version shows only on mobile */}
     <div className="md:mt-4 mt-8 flex  justify-center md:hidden ">
     <div className=' rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-md  py-2 '>Profitable Knowledge</div>

     </div>

 {/*large screen version shows only on large */}
     <div className="md:mt-4 mt-8 hidden md:block  ">
     <div className='h-10 rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-xl  py-1 '>Profitable Knowledge</div>

     </div>


       <h1 className='text-white md:text-md text-sm font-light mt-4 md:text-left text-center  '>Acquire premium salesmanship skills from our well crafted sales course and earn profitably by selling useful products for high commissions. </h1>
      

      
      <button className='bg-green-600 text-white shadow-xl hover:bg-white hover:text-green-600 cursor-pointer md:text-xl text-md py-2 px-10 mt-4 rounded-full md:block hidden'>Yes I Want In!</button>
       
      <div className="md:mt-4 mt-8 flex  justify-center md:hidden ">
      <button onClick={handleClickOpen} className='bg-green-600 text-white shadow-xl hover:bg-white hover:text-green-600 cursor-pointer md:text-xl text-md py-2 px-10 mt-4 rounded-full'>Yes I Want In!</button>
     </div>
       
       </div>

     
       

       <div>
       <img src="/images/home/360_F_299939547_CwlOeI0nQ0ZACCpGmDrz2ZmOqsTfcvBf-removebg-preview.png" className='hero-image h-full w-full'  alt="hero-image" />

       </div>

</div>

      </div>


{/*sectionone */}
     <div className='w-screen md:px-0 px-2  flex justify-center' style={{marginTop:`-140px`}}>

     <div className='md:w-2/3 mt-20 w-full   bg-white  rounded-md shadow-md z-20 grid  md:grid-cols-3 grid-cols-1 p-4 gap-2' >
       
       
       <div className='md:border-r border-t px-2 md:py-0 py-2 md:border-r-zinc-300  border-t-zinc-300 md:mt-0 mt-8 '>

      <div className='w-full flex justify-center'>
      <img src="/images/home/undraw_online_learning_re_qw08.svg" className='hero-image h-full w-full h-32 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600'>Acquire top sales and marketing skills from our online course. Know how to gather leads, create trust and prime your audience for explosive sales.</p>
       </div>


       
       <div className='border-r px-2 border-r-zinc-300 md:mt-0 mt-8'>

      <div className='w-full flex justify-center'>
      <img src="/images/home/undraw_online_learning_re_qw08.svg" className='hero-image h-full w-full h-32 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600'>Acquire top sales and marketing skills from our online course. Know how to gather leads, create trust and prime your audience for explosive sales.</p>
       </div>



      
       <div className='md:border-r border-t px-2 md:py-0 py-2 md:border-r-zinc-300  border-t-zinc-300 md:mt-0 mt-8'>

      <div className='w-full flex justify-center'>
      <img src="/images/home/undraw_online_learning_re_qw08.svg" className='hero-image h-full w-full h-32 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600'>Acquire top sales and marketing skills from our online course. Know how to gather leads, create trust and prime your audience for explosive sales.</p>
       </div>






     </div>
     </div>
     


     <p className='text-center md:text-2xl text-xl text-black font-semibold mt-10 md:mt-20'>Words From The Learniix Team</p>
  

    <div className='flex justify-center px-4 md:px-20'>

    {
  //words from founder section
}
      <div className='grid md:grid-cols-2 md:gap-4 grid-cols-1 mt-8 md:mt-20'>

<div>
<h1 className='text-green-600 md:text-xl text-md font-normal'>The best time to learn profitable skills was yesterday</h1>

<h1 className='text-black md:text-xl text-md font-medium'>The second best time is ... NOW</h1>

<p className='text-sm mt-4 text-zinc-800 text-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod quam eget risus cursus, sed elementum risus tristique. Phasellus vehicula libero at odio vulputate, sed bibendum est suscipit. ut.
</p>

<p className='text-sm mt-4 text-zinc-800 text-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod quam eget risus cursus, sed elementum risus tristique. Phasellus vehicula libero at odio vulputate, sed bibendum est suscipit. ut.
</p>

<p className='text-sm mt-4 text-zinc-800 text-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod quam eget risus cursus, sed elementum risus tristique. Phasellus vehicula libero at odio vulputate, sed bibendum est suscipit. ut.
</p>
</div>
      


<img src="/images/home/slanting_shapes.png" alt="" style={{marginTop:`-80px`}} />
       </div>

    
      
    </div>


<div className='w-screen flex justify-center mt-16'>
  <p className='font-medium text-3xl text-green-600'>How It Works</p>

</div>


<div className='w-screen justify-center md:px-28 px-2 mt-16'>

  <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>

  <div className='w-full px-4 py-2 border border-zinc-100 rounded-xl shadow-md mt:mt-0 mt-16'>

<div style={{marginTop:`-30px`}} className='w-full flex justify-center'>
<div className='h-16 w-16 bg-white border border-zinc-100 rounded-full shadow-xl items-center flex  justify-center'>

<p className="text-green-500">1</p>

</div>






</div>




<div className="w-full h-60 px-4 mt-4">
<img src="/images/home/Xnapper-2023-11-05-02.07.00.png" className='h-full w-full rounded-md' alt=""/>


</div>

<p className='font-light text-center  text-xs text-zinc-600 mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod quam eget risus cursus, sed elementum risus tristique. Phasellus vehicula libero at odio vulputate, sed bibendum est suscipit. ut.</p>


</div>





<div className='w-full px-4 py-2 border border-zinc-100 rounded-xl shadow-md mt:mt-0 mt-16'>

<div style={{marginTop:`-30px`}} className='w-full flex justify-center'>
<div className='h-16 w-16 bg-white border border-zinc-100 rounded-full shadow-xl items-center flex  justify-center'>

<p className="text-green-500">2</p>

</div>




</div>


<div className="w-full h-60 px-4 mt-4">
<img src="/images/home/Xnapper-2023-11-05-02.07.00.png" className='h-full w-full rounded-md' alt=""/>


</div>

<p className='font-light text-center  text-xs text-zinc-600 mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod quam eget risus cursus, sed elementum risus tristique. Phasellus vehicula libero at odio vulputate, sed bibendum est suscipit. ut.</p>


</div>





   
  </div>


</div>


<p className='text-center text-3xl text-grey_600 mt-10 font-semibold text-green-600'>
FAQs
 
</p>

<p className='text-center font-light text-sm text-grey_600'>
Common Questions People Ask About Us
 
</p>

<div className="lg:px-40 mt-6 px-6 sm:px-6">
<FAQs />

</div>

<div className="flex-grow">

</div>

<Footer />

          </main>

          </>
  )
}

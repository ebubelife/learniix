"use client"

import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import FAQs from './components/Faqs'
import Footer from './components/Footer';
import AppBar from './components/Appbar';


import { useState, useEffect, forwardRef, Fragment } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const phrasesArray = ['Profitable Knowledge', 'Profitable Skills', 'Salesmanship', 'Digital Skills'];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState('');

  {/* code below randomises phrases in the header hero */}

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrasesArray[currentPhraseIndex];
      setDisplayedPhrase((prevPhrase) => {
        const displayedLength = prevPhrase.length;

        if (!isDeleting && displayedLength < currentPhrase.length) {
          return currentPhrase.substring(0, displayedLength + 1);
        } else if (isDeleting && displayedLength > 0) {
          return currentPhrase.substring(0, displayedLength - 1);
        } else {
          isDeleting = !isDeleting;
          if (isDeleting) {
            charIndex = 0;
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrasesArray.length);
          }
        }
        return prevPhrase;
      });
    };

    const interval = setInterval(type, 100); // Adjust speed here (milliseconds)

    return () => clearInterval(interval);
  }, [currentPhraseIndex, phrasesArray]);

  

  return (

    <>
   {/*Pop to display options for getting started*/}
<Fragment>
     
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
   </Fragment>


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
     <div className=' rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-md  py-2 '>  {displayedPhrase}</div>

     </div>

 {/*large screen version shows only on large */}
     <div className="md:mt-4 mt-8 hidden md:block  ">
     <div className='h-10 rounded-md shadow-md w-60 bg-white text-center font-semibold text-green-600 text-xl  py-1 '>  {displayedPhrase}</div>

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
      <img src="/images/home/download (1).jpeg" className='hero-image h-full w-full h-32 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600 mt-4'>Acquire top sales and marketing skills from our online course. Know how to gather leads, create trust and prime your audience for explosive sales.</p>
       </div>


       
       <div className='border-r px-2 border-r-zinc-300 md:mt-0 mt-8'>

      <div className='w-full flex justify-center'>
      <img src="/images/home/best-affiliate-marketing-courses.jpeg" style={{height:180}} className='hero-image h-full w-full h-40 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600 mt-4'>Access an open marketplace of very quality products. We have an array of handpicked products and all you have to do is select on that appeals to your skills.</p>
       </div>



      
       <div className='md:border-r border-t px-2 md:py-0 py-2 md:border-r-zinc-300  border-t-zinc-300 md:mt-0 mt-8'>

      <div className='w-full flex justify-center'>
      <img src="/images/home/website-pics-1270-×-720px-76-1200x750.png" className='hero-image h-full w-full h-32 w-32 md:ml-8'  alt="hero-image" />

      </div>
       <p className='text-xs font-normal  text-center  text-zinc-600 mt-4'>Earn a solid living by marketing and selling products. You don&apos;t need a physical store. We handle the logistics and deliveries and we pay you your commissions weekly.</p>
       </div>






     </div>
     </div>
     


     <p className='text-center md:text-2xl text-xl text-black font-semibold mt-10 md:mt-20'>Words From The Learniix Team</p>
  

    <div className='flex justify-center px-4 md:px-20'>

    {
  //words from founder section
}
      <div className='grid md:grid-cols-2 md:gap-10 grid-cols-1 mt-8 md:mt-20'>

<div>
<h1 className='text-green-600 md:text-xl text-md font-normal'>The best time to learn profitable skills was yesterday</h1>



<h1 className='text-black md:text-xl text-md font-medium'>The second best time is ... NOW</h1>






<p className='text-sm mt-4 text-zinc-800 text-light'>Picture this: acquiring skills that not only align with your passion but also open the doors to lucrative opportunities. From content creation that resonates with diverse audiences to leveraging the power of affiliate marketing, the potential for success knows no bounds.

</p>

<p className='text-sm mt-4 text-zinc-800 text-light'>Imagine turning your hobbies or interests into a thriving online business that caters to a global audience, all from the comfort of your home in Nigeria. The digital realm offers a level playing field, where determination and skill trump geographical barriers.

</p>

<p className='text-sm mt-4 text-zinc-800 text-light'>Moreover, our platform is your gateway to a world of resources, guidance, and support. We provide a nurturing environment that fosters growth and empowers you to transform your dreams into a sustainable source of income.

</p>

<p className='text-sm mt-4 text-zinc-800 text-light'>Remember, the time to embark on this journey is now. Don&apos;t let the opportunities pass you by. Embrace the wealth of resources available to you, leverage your strengths, and chart a course towards a prosperous future.

Join us on this exciting adventure of skill acquisition, entrepreneurship, and success. The landscape is ripe, the stage is set, and your moment to shine in the Nigerian digital space has arrived.


</p>
</div>
      


<img className="transition-opacity ease-in duration-2000 opacity-100 hover:opacity-0" src="/images/home/check-out-happy-african-american-man-pointing-fingers-left-sale-logo-showing-promo-text-smiling-cheerful-recommending-product-white-background_176420-46839.jpg" alt="" style={{marginTop:`-50px`}} />
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

<p className='font-light text-left  text-s text-zinc-600 mt-4'>1. Create an account. Our membership costs N10,000 ($20) for a year and it allows you to access our marketplace as a full affiliate and also educational resources and training videos</p>


<p className='font-light text-left  text-s text-zinc-600 mt-4'>2. Go through our training material. We want your business to succeed, so we have packaged a solid arrnagment of videos and materials to get the best out of your new affiliate marketing business.</p>

<p className='font-light text-left  text-s text-zinc-600 mt-4'>3. Start promoting and making sales. We pay between 20% and 40% in commissions for products you sell. The products are digital producst and can be delivered to anyon, anywhere. </p>

<p className='font-light text-left  text-s text-zinc-600 mt-4'>4. Start earning </p>


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

<p className='font-light text-left  text-s text-zinc-600 mt-4'>1. Create an account. Our membership for vendors costs N10,000 ($20) for a year and it allows you to create business as a vendor on our platform and submit your product(s) </p>


<p className='font-light text-left  text-s text-zinc-600 mt-4'>2. Review our terms and conditions for products that meet up with our standards and our specifications for sales and payouts.</p>

<p className='font-light text-left  text-s text-zinc-600 mt-4'>3. Submit your product with all the information needed and once approved, it appears on our marketplace. </p>

<p className='font-light text-left  text-s text-zinc-600 mt-4'>4. We have a strong network of affiliates that will take it up from here, promoting your products. Delivery and payouts are handled efficiently and securely by our platform. </p>


</div>





   
  </div>


</div>




<div className=' w-screen bg-black  mt-10' style={{backgroundImage: 'url("/images/home/computer-buy-money-banknotes-163056.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
<div className='py-10 w-full h-full bg-black opacity-80 p-x10 text-center grid place-content-center'>
<p className=' text-white md:text-xl font-medium md:text-md'>Get paid for every sale!</p>
    
  <p className=' text-green-500 md:text-xl font-bold md:text-md mt-2'>Our robust tracking code guarantees that you receive commmisions <br></br>for every sale generated through your link as an affiliate. <br></br>Starting is simple and straightforward.</p>
    
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

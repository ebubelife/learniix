"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AffiliateDashboardHeader from './header/page';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { PropagateLoader } from 'react-spinners';




// Your main component
export default function AffiliateDashboard() {

  
  var user_data = Cookies.get('user_details');

  var selected_currency = Cookies.get('selected_currency');
  var naira_exchange_rate = ""; var convert_balance_usd =""; var created_at ="", renewed_at = "";
  var firstname =""; var isVendor =false; var id=""; var affiliate_id =""
  const [isLoading, setIsLoading] = React.useState(false);
  var unpaid_balance_affiliate =" "; var total_affiliate_cash ="";var  total_aff_sales ="";
 
  
  const [data, setData] = useState([]); 
  const [vendors, vendorsData] = useState([]); 
  const [products, productsData] = useState([]); 
  const [totalEarnings, setTotalEarnings] = useState(""); 
  const [totalSales, setTotalSales] = useState([]);
  const [todaySalesData, setTodaySalesData] = useState([]); 
  const [todaySales, setTodaySales] = useState("0");
  const [todayEarnings, setTodayEarnings] = useState("0.00"); 
  const [topAffiliatesData, setTopAffiliatesData] = useState([]); 
  const [notifications, setNotificationsData] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(true); 
  const [loadingTopAffiliates, setLoadingTopAff] = useState(true); 

   // State to handle the modal visibility
   const [isOpen, setIsOpen] = useState(false);

   // Function to toggle modal visibility
   const toggleModal = () => {
     setIsOpen(!isOpen);
   };
 
  

   
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  let [color, setColor] = useState("#90EE90");
  
  const router = useRouter(); 
  var  loggedIn = " ";

  if(user_data){
      var user = JSON.parse(user_data)

        
      firstname =(user as any).firstName;
      isVendor =(user as any).isVendor;
      id = (user as any).id
      affiliate_id = (user as any).affiliate_id
      unpaid_balance_affiliate = (user as any).unpaid_balance;
      total_affiliate_cash = (user as any).total_aff_sales_cash;
      total_aff_sales = (user as any).total_aff_sales;
      naira_exchange_rate = (user as any).naira_exchange_rate;
      convert_balance_usd = (user as any).convert_balance_usd;
      created_at = (user as any).created_at;
      renewed_at = (user as any).renewed_at;
     
      

   }
 

   

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

  const convertAffTotalCurrency =()=>{

    if(selected_currency ){

      if(selected_currency = "USD"){

          var total_aff_sales_usd = parseInt(total_affiliate_cash) / parseInt(naira_exchange_rate);


          return "$ "+ (total_aff_sales_usd).toString();


        
      }

      else if(selected_currency = "NGN"){

       // var ngn_bal = (parseInt(convert_balance_usd) * parseInt(naira_exchange_rate));

        return "₦ "+total_affiliate_cash.toString();


      }


    }

    else{

      var total_aff_sales_usd = parseInt(total_affiliate_cash) / parseInt(naira_exchange_rate);


      return "$ "+ (total_aff_sales_usd).toString();

    }

  
   }



  



   const convertAffBalanceCurrency=()=>{

    if(selected_currency ){

      if(selected_currency = "USD"){


          return "$ "+convert_balance_usd.toString();


        
      }

      else if(selected_currency = "NGN"){

        var ngn_bal = (parseInt(convert_balance_usd) * parseInt(naira_exchange_rate));

        return "₦ "+ngn_bal.toString();


      }


    }

    else{

      return "$ "+convert_balance_usd.toString();
    }

  
   }

   function getCurrentMonth(){

    // Create a new Date object
const currentDate = new Date();

// Get the current month (0-based, so January is 0, February is 1, etc.)
const monthNumber = currentDate.getMonth() + 1; // Adding 1 to make it 1-based

let monthName = '';
  
if (monthNumber === 1) {
  monthName = 'January';
} else if (monthNumber === 2) {
  monthName = 'February';
} else if (monthNumber === 3) {
  monthName = 'March';
} else if (monthNumber === 4) {
  monthName = 'April';
} else if (monthNumber === 5) {
  monthName = 'May';
} else if (monthNumber === 6) {
  monthName = 'June';
} else if (monthNumber === 7) {
  monthName = 'July';
} else if (monthNumber === 8) {
  monthName = 'August';
} else if (monthNumber === 9) {
  monthName = 'September';
} else if (monthNumber === 10) {
  monthName = 'October';
} else if (monthNumber === 11) {
  monthName = 'November';
} else if (monthNumber === 12) {
  monthName = 'December';
} else {
  monthName = 'Invalid Month'; // Handle invalid month numbers
}

return monthName;
   }


   function calculateDaysDifference() {

    var givenDate;
    // Convert the date string to a Date object
    if(renewed_at == null)
     givenDate = new Date(created_at);

    else
     givenDate = new Date(renewed_at);

  
    // Get today's date
    const today = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = today.getTime() - givenDate.getTime();
  
    // Convert the time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return 365-daysDifference;
  }
 
  const formatDate = (dateString:any) =>{
    const date = new Date(dateString)
    const formattedDate = format(date, 'EEEE, MMMM d, yyyy, h:mm a');


    return formattedDate;
  }

 

  
   useEffect(() => {
     
    // Make an HTTP GET request to the API endpoint using axios
    axios.get('https://back.learniix.com/api/top_affiliate/product/view/1',
   )
      .then((response: any) => {
          
           

          
           setTopAffiliatesData(response.data);
          
           setIsLoading(false)
           console.log(response.data);

           setLoadingTopAff(false)

           
      })
      .catch((error: any) => {
        // Handle errors if any
        console.error(error);
        setIsLoading(false)
      });
    }, []);

      //get notifications
        
      useEffect(() => {
       
        // Make an HTTP GET request to the API endpoint using axios
        axios.get('https://back.learniix.com/api/notifications/user/'+id)
          .then((response: any) => {
              
               

              
               setNotificationsData(response.data);
             
               console.log(response.data);
               setLoadingNotif(false)


               
          })
          .catch((error: any) => {
            // Handle errors if any
            console.error(error);
            setIsLoading(false)
          });
        }, [id]);

  

   useEffect(() => {
    
     
      // Make an HTTP GET request to the API endpoint using axios
      axios.get('https://back.learniix.com/api/view/user_sales_count/'+ affiliate_id )
        .then((response: any) => {
            
             

            
             setData(response.data);
             setTotalEarnings(response.data.total_sales);
             setTotalSales(JSON.parse(response.data.count));
             setIsLoading(false)
             console.log(response.data);

             
        })
        .catch((error: any) => {
          // Handle errors if any
          console.error(error);
          setIsLoading(false)
        });
      }, [affiliate_id]);


      //Pull vendor data

      useEffect(() => {
     
          // Make an HTTP GET request to the API endpoint using axios
          axios.get('https://back.learniix.com/api/vendors/top/view' )
            .then((response: any) => {
                
                 
  
                
                vendorsData(response.data);
              
                 setIsLoading(false)
                 console.log(response.data);
  
                 
            })
            .catch((error: any) => {
              // Handle errors if any
              console.error(error);
              setIsLoading(false)
            });
          }, [ ]);

         

          useEffect(() => {
     
              // Make an HTTP GET request to the API endpoint using axios
              axios.get('https://back.learniix.com/api/sales/today/affiliate/'+affiliate_id )
                .then((response: any) => {
                    
                     
      
                    
                    setTodaySalesData(response.data);

                    setTodaySales(response.data.length.toString());

                    var totalSales = 0.00;

                    for (var i = 0; i < response.data.length; i++) {

                      var product_commission = parseInt(response.data[i].commission)

                      var commission_sale = (product_commission/100) * parseInt(response.data[i].product_price)

                      totalSales += commission_sale;

                    }

                    setTodayEarnings(totalSales.toString());
                  
                     setIsLoading(false)
                     console.log(response.data);  
      
                     
                })
                .catch((error: any) => {
                  // Handle errors if any
                  console.error(error);
                  setIsLoading(false)
                });
              }, [affiliate_id ]);


              useEffect(() => {
     
                // Make an HTTP GET request to the API endpoint using axios
                axios.get('https://back.learniix.com/api/products/view/50' )
                  .then((response: any) => {
                      
                       
        
                      
                      productsData(response.data);
                    
                       setIsLoading(false)
                       console.log(response.data);
        
                       
                  })
                  .catch((error: any) => {
                    // Handle errors if any
                    console.error(error);
                    setIsLoading(false)
                  });
                }, [ ]);
      

 

 


  return (
    <div >
      <AffiliateDashboardHeader title="Affiliate Dashboard" />

       {/* Modal */}
       {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={toggleModal} // Close modal when background is clicked
        >
          <div
            className="bg-white rounded-md p-4 w-full max-w-lg flex justify-center items-center"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <img
              src="/images/1000215117.png"
              className="rounded-md h-full w-full"
              alt="learniix promo banner"
            />
          </div>
        </div>
      )}

      <div className="w-screen h-screen py-4">


     <h2 className='text-xl font-semibold text-green-500 ml-4'> Hi {firstname}, </h2>


       <div className="mt-6"></div>

<div className='w-screen  px-10'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos;s Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl grid place-content-center'>
<img src="/images/target-svgrepo-com.svg" className='h-[30px] w-[30px]' alt=""/>


</div>



<p className='text-xl font-medium ml-4 mt-2'> {todaySales.toString()}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl grid place-content-center'>
<img src="/images/money-svgrepo-com (1).svg" className='h-[30px] w-[30px]' alt=""/>


</div>



<p className='text-xl font-medium ml-4 mt-2'>{convertAffTotalCurrency()}</p>


</div>
</div>

<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl grid place-content-center'>
<img src="/images/sales-amount-svgrepo-com.svg" className='h-[30px] w-[30px]' alt=""/>



</div>

<p className='text-xl font-medium ml-4 mt-2'>{total_aff_sales}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Unpaid Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl grid place-content-center'>
<img src="/images/debt-svgrepo-com (1).svg" className='h-[30px] w-[30px]' alt=""/>



</div>



<p className='text-xl font-medium ml-4 mt-2'>{ convertAffBalanceCurrency()}</p>


</div>
</div>




</div>


       
       </div>

       <p className='text-zinc-600 mt-4 font-light text-center my-6 mt-4'>You have  <span className='text-2xl text-green-500  font-semibold'>{calculateDaysDifference()}</span> days left on your membership</p>




       <div className='w-screen  flex justify-center'>


 {

  /*

   
 <div className=' md:w-1/3 w-full mt-2 h-20 mt-4 rounded-md mt-4 grid place-content-center text-xl font-semibold text-green-500 shadow-md'>
 <p className='text-sm text-black text-center'>TIME LEFT</p>
 {timeLeft.days} days, {timeLeft.hours} hours

</div>

  */
 }




</div>



       <div className='w-screen  '>

<p className='text-center'> Are you an Elite coach and a super affiliate? Join our challenge for coaches and super affiliate and win up to N10 million</p>

<div className='grid place-content-center'>

  <button  onClick={toggleModal} className=' text-white bg-green-500 mt-2 shadow-md p-2 rounded-md hover:bg-white hover:text-green-500 '>View Details</button>
</div>

</div>

<div className='grid md:grid-cols-2 grid-cols-1 w-full md:px-10 px-4 mt-6 gap-4 '>
  <div className='md:h-96 border border-zinc-300 rounded-md md:overflow-y-scroll '>

  {

       loadingNotif == false?(<>
       {notifications.length > 0 ? (
        notifications.map((item, index) => (
          <div className="w-full bg-white mt-4 shadow-md py-2 px-2 rounded-md" key={index}>
            <p className="font-semibold text-md text-yellow-500">{item.header}</p>
            <p className="font-light text-md text-black">{item.body}</p>
            <p className="font-medium text-sm text-green-500 mt-4">{formatDate(item.created_at)}</p>
          </div>
        ))
      ) : (
        <p className='text-center'>No recent activity yet <br></br> Your sales, withdrawals and other activity will show here</p>

      )}
  
       </>):(<>

          <div className='w-full h-full grid place-content-center'>
          <PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />

          </div>
       
       </>)
  }
    
    
  </div>

  <div className='md:h-96 border border-zinc-300 rounded-md md:overflow-y-scroll p-2'>

  <div className='text-grey_600 text-md font-semibold  p-2 rounded-xl mt-3'>Top Selling Affiliates in : <span className='text-green-500'>{getCurrentMonth()}</span></div> 
                           


  {

    loadingTopAffiliates == false?(<>

    {
      topAffiliatesData.map((item: any, index) => (

                                
        <>
         
             <div className="w-full bg-white mt-4 shadow-lg py-2 px-2 flex rounded-md  " key={index}>
         <div className='rounded-full border-2 border-grey_100 h-16 w-16 flex justify-center'>
        
          
        
        {
            
        
            index+1 < 2 &&(<> 
           <div className='h-16 rounded-full  p-4'>
        
           <img src="/images/icons8-crown-48.png" className="h-full w-full " alt={"ZenithStake Top Affiliate Images Image"}/>
          
        
           </div>
            
        </>)
          }
        
        {
           
        
            index+1 > 1 &&(<> 
            
            <div className='h-16 rounded-full  p-4'>
            <img src="/images/trophy-prize-medal-4-svgrepo-com.svg" className="h-full w-full rounded-full " alt={"ZenithStake Top Affiliate Images Image"}/>
           
        
               
        </div>
            
        </>)
          }
        
         </div> 
        
        
        
         
        
        <div>
        
        <p className='font-semibold text-green-500 text-sm mt-4 ml-4'>{`${item.firstName }  ${item.lastName} `}</p>
        
        <div className="  flex justify-between">
          <p className="font-regular text-green text-sm mt-2  ml-4">{`Ranked:  ${index + 1}`}</p>
          <p className="font-regular text-green text-sm mt-2 ml-10">{`Sales:  ${item.count}`}</p>
         
        </div>
        </div>
        
                 </div>
          
        
        </>
        
        
        
                                 ))
    }
    
    </>):(<>

      <div className='w-full h-full grid place-content-center'>
          <PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />

          </div>
    </>)

  }
 



    
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




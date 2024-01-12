"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';

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



// Your main component
export default function AffiliateDashboard() {

  
  var user_data = Cookies.get('user_details');

  var selected_currency = Cookies.get('selected_currency');
  var naira_exchange_rate = ""; var convert_balance_usd ="";
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
     
      

   }
 

   const moveToProductScreen=(id: any, item:any)=> {

      Cookies.set('product_details',JSON.stringify(item));
      router.push("product?id="+id)
  
      
  
     
  }

 

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



   const convertTodayEarningCurrency =()=>{

    if(selected_currency ){

      if(selected_currency = "USD"){

          var total_today_sales_usd = parseInt(todayEarnings) / parseInt(naira_exchange_rate);


          return "$ "+ (total_today_sales_usd).toString();


        
      }

      else if(selected_currency = "NGN"){

       // var ngn_bal = (parseInt(convert_balance_usd) * parseInt(naira_exchange_rate));

        return "₦ "+todayEarnings.toString();


      }


    }

    else{

      var total_today_sales_usd = parseInt(todayEarnings) / parseInt(naira_exchange_rate);


      return "$ "+ (total_today_sales_usd).toString();

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



  
   useEffect(() => {
     
    // Make an HTTP GET request to the API endpoint using axios
    axios.get('https://back.learniix.com/api/top_affiliate/product/view/1',
   )
      .then((response: any) => {
          
           

          
           setTopAffiliatesData(response.data);
          
           setIsLoading(false)
           console.log(response.data);

           
      })
      .catch((error: any) => {
        // Handle errors if any
        console.error(error);
        setIsLoading(false)
      });
    }, []);

  

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

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>

<div className='w-screen  px-10'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos;s Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'> {todaySales.toString()}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{convertAffTotalCurrency()}</p>


</div>
</div>

<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{total_aff_sales}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Unpaid Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{ convertAffBalanceCurrency()}</p>


</div>
</div>




</div>


       
       </div>


       <div className='w-screen  flex justify-center'>

{
  
/*  <div className='h-60 w-1/3 mt-2 bg-zinc-200 rounded-md mt-4 grid place-content-center'>

    <p className='text-zinc-400 text-xl'>Learniix Challenge Banner</p>

</div>*/

}


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




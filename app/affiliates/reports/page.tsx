"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import AffiliateDashboardHeader from '../dashboard/header/page';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies  from 'js-cookie';




// Your main component
const Reports = () => {
    const dataPatients = [2, 5.5, 2, 8.5, 1.5, 5];

    var user_data = Cookies.get('user_details');
    var firstname =""; var isVendor =false;
    var total_vendor_sales_cash ="";
    var total_vendor_sales =""; var unpaid_balance_vendor ="";
    var total_affiliate_cash =" "; var total_aff_sales ="";
    var unpaid_balance_affiliate =" "; var user_id = ""; var affiliate_id ="";
    var selected_currency = Cookies.get('selected_currency');
    var naira_exchange_rate = ""; var convert_balance_usd ="";

    const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter(); var errorMessage =""
  const notifySuccess = () => toast.success("Sales records received successfully!");
  const notifyNoProducts = () => toast.error("No sales were found within selected period for the products");
  const notifyFailure = (message: any) => toast.error(message);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [vendorProductsData, setVendorProductsData] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [affiliateSalesData, setAffiliateSalesData] = useState([]);
  const [affiliateSalesStats, setAffiliateSalesStats] = useState([]);
 // const [salesBy, setAffiliateSalesData] = useState([]);
  const [vendorSalesData, setVendorSalesData] = useState([]);
  const [ salesByAffiliateData,  setSalesByAffiliateData] = useState([]);

 
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [totalCash, setTotalCash] = useState("")

  const [selectedOption, setSelectedOption] = useState("all");
  const [open, setOpen] = useState(false);
  const [todaySales, setTodaySales] = useState("");
  const [todayEarnings, setTodayEarnings] = useState(""); 
  const [todaySalesData, setTodaySalesData] = useState([]); 

const handleChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

    


    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;
        total_affiliate_cash = (user as any).total_affiliate_cash;
        total_aff_sales = (user as any).total_aff_sales;
        unpaid_balance_affiliate = (user as any).unpaid_balance;
        affiliate_id = (user as any).affiliate_id
        isVendor = (user as any).isVendor
        naira_exchange_rate = (user as any).naira_exchange_rate;
        convert_balance_usd = (user as any).convert_balance_usd;
       
        
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



      //get  products

      
      useEffect(() => {

        if(isVendor==true){
          
             // Make an HTTP GET request to the API endpoint using axios
             axios.get("https://back.zenithstake.com/api/view/vendor_products/"+user_id)
        .then((response: any) => {
           
             setVendorProductsData(response.data);
            
             setIsLoading(false)
             console.log(response.data);

             
        })
        .catch((error: any) => {
          // Handle errors if any
          console.error(error);
          setIsLoading(false)
        });

        }else{
           

            axios.get('https://back.zenithstake.com/api/products/view/100')
            .then((response: any) => {
               
                 setAllProductsData(response.data);
                
                 setIsLoading(false)
                 console.log(response.data);
    
                 
            })
            .catch((error: any) => {
              // Handle errors if any
              console.error(error);
              setIsLoading(false)
            });


        }
       
       
        }, [user_id ]);

        const submitAffilateSales = ()=>{

            setIsLoading(true)

            if(toDate !="" && fromDate !=""){
                var affiliateFilters = new FormData();

               
                affiliateFilters.append("from_date",fromDate);
                affiliateFilters.append("affiliate_id",affiliate_id);
   
              
                const dateStringTO = toDate;
                const dateTO = new Date(dateStringTO);
                const isoStringTO = dateTO.toISOString();

                affiliateFilters.append("to_date",isoStringTO );

                const dateStringFROM = fromDate;
                const dateFROM = new Date(dateStringFROM);
                const isoStringFROM = dateFROM.toISOString();

                affiliateFilters.append("from_date",isoStringFROM);

                affiliateFilters.append("selected_product",selectedOption)
                 
                
                getAffiliateSales(affiliateFilters)

             


               
            }

            else{
              setIsLoading(false);

                notifyFailure("Please select a date range to get sales")
            }

           


        }


        //Submit Vendor Sales request

        const submitVendorSales = ()=>{

          setIsLoading(true)

          if(toDate !="" && fromDate !=""){
              var vendorFilters = new FormData();

             
              vendorFilters.append("from_date",fromDate);
              vendorFilters.append("vendor_id",user_id);
 
            
              const dateStringTO = toDate;
              const dateTO = new Date(dateStringTO);
              const isoStringTO = dateTO.toISOString();

              vendorFilters.append("to_date",isoStringTO );

              const dateStringFROM = fromDate;
              const dateFROM = new Date(dateStringFROM);
              const isoStringFROM = dateFROM.toISOString();

              vendorFilters.append("from_date",isoStringFROM);

              vendorFilters.append("selected_product",selectedOption)
               
              
              getVendorSales(vendorFilters)

           


             
          }

          else{
            setIsLoading(false);

              notifyFailure("Please select a date range to get sales")
          }

         


      }


          //Submit data to get sales according to affiliates

          const submitRequestGetDataAsAffSales = ()=>{

            setIsLoading(true)
  
            if(toDate !="" && fromDate !=""){
                var vendorFilters = new FormData();
  
               
                vendorFilters.append("from_date",fromDate);
                vendorFilters.append("vendor_id",user_id);
   
              
                const dateStringTO = toDate;
                const dateTO = new Date(dateStringTO);
                const isoStringTO = dateTO.toISOString();
  
                vendorFilters.append("to_date",isoStringTO );
  
                const dateStringFROM = fromDate;
                const dateFROM = new Date(dateStringFROM);
                const isoStringFROM = dateFROM.toISOString();
  
                vendorFilters.append("from_date",isoStringFROM);
  
                vendorFilters.append("selected_product",selectedOption)
                 
                
                getSalesByAffiliateCount(vendorFilters)
  
             
  
  
               
            }
  
            else{
              setIsLoading(false);
  
                notifyFailure("Please select a date range to get sales")
            }
  
           
  
  
        }
  



     const getAffiliateSales = async (values: FormData) => {
      //pass dates to retrieve sales

      
     
   
        try {
          const res = await axios.post(
            `https://back.zenithstake.com/api/view/sales/affiliate`,
            values,
           
            {
             // withCredentials: true ,

             headers:{
              'Content-Type' :'multipart/form-data',
            

             
             },
             
             // params: {values}
            }
           
          );
         
          setIsLoading(false);

          if(res.data.message.length > 0){
          notifySuccess();
          console.log(res.data.message)

        //  setAffiliateSalesData(res.data.message);

          setAffiliateSalesStats(res.data.message)


          var z = res.data.message;
          var total = 0;

          for(let i = 0; i < z.length; i++){

            var price = parseInt(z[i].product_price);
            var commission = parseInt(z[i].commission);

            var comission_cash = (commission/100) * price;

            total = total + comission_cash;

            setTotalCash(total.toString());

            console.log("total: "+ total);

            


          }
        }else{
          notifyNoProducts() 
          setAffiliateSalesStats([])
        }

          


          
        } catch (err) {
          
        
          if (err instanceof Error) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
              const errorResponse = axiosError.response as AxiosResponse;
              if (errorResponse.data) {
                errorMessage = errorResponse.data.message;
              }
            }

            notifyFailure(errorMessage)

             console.log(errorMessage);
          }
          
          setIsLoading(false);
          console.log(err);
        }
        finally {
          setIsLoading(false);

        }
      };



     

       //getVendorSales


       const getSalesByAffiliateCount = async (values: FormData) => {
        //pass dates to retrieve sales
  
        
       
     
          try {
            const res = await axios.post(
              "https://back.zenithstake.com/api/view/sales/vendor/as_affiliates",
              values,
             
              {
               // withCredentials: true ,
  
               headers:{
                'Content-Type' :'multipart/form-data',
              
  
               
               },
               
               // params: {values}
              }
             
            );
           
            setIsLoading(false);
  
          
            notifySuccess();
            console.log(res.data.message)
  
            setSalesByAffiliateData(res.data.message);
  
  
            
          } catch (err) {
            
          
            if (err instanceof Error) {
              const axiosError = err as AxiosError;
              if (axiosError.response) {
                const errorResponse = axiosError.response as AxiosResponse;
                if (errorResponse.data) {
                  errorMessage = errorResponse.data.message;
                }
              }
  
              notifyFailure(errorMessage)
  
               console.log(errorMessage);
            }
            
            setIsLoading(false);
            console.log(err);
          }
          finally {
            setIsLoading(false);
  
          }
        };




        //Get sales by Affiliate

      //  
     

      //getVendorSales

      const getVendorSales = async (values: FormData) => {
        //pass dates to retrieve sales
  
        
       
     
          try {
            const res = await axios.post(
              `https://back.zenithstake.com/api/view/sales/vendor`,
              values,
             
              {
               // withCredentials: true ,
  
               headers:{
                'Content-Type' :'multipart/form-data',
              
  
               
               },
               
               // params: {values}
              }
             
            );
           
            setIsLoading(false);
  
            if(res.data.message.length > 0){
            notifySuccess();
            console.log(res.data.message)
  
            setAffiliateSalesStats(res.data.message);
  
  
            var z = res.data.message;
            var total = 0;
  
            for(let i = 0; i < z.length; i++){
  
              var price = parseInt(z[i].product_price);
              var commission = parseInt(z[i].commission);
  
              var comission_cash = (commission/100) * price;
  
              total = total + comission_cash;
  
              setTotalCash(total.toString());
  
              console.log("total: "+ total);
  
  
            }
          }else{
            notifyNoProducts() 
            setVendorSalesData([])
          }
  
            
  
  
            
          } catch (err) {
            
          
            if (err instanceof Error) {
              const axiosError = err as AxiosError;
              if (axiosError.response) {
                const errorResponse = axiosError.response as AxiosResponse;
                if (errorResponse.data) {
                  errorMessage = errorResponse.data.message;
                }
              }
  
              notifyFailure(errorMessage)
  
               console.log(errorMessage);
            }
            
            setIsLoading(false);
            console.log(err);
          }
          finally {
            setIsLoading(false);
  
          }
        };





      useEffect(() => {
       
        // Make an HTTP GET request to the API endpoint using axios
        axios.get('https://back.zenithstake.com/api/sales/today/affiliate/'+ affiliate_id )
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


 
   

   

    function SingleVendorWidget(props: any) {
        return <>  <div className='single-vendors'>
        <div className='h-20 w-20 bg-grey_300 rounded-full mr-4'></div>
        <p className='text-grey_600 text-center'>Vendor {props.key}</p>


        </div>
       </>
      }
  
  
      const widgets = [];

      for (let i = 0; i < 10; i++) {
        widgets.push(<SingleVendorWidget key={i} />);
      }

  


  return (
    <div >
      <AffiliateDashboardHeader title="Reports & statistics" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>





<p className='font-medium text-xl text-green-500'>Get detailed information on your sales</p>



<div className="mt-6"></div>


<div className='w-screen  px-10'>

<div className="grid md:grid-cols-4  gap-4 grid-cols-1">


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Total&apos;s Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>$500 </p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos;s Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{convertTodayEarningCurrency()}</p>


</div>
</div>

<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Today&apos;s Sales</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{todaySales}</p>


</div>
</div>


<div className='h-28 shadow-md rounded-md border border-1 border-zinc-300 p-2'>

<p className='font-medim text-md ml-auto  mt-2'>Unpaid Earnings</p>
<div className='flex mt-2'>
<div className='h-[50px] w-[50px] bg-green-500 rounded-md shadow-xl'>

</div>



<p className='text-xl font-medium ml-4 mt-2'>{convertAffBalanceCurrency()}</p>


</div>
</div>




</div>


       
       </div>





    


       <div className="flex justify-center w-full mt-6 ">

<p className="text-center text-grey_600">Select a duration below to get sales within the period</p>
</div>
  
<div className="flex justify-center w-full mt-6 ">
  

<div className="dashboard-analytics-info grid lg:grid-cols-2 lg:gap-4 mt-3 ">

<div>

<p className="text-grey_600">From Date</p>
<LocalizationProvider dateAdapter={AdapterDateFns}>
<DatePicker
onChange={(e:any)=>setFromDate(e.toString())}
/>
</LocalizationProvider>

</div>


<div>

<p className="text-grey_600 lg:mt-0 mt-6 sm:mt-6">To Date</p>




<LocalizationProvider dateAdapter={AdapterDateFns}>
<DatePicker 

onChange={(e:any)=>setToDate(e.toString())}
/>
</LocalizationProvider>

</div>

</div>



</div>

<p className="w-full flex justify-center mt-8 text-grey_600">Filter results by products</p>

<div className="w-80 md:w-full flex justify-center mt-8 ">
<select className="custom-select p-2 bg-white text-grey_600 shadow-lg" value={selectedOption} onChange={handleChange}


>

{
isVendor==true?(<>

{
vendorProductsData.map((item: any, index: any) => (
<>

<option  value={item.id}>{item.productName}</option>

</>



))
}
</>)
:(<>
{allProductsData.map((item: any, index: any) => (
<>

<option  value={item.id}>{item.productName}</option>

</>



))}
</>)
}

</select>

</div>


{
isLoading ?(<> <div className="mt-10 w-full justify-center flex">

<div>
<div className={styles['loader']}></div>
</div>
</div></>):(<>
<div className="w-full flex justify-center mt-4 ">
{
//if user is a vendor, retrive vendor sales on button click, else retrieve affiliate sales
}
<button className="bg-gold p-2 text-white shadow-xl mt-2"  onClick={isVendor?submitVendorSales:submitAffilateSales}>Get sales</button>
</div>



</>)
}

{ affiliateSalesStats.length > 0 &&(
<>

<p className='text-green text-center mt-7'>You made a total number of <b>{affiliateSalesStats.length} sales</b> within this period and earned <b>₦{(parseInt(totalCash)).toLocaleString()}</b></p>

</>
)

}



{
/* <div className="text-grey_600 flex w-full mt-4 justify-center">

<button className="bg-purple2 p-2 text-white shadow-xl mt-2">Get Sales Summary (PDF)</button>

</div>*/
}





{
isVendor && (
<>
<hr className='bg-grey_600 text-grey_600 mt-4'></hr>



<p className="w-full flex justify-center mt-8 text-grey_600 mt-4">Filter results by Affiliates</p>

{
isLoading ?(<> <div className="mt-10 w-full justify-center flex">

<div>
<div className={styles['loader']}></div>
</div>
</div></>):(<>
<div className="w-full flex justify-center mt-4 ">
{
//if user is a vendor
}
<button className="bg-gold p-2 text-white shadow-xl mt-2"  onClick={submitRequestGetDataAsAffSales}>Get sales by affiliates</button>
</div>




</>)
}


</>
)

}

<div className="text-grey_600 flex justify-center w-full h-80 overflow-y-scroll">

<div>

{salesByAffiliateData.map((item:any) => (  

<>
<div className="bg-white shadow-xl p-4  mt-2  ">


<p className='text-purple2'>{item.firstName +" "+item.lastName}</p>
<p className='text-black'>Email: {item.email}</p>
<p className='text-green'>Sales: {item.count}</p>



</div>
</>

))}

</div>    
</div>
     
    </div>
       
       </div>
 
  );
};

export default Reports;

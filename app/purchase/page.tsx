"use client"
import Cookies from 'js-cookie';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Purchase(){

    const router = useRouter();
    const searchParams = useSearchParams();

   
    const productID  = searchParams.get('pid');
    
    
    var sales_details = Cookies.get('sales_details')

    var parsed_sales:any ;
    var affiliateID: any;

    if(sales_details){

       parsed_sales = JSON.parse(sales_details)

        affiliateID = parsed_sales.affiliateID;

    }


    useEffect(() => {
        const timeout = setTimeout(() => {
       

          if(productID != undefined && affiliateID != undefined){

              // 👇️ redirects to an external URL
          window.location.replace(`buy?pid=${productID}&aff_id=${affiliateID}` );

          }
          else{
           // alert("Could not find relevant credentials!")
            window.location.replace("https://learniix.com/data_error");
          }
        
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [productID]);


     
}
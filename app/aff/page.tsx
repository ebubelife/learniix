"use client"
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';



export default function VerifyAffiliate() {
    const searchParams = useSearchParams();

  useEffect(() => {

    const productID  = searchParams.get('pid');
    const affiliateID  = searchParams.get('aff_id');

    console.log(productID)
    console.log(affiliateID)

    var count_tries = 0;



    const saledDetails = { affiliateID, productID };
    Cookies.set('sales_details', JSON.stringify(saledDetails));

    const fetchData = async () => {
        count_tries++;
      try {
        const response = await axios.get(`https://back.learniix.com/api/view/product/`+ productID);
        const productSalesPageLink = response.data.productSalesPageLink;
        window.location.href = productSalesPageLink;
      } catch (error) {

        if(count_tries == 10){
            console.error(error);
            window.location.href = 'https://learniix.com/data_error';
        }else{
            fetchData();
        }
       
      }
    };

    if (productID) {
      fetchData();
    }else{
        alert("No PID")
    }
  }, []);

  return null;
}

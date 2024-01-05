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


   

    const saledDetails = { affiliateID, productID };
    Cookies.set('sales_details', JSON.stringify(saledDetails));

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api`, { params: { productID } });
        const productSalesPageLink = response.data.productSalesPageLink;
        window.location.href = productSalesPageLink;
      } catch (error) {
        console.error(error);
        window.location.href = 'https://learniix.com/data_error';
      }
    };

    if (productID) {
      fetchData();
    }
  }, []);

  return null;
}

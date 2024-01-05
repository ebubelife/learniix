"use client"

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface VerifyAffiliateProps {
  query: {
    aff_id?: string;
    pid?: string;
  };
}

export default function VerifyAffiliate({ query }: VerifyAffiliateProps) {
  useEffect(() => {
    const { aff_id: affiliateID, pid: productID } = query;

    const saledDetails = { affiliateID, productID };
    Cookies.set('sales_details', JSON.stringify(saledDetails));

    const fetchData = () => {
      axios
        .get(`https://back.learniix.com/api/view/product/` + productID)
        .then((response) => {
          const productSalesPageLink = response.data.productSalesPageLink;
          window.location.href = productSalesPageLink;
        })
        .catch((error) => {
          console.error(error);
          window.location.href = 'https://learniix.com/data_error';
        });
    };

    if (productID) {
      fetchData();
    }
  }, []);

  return null;
}

export async function getServerSideProps({ query }: { query: any }) {
  return {
    props: {
      query,
    },
  };
}

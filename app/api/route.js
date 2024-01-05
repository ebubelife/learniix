// pages/api/verify-affiliate.js
import axios from 'axios';

export default async function handler(req, res) {
  const { affiliateID, productID } = req.query;

  try {
    const response = await axios.get(`https://back.learniix.com/api/view/product/` + productID);
    const productSalesPageLink = response.data.productSalesPageLink;

    res.status(200).json({ productSalesPageLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

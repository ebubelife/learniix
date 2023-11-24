"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import AffiliateDashboardHeader from '../dashboard/header/page';




// Your main component
const Reports = () => {
    const dataPatients = [2, 5.5, 2, 8.5, 1.5, 5];
  


  return (
    <div >
      <AffiliateDashboardHeader title="Reports & statistics" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>





<p className='font-medium text-xl text-green-500'>Get detailed information on your sales</p>



<div className="mt-6"></div>



<div className="grid md:grid-cols-2 gap-2 mt-8">

<div className="md:w-full ">

<p className="mt-4 font-semibold">Product Sales</p>

<LineChart
xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
series={[
{
data: [2, 5.5, 2, 8.5, 1.5, 5],
},
]}
width={400}
height={300}
/>
</div>

<div className="py-4">

<p className="mt-4 font-semibold">Reports & Statistics</p>

<p className="mt-4 font-semibold text-green-500">All Time Sales</p>
<p className=" font-semibold ">200</p>

<p className="mt-4 font-semibold text-green-500">All Time Earnings</p>
<p className=" font-semibold ">$10,000</p>

<p className="mt-4 font-semibold text-green-500">Unpaid Earnings</p>
<p className=" font-semibold ">$900</p>



{
/*<LineChart
xAxis={[{ data: xAxisData }]}
series={[
{ data: dataPatients },
{ data: dataPrescribers },
]}
width={500}
height={300}
/>*/

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

export default Reports;

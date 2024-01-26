"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';

import AffiliateDashboardHeader from '../dashboard/header/page';
import axios, { AxiosError, AxiosResponse } from 'axios';

import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';




// Your main component
const AffiliateWithdrawals = () => {

  var user_data = Cookies.get('user_details');
    var firstname =""; var isVendor =false; var user_id="";
    var auto_withdraw = true;

    const [alignment, setAlignment] = React.useState('true');
    const [encashments, setEncashments] = useState([]);
    
    const [isLoading, setIsLoading] = React.useState(false);

    const notifySuccess = () => toast.success("Withdrawal settings successfully updated!");
    var errorMessage =""; var bank = "";
 
    const notifyFailure = (message: string ) => toast.error(message);
 

    const handleAlignment = (event: any, newAlignment: React.SetStateAction<string>) => {
      setAlignment(newAlignment);

      alert(alignment);

      
    };


    if(user_data){
        var user = JSON.parse(user_data)
 
          
        firstname =(user as any).firstName;
        isVendor =(user as any).isVendor;
        user_id = user.id;
        user_id = user_id.toString()

        auto_withdraw = (user as any).auto_withdraw;
       
        
 
     }

     const setWithdrawSettings = async(selection:string)=> {

     

      var formData = new FormData();

      formData.append('id',user_id)
      if(selection!=null ){
        formData.append('selected',selection);

        try {
          const res = await axios.get(
            `https://back.learniix.com/api/member/update_withdrawal/`+user_id,
           
           
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
         // console.log(res.data.message.toString())

         if((user as any).auto_withdraw == true) {
         (user as any).auto_withdraw = false;

         Cookies.set('user_details', JSON.stringify(user))


         }
         else{
          (user as any).auto_withdraw = true;
          Cookies.set('user_details', JSON.stringify(user))
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
      


      }
        
    }

     //pull all encashments for current user
     useEffect(() => {
   
      // Make an HTTP GET request to the API endpoint using axios
      axios.get('https://back.learniix.com/api/transactions/view/affiliate_payments/'+user_id )
        .then((response: any) => {
            
          setEncashments(response.data);

       //  alert(JSON.stringify(encashments))
          
             setIsLoading(false)
             console.log(response.data);

             
        })
        .catch((error: any) => {
          // Handle errors if any
          console.error(error);
          setIsLoading(false)
        });
      }, [user_id ]);



  


  return (
    <>
      <Toaster/>
      <div >
     

      <AffiliateDashboardHeader title="Withdrawals History" />


      <div className="mt-6">

<p className="text-grey_600 text-center mt-6">Our affiliates and vendors are paid weekly but you can decide if you want to 😇</p>
                 <p className="text-grey_600 text-center mt-2">Use the switch below to activate or deactive automatic withdrawals every week</p>

                <div className='flex justify-center '>

              
                <div className='mt-10'>


<select id="mySelect" className='bg-white text-grey_600 p-3 border-2 border-grey_300 rounded-lg w-full' onChange={(e:any)=>setWithdrawSettings(e.target.value)}>
<option  value="true" selected={auto_withdraw == true} >
   Yes
   </option>

   <option  value="false" selected={auto_withdraw == false}  >
  No
   </option>

</select>

</div>

                   
                         </div>

</div>




      <div className="w-screen h-screen px-4 py-4 overflow-y flex justify-center">


      



      <div className='md:w-2/3 w-full'>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg text-grey_600 mt-6">
    <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-grey-600">
            <tr>
                <th scope="col" className="px-6 py-3  text-zinc-600">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
              
            </tr>
        </thead>   
        <tbody className='text-grey_600'>


       
            <tr  className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-grey-600 whitespace-nowrap  text-grey_600 ">
                 
                </th>
                <td className="px-6 py-4 text-gold">
                   
                </td>
               
            </tr>
          
     
 



</tbody>
   </table>
</div>

      </div>






</div>
       

     
    

    


      {
        /* <div className="preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

        */
      }
     
   
       
       </div>
        </>
 
  );
};

export default AffiliateWithdrawals
;
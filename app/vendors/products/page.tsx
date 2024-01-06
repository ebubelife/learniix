"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, Key, CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import VendorDashboardHeader from '../header/page';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { PropagateLoader } from 'react-spinners';




// Your main component
const Products = () => {
// Inside your component
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isMenuOpen, setMenuOpen] = useState(false);

    const notifySuccess = () => toast.success("Affiliate Link Copied to Clipboard");
    const router = useRouter(); 
    
    const [products, setData] = useState([]); 
    const [isLoading, setLoading] = useState(true); 


    const [open, setOpen] = React.useState(false);

    function handleCopyClick(){
        notifySuccess();

    }
    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };
  
  
    let [color, setColor] = useState("#90EE90");

    var user_data = Cookies.get('user_details');
   
    var naira_exchange_rate = ""; var convert_balance_usd ="";
    
    
    var user_id =""; var affiliate_id = ""; var firstname= "";
   
    
    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;

        affiliate_id = (user as any).affiliate_id;
        firstname =(user as any).firstName;
            
       
        
 
     }




 
 

 
  useEffect(() => {
     // Make an HTTP GET request to the API endpoint using axios
     axios.get("https://back.learniix.com/api/view/vendor_products/"+user_id)
     .then((response: any) => {
         
          

          console.log(products);
          setData(response.data);
          setLoading(false)

          
     })
     .catch(error => {
       // Handle errors if any
       console.error(error);
       setLoading(false)
     });
  }, [user_id]);

   
  
   
 

  


  return (
    <div >
      <VendorDashboardHeader title="Products" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>





<p className='font-medium text-xl md:text-left text-center text-green-500'>Your Products</p>



<div className="mt-6"></div>

<div className='w-screen  md:px-10 px-4'>


{
                    !isLoading?(
                      <div>
                   
                        <p className="dashboard-text   mt-5 font-bold text-green">
                          
                        </p>

                       
                       
                        <div className="grid md:grid-cols-4  gap-4 grid-cols-1">
                        {products.map((item: any, index: Key | null | undefined) => (
     <div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0' key={index}>
     <p className='text-sm font-semibold'>{item.productName}</p>
     <div className='flex w-full mt-4'>
     <div>
     <p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>
     
     
     <p className='text-md font-semibold text-green-500 '>₦ {item.productPrice}</p>
     </div>
     <Link href={"products/view/connect?pid="+item.id} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl'>CONNECT</Link>
     </div>
     <p className='font-medim text-md mt-2'>Commission:</p>
     
     <p className='text-md font-semibold text-green-500 '>{item.productCommission}%</p>

     <p className='font-medim text-md mt-2'>Status:</p>
     
     {

      item.approved==false?(<><p className='text-xs font-semibold text-green-500 '>Disabled</p></>):(<>Active</>)
     }
     
     
     
     
     </div>
     
                      ))}

                            
                           
                          

                           
                         

                        </div>

                        
                        </div>):(<><div className='h-full w-full grid place-content-center'> <div>
                        <PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
          </div></div></>)}

         { products.length < 1 ?(
          <>
              <p className='text-green text-center mt-8'>You don&apos;t have any products yet.</p>

          <p className='text-green text-center mt-2'>Add a product and you can see them here. Go ahead to integrated them to your sales page</p>
          </>
       
         ):(<></>)
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

export default Products;

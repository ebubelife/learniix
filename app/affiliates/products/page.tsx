"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, Key,CSSProperties } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import AffiliateDashboardHeader from '../dashboard/header/page';
import Cookies from 'js-cookie'
import axios from 'axios';
import { BeatLoader, ClipLoader, PropagateLoader } from 'react-spinners'




// Your main component
const Products = () => {
// Inside your component
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isMenuOpen, setMenuOpen] = useState(false);
   
    var firstname ="";var user_id = "";
    var selected_currency = Cookies.get('selected_currency');
  
    var user_data = Cookies.get('user_details');
    const router = useRouter(); 
    
    const [products, setData] = useState([]); 
   
    const [isLoading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [products2, setData2] = useState([]);

    var naira_exchange_rate = ""; var convert_balance_usd ="";

    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };
  
  
    let [color, setColor] = useState("#90EE90");
  

   

    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;
            
        firstname =(user as any).firstName;
        naira_exchange_rate = (user as any).naira_exchange_rate;
        convert_balance_usd = (user as any).convert_balance_usd;
        
 
     }

    const pushScreen=(id: any, item:any)=> {

      //  alert(JSON.stringify(item))

        delete item.productDescription;

        

        Cookies.remove('product_details');

        Cookies.set('product_details',JSON.stringify(item));
        router.push("products/view?id="+id)

        

       
    }

    const handleSearch = (event:any) => {
      const searchText = event.target.value;
      setSearchTerm(searchText);
  
      const filteredData = products.filter((item:any) =>
        item.productName!.toLowerCase().includes(searchText!.toLowerCase())
      );
      setSearchResults(filteredData);

      setData(filteredData);

      if(filteredData.length == 0){
        setData(products2);
      }

    // alert(JSON.stringify(searchResults))
    };

   

   
    useEffect(() => {
       // Make an HTTP GET request to the API endpoint using axios
       axios.get('https://back.zenithstake.com/api/products/view/50')
       .then((response: any) => {
           
            

            console.log(products);
            setData(response.data);
            setData2(response.data)

            var allProductNames:any  = [];


            setLoading(false)

            
       })
       .catch(error => {
         // Handle errors if any
         console.error(error);
         setLoading(false)
       });
    }, []);


    const convertPriceCurrency =(productPrice: string)=>{

      if(selected_currency ){

        if(selected_currency = "USD"){

            var total_aff_sales_usd = parseInt(productPrice) / parseInt(naira_exchange_rate);


            return "$ "+ (total_aff_sales_usd).toString();


          
        }

        else if(selected_currency = "NGN"){

         // var ngn_bal = (parseInt(convert_balance_usd) * parseInt(naira_exchange_rate));

          return "₦ "+productPrice.toString();


        }


      }

      else{

        var total_aff_sales_usd = parseInt(productPrice) / parseInt(naira_exchange_rate);


        return "$ "+ (total_aff_sales_usd).toString();

      }

    
     }

    

  


  return (
    <div >
      <AffiliateDashboardHeader title="Products Market" />

      <div className="w-screen h-screen px-4 py-4">


      


       <div className="mt-6"></div>





<p className='font-medium text-xl md:text-left text-center text-green-500'>Learniix Product Marketplace</p>



<div className="mt-6"></div>

<div className='w-screen  md:px-10 px-4'>








{
                    !isLoading?(
                      <div>
                   
                        <p className="dashboard-text   mt-5 font-bold text-green">
                           We have some very hot products
                        </p>

                        <div className='mt-4 flex mb-4'>
                        <TextField id="outlined-basic" type="text" label="Search Products" variant="outlined" className='md:w-96 lg:w-96'  />

                        <div onClick={handleSearch} className='bg-green-500 text-white rounded-sm w-32 ml-1 grid place-content-center shadow-2xl'>Search</div>


                        </div>
                       
                        <div className="grid md:grid-cols-4  gap-4 grid-cols-1">
                        {products.map((item: any, index: Key | null | undefined) => (
                          item.approved==true?(
     
<div className=' shadow-md rounded-md border border-1 border-zinc-300 p-2 mr-8 md:mr-0' key={index}>
<p className='text-sm font-semibold'>{item.productName}</p>
<div className='flex w-full mt-4'>
<div>
<p className='font-medim text-md ml-auto  mt-2'>Product Price:</p>


<p className='text-md font-semibold text-green-500 '>{ convertPriceCurrency(item.productPrice)}</p>
</div>
<p onClick={()=>{pushScreen(item.id, item)}} className='grid place-content-center ml-auto w-20 text-sm bg-zinc-100 rounded-md shadow-xl cursor-pointer hover:mb-2'>SELL</p>
</div>
<p className='font-medim text-md mt-2'>Commission:</p>

<p className='text-md font-semibold text-green-500 '>{item.productCommission}%</p>


<p className='text-grey_600 mt-2'>Owner:  {item.vendor_data1.original.firstName +" "+item.vendor_data1.original.lastName}</p>

<p  className='text-grey_600 mt-2'>Launched:<br></br> {item.approved_date.slice(0, 10)}</p>



</div>

      
         

              
                          ):(<></>)
                    ))}

                            
                           
                          

                           
                         

</div>

                        
                        </div>):(<><div className='h-full w-full grid place-content-center'> <div>
                        <div className='w-full flex justify-center mt-6'>

<PropagateLoader
   color={color}
   //loading={isLoading}
   cssOverride={override}
   size={15}
   aria-label="Loading Spinner"
   data-testid="loader"
 />
</div>
          </div></div></>)}
                             










       
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

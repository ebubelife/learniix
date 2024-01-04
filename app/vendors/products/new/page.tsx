"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect, CSSProperties } from 'react';

import VendorDashboardHeader from '../../header/page';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Cookies from 'js-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import { TextField, Button, MenuItem } from '@mui/material';
import { PropagateLoader } from 'react-spinners';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast'


// Your main component
const NewProduct = () => {
    const notifySuccess = () => toast.success("Your product has been submitted and is awaiting review");
    const notifyImageFailure = () => toast.success("Please add an image. ");
   // const notifyFailure = (msg:string) => toast.success(msg);
    const router = useRouter(); 
    
    const [isLoading, setLoading] = useState(false); 


    function handleCopyClick(){
        notifySuccess();

    }

    var user_data = Cookies.get('user_details');
   
    var naira_exchange_rate = ""; var convert_balance_usd ="";
    
    
    var user_id =""; var affiliate_id = ""; var firstname= "";
   
    
    if(user_data){
        var user = JSON.parse(user_data)
 
        user_id = (user as any).id;

        affiliate_id = (user as any).affiliate_id;
        firstname =(user as any).firstName;
            
       
        
 
     }



     var user_data = Cookies.get('user_details');
     var id ="";var errorMessage ="";
     const [text, setText] = useState('');
     const [copied, setCopied] = useState(false);
        const [selectedFile, setSelectedFile] = useState<null | File>(null);
     const fileInputRef = useRef<HTMLInputElement>(null);
     var [image, setImage] = useState(null);
    
     const notifyError = (serverError:any) => toast.error(serverError);
 
     //set state properties
 
     const [productName, setProductName] = useState("");
     const [productDescription, setProductDescription] = useState("");
     const [productPrice, setProductPrice] = useState("");
     const [productCategory, setProductCategory] = useState("");
     const [productCommission, setProductCommission] = useState("");
     const [productSalesPageLink, setProductSalesPageLink] = useState("");
     const [productTYLink, setProductTYLink] = useState("");
     const [productJVLink, setProductJVLink] = useState("");
 
     if(user_data){
         var user = JSON.parse(user_data)
  
           
         id =(user as any).id;
        
     
      }
 
      const handleImageClick = () => {
       //user click on image preview to select image
       if (fileInputRef.current) {
         fileInputRef.current.click();
       } else {
         alert("Error: File input not found");
       }
     };
     const handleFileInputChange = (event: any) => {
       //on fileinput change
       const file = event.target.files?.[0];
       setSelectedFile(() => file || null);
 
      
       setImage(event.target.files[0])
 
      
     };
 
     const handleSubmit  =  (event: any) => {
 
       //submit form
        event.preventDefault();
        setLoading(true);

        if (image == null) {

            notifyImageFailure();
           
          }
    
     
    
       const formData = new FormData();
    
       formData.append('productName', productName);
       formData.append('productDescription', productDescription);
       formData.append('productPrice', productPrice);
       formData.append('productCategory', "1");
       formData.append('productCommission', productCommission);
       formData.append('productSalesPageLink', productSalesPageLink);
       formData.append('productTYLink', productTYLink);
       formData.append('productJVLink', productJVLink);
       formData.append('vendor_id', id.toString());
       if (image !== null) {
         formData.append('image', image);
       }
 
 
       var t = {"productName": productName, "productDescription": productDescription, 
       "productPrice": productPrice, "productCategory": productCategory, "productCommission": productCommission,
        "productSalesPageLink": productSalesPageLink, "productTY": productTYLink, "productJVLink": productJVLink, "vendor_id": id.toString()}
 
 
       // alert(JSON.stringify(t));
        
     
      createProduct(formData)
 
        
      }
 
      const  createProduct = async (values: FormData) => {
 
  
    
       try {
         const res = await axios.post(
           `https://back.learniix.com/api/products/add`,
           values,
          
           {
            // withCredentials: true ,
 
            headers:{
             'Content-Type' :'multipart/form-data',
           
            },
            
           
           }
          
         );
        
         setLoading(false);
         notifySuccess();
 
         setTimeout(() => {
           router.push('../products')
 
         }, 2000);
 
 
        
         
       } catch (err ) {
 
        
 
         if (err instanceof Error) {
           const axiosError = err as AxiosError;
           if (axiosError.response) {
             const errorResponse = axiosError.response as AxiosResponse;
             if (errorResponse.data) {
               errorMessage = errorResponse.data.message;
          
               notifyError(errorMessage)
              
             }
           }
 
           
 
            console.log(errorMessage);
         }
         
       
         setLoading(false);
        
        
       }
       finally {
         setLoading(false);
 
       }
     };
 
  
     
   
      const productCategories = [
         {
           value: '1',
           label: 'Health & Fitness',
         },
         {
           value: '2',
           label: 'Affiliate Marketing',
         },
         {
           value: '3',
           label: 'Internet Marketing',
         },
         {
           value: '4',
           label: 'Real Eastate',
         },

         {
            value: '5',
            label: 'Knowledge',
          },

          {
            value: '6',
            label: 'Wealth Creation',
          },
       ];
 
     

 
       const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    
    
      let [color, setColor] = useState("#90EE90");
 
  

   
  


  return (
    <div >
        <Toaster/>

      <VendorDashboardHeader title="Integration" />

      <div className="w-screen h-screen px-4 py-4 overflow-y">


      


       <div className="mt-6"></div>

       <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>

        <div className=''>

            <div className='shadow-xl p-4'>
                <p className='text-xl font-medium text-zinc-600'>New Product</p>


<div className=" mt-6  w-full  grid place-content-center rounded-md">


<p className='text-grey_600 mt-6'>Enter information about your product, submit and we will review and get back to you.
</p>


          <form onSubmit={handleSubmit}>

                              <p className='text-grey_600 mb-4'>Please select an image for your course below</p>

                              <div className=" shadow-xl mb-5 h-80 w-full grid place-content-center">
                            <label htmlFor="fileInput"  >
        <Image
          src={selectedFile ? URL.createObjectURL(selectedFile) : "/images/camera-svgrepo-com (1).svg"}
          alt="Product Image"
          height={150}
          width={100}
         
          style={{ cursor: "pointer" }}
          onClick={handleImageClick}
          
         
        />
      </label>
      </div>
                           <TextField
                           required
            autoFocus
            onChange={(e) => setProductName(e.target.value)}
            margin="dense"
            id="outline-required"
            label="Product Name"
            type="text"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />

<div className='mt-6'>

<TextField
required
          className='mt-6'
          onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          id="outlined-multiline-static"
          label="Product Description"
          multiline
          rows={4}
          defaultValue="..."
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A569BD',
            },
          }}
          InputLabelProps={{
            sx: {
              color: '#cdcdcd',
              '&.Mui-focused': {
                color: 'black',
              },
            },
          }}
        
        />
        </div>

<div className='mt-6'>
<TextField
required
       
       fullWidth
       onChange={(e) => setProductCategory(e.target.value)}
        id="outlined-select-category"
        select
        label="Product Category"
       
        //helperText="Product Category"
        sx={{
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A569BD',
          },
        }}
        InputLabelProps={{
          sx: {
            color: '#cdcdcd',
            '&.Mui-focused': {
              color: 'black',
            },
          },
        }}
      >
        {productCategories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>


</div>


<div className='mt-6'>

<TextField
required
            autoFocus
            onChange={(e) => setProductPrice(e.target.value)}
            margin="dense"

            id="outline-required"
            label="Product Price"
            type="number"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />
</div>

<div className='mt-6'>

<TextField
required
            autoFocus
            onChange={(e) => setProductCommission(e.target.value)}
            margin="dense"
            id="outline-required"
            label="Affiliate Commission (%)"
            type="number"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />
</div>

<div className='mt-6'>

<TextField
required
            autoFocus
            onChange={(e) => setProductSalesPageLink(e.target.value)}
            margin="dense"
            id="outline-required"
            label="Link To Product Sales Page"
            type="text"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />
</div>

<div className='mt-6'>

<TextField
required
            autoFocus
            onChange={(e) => setProductTYLink(e.target.value)}
            margin="dense"
            id="outline-required"
            label="Link To Product Download/Thank You Page"
            type="text"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />
</div>

<div className='mt-6'>

<TextField
required
            autoFocus
            onChange={(e) => setProductJVLink(e.target.value)}
            margin="dense"
            id="outline-required"
            label="Link To Affiliate Marketing Resources"
            type="text"
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#A569BD',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#cdcdcd',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                },
              }}
            
            
          />
</div>

<input
required
type="file"
id="fileInput"
ref={fileInputRef}
style={{ display: "none" }}
onChange={handleFileInputChange}
/>

{isLoading !=true?(
         <>
         <Button variant="contained" fullWidth type="submit" className="bg-white text-green-500 mt-6 hover:text-white hover:bg-green-500">
          Submit Your Product
        </Button>
         </>):
          (  <div className='w-full flex justify-center mt-6'>

          <PropagateLoader
             color={color}
             //loading={isLoading}
             cssOverride={override}
             size={15}
             aria-label="Loading Spinner"
             data-testid="loader"
           />
          </div>)
}
       
        
        
        
                           </form>      


</div>
                
                
                
               

            </div>


        </div>



        <div className=''>

<div className='shadow-xl p-4'>
    <p className='text-xl font-medium text-zinc-600'>Product Information</p>


    <div className="block mt-6">

<p className='font-semibold text-green-500'>HOW TO CONNECT THIS PRODUCT TO LEARNIIX MARKETPLACE</p>
</div>


<div className="block mt-6">

<p className='text-left text-sm '>After creating your product on Learniix through your vendor account, the next step is to connect your sales page properly to the market place. 
This will make it super easy for our affiliates to recommed your products and also for the system to efficiently record every traffic and sale on your products through the links of our affiliates. To do so:</p>
</div>


<p className='text-left text-sm mt-2'><b>1.</b> Have a quality sales page ready. Our team will vet the sales pages submitted and shabby or poorly created pages will be rejected and products will not be approved.</p>

<p className='text-left text-sm mt-2'><b>2.</b> Ensure that all &apos;buy&apos;, &apos;purchase&apos;, &apos;buy now&apos; and/or any button that should allow the prospect buy your product is connected to your purchasing link. You can copy your unique purchasing link below.</p>











   

</div>


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
 
  );
};

export default NewProduct;

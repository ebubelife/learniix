"use client"
import Cookies from 'js-cookie';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, NativeSelect, Select } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import styles from '/styles/style.module.css'
import { useRouter } from 'next/navigation';


import toast, { Toaster } from 'react-hot-toast';
import AdminHeader from '../../header/page';
import { PropagateLoader } from 'react-spinners';
import { TransitionProps } from '@mui/material/transitions';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as yup from 'yup';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginDialog from '../../../login_dialog';


function convertDate(dateString: any){

    const date = new Date(dateString);
const formattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
return formattedDate;


}


export default function AdminCreateAffiliates(){

    const [isLoading, setIsLoading] = useState(false);
    
    const [affiliatesData, setAffiliatesData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [affiliate_id_delete, setAffiliateIdDelete] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    var errorMessage ="";
    

    const [open, setOpen] = React.useState(false);
    const notifySuccess = () => toast.success("Account added successfully!");
    const notifyFailure = (message: string) => toast.error(message);
 
    const router = useRouter();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
      };


      const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

   
      let [color, setColor] = useState("#90EE90");
    


    const validationSchema = yup.object({
        email: yup
          .string()
          .email('Enter a valid email')
          .required('Email is required'),
    
    
          firstName: yup
          .string()
        
          .required('Please enter your first name'),
    
    
          lastName: yup
          .string()
       
          .required('Please enter your last name'),
    
          phone: yup
          .string()
         // .min(20, 'Please enter a valid Nigerian number')
          .required('Please enter a valid phone number'),
    
    
         password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
      });

      const formik = useFormik({
        initialValues: {
          email: 'foobar@example.com',
          password: 'learniix@learniix.com',
          firstName:'First Name',
          lastName:'Last Name',
          phone:'Phone'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          setIsLoading(true);
       // alert(JSON.stringify(values, null, 2));

      

        const formData = new FormData();

        formData.append('email', values.email);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('phone', values.phone);
        formData.append('password', values.password);
        formData.append('is_payed', 'true');
        formData.append('reg_type', 'AFFILIATE');
        formData.append('req_source', 'ADMIN');
        formData.append('currency', 'NGN');

        runAPI(formData );

      


        },
      });

const runAPI = async (values: FormData) => {

     
   
        try {
          const res = await axios.post(
            `https://back.learniix.com/api/signup`,
            values,
           
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
          console.log(res.data.message.toString())

          //wait for 2 seconds before redirecting

           
        

          setTimeout(() => {
           // router.push( '../signin');
          }, 3000);


          
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
      };
             
    
     return(

          <>
<LoginDialog />
<Toaster />
<AdminHeader title="New Affiliate" />

<main className="dashboard  w-screen flex ">
              

                
                <div className=" grow bg-grey_100 p-6">
                   

                        <div className="mt-10">
                              <Link href={"../affiliates"} className="text-green-500 mt-6 font-bold">All Affiliates</Link>


                        </div>

                      
                        <div className="text-2xl font-bold text-purple3 mt-16">New  Affiliate  <span className="yellow-dot"></span>  </div>

<p className="mt-4 text-grey_600">Fill The Form To Create An Account For An Affiliate </p>

<form onSubmit={formik.handleSubmit} className="px-8">

<div className="mt-10">

     
        <TextField
        required
          variant="outlined"
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
         // value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="First  Name"
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

        <div className="mt-10">
     
     <TextField
     
       variant="outlined"
       fullWidth
       id="lastName"
       name="lastName"
       label="Last Name"
       //value={formik.values.email}
       onChange={formik.handleChange}
       error={formik.touched.email && Boolean(formik.errors.email)}
       helperText={formik.touched.email && formik.errors.email}
       placeholder="Last Name"
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

        <div className="mt-10">
     
        <TextField
        required
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          label="Email"
         // value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="Email Address"
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

        <div className="mt-10">
     
     <TextField
     required
       variant="outlined"
       fullWidth
       id="phone"
       name="phone"
       label="Phone"
      // value={formik.values.email}
       onChange={formik.handleChange}
       error={formik.touched.email && Boolean(formik.errors.email)}
       helperText={formik.touched.email && formik.errors.email}
       placeholder="Phone Number"
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

       

<div className="mt-10">
        <TextField
         variant="outlined"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
         // value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          placeholder="Password"
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        
        />

        </div>

     
                  
        {isLoading && <div className="mt-10 w-full justify-center flex">

          <div>
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
          </div>
        </div>}


        {!isLoading && <div className="mt-4">
        <button  type="submit" className="bg-green-500 text-white hover:bg-white hover:text-zinc-600 w-full py-2 shadow-xl rounded-xl">
           FINISH
        </button>
        </div>}
      </form>

     

                        

                    </div>


              
                   
                   </main>



         
         
           
          </>
     )


}


   
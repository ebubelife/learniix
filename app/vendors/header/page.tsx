"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef, useEffect } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const VendorDashboardHeader = (props:any) => {

    const { title } = props;

    // Inside your component
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    var user_data = Cookies.get('user_details');
    const editorRef = useRef([]);
    var loggedIn = "";


    const [content, setContent] = useState('');
 // const [markdown, setMarkdown] = useState('');


 const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const [anchorElTwo, setAnchorElTwo] = useState(null);
  const handleMenuClickTwo = (event:any) => {
    setAnchorElTwo(event.currentTarget);
  };

  const handleMenuCloseTwo = () => {
    setAnchorElTwo(null);
  };



  /*set navigation*/

 

  const goToDashboard = () => {
    router.push("https://learniix.com/vendors/dashboard")
   };


   const goToProducts = () => {
    router.push("https://learniix.com/vendors/products")
   };


   const goToReports = () => {
    router.push("https://learniix.com/vendors/reports")
   };

   const goToProfile = () => {
    router.push("https://learniix.com/vendors/profile")
   };

   const goToWithdrawals = () => {
    router.push("https://learniix.com/vendors/withdrawals")
   };

   const goToLeaderboard = () =>{
    router.push("https://learniix.com/vendors/leaderboard")

   }

   function logout(){
    Cookies.remove('user_details');
    router.push('https://learniix.com/signin');
  }
  
  
  
      useEffect(() => {
        //check if logged in
        
  if(user_data != null){
    var user = JSON.parse(user_data)
  
      
    loggedIn =(user as any).logged_in;
   
  
  
  
  }
  else{
  
    
            router.push('https://learniix.com/signin');
           
  
  
  
  }
  
  
      }, []);
  




return (<>
{/* Top Navigation Bar */}
<AppBar position="static">
<Toolbar style={{ backgroundColor: 'black' }}>
  {/* Hamburger Icon to toggle the slide-in menu */}
  <IconButton edge="start" color="inherit" onClick={toggleMenu}>
    <MenuIcon />
    
  </IconButton>

  <p className='text-white text-2xl'>{title}</p>
  {/* Your other top navigation bar content goes here */}

{
title==""?
  (<div className="ml-auto">
  <Link href={"https://learniix.com/notifications"} className="font-medium text-sm text-white  border-1 border-white  border p-2 rounded-md">Notifications</Link>
  
  </div>):(<div className="ml-auto">
  <Link href={"https://learniix.com/vendors/products/new"} className="font-medium text-sm text-white  border-1 border-white  border p-2 rounded-md">Add Product</Link>
  
  </div>) 

}
 
</Toolbar>
</AppBar>

{/* Slide-in Menu */}
<Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}  PaperProps={{
sx: {
width: isSmallScreen ? '80%' : '20%', // Full width on small screens, 20% otherwise
marginTop: '5%',
},
}}>
<List>
  {/* Add your menu items here */}
  <ListItem button >
    <ListItemText onClick={goToDashboard} primary="Dashboard" />
  </ListItem>

  <hr></hr>

  <ListItem button>
   <Link href="https://chat.whatsapp.com/BsMXbvZ2w1DBQClIIAN1Gn"><ListItemText primary="Community" /></Link> 
  </ListItem>
  <hr></hr>


  <ListItem  button>
    <ListItemText onClick={goToProducts}  primary="Products" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText onClick={goToReports}  primary="Sales" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText onClick={goToWithdrawals} primary="Withdrawals" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText onClick={goToProfile} primary="Vendor Profile" />
  </ListItem>


  <hr></hr>

  <ListItem button >
    <ListItemText onClick={logout} primary="Logout" />
  </ListItem>

       


</List>
</Drawer>
</>)

}

export default VendorDashboardHeader;
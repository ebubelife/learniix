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


const AdminHeader = (props:any) => {

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

 

  const goToSales = () => {
    router.push("../admin/sales")
   };


   const goToAffiliates = () => {
    router.push("../admin/affiliates")
   };


   const goToProducts = () => {
    router.push("../affiliates/reports")
   };

   const goToVendors = () => {
    router.push("../vendors/vendors")
   };

   const goToProfile = () => {
    router.push("../affiliates/profile")
   };

   const goToPayments= () => {
    router.push("../admin/payments")
   };

   const goToLeaderboard = () =>{
    router.push("../affiliates/leaderboard")

   }

   function logout(){
    Cookies.remove('user_details');
    router.push('../affiliates/signin');
  }
  
  
  
  




return  (<>
{/* Top Navigation Bar */}
<AppBar position="static">
<Toolbar style={{ backgroundColor: 'black' }}>
  {/* Hamburger Icon to toggle the slide-in menu */}
  <IconButton edge="start" color="inherit" onClick={toggleMenu}>
    <MenuIcon />
    
  </IconButton>

  <p className='text-white text-2xl'>{title}</p>
  {/* Your other top navigation bar content goes here */}

  <div className="ml-auto">
<Link href={"../admin/sales/new"} className="font-medium text-sm text-white  border-1 border-white  border p-2 rounded-md">+ New Sale</Link>

</div>
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
    <ListItemText onClick={goToSales} primary="Sales" />
  </ListItem>

  <hr></hr>
  <ListItem button>
    <ListItemText onClick={goToProducts}  primary="Products" />
  </ListItem>

 


  <hr></hr>
  <ListItem button>
    <ListItemText onClick={goToAffiliates}  primary="Affiliates" />
  </ListItem>

  <hr></hr>

 


  <ListItem button>
    <ListItemText onClick={goToVendors}  primary="Vendors" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText onClick={goToPayments} primary="Payments" />
  </ListItem>
  <hr></hr>





       


</List>
</Drawer>
</>)

}

export default AdminHeader
"use client"
// Import necessary React and Material-UI components
import React, { useState,useRef } from 'react';

import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme,useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';


const AffiliateDashboardHeader = (props:any) => {

    const { title } = props;

    // Inside your component
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const editorRef = useRef([]);


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
    router.push("../affiliates/dashboard")
   };


   const goToProducts = () => {
    router.push("../affiliates/products")
   };


   const goToReports = () => {
    router.push("../affiliates/reports")
   };




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

  <div className="ml-auto">
<Link href={"../admin/pharmacies/new"} className="font-medium text-sm text-white  border-1 border-white  border p-2 rounded-md">Notifications</Link>

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
    <ListItemText onClick={goToDashboard} primary="Dashboard" />
  </ListItem>

  <hr></hr>
  <ListItem button>
    <ListItemText onClick={goToProducts}  primary="Products" />
  </ListItem>

  <hr></hr>

  <ListItem button>
    <ListItemText primary="Tutorials" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText primary="Leaderboard" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText onClick={goToReports}  primary="Reports" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText primary="Withdrawals" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText primary="Community" />
  </ListItem>
  <hr></hr>

  <ListItem button>
    <ListItemText primary="Account" />
  </ListItem>


  <hr></hr>

  <ListItem button >
    <ListItemText primary="Logout" />
  </ListItem>

       


</List>
</Drawer>
</>)

}

export default AffiliateDashboardHeader;
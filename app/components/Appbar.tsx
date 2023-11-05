"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useEffect} from 'react';
import Logo from '../components/Logo';
import Link from 'next/link';
//import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

var navLinks = ['https://zenithstake.com/','https://zenithstake.com/about','https://zenithstake.com/contact','https://zenithstake.com/signin','https://zenithstake.com/aff?aff_id=Fk9vMl&pid=1']

export default function AppBar() {




  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home','About', 'Contact',  'Log In', 'Become An Affiliate'].map((text, index) => (
          
           <div className='block mt-5 ml-3 text-white'  key={text}>
          <Link href={navLinks[index]}>  {text} </Link>
           </div>
         
         
         
        ))}
      </List>
     
    </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="flex w-screen pt-4">
          <Logo />
          <div className="ml-auto mt-4  h-10 mr-4 text-white w-10 bg-black rounded shadow-3xl flex place-content-center">
          <Button onClick={toggleDrawer(anchor, true)} ><img src={"/images/menu-trigger.svg"} className='h-8 w-8' /></Button>
          </div>
         
          </div>
         
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
           
          >
            <div className='w-full h-full bg-purple3 nav-drawer'>
            <div className='drawer-overlay w-full h-full '>
            {list(anchor)}
            </div>
           
            </div>
           
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

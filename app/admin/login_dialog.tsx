import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, InputAdornment, DialogActions, Button } from "@mui/material";
import React, { useEffect } from "react";
import Cookies from 'js-cookie'

export default function LoginDialog() {
    
    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      if(code == "100124"){
        Cookies.set('loggedInAdmin', "TRUE", { expires: 1 });
        setOpen(false);
       
    
            
       }else{
        alert("Wrong code")
       }


     
     
    };

    useEffect(()=>{
        var loggedIn = Cookies.get('loggedInAdmin');
        if(loggedIn == null || loggedIn != "TRUE"){

           
           
            setOpen(true)

        }

       })
return (
    <>
    {
    //signin 
  }
  <React.Fragment>
      
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sign Into Your Admin"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField
   fullWidth
   id="code"
   name="code"
   label="Enter Code"
   variant="outlined"
   margin="normal"
   onChange={(e:any) =>setCode(e.target.value)}
  
   InputProps={{
     startAdornment: (
       <InputAdornment position="start">
         {/* Icon for email (replace with your icon) */}
         
       </InputAdornment>
     ),
   }}
  
   style={{
     borderRadius: '12px', // Adjust the border-radius to make it curvier
     marginTop: '10px', // Optional: Adjust the top margin
   }}
   inputProps={{
     style: {
       fontSize: '12px', // Adjust the font size
       color: 'slategray', // Use the slate color for text
     },
   }}
  />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
  
  
         
            <Button onClick={handleClose} autoFocus>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  
    
    </>
)
}
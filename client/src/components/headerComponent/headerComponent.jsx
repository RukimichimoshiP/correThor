import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from "@mui/material";

const Header = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{"padding": "10px 0"}}>
          <Toolbar variant="dense" style={{"gap": "15px"}}>
            <Avatar
                alt="Remy Sharp"
                src="../../images/Icon.png"
                sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h6" color="inherit" component="div">
              CorreThor
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Header
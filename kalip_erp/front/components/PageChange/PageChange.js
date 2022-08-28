import React from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// reactstrap components
// import { Spinner } from "reactstrap";

// core components

export default function PageChange(props) {
  return (
    <div style={{
      backgroundImage: "url('/img/img-1-1000x600.jpg')",
      backgroundColor: "#ECECEC",
      top: '0px',
      left: '0px',
      position: 'fixed',
      right: '0px',
      bottom: '0px',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99,
    }}>
      
      <div
        className="bg-cover fixed z-40 w-full h-full top-0 left-0"
        
      >
        
      </div>
      <div className="top-0 left-0 w-full h-full block z-50 absolute bg-black bg-opacity-50"></div>
      <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
        <h4 className="text-lg font-medium text-white">
          Loading ...
        </h4>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </div>
    </div>
  );
}

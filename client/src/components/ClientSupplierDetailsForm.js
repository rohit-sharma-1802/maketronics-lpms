import React from 'react'
import { Grid, Paper, Box, Typography, Button } from '@mui/material'
import UserTextField from './UserTextField';
import AutoFillTextField from './AutoFillTextField';


function ClientSupplierDetailsForm({currDetails, handleSubmit, setCurrDetails, label}) {

 const handleChange=(label, value, heading)=>{
    const temp = {...currDetails};
    console.log(value);
    temp[heading] = value;
    setCurrDetails(temp);
}

  return (
    <Box width={"100%"}>
        <Paper sx={{px: 3, py: 2}}>
            <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 4 }}>
                <Typography variant='h5'>{label}</Typography>
            </Box>
    <Box type="submit" component={"form"} onSubmit={handleSubmit}>
    <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Name*"
                heading="name"
                handleChange={handleChange}
                value={currDetails.name}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Email*"
                heading="email"
                values={currDetails.email}
                handleChange={handleChange}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Company Name*"
                heading="companyName"
                handleChange={handleChange}
                value={currDetails.companyName}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Phone*"
                heading="phone"
                values={currDetails.phone}
                handleChange={handleChange}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Address*"
                heading="address"
                handleChange={handleChange}
                value={currDetails.address}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Country*"
                heading="country"
                handleChange={handleChange}
                value={currDetails.country}
                type="text"
            />
        </Grid>
    </Grid>
    <Box sx={{ display: "flex", justifyContent:"center", mt: 3}}>
        <Button variant="contained" size="medium" type="submit">
            Submit
        </Button>
    </Box>
    </Box>
    </Paper>
    </Box>
  )
}

export default ClientSupplierDetailsForm;
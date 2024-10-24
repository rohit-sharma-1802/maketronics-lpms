import React from 'react'
import { Grid, Paper, Box, Typography, Button } from '@mui/material'
import UserTextField from '../../components/UserTextField';
import AutoFillTextField from '../../components/AutoFillTextField';
import {partStatusOptions, leadOriginOptions, leadTypeOptions, franchiseAvailabilityOptions, netCListingsOptions, statusOptions, badgeOptions} from "../../utils/Constant";

function LeadForm({leadDetails, handleSubmit, setLeadDetails, label, mode}) {

    const handleChange=(label, value, heading)=>{
        console.log(value);
        const temp = {...leadDetails};
        if(Array.isArray(value))
        temp[heading] = value[0];
        else
        temp[heading] = value;
        console.log(temp);
        setLeadDetails(temp);
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
                label="Company*"
                heading="Company"
                handleChange={handleChange}
                value={leadDetails.Company}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Date*"
                heading="Date"
                handleChange={handleChange}
                value={leadDetails.Date}
                type="date"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Quantity*"
                heading="Qty"
                value={leadDetails.Qty}
                handleChange={handleChange}
                type="number"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Part Hash*"
                heading="PartHash"
                handleChange={handleChange}
                value={leadDetails.PartHash}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Part Status*"
                heading="PartStatus"
                values={leadDetails.PartStatus ? [leadDetails.PartStatus] : []}
                options={partStatusOptions}
                handleChange={handleChange}
                length={1}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Type Of Lead*"
                heading="LeadType"
                handleChange={handleChange}
                values={leadDetails.LeadType ? [leadDetails.LeadType] : []}
                options={leadTypeOptions}
                length={1}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Origin of Lead*"
                heading="LeadOrigin"
                handleChange={handleChange}
                values={leadDetails.LeadOrigin ? [leadDetails.LeadOrigin] : []}
                options={leadOriginOptions}
                length={1}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Target Price*"
                heading="TargetPrice"
                handleChange={handleChange}
                value={leadDetails.TargetPrice}
                type="number"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Availability on Franchise*"
                heading="FranchiseAvailability"
                handleChange={handleChange}
                values={leadDetails.FranchiseAvailability ? [leadDetails.FranchiseAvailability] : []}
                options={franchiseAvailabilityOptions}
                length={1}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="No of listings on NetC*"
                heading="NetCListings"
                handleChange={handleChange}
                values={leadDetails.NetCListings ? [leadDetails.NetCListings] : []}
                options={netCListingsOptions}
                length={1}
            />
        </Grid>
        {mode === false &&
            <Grid item sm={12} xs={12} md={6}>
                <AutoFillTextField 
                    label="Status*"
                    heading="Status"
                    handleChange={handleChange}
                    values={leadDetails.Status ? [leadDetails.Status] : []}
                    options={statusOptions}
                    length={1}
                />
            </Grid>
        }
        {
            mode === true &&
            <Grid item sm={12} xs={12} md={6}>
                <AutoFillTextField 
                    label="Badge*"
                    heading="Badge"
                    handleChange={handleChange}
                    values={leadDetails.Badge ? [leadDetails.Badge] : []}
                    options={badgeOptions}
                    length={1}
                />
            </Grid>
        }
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

export default LeadForm;
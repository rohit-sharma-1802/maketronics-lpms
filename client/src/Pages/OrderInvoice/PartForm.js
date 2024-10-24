import { Button, Grid, Paper, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import UserTextField from "../../components/UserTextField";
import { axiosInstance, generateUniqueString } from "../../utils/Constant";


const generatedUniqueId = generateUniqueString();

const PartForm = ({invoiceId, setActiveStep}) =>{

    const [partDetails, setPartDetails] = useState([
        {
        partNo: "",
        manufacturer: "",
        description: "",
        DC: "",
        hsnCode: "",
        qty: 0,
        price: 0,
        leadTime: "",
        invoiceId: invoiceId
    }
]);

    const handleChange=(label, value, heading, index)=>{
        console.log(value);
        const temp = [...partDetails];
        if(Array.isArray(value))
        temp[index][heading] = value[0];
        else
        temp[index][heading] = value;
        console.log(temp);
        setPartDetails(temp);
    }

    const handleAdd=()=>{
        const temp = [...partDetails];
        temp.push({
            partNo: "",
            manufacturer: "",
            description: "",
            DC: "",
            hsnCode: "",
            qty: 0,
            price: 0,
            leadTime: "",
            invoiceId: invoiceId
        });
        setPartDetails(temp);
    }

    const handleRemove=()=>{
        const temp = [...partDetails];
        temp.pop();
        setPartDetails(temp);
    }

    const handleSubmit=()=>{
        axiosInstance.post(`/invoice/add-part-details`, partDetails)
        .then((res)=>{
            setActiveStep(2);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Paper sx={{px: 3, py: 2}}>
            <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 2}}>
                <Typography variant='h5'>Create Order</Typography>
            </Box>
            <Grid container spacing={2}>
                {partDetails.map((part, index)=>{
                    return (
                        <React.Fragment key={index}>
                        <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Part No*"
                        heading="partNo"
                        values={part.partNo}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Manufacturer*"
                        heading="manufacturer"
                        value={part.manufacturer}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Description*"
                        heading="description"
                        value={part.description}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="DC*"
                        heading="DC"
                        value={part.DC}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="HSN Code*"
                        heading="hsnCode"
                        value={part.hsnCode}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Quantity*"
                        heading="qty"
                        value={part.qty}
                        handleChange={handleChange}
                        type="number"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Unit Price*"
                        heading="price"
                        value={part.price}
                        handleChange={handleChange}
                        type="number"
                        index={index}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Lead Time*"
                        heading="leadTime"
                        value={part.leadTime}
                        handleChange={handleChange}
                        type="text"
                        index={index}
                    />
                </Grid>
                </React.Fragment>
                    )
                })}
                
            </Grid>
            <Box display="flex" justifyContent={"center"} width={"100%"} mt={2}>
                <Button variant="contained" size="small" onClick={handleAdd} sx={{mr: 1}}>Add</Button>
                <Button variant="contained" size="small" onClick={handleRemove} disabled={partDetails.length > 1} sx={{mr: 1}} color="warning">Remove</Button>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </Box>
        </Paper>
    )
}

export default PartForm;
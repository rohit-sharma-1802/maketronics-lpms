import { Button, Grid, Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import UserTextField from "../../components/UserTextField";
import AutoFillTextField from "../../components/AutoFillTextField";
import { axiosInstance, generateUniqueString } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";
const generatedOrderId = generateUniqueString();

const CreateOrder=()=>{

    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState([
        {
            partNo: "",
            origin: "",
            dest: "",
            status: "",
            remark: "",
            orderId: generatedOrderId
        }
    ]);

    const handleChange=(label, value, heading, index)=>{
        const temp = [...orderDetails];
        if(Array.isArray(value))
        temp[index][heading] = value[0];
        else
        temp[index][heading] = value;
        setOrderDetails(temp);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosInstance.post(`/order/create-order`, orderDetails)
        .then((res)=>{
            navigate(`/orders/view-order/${generatedOrderId}`);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleAdd=()=>{
        const temp = [...orderDetails];
        temp.push({
            partNo: "",
            origin: "",
            dest: "",
            status: "",
            remark: "",
            orderId: generatedOrderId
        });
        setOrderDetails(temp);
    }

    const handleRemove=()=>{
        const temp = [...orderDetails];
        temp.pop();
        setOrderDetails(temp);
    }

    return(
        <Box width={"100%"}>
            <Paper sx={{px: 3, py: 2}}>
                <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 2}}>
                    <Typography variant='h5'>Create Order</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"right"}>
                    <Typography variant="body2">Order Id- {generatedOrderId}</Typography>
                </Box>
                <Box type="submit" component="form" onSubmit={handleSubmit}>
                    {orderDetails.map((currOrder, index)=>{
                        return (
                            <Grid container spacing={2} mt={2}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <UserTextField
                                        label="Part No*"
                                        heading="partNo"
                                        value={currOrder.partNo}
                                        index={index}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <UserTextField
                                        label="Origin*"
                                        heading="origin"
                                        value={currOrder.origin}
                                        index={index}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <UserTextField
                                        label="Destination"
                                        heading="dest"
                                        value={currOrder.dest}
                                        index={index}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <AutoFillTextField
                                        label="Status*"
                                        heading="status"
                                        values={currOrder.status  ? [currOrder.status] : []}
                                        options={["Draft", "Completed"]}
                                        index={index}
                                        handleChange={handleChange}
                                        length={1}
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <UserTextField
                                        label="Remark*"
                                        heading="remark"
                                        value={currOrder.remark}
                                        index={index}
                                        isTextArea={true}
                                        handleChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                        )
                    })}
                    <Box display={"flex"} justifyContent="center" mt={3}>
                        <Button variant="contained" size="small" onClick={handleAdd} sx={{mr: 1}}>Add</Button>
                        <Button variant="contained" size="small" onClick={handleRemove} disabled={orderDetails.length === 1} sx={{mr: 1}} color="warning">Remove</Button>
                        <Button type="submit" variant="contained" sx={{mr: 1}}>Submit</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>

    )
}
export default CreateOrder;
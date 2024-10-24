import React, { useState } from 'react';
import { Grid, Paper, Box, Typography, Button, IconButton } from '@mui/material';
import UserTextField from '../../components/UserTextField';
import AutoFillTextField from '../../components/AutoFillTextField';
import { axiosInstance, LeadStatusOptions } from "../../utils/Constant";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const supplierHeading = ["Supplier 1 Details", "Supplier 2 Details", "Supplier 3 Details"];

function FillQuoteDetails({ supplierDetails, setSupplierDetails, handleSubmit }) {
    const [supplierCount, setSupplierCount] = useState(1);

    const handleChange = (label, value, heading, index) => {
        const temp = [...supplierDetails];
        temp[index][heading] = value;
        setSupplierDetails(temp);
    };

    const addMoreSuppliers = () => {
        if (supplierCount < 3) {
            setSupplierCount(supplierCount + 1);
        }
    };

    const removeSupplier = (index) => {
        const temp = [...supplierDetails];
        temp.splice(index, 1); // Remove supplier at the given index
        setSupplierDetails(temp);
        setSupplierCount(supplierCount - 1); // Decrease supplier count
    };

    return (
        <Box width={"100%"}>
            <Paper sx={{ px: 3, py: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
                    <Typography variant='h5'>Supplier Quote Details</Typography>
                </Box>
                <Box type="submit" component={"form"} onSubmit={handleSubmit}>
                    {supplierDetails.slice(0, supplierCount).map((currSupplier, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Typography variant="body1" sx={{ mt: 3.5, mb: 1.5 }}>{supplierHeading[index]}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="DC*"
                                            heading="dc"
                                            handleChange={handleChange}
                                            value={currSupplier.dc}
                                            type="text"
                                            index={index}
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Price*"
                                            heading="price"
                                            handleChange={handleChange}
                                            value={currSupplier.price}
                                            type="number"
                                            index={index}
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Lead Time*"
                                            heading="leadTime"
                                            handleChange={handleChange}
                                            value={currSupplier.leadTime}
                                            type="text"
                                            index={index}
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Warranty*"
                                            heading="warranty"
                                            value={currSupplier.warranty}
                                            handleChange={handleChange}
                                            index={index}
                                            type="text"
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Quantity*"
                                            heading="qty"
                                            handleChange={handleChange}
                                            value={currSupplier.qty}
                                            index={index}
                                            type="number"
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <AutoFillTextField
                                            label="Email"
                                            heading="email"
                                            handleChange={handleChange}
                                            values={currSupplier.email}
                                            options={[]}
                                            index={index}
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Company*"
                                            heading="company"
                                            handleChange={handleChange}
                                            value={currSupplier.company}
                                            type="text"
                                            index={index}
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Quoted Price*"
                                            heading="quotedPrice"
                                            handleChange={handleChange}
                                            value={currSupplier.quotedPrice}
                                            index={index}
                                            type="number"
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <UserTextField
                                            label="Order Value"
                                            heading="orderValue"
                                            handleChange={handleChange}
                                            value={currSupplier.orderValue}
                                            index={index}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6}>
                                        <AutoFillTextField
                                            label="Lead Status*"
                                            heading="leadStatus"
                                            handleChange={handleChange}
                                            values={currSupplier.leadStatus ? [currSupplier.leadStatus] : []}
                                            options={LeadStatusOptions}
                                            length={1}
                                            index={index}
                                            required={index === 0} // Required for Supplier 1
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={12}>
                                        <UserTextField
                                            label="Customer Feedback"
                                            heading="customerFeedback"
                                            handleChange={handleChange}
                                            value={currSupplier.customerFeedback}
                                            index={index}
                                            type="text"
                                            isTextArea={true}
                                        />
                                    </Grid>
                                    {index > 0 && ( // Show remove button for additional suppliers
                                        <Grid item sm={12} xs={12} md={12}>
                                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                <IconButton onClick={() => removeSupplier(index)} color="error">
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </React.Fragment>
                        );
                    })}

                    {supplierCount < 3 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Button variant="outlined" onClick={addMoreSuppliers}>
                                Add More +
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Button variant="contained" size="medium" type="submit">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default FillQuoteDetails;

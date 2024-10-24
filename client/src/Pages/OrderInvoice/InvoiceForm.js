import { Button, Grid, Paper, Box, Typography} from "@mui/material";
import React, { useState } from "react";
import AutoFillTextField from "../../components/AutoFillTextField";
import UserTextField from "../../components/UserTextField";
import { axiosInstance, generateUniqueString } from '../../utils/Constant';

const getDate = ()=>{
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const generatedUniqueId = generateUniqueString();

const InvoiceForm = ({setInvoiceId, setActiveStep}) =>{

    const [invoiceDetails, setInvoiceDetails] = useState({
        documentTitle: "",
        customerId: "MK-C-U-"+generatedUniqueId,
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        documentDate: getDate(),
        invoiceId: "MK-"+generatedUniqueId,
        incoterms: "",
        paymentTerms: "",
        accountLocation: "",
        termsAndCondition: "",
        discount: 0,
        additionalCharges: 0,
        tax: 0,
        currencyType: "",
        additionalChargesType: ""
    });

    const handleChange=(label, value, heading)=>{
        console.log(value);
        const temp = {...invoiceDetails};
        if(Array.isArray(value))
        temp[heading] = value[0];
        else
        temp[heading] = value;
        console.log(temp);
        setInvoiceDetails(temp);
    }

    const handleSubmit=()=>{
        setInvoiceId(invoiceDetails.invoiceId);
        axiosInstance.post(`/invoice/create-new-invoice`, invoiceDetails)
        .then((res)=>{
            setActiveStep(1);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Paper sx={{px: 3, py: 2}}>
            <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 2}}>
                <Typography variant='h5'>Create Invoice</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12}>
                    <AutoFillTextField
                        label="Document Type*"
                        heading="documentTitle"
                        values={!invoiceDetails.documentTitle ? [] : [invoiceDetails.documentTitle]}
                        handleChange={handleChange}
                        options={["Purchase Order", "Tax Invoice", "Proforma Invoice", "Quotation"]}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Customer Id*"
                        heading="customerId"
                        value={invoiceDetails.customerId}
                        handleChange={handleChange}
                        readOnly={true}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Customer Name*"
                        heading="customerName"
                        value={invoiceDetails.customerName}
                        handleChange={handleChange}
                        type="text"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Customer Email*"
                        heading="customerEmail"
                        value={invoiceDetails.customerEmail}
                        handleChange={handleChange}
                        type="email"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Customer Phone No*"
                        heading="customerPhone"
                        value={invoiceDetails.customerPhone}
                        handleChange={handleChange}
                        type="text"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Document Date*"
                        heading="documentDate"
                        value={invoiceDetails.documentDate}
                        handleChange={handleChange}
                        type="date"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Invoice Id*"
                        heading="invoiceId"
                        value={invoiceDetails.invoiceId}
                        handleChange={handleChange}
                        readOnly={true}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Incoterms*"
                        heading="incoterms"
                        value={invoiceDetails.incoterms}
                        handleChange={handleChange}
                        type="text"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <AutoFillTextField
                        label="Payment Terms*"
                        heading="paymentTerms"
                        options={["Nett 7 Days", "Nett 14 Days"]}
                        values={!invoiceDetails.paymentTerms ? [] : [invoiceDetails.paymentTerms]}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <AutoFillTextField
                        label="Account Location*"
                        heading="accountLocation"
                        options={["India", "UAE"]}
                        values={!invoiceDetails.accountLocation ? [] : [invoiceDetails.accountLocation]}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Discount Percent*"
                        heading="discount"
                        value={invoiceDetails.discount}
                        handleChange={handleChange}
                        type="number"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Additional Charges*"
                        heading="additionalCharges"
                        value={invoiceDetails.additionalCharges}
                        handleChange={handleChange}
                        type="number"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <UserTextField
                        label="Tax Percent*"
                        heading="tax"
                        value={invoiceDetails.tax}
                        handleChange={handleChange}
                        type="number"
                    />
                </Grid>
                <Grid item md={6} sm={12}>
                    <AutoFillTextField
                        options={["Rupee", "USD"]}
                        values={invoiceDetails.currencyType ? [invoiceDetails.currencyType] : []}
                        label={"Select Currency"}
                        heading={"currencyType"}
                        handleChange={handleChange}
                    />
                </Grid>

                <Grid item md={6} sm={12}>
                    <UserTextField
                        value={invoiceDetails.additionalChargesType}
                        label={"Additional Charges Type(Shipping..)"}
                        heading={"additionalChargesType"}
                        handleChange={handleChange}
                        type="text"
                    />
                </Grid>

                {invoiceDetails.accountLocation === "UAE" &&
                <Grid item md={12} sm={12}>
                    <UserTextField
                        label="Terms and Condition*"
                        heading="termsAndCondition"
                        value={invoiceDetails.termsAndCondition}
                        handleChange={handleChange}
                        type="text"
                        isTextArea={true}
                    />
                </Grid>
                }
            </Grid>
            <Box display="flex" justifyContent={"center"} width={"100%"} mt={2}>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </Box>
        </Paper>
    )
}

export default InvoiceForm;
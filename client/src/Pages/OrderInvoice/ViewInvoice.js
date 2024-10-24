import { Box, Typography, Button, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TextField, CircularProgress } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.webp";
import { axiosInstance, OfficeDetails, BankDetails } from "../../utils/Constant";
import { useParams } from "react-router-dom";

const handleAddDays = (documentDate, paymentTerms) => {
    let x = 0;
    if(paymentTerms.includes("7"))
        x = 7;
    else
        x = 14;
    const date = new Date(documentDate);
    
    date.setDate(date.getDate() + x);
    
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

const ViewInvoice=({invoiceId})=>{
    const [loading, setLoading] = useState(true);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [partDetails, setPartDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const componentRef = useRef();

    const Params = useParams();
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const temp = invoiceId ? invoiceId : Params.id; 
                setLoading(true);
                console.log(temp);
                const [result1, result2] = await Promise.all([
                    axiosInstance.get(`/invoice/get-invoice-details/${temp}`),
                    axiosInstance.get(`/invoice/get-part-details/${temp}`)
                ]);
                console.log(result1.data);
                console.log(result2.data);
                setInvoiceDetails(result1.data.invoiceDetails);
                setPartDetails(result2.data.partDetails);
                setTotalPrice(result2.data.totalPrice);
                setLoading(false);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        fetchData();        
    }, [])


    const handlePrint = () => {
        const originalContent = document.body.innerHTML;
        const printContent = componentRef.current.innerHTML;
    
        document.body.innerHTML = printContent;
        window.print();
    
        document.body.innerHTML = originalContent;
        window.location.reload(); // To make sure the original content is restored correctly
      };

      const index = invoiceDetails?.accountLocation === "UAE" ? 1 : 0;
    
    
    if(loading)
        return <CircularProgress />

    return (
        <Box width={"100%"}>
            <Box display="flex" justifyContent={"right"} mr={2} my={2}>
                <Button variant="contained" onClick={handlePrint}>Download</Button>
            </Box>
            <Paper sx={{px: 2, py: 2}} ref={componentRef}>
                <Grid container>
                    <Grid item lg={9} md={9} sm={8}>
                        <img src={logo} alt="logo" width={200} height={100}/>
                    </Grid>
                    <Grid item lg={3} md={3} sm={4}>
                        {OfficeDetails[index].address.map((currAddress)=>{
                            return <Typography key={currAddress} variant="body2">{currAddress}</Typography>
                        })}
                        <Typography variant="body2" color={"gray"}>{OfficeDetails[0].email}</Typography>
                    </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" sx={{my: 2}}>{invoiceDetails.documentTitle}</Typography>
                </Box>
                <Grid container>
                    <Grid item lg={9} sm={8}>
                        <Typography varint="body2">{invoiceDetails.customerId}</Typography>
                        <Typography variant="body2">{invoiceDetails.customerName}</Typography>
                        <Typography varint="body2" color={"gray"}>{invoiceDetails.customerPhone}</Typography>
                        <Typography variant="body2" color={"gray"}>{invoiceDetails.customerEmail}</Typography>
                    </Grid>
                    <Grid item lg={3} sm={4}>
                        <Typography variant="body2">Document Date: {invoiceDetails.documentDate}</Typography>
                        <Typography variant="body2">Invoice No: {invoiceDetails.invoiceId}</Typography>
                        <Typography variant="body2">Incoterms: {invoiceDetails.incoterms}</Typography>
                        <Typography varinat="body2">Payment Terms: {invoiceDetails.paymentTerms}</Typography>
                        <Typography variant="body2">Due Date: {handleAddDays(invoiceDetails.documentDate, invoiceDetails.paymentTerms)}</Typography>
                    </Grid>
                </Grid>
                <Table sx={{ mt: 2.5, mb: 0.5, border: 1, borderColor: 'black', borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>Part Details</TableCell>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>HSN Code</TableCell>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>Qty</TableCell>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>Price</TableCell>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>Lead Time</TableCell>
                            <TableCell sx={{ border: 1, borderColor: 'black' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partDetails.map((part, index)=>{
                            return (
                                <TableRow key={index}>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>
                                        <Typography>
                                            {part?.partNo}
                                        </Typography>
                                        <Typography>
                                            {part?.manufacturer}
                                        </Typography>
                                        <Typography>
                                            {part?.DC}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>{part?.hsnCode}</TableCell>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>{part?.qty}</TableCell>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>{part?.price}</TableCell>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>{part?.leadTime}</TableCell>
                                    <TableCell sx={{ border: 1, borderColor: 'black' }}>{part?.totalPrice}</TableCell>
                                </TableRow>
                            )
                        })}
                        
                    </TableBody>
                </Table>
                <Typography variant="body2">
                    For terms and conditions, please visit{' '}
                    <a href="https://www.maketronics.com" target="_blank" rel="noopener noreferrer">
                        www.maketronics.com
                    </a>
                </Typography>
                <TableContainer component={"div"} sx={{ maxWidth: 600,  ml: "auto", my: 2 }}>
                    <Table sx={{ borderCollapse: 'collapse' }}>
                        <TableBody>
                            <TableRow>
                            <TableCell sx={{ border: '1px solid black' }}>Discount (optional)</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{invoiceDetails.discount}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell sx={{ border: '1px solid black' }}>Additional charges ({invoiceDetails?.additionalChargesType || "NA"})</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{invoiceDetails.currencyType === "USD" ? "$" : "₹"}{invoiceDetails.additionalCharges}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell sx={{ border: '1px solid black' }}>Tax (Optional) Enter tax type & % manually</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{invoiceDetails.tax}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell sx={{ border: '1px solid black' }}>Balance Due</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{invoiceDetails.currencyType === "USD" ? "$" : "₹"}{(totalPrice -(totalPrice * invoiceDetails.discount / 100))*(invoiceDetails.tax + 100) / 100 + invoiceDetails.additionalCharges}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer component={"div"} sx={{mt: 3 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableBody>
            {invoiceDetails.accountLocation === 'UAE' && (
              <>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black' }}>ACCOUNT NAME:</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>{BankDetails[1].ACCOUNT_NAME}</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>IBAN:</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>{BankDetails[1].IBAN}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ border: '1px solid black' }}>BIC/SWIFT:</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>{BankDetails[1].BIC}</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>ACCOUNT NUMBER:</TableCell>
                    <TableCell sx={{ border: '1px solid black' }}>{BankDetails[1].ACCOUNT_NUMBER}</TableCell>
                </TableRow>
              </>
            )}
            {invoiceDetails.accountLocation === 'India' && (
              <>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black' }}>BANK NAME:</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{BankDetails[0].BANK_NAME}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>ACCOUNT HOLDER:</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{BankDetails[0].ACCOUNT_HOLDER}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black' }}>ACCOUNT TYPE:</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{BankDetails[0].ACCOUNT_TYPE}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>ACCOUNT NUMBER:</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{BankDetails[0].ACCOUNT_NUMBER}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: '1px solid black' }}>BANK IFSC:</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{BankDetails[0].BANK_IFSC}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>Terms & Conditions</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>100% Advance Payments</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2">
        This document is computer generated and doesn’t need a signature.
      </Typography>
        {invoiceDetails.accountLocation === "UAE" &&
            <Box sx={{ py: 2}}>
                <Typography variant="h6">Terms and Condition</Typography>
                <Typography variant="body2">{invoiceDetails.termsAndCondition}</Typography>
            </Box> 
        }
            </Paper>
        </Box>
    )
}

export default ViewInvoice;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/Constant";
import { useParams, useNavigate } from "react-router-dom";
import FillQuoteDetails from "./FillQuoteDetails";
import { CircularProgress } from "@mui/material";

const EditQuoteDetails = () =>{

    const [supplierDetails, setSupplierDetails] = useState([]);
    const Params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.get(`/leads/get-quote-details/${Params.id}`)
        .then((res)=>{
            const temp = res.data.quoteDetails;
            setSupplierDetails(temp.map((quote)=>{
                return {
                    id: Params.id,
                    price: quote.Price,
                    dc: quote.DC,
                    leadTime: quote.LeadTime,
                    warranty: quote.Warranty,
                    qty: quote.Qty,
                    email: quote.email,
                    company: quote.company,
                    quotedPrice: quote.QuotedPrice,
                    orderValue: quote.OrderValue,
                    leadStatus: quote.LeadStatus,
                    customerFeedback: quote.CustomerFeedback,
                    supplierId: quote.supplierId
                };
            }))
        })
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosInstance.put("/leads/update-quote-details", supplierDetails)
        .then((res)=>{
            navigate(`/view-lead-details/${Params.id}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    if(supplierDetails.length === 0)
        return <CircularProgress />

    return <FillQuoteDetails supplierDetails={supplierDetails} setSupplierDetails={setSupplierDetails} handleSubmit={handleSubmit} />

}

export default EditQuoteDetails;
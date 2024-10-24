import { createNewInvoice, createNewInvoiceBill, getAllInvoiceDetails, getInvoiceCount, getInvoiceDetails, getPartDetailsForInvoice } from "./Invoice.model.js";

export const createInvoice = async(req, res)=>{
    try{
        const result = await createNewInvoice(req.body);
        return res.status(201).json({
            success: true,
            message: "Invoice Details Stored Successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createBill = async(req, res)=>{
    try{
        const partDetails = req.body;
        const temp = partDetails.map(currPart => [
            currPart.partNo, currPart.manufacturer, currPart.description, currPart.DC, currPart.hsnCode, 
            currPart.qty, currPart.price, currPart.leadTime, currPart.qty * currPart.price, currPart.invoiceId
        ]);  
        const result = await createNewInvoiceBill(temp);
        return res.status(201).json({
            success: true,
            result
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getInvoiceDetailsByInvoiceId = async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await getInvoiceDetails(id);
        return res.status(200).json({
            success: true,
            invoiceDetails: result
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getBillDetailsByInvoiceId = async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await getPartDetailsForInvoice(id);
        let total = 0;
        for(let i=0; i<result.length; i++)
        {
            total += result[i].totalPrice;
        }
        return res.status(200).json({
            success: true,
            partDetails: result,
            totalPrice: total
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getAllInvoice = async(req, res) =>{
    try{
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10;

        const [ invoiceDetails, totalInvoice] = await Promise.all([getAllInvoiceDetails(page, limit), getInvoiceCount()]);
        return res.status(200).json({
            success: true,
            invoiceDetails,
            totalInvoice
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
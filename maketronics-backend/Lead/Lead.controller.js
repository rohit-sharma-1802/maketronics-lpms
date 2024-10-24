import { adminEmail } from "../utills/constant.js";
import { addNewLeadMessage, createNewLead, createNewLeadQuote, getAllLeadDetailsForAdmin, getAllLeadDetailsForUser, getAllLeadMessageByLeadId, getLeadDetailsById, getLeadsCountForAdmin, getLeadsCountForUser, getQuoteDetailsByLeadId, updateLeadBadgeById, updateLeadDetailsById, updateSupplierQuoteDetailsBySupplierId } from "./Lead.model.js";

export const createLead = async(req, res)=>{
    try{
        const result = await createNewLead(req.body);
        return res.status(201).json({
            success: true,
            leadDetails: result 
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createLeadQuote = async(req, res)=>{
    try{
        const leadQuoteDetails = req.body;
        console.log(leadQuoteDetails);
        const convertedLeadDetails = leadQuoteDetails.map(obj => [
            parseInt(obj.id),
            obj.price,
            obj.dc,
            obj.leadTime,
            obj.warranty,
            obj.qty,
            JSON.stringify(obj.email),
            obj.company,
            obj.quotedPrice,
            obj.orderValue,
            obj.leadStatus,
            obj.customerFeedback
        ]);
        const supplierIds = await createNewLeadQuote(convertedLeadDetails);
        return res.status(201).json({
            success: true,
            supplierIds 
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getLeadDetails = async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await getLeadDetailsById(id);
        return res.status(201).json({
            success: true,
            leadDetails: result
        })
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getQuoteDetails = async(req, res) => {
    try{
        const {id} = req.params;
        const quoteDetails = await getQuoteDetailsByLeadId(id);
        return res.status(200).json({
            success: true,
            quoteDetails
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllLeadDetails = async(req, res) => {
    try{
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const email = req.query.email;
        console.log(email);
        if(email === adminEmail)
        {
            const [leadDetails, totalLeads] =  await Promise.all([getAllLeadDetailsForAdmin(email, page, limit), getLeadsCountForAdmin()]);
            return res.status(200).json({
                success: true,
                leadDetails,
                totalLeads
            });
        }
        const [leadDetails, totalLeads] =  await Promise.all([getAllLeadDetailsForUser(email, page, limit), getLeadsCountForUser(email)]);
        return res.status(200).json({
            success: true,
            leadDetails,
            totalLeads
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateLeadBadge = async(req, res) => {
    try{
        
        const {badge, id} = req.body;
        const result = await updateLeadBadgeById(id, badge);
        return res.status(200).json(result);

    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateLeadDetails = async(req, res) => {
    try{
        const result = await updateLeadDetailsById(req.body);
        return res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateSupplierQuoteDetails = async(req, res) => {
    try{
        const result = await updateSupplierQuoteDetailsBySupplierId(req.body);
        return res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const addLeadMessage = async(req, res) => {
    try{
        const currentDateTime = new Date();
        const offset = currentDateTime.getTimezoneOffset() * 60000; // Get the offset in milliseconds
        const localDateTime = new Date(currentDateTime - offset); // Adjust to local time
        const formattedDateTime = localDateTime.toISOString().slice(0, 19).replace('T', ' ');
        const result = await addNewLeadMessage({...req.body, formattedDateTime});
        return res.status(201).json({
            success: true,
            commentDetails: result
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllLeadMessage = async(req, res)=>{
    try{
        const {id} = req.params;
        const allMessageData = await getAllLeadMessageByLeadId(id);
        return res.status(200).json({
            success: true,
            messageDetails: allMessageData
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
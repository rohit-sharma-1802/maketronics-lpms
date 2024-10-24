import { addPart, addPartStatus, createNewOrderByOrderId, getAllOrderIds, getOrderByOrderId, getOrderIdCount, getPartStatusByPartNo, updatePartByOrderId } from "./Order.model.js";


export const createNewOrder = async(req, res)=>{
    try{
        const orderDetails = req.body;
        console.log(orderDetails);
        const temp = orderDetails.map(obj => [
            obj.orderId, 
            obj.partNo,
            obj.origin,
            obj.dest,
            obj.status, 
            obj.remark
        ]);
        const result = await createNewOrderByOrderId(temp);
        return res.status(201).json({
            success: true,
            message: "Order Created Successfully"
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addPartToOrder = async(req, res)=>{
    try{
        const [result, result1] = await Promise.all([addPart(req.body), addPartStatus(req.body)]);
        return res.status(201).json({
            success: true,
            message: "Part Added Successfully."
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addStatusForPart = async(req, res)=>{
    try{
        const result = await addPartStatus(req.body);
        return res.status(201).json({
            success: true,
            message: "Part Added Successfully."
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getPartStatus = async(req, res)=>{
    try{
        const{orderId, partNo} = req.params;
        const result = await getPartStatusByPartNo(orderId, partNo);
        return res.status(200).json({
            success: true,
            status: result
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 


export const editPartInOrder = async(req, res)=>{
    try{
        const result = await updatePartByOrderId(req.body);
        return res.status(201).json({
            success: true,
            orderDetails: req.body
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllOrder = async(req, res)=>{
    try{
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10;

        const [orderIds, totalOrderId] = await Promise.all([ getAllOrderIds(page, limit), getOrderIdCount() ]);
        console.log(totalOrderId);
        return res.status(200).json({
            success: true, 
            orderIds,
            totalOrderId
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getOrderByOrderNo = async(req, res)=>{
    try{
        const {orderId} = req.params;
        const result = await getOrderByOrderId(orderId);
        return res.status(200).json({
            success: true,
            orderDetails : result
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
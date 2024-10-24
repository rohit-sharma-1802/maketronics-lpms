import { query } from "express";
import { pool } from "../config/database.js";

const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const createNewOrderByOrderId = async(orderDetails)=>{
    try{
        console.log(orderDetails);
        const result = await queryAsync(`Insert into OrderTrack(orderId, partNo, origin, dest, status, remark) values ?`, [orderDetails]);
        const firstInsertedId = result.insertId;  
        const numberOfRows = result.affectedRows;  

        const insertedIds = Array.from({ length: numberOfRows }, (v, i) => firstInsertedId + i);

        return insertedIds;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

export const updatePartByOrderId = async(orderDetails)=>{
    try{
        const {orderId, partNo, origin, dest, status, remark} = orderDetails;
        const result = await queryAsync(`UPDATE OrderTrack SET origin = ?, dest = ?, remark = ? WHERE orderId = ? AND partNo = ?`, [origin, dest, remark, orderId, partNo]);
        return orderDetails;
    }
    catch(error)
    {
        throw error;
    }
}

export const getOrderByOrderId = async(orderId)=>{
    try{
        const result = await queryAsync(`Select * From OrderTrack where orderId = ?`, [orderId]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const addPart = async(orderDetails) => {
    try{
        console.log(orderDetails);
        const {orderId, partNo, origin, dest, remark} = orderDetails;
        const result = await queryAsync(`Insert into OrderTrack(orderId, partNo, origin, dest,  remark) values ( ?, ?, ?, ?, ?)`, [orderId, partNo, origin, dest, remark]);
        return result.insertId;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

export const getPartStatusByPartNo = async(orderId, partNo)=>{
    try{
        const result = await queryAsync(`Select status From OrderPartStatus where orderId = ? And partNo = ?`, [orderId, partNo]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const addPartStatus = async(orderDetails) => {
    try{
        const {orderId, partNo, status} = orderDetails;
        const result = await queryAsync(`Insert into OrderPartStatus(orderId, partNo, status) values(?, ?, ?)`, [orderId, partNo, status]);
        return result.insertId;
    }
    catch(error)
    {
        throw error;
    }
}

export const getAllOrderIds = async(page, limit)=>{
    try{
        const offset = (page - 1) * limit;
        const result = await queryAsync(`Select distinct(orderId) From OrderTrack LIMIT ? OFFSET ?`, [limit, offset]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const getOrderIdCount = async() => {
    const results = await queryAsync('SELECT COUNT(distinct orderId) AS count FROM OrderTrack');
    console.log(results);
    return results[0].count;
};
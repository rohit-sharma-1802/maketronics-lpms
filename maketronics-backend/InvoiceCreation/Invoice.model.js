import { pool } from "../config/database.js";

const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const createNewInvoice = async(invoiceDetails) =>{
    const { documentTitle, customerId, customerName, customerEmail, customerPhone, documentDate,
        invoiceId,
        incoterms,
        paymentTerms,
        accountLocation,
        termsAndCondition,
        discount,
        additionalCharges,
        tax,
        additionalChargesType,
        currencyType 
    } = invoiceDetails;
    console.log(invoiceDetails);
    try{
        const result = await queryAsync('Insert into InvoiceDetails(documentTitle, customerId, customerName, customerEmail, customerPhone, documentDate, invoiceId, incoterms, paymentTerms, accountLocation, termsAndCondition, discount, additionalCharges, tax, additionalChargesType, currencyType) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [documentTitle, customerId, customerName, customerEmail, customerPhone, documentDate,
            invoiceId,
            incoterms,
            paymentTerms,
            accountLocation,
            termsAndCondition,
            discount,
            additionalCharges,
            tax,
            additionalChargesType,
            currencyType
        ]);
            return result.insertId;
    }
    catch(error)
    {
        throw error;
    }    
}

export const createNewInvoiceBill=async(invoiceBillDetails)=>{
    try{
        console.log(invoiceBillDetails);
        const result = await queryAsync(`Insert into InvoicePartDetails(partNo, manufacturer, description, DC, hsnCode, qty, price, leadTime, totalPrice, invoiceId) values ?`, [invoiceBillDetails]);
        const firstInsertedId = result.insertId;  
        const numberOfRows = result.affectedRows;  

        const insertedIds = Array.from({ length: numberOfRows }, (v, i) => firstInsertedId + i);

        return insertedIds;
    }
    catch(error)
    {
        throw error;
    }
}

export const getInvoiceDetails = async(invoiceId) =>{
    try{
        const result = await queryAsync(`Select * From InvoiceDetails where invoiceId = ?`, [invoiceId]);
        return result[0];
    }
    catch(error)
    {
        throw error;
    }
}

export const getPartDetailsForInvoice = async(invoiceId) => {
    try{
        const result = await queryAsync(`Select * From InvoicePartDetails where invoiceId = ?`, [invoiceId]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const getAllInvoiceDetails = async(page, limit) =>{
    try{
        const offset = (page - 1) * limit;
        const result = await queryAsync(`SELECT * FROM InvoiceDetails LIMIT ? OFFSET ?`, [limit, offset]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const getInvoiceCount = async() => {
    const results = await queryAsync('SELECT COUNT(*) AS count FROM InvoiceDetails');
    console.log(results);
    return results[0].count;
};

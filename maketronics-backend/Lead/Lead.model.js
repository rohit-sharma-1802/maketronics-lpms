import { pool } from "../config/database.js";
import nodemailer from 'nodemailer';
import { adminEmail, senderDetails, userEmail } from "../utills/constant.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: senderDetails[0],
      pass: senderDetails[1]
    },
  });

const sendMail = async (to, subject, text) => {
  try {
    // Email options
    const mailOptions = {
      from: senderDetails[0],  // Sender's email
      to: to,                        // Receiver's email (can be a single email or an array)
      subject: subject,              // Email subject
      text: text                     // Email body (use `html` for HTML email content)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const createNewLead = async(leadDetails) =>{
    try{
        const { Date, 
                Company, 
                Qty, 
                PartHash, 
                PartStatus, 
                LeadType, 
                LeadOrigin, 
                TargetPrice, 
                FranchiseAvailability, 
                NetCListings, 
                Status,
                Email, 
                Badge 
            } = leadDetails;
            console.log(leadDetails);
        const result = await queryAsync(`Insert into LeadDetails(CreationDate, Company, Qty, PartHash, 
            PartStatus, LeadType, LeadOrigin, TargetPrice, FranchiseAvailability, NetCListings, status, UserEmail, Badge) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                Date, 
                Company, 
                Qty, 
                PartHash, 
                PartStatus, 
                LeadType, 
                LeadOrigin, 
                TargetPrice, 
                FranchiseAvailability, 
                NetCListings, 
                Status,
                Email, 
                Badge 
            ]
        );
        sendMail(adminEmail, "New Lead Created", "Please Fill the Quote for rececntly created quote");
        return { id: result.insertId, ...leadDetails };
    }
    catch(error)
    {
        throw error;
    }
}

export const createNewLeadQuote = async(quoteDetails) =>{
    try{
        const query = `INSERT INTO SupplierQuoteDetails (id, Price, DC, LeadTime, Warranty, Qty, email, company, QuotedPrice, OrderValue, LeadStatus, CustomerFeedback) VALUES ?`;

        // quoteDetails should be an array of arrays, where each sub-array represents a row
        const result = await queryAsync(query, [quoteDetails]);
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

export const getLeadDetailsById = async(id) =>{
    try{
        const result = await queryAsync(`Select * From LeadDetails where id = ?`, [id]);
        return result[0];
    }
    catch(error)
    {
        throw error;
    }
}

export const getQuoteDetailsByLeadId = async(id) =>{
    try{
        const rows = await queryAsync(`Select * From SupplierQuoteDetails where id = ?` , [id]);
        rows.forEach(row => {
            row.email = JSON.parse(row.email);
        });
        return rows;
    }
    catch(error)
    {
        throw error;
    }
}

export const getLeadsCountForUser = async (email) => {
    try {
        const rows = await queryAsync('SELECT COUNT(*) AS count FROM LeadDetails WHERE USEREMAIL = ?', [email]);
        return rows[0].count;
    } catch (error) {
        throw error;
    }
};

export const getLeadsCountForAdmin = async () => {
    try {
        const rows = await queryAsync('SELECT COUNT(*) AS count FROM LeadDetails', []);
        return rows[0].count;
    } catch (error) {
        throw error;
    }
};

export const getAllLeadDetailsForUser = async(email, page, limit) =>{
    try{
        const offset = (page - 1) * limit;
        const result = await queryAsync(`SELECT * FROM LeadDetails WHERE UserEmail = ? LIMIT ? OFFSET ?`, [email, limit, offset]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const getAllLeadDetailsForAdmin = async(email, page, limit) =>{
    try{
        const offset = (page - 1) * limit;
        const result = await queryAsync(`SELECT ld.*, (SELECT COUNT(*) FROM SupplierQuoteDetails ct WHERE ct.id = ld.id) AS count FROM LeadDetails ld  LIMIT ? OFFSET ?`, [limit, offset]);
        return result;
    }
    catch(error)
    {
        throw error;
    }
}

export const updateLeadBadgeById = async(id, badge) =>{
    try{
        const result = await queryAsync(`Update LeadDetails set badge = ? where id = ?`, [ badge, id ]);
        return {message: "Badge Updated Successfully", success: true};
    }
    catch(error)
    {
        throw error;
    }
}

export const updateLeadDetailsById = async(leadDetails) =>{
    try{

        const { Date, 
            Company, 
            Qty, 
            PartHash, 
            PartStatus, 
            LeadType, 
            LeadOrigin, 
            TargetPrice, 
            FranchiseAvailability, 
            NetCListings,
            Badge,
            id
        } = leadDetails;

        const result = await queryAsync(`Update LeadDetails set CreationDate = ?, Company = ?, Qty = ?, PartHash = ?, 
            PartStatus = ?, LeadType = ?, LeadOrigin = ?, TargetPrice = ?, FranchiseAvailability = ?, NetCListings = ?, Badge= ? where id = ?`,
            [
                Date, 
                Company, 
                Qty, 
                PartHash, 
                PartStatus, 
                LeadType, 
                LeadOrigin, 
                TargetPrice, 
                FranchiseAvailability, 
                NetCListings,
                Badge,
                id
            ]  
        );
        return {message: "Lead Updated Successfully!", success: true};
    }
    catch(error)
    {
        throw error;
    }
}

export const updateSupplierQuoteDetailsBySupplierId = async (supplierDetails) => {
    try {
      const updatePromises = supplierDetails.map(async (supplier) => {

        const { price, dc, leadTime, warranty, qty, company, quotedPrice, orderValue, leadStatus, customerFeedback, supplierId, email } = supplier;
        
        const emailStr = JSON.stringify(email);
  
        await queryAsync(
          `UPDATE SupplierQuoteDetails 
           SET Price = ?, DC = ?, LeadTime = ?, Warranty = ?, Qty = ?, email = ?, company = ?, QuotedPrice = ?, OrderValue = ?, LeadStatus = ?, CustomerFeedback = ?
           WHERE supplierId = ?`,
          [price, dc, leadTime, warranty, qty, emailStr, company, quotedPrice, orderValue, leadStatus, customerFeedback, supplierId]
        );
      });
  
      await Promise.all(updatePromises);
  
      return { message: "All Supplier Details Updated Successfully", success: true };
    } catch (error) {
      console.error("Error updating supplier details:", error);
      throw error;
    }
  };
  

export const addNewLeadMessage = async(commentDetails)=>{
    try{
        const {formattedDateTime, message, id} = commentDetails;
        const result = await queryAsync(`Insert into LeadCommentDetails(commentTime, message, id) values(?, ?, ?)`, [
            formattedDateTime,
            message,
            id
        ]);
        sendMail(adminEmail, "New Lead Message Added", "Lead Message has been added please check it out.");
        return {message, id, commentTime: formattedDateTime};
    }
    catch(error)
    {
        throw error;
    }
}

export const getAllLeadMessageByLeadId = async(id)=>{
    try{
        const result = await queryAsync(`Select * From LeadCommentDetails where id = ?`, [id]);
        return result;        
    }
    catch(error)
    {
        throw error;
    }
}

//update lead badge
// update Lead Details
// update supplier quote details
// add Lead message
// view all lead messages by lead id.

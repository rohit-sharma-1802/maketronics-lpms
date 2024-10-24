import { pool } from "../config/database.js";

export const userLogin = (User, userLoginCallback)=>{
      
        const {email, password} = User;
        console.log(User);
        pool.query(`Select * from user where email = ?`, [email], (err, results, fields)=>{
            if(err)
            return userLoginCallback(err);
            return userLoginCallback(err, results);
        }); 
}
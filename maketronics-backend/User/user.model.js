import { pool } from "../config/database.js";

export const userLogin = async (User, userLoginCallback) => {
    try {
        const { email, password } = User;
        console.log(User);

        const [results, fields] = await new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM user WHERE email = ?`, [email], (err, results, fields) => {
                if (err) return reject(err);
                resolve([results, fields]);
            });
        });

        return userLoginCallback(null, results);
    } catch (err) {
        return userLoginCallback(err);
    }
};

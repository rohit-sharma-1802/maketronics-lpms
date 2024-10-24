import { userLogin } from "./user.model.js";
import jwt from 'jsonwebtoken';

export const login = (req, res)=>{
        userLogin(req.body, (err, results)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            console.log(results);
            if(results[0].password === req.body.password)
            {
                const token = jwt.sign({ email: req.body.email }, process.env.WEBTOKEN_KEY, { expiresIn: '2d' });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ success: true, message: 'Login successful', token: token });
            }
            res.status(500).json({
                success: false,
                message: err.message
            });
        })
}
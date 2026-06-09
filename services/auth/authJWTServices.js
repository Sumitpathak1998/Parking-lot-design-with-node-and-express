import jwt from "jsonwebtoken";
import { AppError , handleError } from "../../error.js";

export const generateToken = (payload,expires = "20m") => {
    try {
        const token =  jwt.sign(payload , 
            process.env.JWT_SECRET , 
            {
                expiresIn : expires
            }
        );
        return token;   
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        throw new AppError(error.message,500,true,error.stack);
    }
}
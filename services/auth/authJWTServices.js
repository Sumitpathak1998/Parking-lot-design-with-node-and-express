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

export const decodeToken = (token,token_name = null) => {
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            if(token_name == "access_token") {
                return "JWT has expired";
            } else {
                throw new AppError("JWT has expired",500,true,error.stack);
            }
        } else if (error.name === "JsonWebTokenError") {
            throw new AppError("Invalid JWT",500,true,error.stack);
        } else {
            throw new AppError("Error : "+ error.message,500,true,error.stack);
        }
    }
}
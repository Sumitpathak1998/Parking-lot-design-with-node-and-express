import jwt from "jsonwebtoken";
import { AppError , handleError } from "../../error.js";

export const generateToken = ({id , name , email , role}) => {
    try {
        const token =  jwt.sign({ id , name , email , role } , 
            process.env.JWT_SECRET , 
            {
                expiresIn : "20m"
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
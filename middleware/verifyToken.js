import { AppError, handleError } from "../error.js";
import { decodeToken } from "../services/auth/authJWTServices.js";

export const verifyJWTToken = async (req,res,next) => {
    try {
        if(req.url == "/api/auth/login") {
            return next();
        }

        const authHeader = req.headers?.authorization;

        if(!authHeader) {
            throw new AppError("Token Missing",401,true);
        }

        const token = authHeader.split(" ")[1];
        const decode = decodeToken(token);
        console.log("user info : ", decode);

        req.user = decode;

        next();
    } catch (error) {
        handleError(error,res);
    }
}
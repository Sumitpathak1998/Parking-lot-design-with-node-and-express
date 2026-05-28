import { AppError, handleError } from "../error.js";
import { decodeToken } from "../services/authJWTServices.js";

export const verifyJWTToken = async (req,res,next) => {
    try {
        const authHeader = req.headers?.authorization;

        if(!authHeader) {
            throw new AppError("Token Missing",401,true);
        }

        const token = authHeader.split(" ")[1];
        const decode = await decodeToken(token);
        console.log("user info : ", decode);

        req.user = decode;

        next();
    } catch (error) {
        handleError(error,res);
    }
}
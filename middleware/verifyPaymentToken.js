import { AppError, handleError } from "../error.js";
import { decodeToken } from "../services/auth/authJWTServices.js";

export const verifyPaymentJWTToken = async (req,res,next) => {
    try {
        
        const paymentHeader = req.headers?.paymenttoken;

        if(!paymentHeader) {
            throw new AppError("Payment Token Missing",403,true);
        }

        const token = paymentHeader.split(" ")[1];
        const decode = decodeToken(token);
        console.log("Payment Token info : ", decode);

        req.payment = decode;

        next();
    } catch (error) {
        handleError(error,res);
    }
}
import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { checkAndPaymetService } from "../services/paymentService.js";

export const processPayment = async (req,res) => {
    try {
        const payment_info = {
            "user_pay_amount" : req.body?.amount ,
            "payment_id" : req.payment?.payment_id , 
            "calculate_amount" : req.payment?.amount , 
            "ticket_id" : req.payment?.ticket_id
        };
        const response = await checkAndPaymetService(payment_info); 
        Helper.successResponse(res,200,response.messsage);
    } catch (error) {
        handleError(error,res);
    }
}
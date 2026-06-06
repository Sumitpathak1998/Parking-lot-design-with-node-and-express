import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { calculateParkingChargesService } from "../services/parkingChargesService.js";

export const calculateParkingCharges = async (req,res) => {
    try {
        const ticket_id = req.params.id;
        const response = await calculateParkingChargesService(ticket_id);
        res.status(200).send({
            success : true ,
            amount : response.amount,
            url : "Pay at /api/exit/payment"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}
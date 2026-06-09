import { AppError } from "../error.js";
import { Payment } from "../models/payment.js";
import { Ticket } from "../models/ticket.js";
import { checkPaymentOnTicketRepo, createPaymentRepo , updatePaymentRepo , checkAndUpdatePaymentRepo , updateTicketFloorSpotAndDisplay } from "../repositories/paymentRepository.js";
import { fetchTicketInfo } from "../repositories/ticketGenerateRepository.js";
import { generateToken } from "./auth/authJWTServices.js";

export const checkPaymentInfoService = async (amount,ticket_id) => {
    try {
        const payment_response = await checkPaymentOnTicketRepo(ticket_id);
        console.log("check payment  : ",payment_response);
        let payment_id;
        if(payment_response.length == 0) {
            const payment = new Payment({amount : amount, ticket_id : ticket_id});
            const response = await createPaymentRepo(payment);
            payment_id = response.insertId;
        } else {
            if (payment_response[0]?.status == "complete") {
                throw new AppError("Payment Already Done",400,true);
            }

            const response = await updatePaymentRepo(payment_response[0]?.id,amount);
            payment_id = payment_response[0]?.id;
        }

        const token = generateToken({
                    payment_id : payment_id,
                    amount : amount ,
                    ticket_id : ticket_id
                },"20m");
        
        return token;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {object} payment_info 
 */
export const checkAndPaymetService = async (payment_info) => {
    try {
        if(payment_info.user_pay_amount != payment_info.calculate_amount) {
            throw new AppError("Please Enter Exact Amount",400,true);
        }
        const payment_response = await checkAndUpdatePaymentRepo(payment_info);
        if(payment_info.affectedRows == 0) {
            throw new AppError("Payment already Completed",400,true);
        }

        // update ticket , floor spot and display board 
        const ticket_info = await fetchTicketInfo(payment_info.ticket_id);

        const ticket = new Ticket(ticket_info);
        ticket.paymentStatus = 1;
        ticket.totalAmount = payment_info.calculate_amount;
        ticket.status = 'COMPLETED';
        ticket.exitTime = new Date();

        const response = await updateTicketFloorSpotAndDisplay(ticket);

        return {messsage : "Payment Received"};
    } catch (error) {
        throw error;
    }
}

// checkAndPaymetService({
//             "user_pay_amount" : 360.5 ,
//             "payment_id" : 1 , 
//             "calculate_amount" : 360.5 , 
//             "ticket_id" : 1
//         })
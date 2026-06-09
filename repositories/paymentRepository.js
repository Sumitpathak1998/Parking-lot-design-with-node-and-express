import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { Payment } from "../models/payment.js";
import { Ticket } from "../models/ticket.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/**
 * @param {Payment} payment 
 */
export const createPaymentRepo = async (payment) => {
    try {
        const [result] = await db.query("INSERT INTO parking_lot.payment (amount,ticket_id,payment_type) values(?,?,?)",[payment.amount,payment.ticket_id,payment.payment_type]);
        console.log("Result after the Payment Insert : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const checkPaymentOnTicketRepo = async (ticket_id) => {
    try {
        const [result] = await db.query("SELECT * FROM parking_lot.payment WHERE ticket_id = ?",[ticket_id]);
        console.log("Result after the check Payment: ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const updatePaymentRepo = async (payment_id,amount) => {
    try {
        const [result] = await db.query("UPDATE parking_lot.payment SET amount = ? WHERE id = ?",[amount,payment_id]);
        console.log("Result after the Paymetn Update : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const checkAndUpdatePaymentRepo = async (payment_info) => {
    try {
        const [result] = await db.query("UPDATE parking_lot.payment SET status = 'Complete' WHERE id = ? and amount = ? and status = 'Pending'",[payment_info.payment_id,payment_info.calculate_amount]);
        console.log("Result after the Paymetn Update : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * 
 * @param {Ticket} ticket 
 * @returns 
 */
export const updateTicketFloorSpotAndDisplay = async (ticket) => {
    try {
        /**
         * I need to perform 3 task
         * 1. Update the ticket details 
         * 2. Update the Spot with occupied =0
         * 3. Update the display as well 
         * so , these all the query depend on each other for that we use transection 
         */

        // Start transaction
        await db.beginTransaction();
        
        // 1. Update the ticket details 
        const [result] = await db.query("UPDATE parking_lot.ticket SET exitTime = ? , totalAmount = ? , paymentStatus = ? , status = ? WHERE id = ?",[ticket.exitTime,ticket.totalAmount,ticket.paymentStatus,ticket.status,ticket.id]);
        console.log("Response after the ticket insert : ",result);

        // 2. Update the floor spot occupied column 
        const [update_spot] = await db.query("UPDATE parking_lot.floorspot set occupied = 0 where id = ?",[ticket.floor_spot]);
        console.log("Response after update spot : ",update_spot);
        
        // 3. Update the floor display 
        const [update_display] = await db.query("UPDATE parking_lot.floordisplay set occupy_spot = occupy_spot - 1 where floor_id = ? and spot_type_id = ?",[ticket.floor_id,ticket.floor_spot]);
        console.log("Response after update display : ",update_display);

        // Save all changes
        await db.commit();

        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
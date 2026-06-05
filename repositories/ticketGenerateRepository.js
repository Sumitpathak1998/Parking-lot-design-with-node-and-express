import { AppError } from "../error.js";
import { fetchEmptySpotBasisOfVehicleType } from "../managers/floorManager.js";
import { Ticket } from "../models/ticket.js";
import DataBaseFactory from "../database/DataBaseFactory.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/** 
 * @param {number} vehicle_type_id 
 * @returns 
 */
export const fetchEmptySpot = async (vehicle_type_id) => {
    try {
        const response = await fetchEmptySpotBasisOfVehicleType(vehicle_type_id);
        return response;   
    } catch (error) {
        throw error;
    }
}

/**
 * @param {Ticket} ticket 
 */
export const createTicketRepo = async(ticket) => {
    try {
        /**
         * I need to perform 3 task
         * 1. Insert the ticket details 
         * 2. Update the Spot with occupied =1
         * 3. Update the display as well 
         * so , these all the query depend on each other for that we use transection 
         */

        // Start transaction
        await db.beginTransaction();
        
        // 1. Insert the ticket details 
        const [result] = await db.query("INSERT INTO parking_lot.ticket (`vehicleNumber`,`vehicleType`,`floor_id`,`floor_spot`) values (?,?,?,?)",[ticket.vehicleNumber,ticket.vehicleType,ticket.floor_id,ticket.floor_spot]);
        console.log("Response after the ticket insert : ",result);

        // 2. Update the floor spot occupied column 
        const [update_spot] = await db.query("UPDATE parking_lot.floorspot set occupied = 1 where id = ?",[ticket.floor_spot]);
        console.log("Response after update spot : ",update_spot);
        
        // 3. Update the floor display 
        const [update_display] = await db.query("UPDATE parking_lot.floordisplay set occupy_spot = occupy_spot + 1 where floor_id = ? and spot_type_id = ?",[ticket.floor_id,ticket.floor_spot]);
        console.log("Response after update display : ",update_display);

        // Save all changes
        await db.commit();

        return result;
    } catch (error) {
        //Undo all the query 
        await db.rollback();
        throw new AppError(error.message,500,false,error.stack);
    }
}
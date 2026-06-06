import { AppError } from "../error.js";
import { Ticket } from "../models/ticket.js";
import { fetchTicketDetails } from "../repositories/parkingChargesRepository.js";
import { fetchParkingRate } from "../repositories/parkingRateRepository.js";
import { calculateParkingCharges } from "../managers/floorManager.js";
/**
 * 
 * @param {number} ticket_id 
 */
export const calculateParkingChargesService = async (ticket_id) => {
    try {
        // check ticket_id and there status
        const ticket_response = await fetchTicketDetails(ticket_id);
        if(ticket_response.length == 0) {
            throw new AppError("Ticket not found",404,true);
        } 
        console.log(ticket_response);
        const ticket_info = new Ticket({...ticket_response[0]});
        if(ticket_info.status != "ACTIVE") {
            throw new AppError("Ticket Already Paid",409,true);
        } 

        // go for calculate the parking charges
        // entry time , parking rate 

        const parking_rate = await fetchParkingRate();
        if(parking_rate.length == 0) {
            throw new AppError("Please set the parking rate",500,false);
        }

        const rates = formatParkingRate(parking_rate);

        const amount = await calculateParkingCharges(rates,ticket_info.entryTime);
        
        ticket_info.amount = amount;
        
        // Need to think how to store this amount and work properly as this is not permanent 
        // due to that not store in DB.

        return {"amount" : amount};
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {Array} parking_rate 
 * @returns 
 */
function formatParkingRate(parking_rate) {
    return parking_rate.reduce((acc,param) => {
        acc[param["hour_type"]] = param["rate"];
        return acc; 
    }, {});
}
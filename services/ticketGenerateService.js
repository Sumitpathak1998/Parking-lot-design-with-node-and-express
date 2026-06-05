import { AppError } from "../error.js";
import { Ticket } from "../models/ticket.js";
import { fetchEmptySpot , createTicketRepo } from "../repositories/ticketGenerateRepository.js";
/**
 * 
 * @param {Ticket} ticket 
 */
export const ticketGenerateService = async(ticket) => {
    try {
        // step-1 : check the spot according to give vehicle type
        const emptySpotRes = await fetchEmptySpot(ticket.vehicleType);
        if(emptySpotRes.length == 0) {
            throw new AppError("No Spot Available",409,true);
        } 

        ticket.floor_id = emptySpotRes[0].floor_id;
        ticket.floor_spot = emptySpotRes[0].spot_id;
        
        // generate ticket 
        const response = await createTicketRepo(ticket);
        return response;
    } catch (error) {
        throw error;
    }
}
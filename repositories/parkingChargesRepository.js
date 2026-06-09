import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/**
 * 
 * @param {number} ticket_id 
 */
export const fetchTicketDetails = async (ticket_id) => {
    try {
        const [result] = await db.query("SELECT * FROM parking_lot.ticket where id = ?",[ticket_id]);
        console.log("result after fetch ticket : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
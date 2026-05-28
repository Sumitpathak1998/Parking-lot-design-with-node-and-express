import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();
/**
 * 
 * @param {number} floor_id 
 */
export const checkFloorOccupancy = async (floor_id) => {
    try {
        const [result] = await db.query("select count(id) as spot_occupied from parking_lot.floordisplay where floor_id = ? and occupy_spot > 0",[floor_id]);
        console.log("checkFloorOccupancy response : ",result[0]);
        return result[0].spot_occupied;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
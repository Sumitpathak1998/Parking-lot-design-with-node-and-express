import { AppError, handleError } from "../error.js";
import DataBaseFactory from "../database/DataBaseFactory.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

/**
 * 
 * @param {number} floor_id 
 * @param {number} spot_type_id 
 * @param {string} work_type 
 */
export const updateFloorDisplayManager = async (floor_id,spot_type_id,work_type) => {
    try {
        let update_field = "";
        if(work_type == "spot_added") {
            update_field = "total_spot = total_spot + 1";
        } else if (work_type == "spot_remove") {
            update_field = "total_spot = total_spot - 1";
        }
        const [result] = await db.query(`UPDATE parking_lot.floordisplay set ${update_field} where floor_id = ? and spot_type_id = ?`,[floor_id,spot_type_id]);
        console.log(result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
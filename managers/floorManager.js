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

export const checkFloorPanel = async (floor_id) => {
    try {
        const [result] = await db.query("select count(id) as panel_assign from parking_lot.panel where floor_id = ?",[floor_id]);
        console.log("checkFloorOccupancy response : ",result[0]);
        return result[0].panel_assign;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const fetchEmptySpotBasisOfVehicleType = async (vehicle_type_id) => {
    try {
        const [result] = await db.query("SELECT a.id as `spot_id` , a.floor_id as `floor_id` from parking_lot.floorspot a left join parking_lot.spotvehiclerelation b on a.spot_type = b.spot_type_id and b.vehicle_type_id = ? where a.occupied = 0 order by id asc limit 1",[vehicle_type_id]);
        console.log("checkFloorOccupancy response : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
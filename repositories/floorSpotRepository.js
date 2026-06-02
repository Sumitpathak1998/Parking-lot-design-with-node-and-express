import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { FloorSpot } from "../models/floorSpot.js";
import { updateFloorDisplayManager } from "../managers/displayManager.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/**
 * @param {FloorSpot} floorSpot 
 */
export const createFloorSpotRepo = async (floorSpot) => {
    try {
        const [result] =  await db.query("Insert into parking_lot.floorspot(name,spot_type,occupied,floor_id) value(?,?,?,?)", [floorSpot.name,floorSpot.spot_type,floorSpot.occupied,floorSpot.floor_id]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * 
 * @param {number} floor_id 
 * @param {number} spot_type 
 */
export const updateFloorDisplay = async (floor_id,spot_type,work_type) => {
    try {
        const response = await updateFloorDisplayManager(floor_id,spot_type,work_type);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {number} spot_id 
 */
export const fetchFloorSpotDetails = async (spot_id) => {
    try {
        const [result] =  await db.query("Select * from parking_lot.floorspot WHERE id = ?", [spot_id]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * @param {number} spot_id 
 */
export const removeFloorSpotRepo = async (spot_id) => {
    try {
        const [result] =  await db.query("Delete from parking_lot.floorspot where id = ?", [spot_id]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
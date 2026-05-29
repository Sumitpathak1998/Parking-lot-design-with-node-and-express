import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

export const cretaeFloorRepo = async(floor) => {
    try {
        const [result] = await db.query("Insert into parking_lot.floor (name,parking_attendent,parking_lot) values(?,?,?)",[floor.name,floor.parking_attendent,floor.parking_lot]);
        console.log("response at the time of insert : " , result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * @param {number[]} insert_data 
 */
export const createFloorDisplayRepo = async(insert_data) => {
    try {
        console.log(insert_data);
        const [result] = await db.query("Insert into parking_lot.floordisplay (floor_id,spot_type_id) values ?",[insert_data]);
        console.log("response at the time of insert : " , result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const removeFloorRepo = async(id) => {
    try {
        const [result] = await db.query("Delete from parking_lot.floor where id = ?" , [id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * 
 * @param {number} floor_id 
 */
export const removeFloorDisplayRepo = async (floor_id) => {
    try {
        const [result] = await db.query("Delete from parking_lot.floordisplay where floor_id = ?" , [floor_id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const updateFloorRepo = async (id,update) => {
    try {
        const sql = Object.entries(update).map(([key,value]) => key + "= '" + String(value) + "'" ).join(",");
        const [result] = await db.query(`UPDATE parking_lot.floor SET ${sql} WHERE id = ?`,[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { ParkingAttendent } from "../models/parkingAttendent.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

export const cretaeParkingAttendentRepo = async (parkingAttendent) => {
    try {
        const [result] =  await db.query("Insert into parking_lot.user (name,email,role) values(?,?,?)", [parkingAttendent.name,parkingAttendent.email,parkingAttendent.role]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
export const removeParkingAttendentRepo = async (id) => {
    try {
        const [result] = await db.query("Delete from parking_lot.user where id = ? and role = '2'",[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
export const updateParkingAttendentRepo = async (id,update) => {
    try {
        const sql = Object.entries(update).map(([key,value]) => key + "= '" + String(value) + "'" ).join(",");
        const [result] = await db.query(`UPDATE parking_lot.user SET ${sql} WHERE id = ? and role = '2'`,[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * @param {number} attendent_id 
 * @param {number} floor_id 
 * @returns 
 */
export const assignFloorToParkingAttendentRepo = async(attendent_id,floor_id) => {
    try {
        const [result] = await db.query(`UPDATE parking_lot.floor set parking_attendent = ? where id = ?`,[attendent_id,floor_id]);
        console.log("response at the time of update : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const checkParkingAttendentInfoRepo = async(attendent_id) => {
    try {
        const [result] = await db.query("SELECT id from parking_lot.user as a where id = ? and role = '2'",[attendent_id]);
        console.log("response at the time of update : ", result);
        return (result[0].id == attendent_id) ? true : false;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
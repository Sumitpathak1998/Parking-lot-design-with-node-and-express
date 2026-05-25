import { AppError } from "../error.js";
import { ParkingLot } from "../models/parkingLot.js";
import DataBaseFactory from "../database/DataBaseFactory.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

export const createParkingLotRepo = async (parkingLot) => {
    try {
        const [result] =  await db.query("Insert into parking_lot.parkinglot (parking_name) values(?)", [parkingLot.name]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const removeParkingLotRepo = async (id) => {
    try {
        const [result] = await db.query("Delete from parking_lot.parkinglot where id = ?",[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new Error(error.message,500,false,error.stack);
    }
}

export const updateParkingLotRepo = async (id,update) => {
    try {
        const sql = Object.entries(update).map(([key,value]) => key + "= '" + String(value) + "'" ).join(",");
        const [result] = await db.query(`UPDATE parking_lot.parkinglot SET ${sql} WHERE id = ?`,[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,error.stack,500,false);
    }
}
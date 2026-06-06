import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { ParkingRate } from "../models/parkingRate.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

/**
 * 
 * @param {ParkingRate} parkingRate 
 * @returns 
 */
export const cretaeParkingRateRepo = async(rates) => {
    try {
        const [result] = await db.query("Insert into parking_lot.parkingrate (hour_type,rate) values ?",[rates]);
        console.log("response at the time of insert : " , result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const updateParkingRateRepo = async (hour_type,rate) => {
    try {
        const [result] = await db.query(`UPDATE parking_lot.parkingrate SET rate = ${rate} WHERE hour_type = '${hour_type}'`);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

export const createSpotTypeRepo = async (spotType)  => {
    try {
        console.log("spot Type name : ",spotType.name);
        const [response] = await db.query("INSERT INTO parking_lot.spottype (name) values(?)", [spotType.name]);
        console.log("Spot Type added : ",response);
        return response;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const fetchAllSpotTypeRepo = async () => {
    try {
        const [response] = await db.query("SELECT * FROM parking_lot.spottype");
        console.log("Spot Type added : ",response);
        return response;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
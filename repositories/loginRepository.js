import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/**
 * 
 * @param {String} email 
 * @returns 
 */
export const loginRepo = async(email) => {
    try {
        const [result] = await db.query("select id, name , email , password, role from parking_lot.user where email = ?",[email]);        
        console.log("Login Result : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,true,error.stack);
    }
}
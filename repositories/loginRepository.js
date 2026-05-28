import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

export const loginRepo = async(email,password) => {
    try {
        const [result] = await db.query("select id, name , email , role from parking_lot.user where email = ? and password = ?",[email,password]);        
        console.log("Login Result : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,true,error.stack);
    }
}
import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { Session } from "../models/session.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

/**
 * @param {Session} session 
 * @returns 
 */
export const createSessionRepo = async (session) => {
    try {
        const [result] = await db.query("INSERT INTO parking_lot.session (user_id,user_agent,ip) values(?,?,?)",[session.user_id,session.user_agent,session.ip]);
        console.log("Result after the Session Create : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const checkSessionExistRepo = async (session_id) => {
    try {
        const [result] = await db.query(`
            SELECT u.id , u.name , u.email , u.role FROM parking_lot.session as s left join parking_lot.user as u   
            on s.user_id = u.id
            WHERE s.id = ?`, [session_id]);
        console.log("Result after the Session Check : ",result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
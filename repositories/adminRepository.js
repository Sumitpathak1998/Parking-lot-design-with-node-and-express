import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");

// Now make connection
const db = await dbInstance.connect();

export const createAdminRepo = async (admin) => {
    try {
        const [result] =  await db.query("Insert into parking_lot.user (name,email,role) values(?,?,?)", [admin.name,admin.email,admin.role]);
        console.log("response at the time of inswet : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const removeAdminRepo = async(id) => {
    try {
        const [result] = await db.query("Delete from parking_lot.user where id = ?",[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const updateAdminRepo = async(id,update) => {
    try {
        const sql = Object.entries(update).map(([key,value]) => key + "= '" + String(value) + "'" ).join(",");
        const [result] = await db.query(`UPDATE parking_lot.user SET ${sql} WHERE id = ?`,[id]);
        console.log("response at the time of remove : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,error.stack,500,false);
    }
}
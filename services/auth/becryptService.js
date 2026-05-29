import { AppError , handleError } from "../../error.js";
import bcrypt from "bcryptjs";

/**
 * 
 * @param {String} password 
 * @returns 
 */
export const createHashPassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

/**
 * 
 * @param {String} password 
 * @param { string} hashPassword
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (password,hashPassword) => {
    try {
        if(!password || !hashPassword) {
            return false;
        }
        return await bcrypt.compare(password,hashPassword)
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
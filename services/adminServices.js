import { Admin } from "../models/admin.js";
import { createAdminRepo , removeAdminRepo ,updateAdminRepo } from "../repositories/adminRepository.js";
import { AppError } from "../error.js";

export const createAdminService = async (admin) => {
    try {
        const response = await createAdminRepo(admin);    
        return response;
    } catch (error) {
        throw error;
    }
}

export const removeAdminService = async(id) => {
    try {
        const response =  await removeAdminRepo(id);
        if(response.affectedRows > 0) {
            return {message : "User Remove"};
        } else {
            throw new AppError("User Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}

export const updateAdminService = async(id,updates) => {
    try {
        // check that in the request valid field are came or not 
        const allowedFields = ["name", "email", "role"];

        const keys = Object.keys(updates);
        let isValid = keys.every(key => allowedFields.includes(key));

        if(!isValid) {
            throw new AppError("Invalid update fields", 400, true);
        }

        const response = await updateAdminRepo(id,updates);
        if(response.affectedRows > 0) {
            return {message : "USer Updated"};
        } else {
            throw new AppError("User Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}

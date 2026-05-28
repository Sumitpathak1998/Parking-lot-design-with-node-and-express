import { AppError } from "../error.js";
import { Admin } from "../models/admin.js";
import { createSpotTypeRepo , fetchAllSpotTypeRepo } from "../repositories/spotTypeRepository.js";

export const createSpotTypeService = async (spotType,user) => {
    try {
        if(user instanceof Admin) {
            const response =  await createSpotTypeRepo(spotType); 
            return response;
        } else {
            throw new AppError("Only Admin is allow to create floor",403,true);
        }
    } catch (error) {   
        throw error;
    }
}

export const fetchAllSpotTypeService = async () => {
    // No need to authorized the user 
    try {
        const response =  await fetchAllSpotTypeRepo(); 
        return response;
    } catch (error) {   
        throw error;
    }
}
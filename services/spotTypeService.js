import { AppError } from "../error.js";
import { createSpotTypeRepo , fetchAllSpotTypeRepo } from "../repositories/spotTypeRepository.js";

export const createSpotTypeService = async (spotType) => {
    try {
        const response =  await createSpotTypeRepo(spotType); 
        return response;
    } catch (error) {   
        throw error;
    }
}

export const fetchAllSpotTypeService = async () => { 
    try {
        const response =  await fetchAllSpotTypeRepo(); 
        return response;
    } catch (error) {   
        throw error;
    }
}
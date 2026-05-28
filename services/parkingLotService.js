import { Admin } from "../models/admin.js";
import { AppError } from "../error.js";
import { createParkingLotRepo ,removeParkingLotRepo , updateParkingLotRepo } from "../repositories/parkingLotRepo.js";

export const createParkingLotService = async (parkingLot) => {
    try {
        const response = await createParkingLotRepo(parkingLot);
        return response;
    } catch (error) {
        throw error;
    }
}

export const removeParkingLotService = async (id) => {
    try {
        const response =  await removeParkingLotRepo(id);
        if(response.affectedRows > 0) {
            return {message : "ParkingLot Remove"};
        } else {
            throw new AppError("Parkinglot Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}

export const updateParkingLotService = async (id,updates) => {
    try {
        // check that in the request valid field are came or not 
        const allowedFields = ["parking_name"];

        const keys = Object.keys(updates);
        let isValid = keys.every(key => allowedFields.includes(key));

        if(!isValid) {
            throw new AppError("Invalid update fields", 400, true);
        }

        const response = await updateParkingLotRepo(id,updates);
        if(response.affectedRows > 0) {
            return {message : "Parking Lot Updated"};
        } else {
            throw new AppError("Parking Lot Not Found",404,true);
        } 
    } catch (error) {
        throw error;
    }
}
import { ParkingAttendent } from "../models/parkingAttendent.js";
import { Admin } from "../models/admin.js";
import { AppError } from "../error.js";
import { cretaeParkingAttendentRepo , removeParkingAttendentRepo , updateParkingAttendentRepo , assignFloorToParkingAttendentRepo , checkParkingAttendentInfoRepo } from "../repositories/parkingAttendentRepository.js";
import { createHashPassword } from "./auth/becryptService.js";

/**
 * 
 * @param {ParkingAttendent} parkingAttendent 
 * @returns 
 */
export const cretaeParkingAttendentService = async (parkingAttendent) => {
    try {
        parkingAttendent.password = await createHashPassword(parkingAttendent.password);
        const response = await cretaeParkingAttendentRepo(parkingAttendent);
        return response;
    } catch (error) {
        throw error;
    }
}
export const removeParkingAttendentService = async (id) => {
    try {
        const response =  await removeParkingAttendentRepo(id);
        if(response.affectedRows > 0) {
            return {message : "Parking Attendent Remove"};
        } else {
            throw new AppError("Parking Attendent Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}
export const updateParkingAttendentService = async (id,updates) => {
    try {
        // check that in the request valid field are came or not 
        const allowedFields = ["name", "email", "role"];

        const keys = Object.keys(updates);
        let isValid = keys.every(key => allowedFields.includes(key));

        if(!isValid) {
            throw new AppError("Invalid update fields", 400, true);
        }

        const response = await updateParkingAttendentRepo(id,updates);
        if(response.affectedRows > 0) {
            return {message : "Parking Attendent Updated"};
        } else {
            throw new AppError("Parking Attendent Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}

export const assignFloorToParkingAttendentService = async (attendent_id,floor_id) => {
    try {
        const attrendent_present = await checkParkingAttendentInfoRepo(attendent_id);
        if(!attrendent_present) {
            throw new AppError("Attendent User not present",404,true);
        }
        const response = await assignFloorToParkingAttendentRepo(attendent_id,floor_id);
        if(response.affectedRows > 0) {
            return {message : "Parking Attendent Assign to Floor"};
        } else {
            throw new AppError("Floor Id Not Found",404,true);
        }    
    } catch (error) {
        throw error;
    }
}

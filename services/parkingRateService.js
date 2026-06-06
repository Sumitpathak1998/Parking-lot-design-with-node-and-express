import { AppError } from "../error.js";
import { cretaeParkingRateRepo , updateParkingRateRepo } from "../repositories/parkingRateRepository.js";
import { ParkingRate , parking_hours } from "../models/parkingRate.js";

export const createParkingRateService = async (parkingRate) => {
    try {
        const rates = Object.entries(parkingRate).reduce((acc,[key,value]) => {
            if(key in parking_hours) {
               const p1 = new ParkingRate({"hour_type" : parking_hours[key] , "rate" : value});
               acc.push([p1.hour_type,p1.rate]); 
            }
            return acc;
        }, []);
        const response = await cretaeParkingRateRepo(rates);
        return response;
    } catch (error) {   
        throw error;
    }
}

export const updateParkingRateService = async (updates) => {
    try {
        // check that all request valid filed are come or not 
        const allowedFields = ["first_hour", "second_third_hour", "remaining_hour"];

        const keys = Object.keys(updates);
        let isValid = keys.every(key => allowedFields.includes(key));

        if(!isValid) {
            throw new AppError("Invalid update fields", 400, true);
        }

        const hours = parking_hours[keys[0]];
        const rate = updates[keys[0]];

        console.log("hour_type and rate : ",hours,rate);
        const response = await updateParkingRateRepo(hours,rate);
        if( response.affectedRows > 0 ) {
            return { message : "Parking Rate Updated"};
        } else {
            throw new AppError("Parking Rates Not Found",404,true);
        } 
    } catch (error) {
        throw error;
    }
}
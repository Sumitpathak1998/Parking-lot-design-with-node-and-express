import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { createParkingRateService , updateParkingRateService } from "../services/parkingRateService.js";

export const createParkingRate = async (req,res) => {
    try {
        const parkingRates = req.body;
        const response = await createParkingRateService(parkingRates);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Parking Rate Inserted"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}

export const modifyParkingRate = async (req,res) => {
    try {
        const update_data = req.body;
        const resposne = await updateParkingRateService(update_data);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
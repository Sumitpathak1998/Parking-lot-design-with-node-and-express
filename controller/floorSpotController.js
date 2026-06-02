import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { FloorSpot } from "../models/floorSpot.js";
import { createFloorSpotService , removeFloorSpotService } from "../services/floorSpotService.js";

export const createFloorSpot = async(req,res) => {
    try {
        const floorSpot = new FloorSpot(req.body);
        const response = await createFloorSpotService(floorSpot);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Floor Spot Created"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}

export const removeFloorSpot = async(req,res) => {
    try {
        const resposne =  await removeFloorSpotService(req.params.id);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Floor } from "../models/floor.js";
import { createFloorService , removeFloorService } from "../services/floorServices.js";

export const createFloor = async (req,res) => {
    try {
        const floor = new Floor(req.body);
        const response = await createFloorService(floor);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Floor Created"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}
export const removeFloor = async (req,res) => {
    try {
        // floor display need to remove first and also check if any of the spot is accure by any vahicle or not 
        // if all the spot are remove then remove of floor and allow 
        const response = await removeFloorService(req.params.id);
        Helper.successResponse(res,200,response.message);   
    } catch (error) {
        handleError(error,res);
    }
}
import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Floor } from "../models/floor.js";
import { SpotType } from "../models/spotType.js";
import { createSpotTypeService , fetchAllSpotTypeService } from "../services/spotTypeService.js";

export const createSpotType = async (req,res) => {
    try {
        const spotType = new SpotType(req.body);
        const response = await createSpotTypeService(spotType);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Spot Type Created"
        })
    } catch (error) {
        handleError(error,res);
    }
}

export const fetchAllSpotType = async (req,res) => {
    try {
        const response = await fetchAllSpotTypeService();
        res.status(200).send({
            success : true ,
            data : response,
        });
    } catch (error) {
        handleError(error,res);
    }
}
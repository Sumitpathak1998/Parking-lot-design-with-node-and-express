import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Floor } from "../models/floor.js";
import { SpotType } from "../models/spotType.js";
import { createSpotTypeService , fetchAllSpotTypeService } from "../services/spotTypeService.js";

const helper = new Helper();
helper.setLogginUser();

export const createSpotType = async (req,res) => {
    try {
        // get login user info 
        const user = helper.getLoginUser();
        // if user is null mean know of the user is loggin yet 
        if(user == null) {
            handleError(new AppError("Invalid User",401,true),res);
        }
        const spotType = new SpotType(req.body);
        const response = await createSpotTypeService(spotType,user);
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
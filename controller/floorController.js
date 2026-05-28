import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Floor } from "../models/floor.js";
import { createFloorService , removeFloorService } from "../services/floorServices.js";

const helper = new Helper();
helper.setLogginUser();

export const createFloor = async (req,res) => {
    try {
        // get login user info 
        const user = helper.getLoginUser();
        // if user is null mean know of the user is loggin yet 
        if(user == null) {
            handleError(new AppError("Invalid User",401,true),res);
        }
        const floor = new Floor(req.body);
        const response = await createFloorService(floor,user);
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
        // get login user info 
        const user = helper.getLoginUser();
        // if user is null mean know of the user is loggin yet 
        if(user == null) {
            handleError(new AppError("Invalid User",401,true),res);
        }

        // floor display need to remove first and also check if any of the spot is accure by any vahicle or not 
        // if all the spot are remove then remove of floor and allow 

        const response = await removeFloorService(req.params.id,user);
        helper.successResponse(res,200,response.message);   
    } catch (error) {
        handleError(error,res);
    }
}
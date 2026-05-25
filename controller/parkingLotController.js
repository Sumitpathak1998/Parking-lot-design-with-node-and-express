import { Admin } from "../models/admin.js";
import { AppError, handleError } from "../error.js";
import { ParkingLot } from "../models/parkingLot.js";
import { Helper } from "../helper.js";
import { createParkingLotService , removeParkingLotService , updateParkingLotService} from "../services/parkingLotService.js";

const helper = new Helper();
helper.setLogginUser();

export const createParkingLot = async (req,res) => {
    try { 
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        let parkingLot = new ParkingLot(req.body); 
        const resposne =  await createParkingLotService(parkingLot,user);
        console.log(resposne);
        res.status(201).send({
            success : true ,
            id : resposne.insertId,
            message : "Parking Lot Created"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}
export const removeParkingLot = async (req,res) => {
    try {
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const resposne =  await removeParkingLotService(req.params.id,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}

export const updateParkingLot = async (req,res) => {
    try {
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const id = Number(req.params.id);
        const update_data = req.body;
        const resposne = await updateParkingLotService(id,update_data,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
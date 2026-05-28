import { AppError, handleError } from "../error.js";
import { cretaeParkingAttendentService , removeParkingAttendentService , updateParkingAttendentService , assignFloorToParkingAttendentService } from "../services/parkingAttendentService.js";
import { Helper } from "../helper.js";
import { ParkingAttendent } from "../models/parkingAttendent.js";

const helper = new Helper();
helper.setLogginUser();

export const cretaeParkingAttendent = async (req,res) => {
    try {
        // get login user info 
        const user = helper.getLoginUser();
        // if user is null mean know of the user is loggin yet 
        if(user == null) {
            handleError(new AppError("Invalid User",401,true),res);
        }
        const parkingAttendent = new ParkingAttendent(req.body);
        const resposne = await cretaeParkingAttendentService(parkingAttendent,user);
        res.status(201).send({
            success : true ,
            id : resposne.insertId,
            message : "Parking Attendent Created"
        }) 
    } catch (error) {
        handleError(error,res);
    }
};

export const removeParkingAttendent = async (req,res) => {
    try {
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const resposne =  await removeParkingAttendentService(req.params.id,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
};

export const updateParkingAttendent = async (req,res) => {
    try {
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const resposne =  await updateParkingAttendentService(req.params.id,req.body,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
};

// We can go like one attendent can manage multiple floor
export const assignFloorToParkingAttendent = async (req,res) => {
    try {
        const user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const {floor_id} = req.body;
        const resposne =  await assignFloorToParkingAttendentService(req.params.id,floor_id,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
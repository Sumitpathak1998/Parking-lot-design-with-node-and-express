import { AppError, handleError } from "../error.js";
import { cretaeParkingAttendentService , removeParkingAttendentService , updateParkingAttendentService , assignFloorToParkingAttendentService } from "../services/parkingAttendentService.js";
import { Helper } from "../helper.js";
import { ParkingAttendent } from "../models/parkingAttendent.js";


export const cretaeParkingAttendent = async (req,res) => {
    try {
        const parkingAttendent = new ParkingAttendent(req.body);
        const resposne = await cretaeParkingAttendentService(parkingAttendent);
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
        const resposne =  await removeParkingAttendentService(req.params.id);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
};

export const updateParkingAttendent = async (req,res) => {
    try { 
        const resposne =  await updateParkingAttendentService(req.params.id,req.body);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
};

// We can go like one attendent can manage multiple floor
export const assignFloorToParkingAttendent = async (req,res) => {
    try {
        const {floor_id} = req.body;
        const resposne =  await assignFloorToParkingAttendentService(req.params.id,floor_id);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
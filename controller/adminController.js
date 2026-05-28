import { Admin } from "../models/admin.js";
import { createAdminService, removeAdminService , updateAdminService } from "../services/adminServices.js";
import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";


export const createAdmin = async (req,res) => {
    try {
        let admin = new Admin(req.body); 
        const resposne =  await createAdminService(admin);
        res.status(201).send({
            success : true ,
            id : resposne.insertId,
            message : "New User Created"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}

export const removeAdmin = async(req,res) => {
    try {
        const resposne =  await removeAdminService(req.params.id);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}

export const updateAdmin = async (req,res) => {
    try {
        const id = Number(req.params.id);
        const update_data = req.body;
        const resposne = await updateAdminService(id,update_data);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
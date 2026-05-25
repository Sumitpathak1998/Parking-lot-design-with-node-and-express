import { Admin } from "../models/admin.js";
import { createAdminService, removeAdminService , updateAdminService } from "../services/adminServices.js";
import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";

const helper = new Helper();
helper.setLogginUser();

export const createAdmin = async (req,res) => {
    try {
        console.log(req.body);
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
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const resposne =  await removeAdminService(req.params.id,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}

export const updateAdmin = async (req,res) => {
    try {
        let user = helper.getLoginUser();
        if(user == null) {
            handleError(new AppError("Invalid USer",401,true),res);       
        } 
        const id = Number(req.params.id);
        const update_data = req.body;
        const resposne = await updateAdminService(id,update_data,user);
        helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
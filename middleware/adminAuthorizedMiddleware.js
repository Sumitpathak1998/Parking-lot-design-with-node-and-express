import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Admin } from "../models/admin.js";

export const adminAuthorizedMiddleWare = (req,res,next) => {
    try {
        if(Helper.setLogginUser(req.user) instanceof Admin ) {
            console.log("Admin user logged");
            next();
        } else {
            throw new AppError("Only User allow to perform this request",403,true);
        }
    } catch (error) {
        handleError(error,res);
    }
}
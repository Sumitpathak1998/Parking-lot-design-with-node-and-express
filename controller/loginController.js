import { AppError , handleError } from "../error.js";
import { User } from "../models/user.js";
import { loginService } from "../services/loginService.js";

export const login = async(req,res) => {
    try {
        const { email , password }  = req.body;
        const response = await loginService(email,password);
        res.status(200).send({
            success : true , 
            token : response.token
        });
    } catch (error) {
        handleError(error,res);
    }
}
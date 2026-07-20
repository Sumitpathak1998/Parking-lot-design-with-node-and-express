import { AppError , handleError } from "../error.js";
import { User } from "../models/user.js";
import { loginService } from "../services/loginService.js";

export const login = async(req,res) => {
    try {
        const { email , password }  = req.body;
        const ip = req.clientIp;
        const user_agent = req.headers["user-agent"];
        const response = await loginService(email,password,ip,user_agent);
        res.status(200).send({
            success : true , 
            "access-token" : response["access-token"],
            "refresh-token": response["refresh-token"]
        });
    } catch (error) {
        handleError(error,res);
    }
}
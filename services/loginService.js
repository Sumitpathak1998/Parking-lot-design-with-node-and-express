import { AppError , handleError } from "../error.js";
import { loginRepo } from "../repositories/loginRepository.js";
import { generateToken } from "./authJWTServices.js";

export const loginService = async(email,password) => {
    try {
        // encrypt password 
        const encryptedPassword = encryptPassword(password);
        const loginInfo = await loginRepo(email,password);
        if (loginInfo.length > 0) {
            const jwt_token = await generateToken(loginInfo[0]);
            return { token : jwt_token};
        } else {
            throw new AppError("Credential is wrong",400,true);
        }
    } catch (error) {
        throw error;    
    }
}

export const encryptPassword = (password) => {
    return password;
}
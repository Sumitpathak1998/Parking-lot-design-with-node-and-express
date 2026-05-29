import { AppError , handleError } from "../error.js";
import { loginRepo } from "../repositories/loginRepository.js";
import { generateToken } from "./auth/authJWTServices.js";
import { verifyPassword } from "./auth/becryptService.js";

export const loginService = async(email,password) => {
    try {
        // encrypt password 
        const loginInfo = await loginRepo(email);
        if (loginInfo.length > 0) {
            // Once data is get on the basis of email , then go and verify the password 
            const response = await verifyPassword(password,loginInfo[0].password);
            if(response) {
                const jwt_token = await generateToken(loginInfo[0]);
                return { token : jwt_token};
            } else {
                throw new AppError("Credential is wrong",400,true);    
            }
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
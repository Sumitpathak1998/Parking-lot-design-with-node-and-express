import { AppError , handleError } from "../error.js";
import { loginRepo } from "../repositories/loginRepository.js";
import { generateToken } from "./auth/authJWTServices.js";
import { verifyPassword } from "./auth/becryptService.js";
import { createSessionService } from "./sessionService.js";

export const loginService = async(email,password,ip,user_agent) => {
    try {
        // encrypt password 
        const loginInfo = await loginRepo(email);
        if (loginInfo.length > 0) {
            // Once data is get on the basis of email , then go and verify the password 
            const response = await verifyPassword(password,loginInfo[0].password);
            if(response) {
                const user = loginInfo[0];
                // Create a session and store the session info 
                const session_id = await createSessionService(user.id,ip,user_agent);
                console.log(session_id);
                // create Access Token 
                const access_token = await generateToken({id : user.id , name : user.name , email : user.email , role : user.role , session : session_id},"5m");
                // Create Refresh token
                const refresh_token = await generateToken({session : session_id},"10m");
                return { 
                    "access-token" : access_token , 
                    "refresh-token" : refresh_token
                };
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
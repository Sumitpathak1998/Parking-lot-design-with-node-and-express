import { AppError } from "../error.js";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";
import { createSessionRepo , checkSessionExistRepo } from "../repositories/sessionRepository.js";
import { generateToken } from "./auth/authJWTServices.js";

export const createSessionService = async (user_id,ip,user_agent) => {
    try {
       const session = new Session({user_id,user_agent,ip});
       const response =  await createSessionRepo(session);
       return response.insertId;
    } catch (error) {   
        throw error;
    }
}

/**
 * 
 * @param {number} session_id 
 */
export const checkSessionExitService = async(session_id) => {
    try {
        const response =  await checkSessionExistRepo(session_id);
        const user = new User({ 
            id : response.id, 
            name : response.name, 
            email : response.email, 
            role : response.role
        })
        // Now again we need to create accesss and refresh token 
        // create Access Token 
        const access_token = await generateToken({id : user.id , name : user.name , email : user.email , role : user.role , session : session_id},"5m");
        // Create Refresh token
        const refresh_token = await generateToken({session : session_id},"10m");
        return { 
            "access-token" : access_token , 
            "refresh-token" : refresh_token , 
            "user" : user
        };
    } catch (error) {   
        throw error;
    }
}
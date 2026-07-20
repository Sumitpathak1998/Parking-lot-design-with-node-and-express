import { AppError, handleError } from "../error.js";
import { decodeToken } from "../services/auth/authJWTServices.js";
import { checkSessionExitService } from "../services/sessionService.js";

export const checkRefreshToken = async (refresh_token) => {
    try {
        const token = refresh_token.split(" ")[1];
        const decode = decodeToken(token);
        const session_id = decode.session;

        console.log("session : ", session_id);
        // check session exist or not if present then fetch user info and create new access-token and refresh-token 
        // And set in the cookie for now just set and pass 

        const response = await checkSessionExitService(session_id);
        return response;
    } catch (error) {
        handleError(error);
    }
}

export const verifyJWTToken = async (req,res,next) => {
    try {
        if(req.url == "/api/auth/login") {
            return next();
        }

        const authHeader = req.headers?.authorization;

        if(!authHeader) {
            throw new AppError("Access Token Missing",401,true);
        }

        const refresh_token  = req.headers?.["refresh-token"];

        if(!refresh_token) {
            throw new AppError("Refresh Token Missing",401,true);
        }

        const token = authHeader.split(" ")[1];
        let decode = decodeToken(token , "access_token");
        if(decode == "JWT has expired") {
            const response = await checkRefreshToken(refresh_token);
            // Here we pass the access-refresh token as well
            res.header("access-token", response["access-token"]);
            res.header("refresh-token", response["refresh-token"]);
            req.user = response.user;
        } else {
            console.log("user info : ", decode);
            req.user = decode;
        }

        next();
    } catch (error) {
        handleError(error,res);
    }
}
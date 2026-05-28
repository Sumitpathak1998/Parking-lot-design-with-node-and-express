import { Admin } from "./models/admin.js";
import { User } from "./models/user.js";
import { ParkingAttendent } from "./models/parkingAttendent.js";

export class Helper {

    /**
     * 
     * @param {User} user 
     */
    static setLogginUser = (user) => {
        let logginUser = null;
        if(user.role == 1) {
            logginUser = new Admin({ id : user.id , name : user.name , email : user.email , role : user.role});    
        } else {
            logginUser = new ParkingAttendent({ id : user.id , name : user.name , email : user.email , role : user.role});
        }
        return logginUser;
    }

    /**
     * 
     * @param {*} res 
     * @param {number} statusCode 
     * @param {String} message 
     */
    static successResponse = (res,statusCode,message) => {
        let code = Number(statusCode) ?? 200;
        res.status(code).send({
            success : true ,
            message : message
        })
    }
}


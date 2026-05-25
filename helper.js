import { Admin } from "./models/admin.js";

export class Helper {

    constructor() {
        this.logginUser = null
    }

    setLogginUser = () => {
        let info = {id : 1, name : "Sumit" , email : "sum@gmail.com" , role : 1};
        if(info.role = 1) {
            this.logginUser = new Admin(info);    
        }
        return null;
    }

    getLoginUser = () => {
        return this.logginUser;
    }

    successResponse = (res,statusCode,message) => {
        let code = Number(statusCode) ?? 200;
        res.status(code).send({
            success : true ,
            message : message
        })
    }
}


import { User } from "../models/user.js";
import { ROLE } from "./roleType.js";

export class Admin extends User {

    constructor({id,name,email,role = ROLE.ADMIN,password}) {
        super(id,name,email,role,password);
    }
}
import { User } from "../models/user.js";
import { ROLE } from "./roleType.js";

export class ParkingAttendent extends User {

    constructor({id,name,email,role = ROLE.ATTENDENT,password}) {
        super(id,name,email,role,password);
    }
}
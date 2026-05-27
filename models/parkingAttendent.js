import { User } from "../models/user.js";

export class ParkingAttendent extends User {

    constructor({id,name,email,role}) {
        super(id,name,email,role);
    }
}
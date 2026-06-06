export class ParkingRate {
    constructor({id = null, hour_type , rate = 0}) {
        this.id = id;
        this.hour_type = hour_type;
        this.rate = rate; 
    }
}

export const parking_hours = {
    first_hour : "FIRST_HOUR",
    second_third_hour : "SECOND_THIRD_HOUR",
    remaining_hour : "REMAINING_HOUR"
}
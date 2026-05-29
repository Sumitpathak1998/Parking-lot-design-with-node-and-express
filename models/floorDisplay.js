export class FloorDisplay {
    constructor({id = null,floor_id,spot_type_id,total_spot = 0,occupied_spot = 0}) {
        this.id = id;
        this.floor_id = floor_id;
        this.spot_type_id = spot_type_id;
        this.total_spot = total_spot;
        this.occupied_spot = occupied_spot;
    }
}
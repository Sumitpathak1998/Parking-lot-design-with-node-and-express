export class FloorSpot {

    constructor({id,name,spot_type,occupied = false,floor_id = null}) {
        this.id = id;
        this.name = name;
        this.spot_type = spot_type;
        this.occupied = occupied;
        this.floor_id = floor_id;
    }
}
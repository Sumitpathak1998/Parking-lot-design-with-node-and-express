export class Floor {
    constructor({id = null,name,parking_lot}) {
        this.id = id;
        this.name = name;
        this.parking_attendent = null;
        this.parking_lot = parking_lot;
    }
}
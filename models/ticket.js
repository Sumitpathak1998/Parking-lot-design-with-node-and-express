export class Ticket {
    constructor({id=null,vehicleNumber,vehicleType,floor_id = null,floor_spot = null,entryTime = null,exitTime=null,totalAmount=0,paymentStatus=false,status="active"}) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.floor_id = floor_id;
        this.floor_spot = floor_spot;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.status = status;
    }
}
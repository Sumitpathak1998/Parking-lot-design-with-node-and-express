export class Payment {
    constructor({id=null,amount,ticket_id,payment_type="UPI",status="pending"}) {
        this.id = id;
        this.amount = amount;
        this.ticket_id = ticket_id;
        this.payment_type = payment_type;
        this.status = status;
    }
}
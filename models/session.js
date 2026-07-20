export class Session {
    constructor({
        id=null,
        user_id,
        valid=1,
        user_agent,ip,
        created_at=new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at=new Date().toISOString().slice(0, 19).replace('T', ' ')
    }) {
        this.id = id;
        this.user_id = user_id;
        this.valid = valid;
        this.user_agent = user_agent;
        this.ip = ip;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
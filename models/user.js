export class User {

    constructor(id = null,name,email,role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    getDetails() {
        return {
            id : this.id, 
            name : this.name,
            email : this.email,
            role : this.role
        };
    }
}
export class User {

    constructor(id = null,name,email,role,password = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
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
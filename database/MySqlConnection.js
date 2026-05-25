import mysql from "mysql2/promise";
import { BaseConnection } from "./BaseConnection.js";

class MySqlConnection extends BaseConnection {

    static instance = null;
    constructor() {
        // It will implemented the properties of base class
        super();
        if(MySqlConnection.instance) {
            return MySqlConnection.instance;
        }
        this.connection = null;
        // Here we assign the instance the same object refrence as this hold the current one
        MySqlConnection.instance =this;

    }

    async connect() {
        try {

            // Now what happend when we create the object that return the same object refrence 
            // Now when we call the connect , then here this.connection will already hold the refence of connection 
            // then new one will not create
            if(this.connection) {
                return this.connection;
            }

            this.connection = await mysql.createConnection({
                host : process.env.DB_HOST,
                user : process.env.DB_USER,
                password : process.env.DB_PASSWORD, 
                database : "parking_lot", 
                port : process.env.DB_PORT
            })

            console.log(`DB Connected Successfully on PORT : ${process.env.DB_PORT}`);
            
            return this.connection;
        } catch (error) {
            console.log("MySql Connection Error : " , error);
            this.connection = null;
            return null;
        }
    }

    async disconnect() {
        if(this.connection) {
            await this.connection.end();
            this.connection = null;
            console.log("MySql Dis-connected");
        }
    }
}

export default MySqlConnection;
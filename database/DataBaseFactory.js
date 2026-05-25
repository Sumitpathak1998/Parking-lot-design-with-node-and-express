import MySqlConnection from "./MySqlConnection.js";

class DataBaseFactory {

    static getConnection(type) {

        switch(type) {
            case "mysql" :
                return new MySqlConnection();
            default : 
                throw new Error("Invalid Database Type");
        }
    }
}

export default DataBaseFactory;
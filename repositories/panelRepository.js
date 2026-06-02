import DataBaseFactory from "../database/DataBaseFactory.js";
import { AppError } from "../error.js";
import { checkFloorPanel } from "../managers/floorManager.js";

// Create DB Instance  
const dbInstance = DataBaseFactory.getConnection("mysql");
// Now make connection
const db = await dbInstance.connect();

export const createPanelRepo = async (panels) => {
    try {
        const [result] = await db.query("INSERT INTO parking_lot.panel (name,panel_type,floor_id) values ?" , [panels]);
        console.log("response at the time of insert : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}

export const checkFloorAligntoPanel = async (floor_id) => {
    try {
        const floorAlignPanelCount = await checkFloorPanel(floor_id);
        return floorAlignPanelCount;
    } catch (error) {
        throw error;
    }
}

export const removePanelOnBasisOfFloorRepo = async (floor_id) => {
    try {
        const [result] = await db.query("DELETE FROM parking_lot.panel WHERE floor_id = ?" , [floor_id]);
        console.log("response at the time : ", result);
        return result;
    } catch (error) {
        throw new AppError(error.message,500,false,error.stack);
    }
}
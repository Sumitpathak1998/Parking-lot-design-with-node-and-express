import { AppError } from "../error.js";
import { Floor } from "../models/floor.js";
import { User } from "../models/user.js"; 
import { Admin } from "../models/admin.js";
import { cretaeFloorRepo , removeFloorRepo , updateFloorRepo , createFloorDisplayRepo , removeFloorDisplayRepo } from "../repositories/floorRepository.js";
import { fetchAllSpotTypeRepo } from "../repositories/spotTypeRepository.js";
import { checkFloorOccupancy } from "../managers/floorManager.js";

/**
 * 
 * @param {Floor} floor 
 * @param {User} user 
 * @returns 
 */
export const createFloorService = async (floor,user) => {
    try {
        if(user instanceof Admin) {
            const response = await cretaeFloorRepo(floor);
            floor.id = response.insertId;
            // Once the floor create floor display is also need to create
            const display_response = await createFloorDisplay(floor.id); 
            return response;
        } else {
            throw new AppError("Only Admin is allow to create floor",403,true);
        }
    } catch (error) {   
        throw error;
    }
}

/**
 * @param {number} floor_id 
 */
export const createFloorDisplay = async (floor_id) => {
    try {
        const spotTypes = await fetchAllSpotTypeRepo();
        const insert_data = spotTypes.map(param => {
            let spot_type_id = param.id;
            return [floor_id,spot_type_id];
        });
        // On the basis of these ids insert all the rows at once 
        const response = await createFloorDisplayRepo(insert_data);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {number} id 
 * @param {User} user 
 * @returns {object}
 */

export const removeFloorService = async(id,user) => {
    try {
        if(user instanceof Admin) {
            // before remove check the floor spot occupy or not if occupy then not allowed to remove if not
            // occupy then first remove the floor display and then floor 
            
            // check floor occupany , it can we done from floormanager 
            const spot_occupied_count = await checkFloorOccupancy(id);
            if(spot_occupied_count > 0) {
                throw new AppError("Floor not remove,Please Vacant all Spot first",400,true);   
            }

            const display_remove = await removeFloorDisplayRepo(id);

            if (display_remove.affectedRows == 0) {
                throw new AppError("Floor Display not remove",400,false);    
            }

            const response = await removeFloorRepo(id);
            if(response.affectedRows > 0) {
                return {message : "Floor Remove"};
            } else {
                throw new AppError("Floor Not Found",404,true);
            }
            throw new AppError("Only Admin is allow to create floor",403,true);
        } else {
            throw new AppError("Only Admin is allow to create floor",403,true);
        }
    } catch (error) {
        throw error;
    }
}
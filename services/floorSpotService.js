import { FloorSpot } from "../models/floorSpot.js";
import { createFloorSpotRepo , updateFloorDisplay , removeFloorSpotRepo , fetchFloorSpotDetails } from "../repositories/floorSpotRepository.js";
import { AppError } from "../error.js";

/**
 * 
 * @param {FloorSpot} floorSpot 
 */
export const createFloorSpotService = async (floorSpot) => {
    try {
        // At the time of insert no issue
        const response = await createFloorSpotRepo(floorSpot);

        // Once the floor spot insert then Update the floor display and it done by display manager 
        const floor_res = await updateFloorDisplay(floorSpot.floor_id,floorSpot.spot_type,"spot_added");
        if(floor_res.affectedRows == 0) {
            console.log("Floor Display not updated");
        }
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {number} spot_id 
 */
export const removeFloorSpotService = async (spot_id) => {
    try {
        const spotDetails = await fetchFloorSpotDetails(spot_id);
        if (spotDetails.length > 0) {
            if(spotDetails[0]?.occupied == 0) {
                const response =  await removeFloorSpotRepo(spot_id);
                // update the floordisplay as well 
                const floor_res = await updateFloorDisplay(spotDetails[0].floor_id,spotDetails[0].spot_type,"spot_remove"); 
                if(floor_res.affectedRows == 0) {
                    console.log("Floor Display not updated");
                }
                return {message : "Spot Remove"};
            } else {
                // 409 : Resoure conflict , mean user send the correct data but it confilt the operation
                throw new AppError("Parking spot is already occupied",409,true);   
            }
        } else {
            throw new AppError("Parking spot not present",404,true);
        }
    } catch (error) {
        throw error;
    }
}
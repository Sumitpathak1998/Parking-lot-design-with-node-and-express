import { AppError } from "../error.js";
import { Panel , panel_type } from "../models/panel.js";
import { checkFloorAligntoPanel  , createPanelRepo , removePanelOnBasisOfFloorRepo } from "../repositories/panelRepository.js";

export const createPanelService = async (panel_details) => {
    try {
        const p1 = [panel_details.entry_panel,panel_type.entry,panel_details.floor_id];
        const p2 = [panel_details.exit_panel,panel_type.exit,panel_details.floor_id];

        // check floor align to any panel or not 
        const floorAlignPanelCount = await checkFloorAligntoPanel(panel_details.floor_id);
        if(floorAlignPanelCount > 0) {
            throw new AppError("Floor already have entry and exit panel",400,true);
        }

        const response = await createPanelRepo([p1,p2]);
        return response;
    } catch (error) {
        throw error;
    }
}

export const removePanelService = async (floor_id) => {
    try {
        const resposne = await removePanelOnBasisOfFloorRepo(floor_id);
        if (resposne.affectedRows == 0) {
            throw new AppError("Please check panel Id",400,false);    
        }
        return {message : "Panel Remove"};
    } catch (error) {
        throw error;
    }
}

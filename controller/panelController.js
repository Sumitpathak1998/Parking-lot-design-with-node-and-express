import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { createPanelService , removePanelService } from "../services/panelService.js"; 

export const createPanel = async (req,res) => {
    try {
        const panel_details = req.body;
        const response = await createPanelService(panel_details);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Panel added"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}

export const removePanel = async (req,res) => {
    try {
        const resposne =  await removePanelService(req.query.floor_id);
        Helper.successResponse(res,200,resposne.message);
    } catch (error) {
        handleError(error,res);
    }
}
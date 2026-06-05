import { AppError, handleError } from "../error.js";
import { Helper } from "../helper.js";
import { Ticket } from "../models/ticket.js"; 
import { ticketGenerateService } from "../services/ticketGenerateService.js";

export const ticketGenerate = async (req,res) => {
    try {
        const ticket = new Ticket(req.body);
        const response = await ticketGenerateService(ticket);
        res.status(201).send({
            success : true ,
            id : response.insertId,
            message : "Ticket Generated"
        }) 
    } catch (error) {
        handleError(error,res);
    }
}
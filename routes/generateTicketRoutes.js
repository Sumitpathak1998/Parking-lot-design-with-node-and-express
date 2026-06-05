import { Router } from "express";
import { ticketGenerate } from "../controller/ticketGenerateController.js";

// create the instance of router
const router = Router();

router.post("/create", ticketGenerate);

const ticketGenerateRoutes = router;
export default ticketGenerateRoutes;

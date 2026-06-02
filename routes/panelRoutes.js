import { Router } from "express";
import { createPanel , removePanel } from "../controller/panelController.js";

//create instance of route
const router = Router();

router.post("/create" , createPanel);
router.delete("/remove" , removePanel);

const panelRoutes = router;
export default panelRoutes;
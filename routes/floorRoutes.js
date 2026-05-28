import { Router } from "express";
import { createFloor , removeFloor } from "../controller/floorController.js";

// create instance of router
const router = Router();

router.post("/create", createFloor);
router.delete("/remove/:id", removeFloor);

const floorRoutes = router;
export default floorRoutes;
import { Router } from "express";
import { createFloorSpot , removeFloorSpot } from "../controller/floorSpotController.js";

//create instance of routes
const router = Router();

router.post("/create" , createFloorSpot);
router.delete("/remove/:id", removeFloorSpot);

const floorSpotRoutes = router;
export default floorSpotRoutes;
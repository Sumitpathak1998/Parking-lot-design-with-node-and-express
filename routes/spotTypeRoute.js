import { Router } from "express";
import { fetchAllSpotType , createSpotType } from "../controller/spotTypeController.js";

// create instance of router
const router = Router();

router.post("/create", createSpotType);
router.get("/fetch", fetchAllSpotType);

const spotTypeRoutes = router;
export default spotTypeRoutes;
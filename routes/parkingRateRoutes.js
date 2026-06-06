import { Router } from "express";
import { createParkingRate , modifyParkingRate } from "../controller/parkingRateController.js";

const router = Router();

router.post("/create" , createParkingRate);
router.patch("/update", modifyParkingRate);

const parkingRateRoutes = router;
export default parkingRateRoutes;
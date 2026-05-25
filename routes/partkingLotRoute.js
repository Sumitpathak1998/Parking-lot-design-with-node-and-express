import { Router } from "express";
import { createParkingLot , removeParkingLot , updateParkingLot } from "../controller/parkingLotController.js";

const router = Router();

router.post("/create", createParkingLot);
router.delete("/remove/:id" , removeParkingLot);
router.patch("/update/:id" , updateParkingLot);

const parkingLotRoute = router;
export default parkingLotRoute;
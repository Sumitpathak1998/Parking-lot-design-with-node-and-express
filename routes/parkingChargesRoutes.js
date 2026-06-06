import { Router } from "express";
import { calculateParkingCharges } from "../controller/parkingChargesController.js";

const route = Router();

route.get("/parkingCharge/:id", calculateParkingCharges);

const parkingChargesRoutes = route;
export default parkingChargesRoutes;
import { Router } from "express";
import { cretaeParkingAttendent , removeParkingAttendent , updateParkingAttendent } from "../controller/parkingAttendentController.js";

const route = Router();

route.post("/create", cretaeParkingAttendent);
route.delete("/remove/:id" , removeParkingAttendent);
route.patch("/update/:id" , updateParkingAttendent);

const parkingAttendentRoute = route;
export default parkingAttendentRoute;
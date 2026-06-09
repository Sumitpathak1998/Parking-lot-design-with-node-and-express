import { Router } from "express";
import { verifyPaymentJWTToken } from "../middleware/verifyPaymentToken.js";
import { processPayment } from "../controller/paymentController.js";

const route = Router();

route.post("/payment", verifyPaymentJWTToken , processPayment);

const paymentRoutes = route;
export default paymentRoutes;
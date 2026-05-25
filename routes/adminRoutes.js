import { Router } from "express";
import { createAdmin, removeAdmin, updateAdmin } from "../controller/adminController.js";

const router = Router();

router.post("/create" , createAdmin);
router.delete("/remove/:id" , removeAdmin);
router.patch("/update/:id" , updateAdmin);

const adminRoutes = router;
export default adminRoutes;



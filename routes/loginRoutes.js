import { Router } from "express";
import { login } from "../controller/loginController.js";

const router = Router();

router.use('/login', login);

const loginRoutes = router;
export default loginRoutes;
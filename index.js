import express from "express";
import adminRoutes  from "./routes/adminRoutes.js";
import parkingLotRoute from "./routes/partkingLotRoute.js";
import parkingAttendentRoute from "./routes/parkingAttendentRoute.js";
import floorRoutes from "./routes/floorRoutes.js";
import spotTypeRoutes from "./routes/spotTypeRoute.js";
import { verifyJWTToken } from "./middleware/verifyToken.js";
import { adminAuthorizedMiddleWare } from "./middleware/adminAuthorizedMiddleware.js";
import loginRoutes from "./routes/loginRoutes.js";

// Create the instance of Express
const app = express();

app.use(express.json());

// auth middleware 
app.use(verifyJWTToken);

// mount routes
app.use("/api/auth" , loginRoutes);
app.use("/api/admin", adminAuthorizedMiddleWare , adminRoutes);
app.use("/api/parkinglot" , adminAuthorizedMiddleWare , parkingLotRoute);
app.use("/api/parkingAttendent" , adminAuthorizedMiddleWare , parkingAttendentRoute);
app.use("/api/floor" , adminAuthorizedMiddleWare , floorRoutes);
app.use("/api/spotType" , adminAuthorizedMiddleWare , spotTypeRoutes);

const PORT = isNaN(process.env.PORT) ? 3000 : process.env.PORT ;
// start the application 
app.listen(PORT, () => {
    console.log(`Server is started at PORT : ${PORT}`);
})
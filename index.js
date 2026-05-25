import express from "express";
import adminRoutes  from "./routes/adminRoutes.js";
import parkingLotRoute from "./routes/partkingLotRoute.js";

// Create the instance of Express
const app = express();


/**
 * What use() method will 
 * - register middleware functions in your application's request handling pipeline.
 */

/**
 * These are built in middleware in express Parse the incoming json data
 */
app.use(express.json());

// mount routes
app.use("/api/admin", adminRoutes);
app.use("/api/parkinglot" , parkingLotRoute);

const PORT = isNaN(process.env.PORT) ? 3000 : process.env.PORT ;
// start the application 
app.listen(PORT, () => {
    console.log(`Server is started at PORT : ${PORT}`);
})
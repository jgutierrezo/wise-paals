import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tutorRoutes from "./v1/routes/tutorRoutes.js";
import connectDb from "./database/MongoDbConfig.js";
import dotenv from "dotenv";

//Choosen architekture: 3 layer architecture
//Router -> Controller -> Service Layer -> Data Access Layer

//To load env variables into the process global object
dotenv.config();

//Create server
const app = express();

const PORT = process.env.PORT || 5001;
//To connect to the Db
connectDb()
  .then(app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//Configure server
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/api/v1/tutors", tutorRoutes);

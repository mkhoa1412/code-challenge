import express from "express";
import  dotenv  from "dotenv";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./config/ormconfig";
import resourceRoute from "./routes/resource.route"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use("/resources", resourceRoute)

AppDataSource.initialize().then(() => {
    console.log("Database connected")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((e) => console.log(e))
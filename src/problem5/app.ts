import express, { Request, Response } from "express";
import { AppDataSource } from "./src/data-source";
import userRouter from "./src/routes/user.route";
import { setupSwagger } from "./swagger";

const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

setupSwagger(app);

app.use("/api/users", userRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

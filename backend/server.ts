import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as userRouter } from "./routes/user";
import { router as productRouter } from "./routes/product";
import { mongoConnection } from "./mongoDBconnection";
import fileUpload from "express-fileupload";
(async () => {
  await mongoConnection();
})();
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(__dirname + '/public'))

app.get("/", (_: Request, res: Response) => {
  try {
    res.status(200).send("Home");
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

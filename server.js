import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import emailRoute from "./routes/email.routes.js";
import { reqLogger_middleware } from "./middleware/reqLogger.js";
import dotenv from "dotenv";
const app = express();
const PORT = 3943;
dotenv.config();

try {
  mongoose.connect(DB_IP);
  console.log("connected to DB");
} catch (error) {
  console.log(error);
  throw new Error("Could'nt connect to db");
}

const whiteList = [process.env.WHITELIST];
const corsOptions = {
  origin: (origin, callback) => {
    //for prod remove this !origin from if statement
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(console.error(new Error("blocked by cors error")));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(reqLogger_middleware);

app.get("/", (req, res) => {
  return res.sendStatus(404);
});
app.use("/email", emailRoute);
app.get("/*", (req, res) => {
  return res.sendStatus(404);
});
app.listen(PORT, () => console.log("Server started"));

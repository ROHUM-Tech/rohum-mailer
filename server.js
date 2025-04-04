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
  mongoose.connect(process.env.MONGO_STRING);
  console.log("connected to DB");
} catch (error) {
  console.log(error);
  // throw new Error("Could'nt connect to db");
}

const whiteList = [process.env.WHITELIST];
const corsOptions = {
  origin: (origin, callback) => {
    //for prod remove this !origin from if statement
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("blocked by cors error"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  if (err.message === "blocked by cors error") {
    console.log("blocked by cors" + req.ip);
    res.status(403).json({ message: "CORS error: Access denied" });
  } else {
    next(err); // pass other errors
  }
});

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

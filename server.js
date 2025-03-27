import express from "express";
import cors from "cors";
import emailRoute from "./routes/email.routes.js";
import { reqLogger_middleware } from "./middleware/reqLogger.js";
const app = express();
const PORT = 3943;

const whiteList = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    //for prod remove this !origin from if statement
    if (!origin || whiteList.indexOf(origin) !== -1) {
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

app.listen(PORT, () => console.log("Server started"));

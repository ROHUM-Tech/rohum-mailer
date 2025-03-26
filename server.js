import express from "express";
import cors from "cors";
import emailRoute from "./routes/email.routes.js";
const app = express();
const PORT = 3943;

app.use(cors());
app.use(express.json());

app.use("/email", emailRoute);

app.listen(PORT, () => console.log("Server started"));

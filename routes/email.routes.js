import express from "express";
import { rateLimit } from "express-rate-limit";
import { body } from "express-validator";
import sendEmailController from "../controllers/sendEmailController.js";
const router = express.Router();

const limiter = rateLimit({
  //   windowMs: 24 * 60 * 60 * 1000,
  windowMs: 10 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many email requests. Try again later." },
});

router.post(
  "/",
  limiter,
  body("name").exists().isLength({
    max: 20,
    min: 2,
  }),
  body("email").exists().isEmail(),
  body("phone_no").exists().isMobilePhone(),
  body("msg").exists().isLength({ max: 500, min: 1 }),
  sendEmailController
);

export default router;
